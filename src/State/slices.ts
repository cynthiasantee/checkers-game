import { createSlice } from '@reduxjs/toolkit'

const initialBoard = [
    [{squareColor: 'white', piece: null}, {squareColor: 'black', piece: {id: 1, color: 'white', isDouble: false}}, {squareColor: 'white', piece: null}, {squareColor: 'black', piece: {id: 1, color: 'white', isDouble: false}}, {squareColor: 'white', piece: null}, {squareColor: 'black', piece: {id: 1, color: 'white', isDouble: false}}, {squareColor: 'white', piece: null}, {squareColor: 'black', piece: {id: 1, color: 'white', isDouble: false}}],
    [{squareColor: 'black', piece: {id: 1, color: 'white', isDouble: false}}, {squareColor: 'white', piece: null}, {squareColor: 'black', piece: {id: 1, color: 'white', isDouble: false}}, {squareColor: 'white', piece: null}, {squareColor: 'black', piece: {id: 1, color: 'white', isDouble: false}}, {squareColor: 'white', piece: null}, {squareColor: 'black', piece: {id: 1, color: 'white', isDouble: false}}, {squareColor: 'white', piece: null}],
    [{squareColor: 'white', piece: null}, {squareColor: 'black', piece: {id: 1, color: 'white', isDouble: false}}, {squareColor: 'white', piece: null}, {squareColor: 'black', piece: {id: 1, color: 'white', isDouble: false}}, {squareColor: 'white', piece: null}, {squareColor: 'black', piece: {id: 1, color: 'white', isDouble: false}}, {squareColor: 'white', piece: null}, {squareColor: 'black', piece: {id: 1, color: 'white', isDouble: false}}],
    [{squareColor: 'black', piece: null}, {squareColor: 'white', piece: null}, {squareColor: 'black', piece: null}, {squareColor: 'white', piece: null}, {squareColor: 'black', piece: null}, {squareColor: 'white', piece: null}, {squareColor: 'black', piece: null}, {squareColor: 'white', piece: null}],
    [{squareColor: 'white', piece: null}, {squareColor: 'black', piece: null}, {squareColor: 'white', piece: null}, {squareColor: 'black', piece: null}, {squareColor: 'white', piece: null}, {squareColor: 'black', piece: null}, {squareColor: 'white', piece: null}, {squareColor: 'black', piece: null}],
    [{squareColor: 'black', piece: {id: 1, color: 'black', isDouble: false}}, {squareColor: 'white', piece: null}, {squareColor: 'black', piece: {id: 1, color: 'black', isDouble: false}}, {squareColor: 'white', piece: null}, {squareColor: 'black', piece: {id: 1, color: 'black', isDouble: false}}, {squareColor: 'white', piece: null}, {squareColor: 'black', piece: {id: 1, color: 'black', isDouble: false}}, {squareColor: 'white', piece: null}],
    [{squareColor: 'white', piece: null}, {squareColor: 'black', piece: {id: 1, color: 'black', isDouble: false}}, {squareColor: 'white', piece: null}, {squareColor: 'black', piece: {id: 1, color: 'black', isDouble: false}}, {squareColor: 'white', piece: null}, {squareColor: 'black', piece: {id: 1, color: 'black', isDouble: false}}, {squareColor: 'white', piece: null}, {squareColor: 'black', piece: {id: 1, color: 'black', isDouble: false}}],
    [{squareColor: 'black', piece: {id: 1, color: 'black', isDouble: false}}, {squareColor: 'white', piece: null}, {squareColor: 'black', piece: {id: 1, color: 'black', isDouble: false}}, {squareColor: 'white', piece: null}, {squareColor: 'black', piece: {id: 1, color: 'black', isDouble: false}}, {squareColor: 'white', piece: null}, {squareColor: 'black', piece: {id: 1, color: 'black', isDouble: false}}, {squareColor: 'white', piece: null}],
]

export const adder = createSlice({
    name: 'board',
    initialState: 0,
    reducers: {
        increment: state => state + 1
}})

type Color = 'white' | 'black';

interface Piece {
    id: number,
    color: Color,
    isDouble: boolean,
}

interface BoardSquare {
    squareColor: Color,
    piece: Piece
}