import { classService } from "../services/class.js";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getClass, setClass } from "../utils/token.js";

export const addClassAction = createAsyncThunk("class/addClass", async (data, thunkApi) => {
    try {
        await classService.addClass(data);
        const classes = await classService.getClass()
        thunkApi.dispatch(classActions.setClass(classes.data));
    } catch (err) {
        throw err.response.data
    }
})

export const getClassAction = createAsyncThunk(
  "class/getClass",
  async (_, thunkApi) => {
    try {
      if (getToken()) {
        const classes = await classService.getClass();
        setClass(classes.data);
        thunkApi.dispatch(
          classActions.setClass(classes.data)
        );
      }
    } catch (err) {}
  }
);

export const { reducer: classReducer, action: classActions } = createSlice({
    name: "classes",
    initialState: {
      classes: getClass()
    },
    reducers: {
        setClass(state, action) {
            state.classes = action.payload
        }
    }
})