import { createSlice } from "@reduxjs/toolkit";


interface inputState {
    content: any[];
}


const initialState:inputState ={
    content: [],
}


const inputSlice = createSlice({
    name:'inputs',
    initialState,
    reducers:{
        addInputs:(state, action) =>{
            const {id, content} = action.payload
            state.content.push({id, content, completed: false});
        },
        deleteInputs:(state, action) => {
            state.content= state.content.filter(
                (input)=>input.id !== action.payload
            );
        },
        toggleSelected: (state, action) => {
            const itemId = action.payload;
            state.content = state.content.map((item) => {
              if (item.id === itemId) {
                return { ...item, selected: !item.selected };
              }
              return item;
            });
        },
        toggleCompleted: (state, action) => {
            const itemId = action.payload;
            state.content = state.content.map((item) => {
              if (item.id === itemId) {
                return { ...item, completed: !item.completed };
              }
              return item;
            });
        },
          
    },
});


export const {addInputs, deleteInputs, toggleSelected,toggleCompleted} = inputSlice.actions;
export default inputSlice.reducer;