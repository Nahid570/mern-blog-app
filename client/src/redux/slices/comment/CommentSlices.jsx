import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utils/baseUrl";


// create comment
export const createCommentAction = createAsyncThunk(
    "create/comment",
    async (comment, { rejectWithValue, getState, dispatch }) => {
      // get the token
      const users = getState()?.users;
      const { token } = users?.userAuth;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await axios.post(
          `${baseUrl}/api/comments`,
          comment,
          config
        );
        return data;
      } catch (error) {
        if (!error.response) {
          throw error;
        }
        return rejectWithValue(error?.response?.data);
      }
    }
  );

  const commentSlice = createSlice({
    name: "comments",
    initialState: {},
    extraReducers: (builder) => {
      // create post
      builder.addCase(createCommentAction.pending, (action, state) => {
        state.loading = true;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(createCommentAction.fulfilled, (state, action) => {
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
        state.commentCreated = action?.payload;
      });
      builder.addCase(createCommentAction.rejected, (action, state) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });
  }
  })

  export default commentSlice.reducer;
    