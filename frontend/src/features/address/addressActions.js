import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClientServiceApi } from "../../util/axiosUtil";

export const getAddressList = createAsyncThunk(
  "project/clientAddressList",
  async (rejectWithValue) => {
    try {
      const { data } = await axiosClientServiceApi.get(
        `address/getClientAddress/`
      );

      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
