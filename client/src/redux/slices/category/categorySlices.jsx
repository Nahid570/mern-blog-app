import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utils/baseUrl";

export const createCategoryAction = createAsyncThunk(
  "category/create",
  async (category, { rejectWithValue, getState, dispatch }) => {
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
        `${baseUrl}/api/category`,
        {
          title: category?.title,
        },
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
// fetch all the category
export const fetchAllCategoryAction = createAsyncThunk(
  "fetch/category",
  async (category, { rejectWithValue, getState, dispatch }) => {
    // get the token
    const users = getState()?.users;
    const { token } = users?.userAuth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(`${baseUrl}/api/category`, config);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// fetch single category details
export const fetchCategoryDetailsAction = createAsyncThunk(
  "fetch/details",
  async (id, { rejectWithValue, getState, dispatch }) => {
    // get the token
    const users = getState()?.users;
    const { token } = users?.userAuth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(`${baseUrl}/api/category/${id}`, config);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Update Category
export const updateCategoryAction = createAsyncThunk(
  "update/category",
  async (category, { rejectWithValue, getState, dispatch }) => {
    // get the token
    const users = getState()?.users;
    const { token } = users?.userAuth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.put(`${baseUrl}/api/category/${category?.id}`,{title: category?.title}, config);
      return data;  
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Delete Category
export const deleteCategoryAction = createAsyncThunk(
  "delete/category",
  async (id, { rejectWithValue, getState, dispatch }) => {
    // get the token
    const users = getState()?.users;
    const { token } = users?.userAuth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.delete(`${baseUrl}/api/category/${id}`, config);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

const categorySlices = createSlice({
  name: "category",
  initialState: { category: {}, loading: true },
  extraReducers: (builder) => {
    // create category
    builder.addCase(createCategoryAction.pending, (action, state) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(createCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
      state.category = action?.payload;
    });
    builder.addCase(createCategoryAction.rejected, (action, state) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    // fetch all the category
    builder.addCase(fetchAllCategoryAction.pending, (action, state) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchAllCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
      state.categoryList = action?.payload;
    });
    builder.addCase(fetchAllCategoryAction.rejected, (action, state) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
     // fetch single Category details
     builder.addCase(fetchCategoryDetailsAction.pending, (action, state) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchCategoryDetailsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
      state.categoryDetails = action?.payload;
    });
    builder.addCase(fetchCategoryDetailsAction.rejected, (action, state) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    // Update Category
    builder.addCase(updateCategoryAction.pending, (action, state) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(updateCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
      state.updatedCategory = action?.payload;
    });
    builder.addCase(updateCategoryAction.rejected, (action, state) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    // Delete Category
    builder.addCase(deleteCategoryAction.pending, (action, state) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(deleteCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
      state.DeletedCategory = action?.payload;
    });
    builder.addCase(deleteCategoryAction.rejected, (action, state) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },
});

export default categorySlices.reducer;
