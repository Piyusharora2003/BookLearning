import {  createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {},
    reducers:{
        addUser:(state,action)=>{
            console.log(action.payload);
            return {...action.payload};
        },
        removeUser:()=>{
            return {
                token:      "",
                name:       "",
                email:      "",
                mobileno:   "",
                role:       "",
                itemsincart:[],
                id:         ""
            };
        }
    }
})

export const {addUser , removeUser } =  userSlice.actions


export default userSlice.reducer;
