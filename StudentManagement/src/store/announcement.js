import { announcementService } from "../services/announcement.js";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getAnnouncement, setAnnouncement } from "../utils/token.js";

export const addAnnouncementAction = createAsyncThunk("announcement/addAnnouncement", async (data, thunkApi) => {
    try {
        await announcementService.addAnnouncement(data);
        const announcement = await announcementService.getAnnouncement()
        thunkApi.dispatch(announcementActions.setAnnouncement(announcement.data));
    } catch (err) {
        throw err.response.data
    }
})

export const getAnnouncementAction = createAsyncThunk("announcement/getAnnouncement", async (_, thunkApi) => {
  try {
    if (getToken()) {
      const announcement = await announcementService.getAnnouncement()
      setAnnouncement(announcement.data);
      thunkApi.dispatch(announcementActions.setAnnouncement(announcement.data));
    }
  } catch (err) {

  }
})

export const { reducer: announcementReducer, action: announcementActions } = createSlice({
    name: "announcement",
    initialState: {
        announcement: getAnnouncement()
    },
    reducers: {
        setAnnouncement(state, action) {
            state.announcement = action.payload
        }
    }
})