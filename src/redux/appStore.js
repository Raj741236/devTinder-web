import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";

const appStore = configureStore({
  reducer: { userSlice, feed: feedReducer, connections: connectionReducer },
});

export default appStore;
