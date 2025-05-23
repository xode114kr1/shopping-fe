import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { showToastMessage } from "../common/uiSlice";
import api from "../../utils/api";
import { initialCart } from "../cart/cartSlice";

export const loginWithEmail = createAsyncThunk(
  "user/loginWithEmail",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const token = response.data.token;
      sessionStorage.setItem("token", token);
      // 성공
      return response.data;
    } catch (error) {
      // 실패
      // 1. 실패 시 생성 에러값을 reducer에 저장
      return rejectWithValue(error.error);
    }
  }
);

export const loginWithGoogle = createAsyncThunk(
  "user/loginWithGoogle",
  async (token, { rejectWithValue }) => {}
);

export const logout = () => (dispatch) => {
  sessionStorage.removeItem("token");
  dispatch(logoutUser());
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (
    { email, name, password, navigate },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await api.post("/user", { email, password, name });
      if (response) {
        // 성공 토스트
        dispatch(
          showToastMessage({
            message: "회원가입을 성공했습니다.",
            status: "success",
          })
        );
        navigate("/login");
      }
    } catch (error) {
      dispatch(
        showToastMessage({
          message: "회원가입에 실패했습니다.",
          status: "error",
        })
      );
      return rejectWithValue(error.error);
    }
  }
);

export const loginWithToken = createAsyncThunk(
  "user/loginWithToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/user/me");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    loginError: null,
    registrationError: null,
    success: false,
  },
  reducers: {
    clearErrors: (state) => {
      state.loginError = null;
      state.registrationError = null;
    },
    logoutUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (status) => {
        status.loading = true;
      })
      .addCase(registerUser.fulfilled, (status) => {
        status.loading = false;
        status.registrationError = null;
      })
      .addCase(registerUser.rejected, (status, action) => {
        status.registrationError = action.payload;
      })
      .addCase(loginWithEmail.pending, (status) => {
        status.loading = true;
      })
      .addCase(loginWithEmail.fulfilled, (status, action) => {
        status.loading = false;
        status.user = action.payload.user;
        status.loginError = null;
      })
      .addCase(loginWithEmail.rejected, (status, action) => {
        status.loading = false;
        status.loginError = action.payload;
      })
      .addCase(loginWithToken.fulfilled, (status, action) => {
        status.user = action.payload.user;
      });
  },
});
export const { clearErrors, logoutUser } = userSlice.actions;
export default userSlice.reducer;
