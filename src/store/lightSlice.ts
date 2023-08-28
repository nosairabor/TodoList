import { createSlice } from "@reduxjs/toolkit";

interface lightState {
    light:boolean;
}

const initialState:lightState={
    light:false
}

const lightSlice = createSlice({
    name: "light",
    initialState,
    reducers:{
        toggleLight:(state) =>{
            state.light =!state.light
        }
    }
})

export const {toggleLight} = lightSlice.actions
export default lightSlice.reducer
