import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from '../../../utils/baseUrl'

// create actions
const profilePhotoReset = createAction("reset/profile");

// register
export const registerUserAction = createAsyncThunk('users/register', async (user, {rejectWithValue, getState,dispatch}) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const {data} = await axios.post(`${baseUrl}/api/users/register`, user, config)
        return data;
    } catch (error) {
        if(!error?.response){
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }
})

// Login
export const loginUserAction = createAsyncThunk('users/login', async (userData, {rejectWithValue, getState, dispatch}) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const {data} = await axios.post(`${baseUrl}/api/users/login`, userData, config);
        localStorage.setItem('userInfo', JSON.stringify(data));
        return data;
    } catch (error) {
        if(!error?.response){
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }
});


// fetch user profile
export const userProfileAction = createAsyncThunk(
    "user/profile",
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
        const { data } = await axios.get(
          `${baseUrl}/api/users/profile/${id}`,
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

// logout
export const logoutUserAction = createAsyncThunk('users/logout', async (payload, {rejectWithValue, getState, dispatch}) => {
    try {
        localStorage.removeItem('userInfo');
    } catch (error) {
        if(!error?.response){
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }
})

// upload profile photo
export const userProfilePhotoAction = createAsyncThunk(
    "user/profile-photo",
    async (userImg, { rejectWithValue, getState, dispatch }) => {
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
        formData.append("image", userImg?.image);
  
        const { data } = await axios.put(
          `${baseUrl}/api/users/profile-photo-upload`,
          formData,
          config
        );
        dispatch(profilePhotoReset())
        return data;
      } catch (error) {
        if (!error.response) {
          throw error;
        }
        return rejectWithValue(error?.response?.data);
      }
    }
  );

// retrive user login credential after successfull login and save into store
const userData = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const userSlices = createSlice({
    name: 'users',
    initialState: {userAuth: userData},
    extraReducers: (builder) => {
        // register
        builder.addCase(registerUserAction.pending, (state) => {
            state.loading = true
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(registerUserAction.fulfilled, (state, action) => {
            state.loading = false;
            state.registered = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(registerUserAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        // login
        builder.addCase(loginUserAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(loginUserAction.fulfilled, (state, action) => {
            state.userAuth = action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(loginUserAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload.message;
            state.serverErr = action?.error?.message;
        });

        // user profile
        builder.addCase(userProfileAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(userProfileAction.fulfilled, (state, action) => {
            state.userProfile = action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(userProfileAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload.message;
            state.serverErr = action?.error?.message;
        });

        // user profile photo upload
        builder.addCase(userProfilePhotoAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(profilePhotoReset, (state, action) => {
            state.isProfileUpdated = true;
        });
        builder.addCase(userProfilePhotoAction.fulfilled, (state, action) => {
            state.profilePhoto = action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
            state.isProfileUpdated = false;
        });
        builder.addCase(userProfilePhotoAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload.message;
            state.serverErr = action?.error?.message;
        });

        // logout
        builder.addCase(logoutUserAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(logoutUserAction.fulfilled, (state, action) => {
            state.loading = false;
            state.userAuth = null;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(logoutUserAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload.message;
            state.serverErr = action?.error?.message;
        });
    }
})

export default userSlices.reducer;