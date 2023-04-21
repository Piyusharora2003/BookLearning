import {  createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
    name: "user",
    initialState: {
        token:      "",
        name:       "",
        email:      "",
        mobileno:   "",
        role:       "",
        itemsincart:[],
        id:  ""
    },
    reducers:{
        addUser:(state,action)=>{
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
                id:  ""
            };
        },
        addItemToCart:(state,action)=>{
            const item = action.payload;
            const existingItem = state.itemsincart.find(i => i.productId === item.productId);
      
            if (!existingItem) {
              state.itemsincart.push(item);
            }
            else{
                existingItem.quantity ++;
            }

            // upload to database 
            async function pushtocartdb(){

                const config = {
                    headers: {
                      "Access-Control-Allow-Origin": "*",
                      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
                    },
                    withCredentials:true,
                    Authorization: `Bearer ${state.token}` //Add this line
                  };
                const res = await axios.put(`http://localhost:2000/api/v1/updateuser/${state.id}`,{"itemsincart":state.itemsincart});
            }
            pushtocartdb()
        },
    }
})

export const {addUser , removeUser , addItemToCart } =  userSlice.actions


export default userSlice.reducer;
