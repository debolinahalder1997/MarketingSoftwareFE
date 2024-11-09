import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = `${process.env.REACT_APP_BASEURL}/tarn-routes/feedback-list`;

export const getAllFeedBack = createAsyncThunk(
  "FeedBackList",
  async (UserData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(URL, UserData, config);
      return data?.response || [];
    } catch (error) {
      return rejectWithValue(error.response.data.response);
    }
  }
);

const FeedBackListSlice = createSlice({
  name: "FeedBackList",
  initialState: {
    isFBLoading: false,
    FeedBack: [],
    FeedBackErrorMsg: "",
    isFeedBackError: false,
    isFeedBackSuccess: false,
  },
  reducers: {
    ClearStateFeedBack: (state) => {
      state.FeedBackErrorMsg = "";
      state.isFeedBackError = false;
      state.isFeedBackSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllFeedBack.pending, (state) => {
        state.isFBLoading = true;
        state.isFeedBackError = false;
        state.isFeedBackSuccess = false;
      })
      .addCase(getAllFeedBack.fulfilled, (state, { payload }) => {
        state.isFeedBackError = false;
        state.isFBLoading = false;
        state.isFeedBackSuccess = true;
        state.FeedBack = payload;
      })
      .addCase(getAllFeedBack.rejected, (state, { payload }) => {
        state.isFBLoading = false;
        state.isFeedBackError = true;
        state.isFeedBackSuccess = false;
        state.FeedBackErrorMsg = payload;
      });
  },
});
export const { ClearStateFeedBack } = FeedBackListSlice.actions;
export default FeedBackListSlice.reducer;
