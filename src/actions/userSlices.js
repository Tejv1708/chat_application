import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../axios/instance";

// Define the async thunk for fetching user data 
export const fetchUserData = createAsyncThunk( 'users/fetchByIdStatus',
    async () => {
        try {
            const response = await instance.get( '/user' );
            console.log( response )
            return response.data
        } catch ( err ) {
            console.log( err )
            throw err
        }
    }
);

// Define the user slice 

export const userSlice = createSlice( {
    name: 'user',
    initialState: {
        data: null, loading: false, error: null
    },
    reducers: {},
    extraReducers: ( builder ) => {
        builder.addCase( fetchUserData.pending, ( state ) => {
            state.loading = true
        } )
            .addCase( fetchUserData.fulfilled, ( state, action ) => {
                state.loading = false
                state.data = action.payload
                console.log( "Fullfilled : ", action.payload )
            } )
            .addCase( fetchUserData.rejected, ( state, action ) => {
                state.loading = false
                state.error = action.error.message
                console.log( "error : ", action.error.message )
            } )
    }

} )

export default userSlice.reducer