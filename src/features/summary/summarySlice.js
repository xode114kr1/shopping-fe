import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getSummary = createAsyncThunk(
  "/summary",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/summary");
      return response.summary;
    } catch (error) {
      return rejectWithValue(error.error);
    }
  }
);

const summarySlice = createSlice({
  name: "summary",
  initialState: {},
});
