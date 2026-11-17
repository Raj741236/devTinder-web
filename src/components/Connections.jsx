import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../redux/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const handleConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!connections) {
      handleConnections();
    }
  }, []);
  return (
    connections && (
      <div>
        <h1 className="text-3xl font-bold text-center">Connections</h1>
        <div className="flex flex-row">
          {connections.map((connection) => (
            <div
              className="card bg-base-100 w-96 shadow-sm max-h-100 m-4"
              key={connection._id}
            >
              <figure>
                <img src={connection.photoUrl} alt="photo" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {connection.firstName + " " + connection.lastName}
                </h2>
                <p>{connection.about}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default Connections;
