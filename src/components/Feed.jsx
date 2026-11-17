import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
import { addFeed } from "../redux/feedSlice";

const Feed = () => {
  const dispatch = useDispatch();

  const feedData = useSelector((store) => store.feed);
  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!feedData) {
      getFeed();
    }
  }, []);
  if (!feedData) return;
  if (feedData.length <= 0) {
    return <h1>No users available</h1>;
  }

  return feedData ? (
    <div>
      <UserCard user={feedData[0]} />
    </div>
  ) : (
    <span className="loading loading-bars loading-xl"></span>
  );
};

export default Feed;
