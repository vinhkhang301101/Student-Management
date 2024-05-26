import { classService } from "../services/class.js";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const addClassAction = createAsyncThunk("class/addClass", async (data, thunkApi) => {
    try {
        await classService.addClass(data);
        const classes = await classService.getClass()
        thunkApi.dispatch(classActions.setClass(classes.data));
    } catch (err) {
        throw err.response.data
    }
})

export const { reducer: classReducer, action: classActions } = createSlice({
    name: "classes",
    initialState: {
        classes: null
    },
    reducers: {
        setClass(state, action) {
            state.classes = action.payload
        }
    }
})