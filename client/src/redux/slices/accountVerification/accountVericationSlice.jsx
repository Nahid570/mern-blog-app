import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utils/baseUrl";


//action to generate verification token
export const sendAccVerificationTokenAction = createAsyncThunk(
  "verify/token",
  async (email, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/users/generate-verify-email-token`,
        {},
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

//Verify user account token
export const verifyUserAccountTokenAction = createAsyncThunk(
  "user/token",
  async (token, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
      const { data } = await axios.put(
        `${baseUrl}/api/users/verify-account`,
        {verificationToken: token},
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


//slices

const accountVerifySlices = createSlice({
  name: "mail",
  initialState: {},
  extraReducers: builder => {
    //generate account verification token
    builder.addCase(sendAccVerificationTokenAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(sendAccVerificationTokenAction.fulfilled, (state, action) => {
      state.sendToken = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(sendAccVerificationTokenAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //validate verification token
    builder.addCase(verifyUserAccountTokenAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(verifyUserAccountTokenAction.fulfilled, (state, action) => {
      state.verified = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(verifyUserAccountTokenAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },
});

export default accountVerifySlices.reducer;