import { createSlice } from '@reduxjs/toolkit'

export const adder = createSlice({
    name: 'name',
    initialState: 0 as number,
    reducers: {
        increment: state => state + 1
}})

