import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../redux/requestSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const reviewRequests = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error(err);
    }
  };
  const handleRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!requests) {
      handleRequests();
    }
  }, []);
  if (requests && requests.length === 0) {
    return (
      <h1 className="text-3xl font-bold text-center">No requests found</h1>
    );
  }
  return (
    requests && (
      <div>
        <h1 className="text-3xl font-bold text-center">Requests</h1>
        <div className="flex flex-row">
          {requests.map((request) => (
            <div
              className="card bg-base-100 w-96 shadow-sm max-h-100 m-4"
              key={request.fromUserId._id}
            >
              <figure>
                <img src={request.fromUserId.photoUrl} alt="photo" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {request.fromUserId.firstName +
                    " " +
                    request.fromUserId.lastName}
                </h2>
                <p>{request.fromUserId.about}</p>
                <div className="card-actions justify-center my-3">
                  <button
                    className="btn btn-error"
                    onClick={() => {
                      reviewRequests("rejected", request._id);
                    }}
                  >
                    Reject
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      reviewRequests("accepted", request._id);
                    }}
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default Requests;
