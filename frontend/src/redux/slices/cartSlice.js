import {  createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:   "cart",
    initialState: [],
    reducers:{
        addItem:(state,action)=>{
            let includes = 0;
            for (let index = 0; index < state.length; index++) {
                const element = state[index];
                if(element.id === action.payload.id){
                    element.quantity ++;
                    includes = 1;
                    break;
                }
            }
            if(includes === 0 ){
                state.push(action.payload);
            }
            // Push item to 
        }, 
        // to be completed ....
        
        // prevent repetitions
    }
});

export const {addItem } = cartSlice.actions
export default cartSlice.reducer;
