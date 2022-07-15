import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utils/baseUrl";

// create action for reset comment
const resetCommentAction = createAction("reset/comment");

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

  // Delete comment
export const deleteCommentAction = createAsyncThunk(
  "delete/comment",
  async (commentId, { rejectWithValue, getState, dispatch }) => {
    // get the token
    const users = getState()?.users;
    const { token } = users?.userAuth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.delete(
        `${baseUrl}/api/comments/${commentId}`,
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

  // Update comment
  export const updateCommentAction = createAsyncThunk(
    "update/comment",
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
        const { data } = await axios.put(
          `${baseUrl}/api/comments/${comment?.id}`,
          {description: comment?.description},
          config
        );
        dispatch(resetCommentAction())
        return data;
      } catch (error) {
        if (!error.response) {
          throw error;
        }
        return rejectWithValue(error?.response?.data);
      }
    }
  );

  // fetch single comment
    // Update comment
    export const fetchCommentDetailsAction = createAsyncThunk(
      "details/comment",
      async (commentId, { rejectWithValue, getState, dispatch }) => {
        // get the token
        const users = getState()?.users;
        const { token } = users?.userAuth;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        try {
          const { data } = await axios.get(
            `${baseUrl}/api/comments/${commentId}`,
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
      // create comment
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
      // update comment
      builder.addCase(updateCommentAction.pending, (action, state) => {
        state.loading = true;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(resetCommentAction, (state, action) => {
        state.isUpdated = true;
      });
      builder.addCase(updateCommentAction.fulfilled, (state, action) => {
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
        state.isUpdated = false;
        state.commentUpdated = action?.payload;
      });
      builder.addCase(updateCommentAction.rejected, (action, state) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });
       // comment details
       builder.addCase(fetchCommentDetailsAction.pending, (action, state) => {
        state.loading = true;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(fetchCommentDetailsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
        state.commentDetails = action?.payload;
      });
      builder.addCase(fetchCommentDetailsAction.rejected, (action, state) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });
       // delete comment
       builder.addCase(deleteCommentAction.pending, (action, state) => {
        state.loading = true;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(deleteCommentAction.fulfilled, (state, action) => {
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
        state.commentDeleted = action?.payload;
      });
      builder.addCase(deleteCommentAction.rejected, (action, state) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });
  }
  })

  export default commentSlice.reducer;
    