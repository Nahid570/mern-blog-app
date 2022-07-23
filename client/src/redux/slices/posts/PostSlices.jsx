import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utils/baseUrl";


// create actions
const resetPostDelete = createAction("reset/delete");

// create post
export const createPostAction = createAsyncThunk(
  "create/post",
  async (post, { rejectWithValue, getState, dispatch }) => {
    // get the token
    const users = getState()?.users;
    const { token } = users?.userAuth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      // FormData
      const formData = new FormData();
      formData.append("title", post?.title);
      formData.append("description", post?.description);
      formData.append("category", post?.category?.label);
      formData.append("image", post?.image);

      const { data } = await axios.post(
        `${baseUrl}/api/posts/create-post`,
        formData,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// update post
export const updatePostAction = createAsyncThunk(
  "update/post",
  async (post, { rejectWithValue, getState, dispatch }) => {
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
        `${baseUrl}/api/posts/${post?.id}`,
        post,
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

// Fetch all the posts
export const fetchAllPostsAction = createAsyncThunk(
  "fetch/posts",
  async (category, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `${baseUrl}/api/posts?category=${category}`
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

// Fetch  post details
export const fetchPostDetailsAction = createAsyncThunk(
  "fetch/details",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `${baseUrl}/api/posts/${id}`
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

// Add likes to post
export const toggleAddLikesToPost = createAsyncThunk(
  "add/likes",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    // get the token
    const users = getState()?.users;
    const { token } = users?.userAuth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.put(`${baseUrl}/api/posts/likes`, {postId}, config);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);


// Add dislikes to post
export const toggleAddDisLikesToPost = createAsyncThunk(
  "add/dislikes",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    // get the token
    const users = getState()?.users;
    const { token } = users?.userAuth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.put(`${baseUrl}/api/posts/dislikes`, {postId}, config);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Delete Post
export const deletePostAction = createAsyncThunk(
  "post/delete",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    // get the token
    const users = getState()?.users;
    const { token } = users?.userAuth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.delete(`${baseUrl}/api/posts/${postId}`, config);
      dispatch(resetPostDelete())
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState: {},
  extraReducers: (builder) => {
    // create post
    builder.addCase(createPostAction.pending, (action, state) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(createPostAction.fulfilled, (state, action) => {
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
      state.postCreated = action?.payload;
    });
    builder.addCase(createPostAction.rejected, (action, state) => {
      console.log(action);
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    // Update post
    builder.addCase(updatePostAction.pending, (action, state) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(updatePostAction.fulfilled, (state, action) => {
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
      state.postUpdated = action?.payload;
    });
    builder.addCase(updatePostAction.rejected, (action, state) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    // fetch all the posts
    builder.addCase(fetchAllPostsAction.pending, (action, state) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchAllPostsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
      state.postsList = action?.payload;
    });
    builder.addCase(fetchAllPostsAction.rejected, (action, state) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    // fetch post details
    builder.addCase(fetchPostDetailsAction.pending, (action, state) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchPostDetailsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
      state.postDetails = action?.payload;
    });
    builder.addCase(fetchPostDetailsAction.rejected, (action, state) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    // toggle likes to post
    builder.addCase(toggleAddLikesToPost.pending, (action, state) => {
      state.loading = true;
    });
    builder.addCase(toggleAddLikesToPost.fulfilled, (state, action) => {
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
      state.likes = action?.payload;
    });
    builder.addCase(toggleAddLikesToPost.rejected, (action, state) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    // toggle dislikes to post
    builder.addCase(toggleAddDisLikesToPost.pending, (action, state) => {
      state.loading = true;
    });
    builder.addCase(toggleAddDisLikesToPost.fulfilled, (state, action) => {
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
      state.dislikes = action?.payload;
    });
    builder.addCase(toggleAddDisLikesToPost.rejected, (action, state) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    // delete post
    builder.addCase(deletePostAction.pending, (action, state) => {
      state.loading = true;
    });
    builder.addCase(resetPostDelete, (state, action) => {
        state.isDeleted = true;
    });
    builder.addCase(deletePostAction.fulfilled, (state, action) => {
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
      state.isDeleted = false;
    });
    builder.addCase(deletePostAction.rejected, (action, state) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },
});

export default postSlice.reducer;
