import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const getSummary = createAsyncThunk(
  "/summary",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/summary");
      return response.data.summary;
    } catch (error) {
      return rejectWithValue(error.error);
    }
  }
);

const summarySlice = createSlice({
  name: "summary",
  initialState: {
    summary: {},
    loading: false,
    error: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSummary.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.summary = action.payload;
      })
      .addCase(getSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default summarySlice.reducer;
