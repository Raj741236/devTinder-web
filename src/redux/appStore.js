import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";
import requestReducer from "./requestSlice";

const appStore = configureStore({
  reducer: {
    userSlice,
    feed: feedReducer,
    connections: connectionReducer,
    requests: requestReducer,
  },
});

export default appStore;
