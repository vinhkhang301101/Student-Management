import { announcementService } from "../services/announcement.js";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const addAnnouncementAction = createAsyncThunk("announcement/addAnnouncement", async (data, thunkApi) => {
    try {
        await announcementService.addAnnouncement(data);
        const announcement = await announcementService.getAnnouncement()
        thunkApi.dispatch(announcementActions.setAnnouncement(announcement.data));
    } catch (err) {
        throw err.response.data
    }
})

export const { reducer: announcementReducer, action: announcementActions } = createSlice({
    name: "announcement",
    initialState: {
        announcement: null
    },
    reducers: {
        setAnnouncement(state, action) {
            state.announcement = action.payload
        }
    }
})