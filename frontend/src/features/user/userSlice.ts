import { createSlice } from "@reduxjs/toolkit";
import { loggedInUser } from "../../state/user.state";

export const UserInfoSlice = createSlice({
  name: "userInfo",
  initialState: loggedInUser,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = UserInfoSlice.actions;
export default UserInfoSlice.reducer;
