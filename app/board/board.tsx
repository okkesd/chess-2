"use client"

import { React, useState, createContext, useEffect, useRef, RefObject } from "react"
const BOARD_SIZE = 8


let initBoard_fromWhite: {}[] = [
    {"W_bishop_black" : {"col": 2, "row": 7, "name": "W_bishop_black", "kind": "bishop", "has_moved": false, "color": "white", "moveable": {leftUp: true, rightUp: true}}},
    {"W_bishop_white" : {"col": 5, "row": 7, "name": "W_bishop_white","kind": "bishop", "has_moved": false, "color": "white", "moveable": {leftUp: true, rightUp: true}}},
    {"W_knight_1" : {"col": 1, "row" : 7, "name": "W_knight_1", "kind": "knight", "has_moved": false, "color": "white", "moveable": true}},
    {"W_knight_2" : {"col": 6, "row": 7, "name": "W_knight_2", "kind": "knight", "has_moved": false, "color": "white", "moveable": true}},
    {"W_rook_1" : {"col": 0, "row": 7, "name": "W_rook_1", "kind": "rook", "has_moved": false, "color": "white", "moveable": {upDown: true, leftRight: true}}},
    {"W_rook_2" : {"col": 7, "row": 7, "name": "W_rook_2", "kind": "rook", "has_moved": false, "color": "white", "moveable": {upDown: true, leftRight: true}}},
    {"W_queen" : {"col": 3, "row": 7, "name": "W_queen", "kind": "queen", "color": "white", "moveable": {upDown: true, leftRight: true, leftUp: true, rightUp: true}}},
    {"W_king" : {"col": 4, "row": 7, "name": "W_king", "kind": "king", "has_moved": false, "color": "white", "moveable": true}},

    {"B_bishop_black" : {"col": 5, "row": 0, "name": "B_bishop_black", "kind": "bishop", "has_moved": false, "color": "black", "moveable": {leftUp: true, rightUp: true}}},
    {"B_bishop_white" : {"col": 2, "row": 0, "name": "B_bishop_white", "kind": "bishop", "has_moved": false, "color": "black", "moveable": {leftUp: true, rightUp: true}}},
    {"B_knight_1" : {"col": 1, "row" : 0, "name": "B_knight_1", "kind": "knight", "has_moved": false, "color": "black", "moveable": true}},
    {"B_knight_2" : {"col": 6, "row": 0, "name": "B_knight_2", "kind": "knight", "has_moved": false, "color": "black", "moveable": true}},
    {"B_rook_1" : {"col": 0, "row": 0, "name": "B_rook_1", "kind": "rook", "has_moved": false, "color": "black", "moveable": {upDown: true, leftRight: true}}},
    {"B_rook_2" : {"col": 7, "row": 0, "name": "B_rook_2", "kind": "rook", "has_moved": false, "color": "black", "moveable": {upDown: true, leftRight: true}}},
    {"B_queen" : {"col": 3, "row": 0, "name": "B_queen", "kind": "queen", "color": "black", "moveable": {upDown: true, leftRight: true, leftUp: true, rightUp: true}}},
    {"B_king" : {"col": 4, "row": 0, "name": "B_king", "kind": "king", "has_moved": false, "color": "black", "moveable": true}},

    {"B_pawn_1" : {"col": 0, "row": 1, "name": "B_pawn_1", "kind": "pawn", "has_moved": false, "color": "black", "moveable": {leftEat: true, rightEat: true, forward: true}}},
    {"B_pawn_2" : {"col": 1, "row": 1, "name": "B_pawn_2", "kind": "pawn", "has_moved": false, "color": "black", "moveable": {leftEat: true, rightEat: true, forward: true}}},
    {"B_pawn_3" : {"col": 2, "row": 1, "name": "B_pawn_3", "kind": "pawn", "has_moved": false, "color": "black", "moveable": {leftEat: true, rightEat: true, forward: true}}},
    {"B_pawn_4" : {"col": 3, "row": 1, "name": "B_pawn_4", "kind": "pawn", "has_moved": false, "color": "black", "moveable": {leftEat: true, rightEat: true, forward: true}}},
    {"B_pawn_5" : {"col": 4, "row": 1, "name": "B_pawn_5", "kind": "pawn", "has_moved": false, "color": "black", "moveable": {leftEat: true, rightEat: true, forward: true}}},
    {"B_pawn_6" : {"col": 5, "row": 1, "name": "B_pawn_6", "kind": "pawn", "has_moved": false, "color": "black", "moveable": {leftEat: true, rightEat: true, forward: true}}},
    {"B_pawn_7" : {"col": 6, "row": 1, "name": "B_pawn_7", "kind": "pawn", "has_moved": false, "color": "black", "moveable": {leftEat: true, rightEat: true, forward: true}}},
    {"B_pawn_8" : {"col": 7, "row": 1, "name": "B_pawn_8", "kind": "pawn", "has_moved": false, "color": "black", "moveable": {leftEat: true, rightEat: true, forward: true}}},

    {"W_pawn_1" : {"col": 0, "row": 6, "name": "W_pawn_1", "kind": "pawn", "has_moved": false, "color": "white", "moveable": {leftEat: true, rightEat: true, forward: true}}},
    {"W_pawn_2" : {"col": 1, "row": 6, "name": "W_pawn_2", "kind": "pawn", "has_moved": false, "color": "white", "moveable": {leftEat: true, rightEat: true, forward: true}}},
    {"W_pawn_3" : {"col": 2, "row": 6, "name": "W_pawn_3", "kind": "pawn", "has_moved": false, "color": "white", "moveable": {leftEat: true, rightEat: true, forward: true}}},
    {"W_pawn_4" : {"col": 3, "row": 6, "name": "W_pawn_4", "kind": "pawn", "has_moved": false, "color": "white", "moveable": {leftEat: true, rightEat: true, forward: true}}},
    {"W_pawn_5" : {"col": 4, "row": 6, "name": "W_pawn_5", "kind": "pawn", "has_moved": false, "color": "white", "moveable": {leftEat: true, rightEat: true, forward: true}}},
    {"W_pawn_6" : {"col": 5, "row": 6, "name": "W_pawn_6", "kind": "pawn", "has_moved": false, "color": "white", "moveable": {leftEat: true, rightEat: true, forward: true}}},
    {"W_pawn_7" : {"col": 6, "row": 6, "name": "W_pawn_7", "kind": "pawn", "has_moved": false, "color": "white", "moveable": {leftEat: true, rightEat: true, forward: true}}},
    {"W_pawn_8" : {"col": 7, "row": 6, "name": "W_pawn_8", "kind": "pawn", "has_moved": false, "color": "white", "moveable": {leftEat: true, rightEat: true, forward: true}}},
]

let initBoard_fromBlack = [
    {"W_bishop_black" : {"col": 5, "row": 0, "name": "W_bishop_black", "kind": "bishop", "has_moved": false, "color": "white", "moveable": {leftUp: true, rightUp: true}}},
    {"W_bishop_white" : {"col": 2, "row": 0, "name": "W_bishop_white","kind": "bishop", "has_moved": false, "color": "white", "moveable": {leftUp: true, rightUp: true}}},
    {"W_knight_1" : {"col": 1, "row": 0, "name": "W_knight_1", "kind": "knight", "has_moved": false, "color": "white", "moveable": true}},
    {"W_knight_2" : {"col": 6, "row": 0, "name": "W_knight_2", "kind": "knight", "has_moved": false, "color": "white", "moveable": true}},
    {"W_rook_1" : {"col": 0, "row": 0, "name": "W_rook_1", "kind": "rook", "has_moved": false, "color": "white", "moveable": {upDown: true, leftRight: true}}},
    {"W_rook_2" : {"col": 7, "row": 0, "name": "W_rook_2", "kind": "rook", "has_moved": false, "color": "white", "moveable": {upDown: true, leftRight: true}}},
    {"W_queen" : {"col": 4, "row": 0, "name": "W_queen", "kind": "queen", "color": "white", "moveable": {upDown: true, leftRight: true, leftUp: true, rightUp: true}}},
    {"W_king" : {"col": 3, "row": 0, "name": "W_king", "kind": "king", "has_moved": false, "color": "white", "moveable": true}},

    {"B_bishop_black" : {"col": 2, "row": 7, "name": "B_bishop_black", "kind": "bishop", "has_moved": false, "color": "black", "moveable": {leftUp: true, rightUp: true}}},
    {"B_bishop_white" : {"col": 5, "row": 7, "name": "B_bishop_white", "kind": "bishop", "has_moved": false, "color": "black", "moveable": {leftUp: true, rightUp: true}}},
    {"B_knight_1" : {"col": 1, "row": 7, "name": "B_knight_1", "kind": "knight", "has_moved": false, "color": "black", "moveable": true}},
    {"B_knight_2" : {"col": 6, "row": 7, "name": "B_knight_2", "kind": "knight", "has_moved": false, "color": "black", "moveable": true}},
    {"B_rook_1" : {"col": 0, "row": 7, "name": "B_rook_1", "kind": "rook", "has_moved": false, "color": "black", "moveable": {upDown: true, leftRight: true}}},
    {"B_rook_2" : {"col": 7, "row": 7, "name": "B_rook_2", "kind": "rook", "has_moved": false, "color": "black", "moveable": {upDown: true, leftRight: true}}},
    {"B_queen" : {"col": 4, "row": 7, "name": "B_queen", "kind": "queen", "color": "black", "moveable": {upDown: true, leftRight: true, leftUp: true, rightUp: true}}},
    {"B_king" : {"col": 3, "row": 7, "name": "B_king", "kind": "king", "has_moved": false, "color": "black", "moveable": true}},

    {"B_pawn_1" : {"col": 0, "row": 6, "name": "B_pawn_1", "kind": "pawn", "has_moved": false, "color": "black", "moveable": {leftEat: true, rightEat: true, forward: true}}},
    {"B_pawn_2" : {"col": 1, "row": 6, "name": "B_pawn_2", "kind": "pawn", "has_moved": false, "color": "black", "moveable": {leftEat: true, rightEat: true, forward: true}}},
    {"B_pawn_3" : {"col": 2, "row": 6, "name": "B_pawn_3", "kind": "pawn", "has_moved": false, "color": "black", "moveable": {leftEat: true, rightEat: true, forward: true}}},
    {"B_pawn_4" : {"col": 3, "row": 6, "name": "B_pawn_4", "kind": "pawn", "has_moved": false, "color": "black", "moveable": {leftEat: true, rightEat: true, forward: true}}},
    {"B_pawn_5" : {"col": 4, "row": 6, "name": "B_pawn_5", "kind": "pawn", "has_moved": false, "color": "black", "moveable": {leftEat: true, rightEat: true, forward: true}}},
    {"B_pawn_6" : {"col": 5, "row": 6, "name": "B_pawn_6", "kind": "pawn", "has_moved": false, "color": "black", "moveable": {leftEat: true, rightEat: true, forward: true}}},
    {"B_pawn_7" : {"col": 6, "row": 6, "name": "B_pawn_7", "kind": "pawn", "has_moved": false, "color": "black", "moveable": {leftEat: true, rightEat: true, forward: true}}},
    {"B_pawn_8" : {"col": 7, "row": 6, "name": "B_pawn_8", "kind": "pawn", "has_moved": false, "color": "black", "moveable": {leftEat: true, rightEat: true, forward: true}}},

    {"W_pawn_1" : {"col": 0, "row": 1, "name": "W_pawn_1", "kind": "pawn", "has_moved": false, "color": "white", "moveable": {leftEat: true, rightEat: true, forward: true}}},
    {"W_pawn_2" : {"col": 1, "row": 1, "name": "W_pawn_2", "kind": "pawn", "has_moved": false, "color": "white", "moveable": {leftEat: true, rightEat: true, forward: true}}},
    {"W_pawn_3" : {"col": 2, "row": 1, "name": "W_pawn_3", "kind": "pawn", "has_moved": false, "color": "white", "moveable": {leftEat: true, rightEat: true, forward: true}}},
    {"W_pawn_4" : {"col": 3, "row": 1, "name": "W_pawn_4", "kind": "pawn", "has_moved": false, "color": "white", "moveable": {leftEat: true, rightEat: true, forward: true}}},
    {"W_pawn_5" : {"col": 4, "row": 1, "name": "W_pawn_5", "kind": "pawn", "has_moved": false, "color": "white", "moveable": {leftEat: true, rightEat: true, forward: true}}},
    {"W_pawn_6" : {"col": 5, "row": 1, "name": "W_pawn_6", "kind": "pawn", "has_moved": false, "color": "white", "moveable": {leftEat: true, rightEat: true, forward: true}}},
    {"W_pawn_7" : {"col": 6, "row": 1, "name": "W_pawn_7", "kind": "pawn", "has_moved": false, "color": "white", "moveable": {leftEat: true, rightEat: true, forward: true}}},
    {"W_pawn_8" : {"col": 7, "row": 1, "name": "W_pawn_8", "kind": "pawn", "has_moved": false, "color": "white", "moveable": {leftEat: true, rightEat: true, forward: true}}},
]

let nameToImage = {
    "W_bishop_black" : "wB.svg",
    "W_bishop_white" : "wB.svg",
    "W_knight_1" : "wN.svg",
    "W_knight_2" : "wN.svg",
    "W_rook_1" : "wR.svg",
    "W_rook_2" : "wR.svg",
    "W_queen" : "wQ.svg",
    "W_king" : "wK.svg",

    
    "B_bishop_black" : "bB.svg",
    "B_bishop_white" : "bB.svg",
    "B_knight_1" : "bN.svg",
    "B_knight_2" : "bN.svg",
    "B_rook_1" : "bR.svg",
    "B_rook_2" : "bR.svg",
    "B_queen" : "bQ.svg",
    "B_king" : "bK.svg",

    "W_pawn_1" : "wP.svg",
    "W_pawn_2" : "wP.svg",
    "W_pawn_3" : "wP.svg",
    "W_pawn_4" : "wP.svg",
    "W_pawn_5" : "wP.svg",
    "W_pawn_6" : "wP.svg",
    "W_pawn_7" : "wP.svg",
    "W_pawn_8" : "wP.svg",

    "B_pawn_1" : "bP.svg",
    "B_pawn_2" : "bP.svg",
    "B_pawn_3" : "bP.svg",
    "B_pawn_4" : "bP.svg",
    "B_pawn_5" : "bP.svg",
    "B_pawn_6" : "bP.svg",
    "B_pawn_7" : "bP.svg",
    "B_pawn_8" : "bP.svg",
}

let boardInverse_fromWhite = [
    {
        r0 : "B_rook_1",
        r1 : "B_pawn_1",
        r2 : "empty",
        r3 : "empty",
        r4 : "empty",
        r5 : "empty",
        r6 : "W_pawn_1",
        r7 : "W_rook_1",
    },

    {
        r0 : "B_knight_1",
        r1 : "B_pawn_2",
        r2 : "empty",
        r3 : "empty",
        r4 : "empty",
        r5 : "empty",
        r6 : "W_pawn_2",
        r7 : "W_knight_1",
    },

    {
        r0 : "B_bishop_white",
        r1 : "B_pawn_3",
        r2 : "empty",
        r3 : "empty",
        r4 : "empty",
        r5 : "empty",
        r6 : "W_pawn_3",
        r7 : "W_bishop_black",
    },

    {
        r0 : "B_queen",
        r1 : "B_pawn_4",
        r2 : "empty",
        r3 : "empty",
        r4 : "empty",
        r5 : "empty",
        r6 : "W_pawn_4",
        r7 : "W_queen",
    },

    {
        r0 : "B_king",
        r1 : "B_pawn_5",
        r2 : "empty",
        r3 : "empty",
        r4 : "empty",
        r5 : "empty",
        r6 : "W_pawn_5",
        r7 : "W_king",
    },

    {
        r0 : "B_bishop_black",
        r1 : "B_pawn_6",
        r2 : "empty",
        r3 : "empty",
        r4 : "empty",
        r5 : "empty",
        r6 : "W_pawn_6",
        r7 : "W_bishop_white",
    },

    {
        r0 : "B_knight_2",
        r1 : "B_pawn_7",
        r2 : "empty",
        r3 : "empty",
        r4 : "empty",
        r5 : "empty",
        r6 : "W_pawn_7",
        r7 : "W_knight_2",
    },

    {
        r0 : "B_rook_2",
        r1 : "B_pawn_8",
        r2 : "empty",
        r3 : "empty",
        r4 : "empty",
        r5 : "empty",
        r6 : "W_pawn_8",
        r7 : "W_rook_2",
    }
]

let boardInverse_fromBlack = [
    {
        r0 : "W_rook_1",
        r1 : "W_pawn_1",
        r2 : "empty",
        r3 : "empty",
        r4 : "empty",
        r5 : "empty",
        r6 : "B_pawn_1",
        r7 : "B_rook_1",
    },

    {
        r0 : "W_knight_1",
        r1 : "W_pawn_2",
        r2 : "empty",
        r3 : "empty",
        r4 : "empty",
        r5 : "empty",
        r6 : "B_pawn_2",
        r7 : "B_knight_1",
    },

    {
        r0 : "W_bishop_white",
        r1 : "W_pawn_3",
        r2 : "empty",
        r3 : "empty",
        r4 : "empty",
        r5 : "empty",
        r6 : "B_pawn_3",
        r7 : "B_bishop_black",
    },

    {
        r0 : "W_king",
        r1 : "W_pawn_4",
        r2 : "empty",
        r3 : "empty",
        r4 : "empty",
        r5 : "empty",
        r6 : "B_pawn_4",
        r7 : "B_king",
    },

    {
        r0 : "W_queen",
        r1 : "W_pawn_5",
        r2 : "empty",
        r3 : "empty",
        r4 : "empty",
        r5 : "empty",
        r6 : "B_pawn_5",
        r7 : "B_queen",
    },

    {
        r0 : "W_bishop_black",
        r1 : "W_pawn_6",
        r2 : "empty",
        r3 : "empty",
        r4 : "empty",
        r5 : "empty",
        r6 : "B_pawn_6",
        r7 : "B_bishop_white",
    },

    {
        r0 : "W_knight_2",
        r1 : "W_pawn_7",
        r2 : "empty",
        r3 : "empty",
        r4 : "empty",
        r5 : "empty",
        r6 : "B_pawn_7",
        r7 : "B_knight_2",
    },

    {
        r0 : "W_rook_2",
        r1 : "W_pawn_8",
        r2 : "empty",
        r3 : "empty",
        r4 : "empty",
        r5 : "empty",
        r6 : "B_pawn_8",
        r7 : "B_rook_2",
    }
]

let initDrawState = [
            [false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false]
        ]

let nullPiece = {col: -1, row: -1, name: "null", kind: "null", has_moved: false, color: "null", moveable: false}

let initMovingArr = [
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
    ]

function getPiece(col_id: number, row_id: number, get_name: boolean, boardInverseGeneral: {}[], debug?: Boolean|undefined){
    /*
        Get the piece name or image path by given col_id and row_id
    */

    if (debug){
        console.log("Board inverse in getPiece: ", boardInverseGeneral)
    }

    let localBoardInverseGeneral = boardInverseGeneral.slice()
    if (debug){
        console.log("localBoard INverse in getPiece: ", localBoardInverseGeneral)
    }

    let obj = localBoardInverseGeneral[col_id]
    if (debug) {
        console.log("obj in getPiece: ", obj)
    }
    
    
    for (let key in obj){
        if (debug){
            console.log("key is : ", key)
            console.log("element is :",obj[key])
        }
        if (Number(String(key)[1]) == row_id && obj[key] != "empty"){
            let name = obj[key]
            
            let file_path = nameToImage[name]
            return get_name ? name : file_path
        }
    }
    return null
}

interface Piece {
    col: number;
    row: number;
    name: string;
    kind: string;
    has_moved: boolean;
    color: string;
    moveable: any;
}

// clear init board
function notKingAdjacent(col: number, row: number, turn: string, initBoardGeneral: {}[], boardInverseGeneral: {}[]){
    /*
        Helper function to check if given is a opponent king adjacent to prevent drawing that square
        Returns false if it's king adjacent, else true which passes to draw
    */

    // right down
    let piece = getPiece(col+1, row+1, true, boardInverseGeneral)
    if (piece != null){
        for (let key in initBoardGeneral){
            let value = Object.values(initBoardGeneral[key])[0]
            if (Object.keys(initBoardGeneral[key])[0] == piece && value.color != turn && value.kind == "king"){
                return false
            }
        }
    }

    // right
    piece = getPiece(col+1, row, true, boardInverseGeneral)
    if (piece != null){
        for (let key in initBoardGeneral){
            let value = Object.values(initBoardGeneral[key])[0]
            if (Object.keys(initBoardGeneral[key])[0] == piece && value.color != turn && value.kind == "king"){
                return false
            }
        }
    }

    // right up
    piece = getPiece(col+1, row-1, true, boardInverseGeneral)
    if (piece != null){
        for (let key in initBoardGeneral){
            let value = Object.values(initBoardGeneral[key])[0]
            if (Object.keys(initBoardGeneral[key])[0] == piece && value.color != turn && value.kind == "king"){
                return false
            }
        }
    }

    // down
    piece = getPiece(col, row+1, true, boardInverseGeneral)
    if (piece != null){
        for (let key in initBoardGeneral){
            let value = Object.values(initBoardGeneral[key])[0]
            if (Object.keys(initBoardGeneral[key])[0] == piece && value.color != turn && value.kind == "king"){
                return false
            }
        }
    }

    // up
    piece = getPiece(col, row-1, true, boardInverseGeneral)
    if (piece != null){
        for (let key in initBoardGeneral){
            let value = Object.values(initBoardGeneral[key])[0]
            if (Object.keys(initBoardGeneral[key])[0] == piece && value.color != turn && value.kind == "king"){
                return false
            }
        }
    }

    // left down
    piece = getPiece(col-1, row+1, true, boardInverseGeneral)
    if (piece != null){
        for (let key in initBoardGeneral){
            let value = Object.values(initBoardGeneral[key])[0]
            if (Object.keys(initBoardGeneral[key])[0] == piece && value.color != turn && value.kind == "king"){
                return false
            }
        }
    }

    // left
    piece = getPiece(col-1, row, true, boardInverseGeneral)
    if (piece != null){
        for (let key in initBoardGeneral){
            let value = Object.values(initBoardGeneral[key])[0]
            if (Object.keys(initBoardGeneral[key])[0] == piece && value.color != turn && value.kind == "king"){
                return false
            }
        }
    }

    // left up
    piece = getPiece(col-1, row-1, true, boardInverseGeneral) 
    if (piece != null){
        for (let key in initBoardGeneral){
            let value = Object.values(initBoardGeneral[key])[0]
            if (Object.keys(initBoardGeneral[key])[0] == piece && value.color != turn && value.kind == "king"){
                return false
            }
        }
    }

    return true
}

// clear init board
// NOTE: This should be traversing the alive pieces of opponent !Important
function notEatable(col: number, row: number, turn: string, initBoardGeneral: {}[], boardInverseGeneral: {}[]){
    /*
        Helper function for king to not draw eatable squares
        Returns true if the given square is not Eatable by oppponent, else false which prevents drawing
    */

    // the idea is to traverse every opponent piece and traverse their possible moves like in drawPossibleMoves
    // and if we encounter to the given square location return false

    let opponent_pieces: string[] = []

    // add the opponent pieces (as names)
    for (let key in initBoardGeneral){
        if (Object.values(initBoardGeneral[key])[0].color != turn) opponent_pieces.push(Object.keys(initBoardGeneral[key])[0])
    }

    console.log("for col: ", col, " for row: ", row)
    for (let op_piece in opponent_pieces){

        let piece_col_loc
        let piece_row_loc
        let piece: Object = nullPiece // not sure of this
        for (let key in initBoardGeneral){

            if (Object.keys(initBoardGeneral[key])[0] == opponent_pieces[op_piece]){
                piece = initBoardGeneral[key]
                piece_col_loc = Object.values(initBoardGeneral[key])[0].col
                piece_row_loc = Object.values(initBoardGeneral[key])[0].row
                break
            }
        }

        if (Object.values(piece)[0].kind == "bishop"){
            
                let col_loc = piece_col_loc-1
                let col_loc_2 = piece_col_loc-1
                let col_loc_3 = piece_col_loc+1
                let col_loc_4 = piece_col_loc+1

                let row_loc = piece_row_loc-1
                let row_loc_2 = piece_row_loc+1
                let row_loc_3 = piece_row_loc-1
                let row_loc_4 = piece_row_loc+1
                
                while (col_loc >= 0){ // to the left-up side

                    if (row_loc >= 0){

                        // get piece
                        let piece = getPiece(col_loc, row_loc, true, boardInverseGeneral);

                        if (piece == null){
                            //candidates[col_loc][row_loc] = true
                            if (col_loc == col && row_loc == row) return false
                        } else {

                            for (let key in initBoardGeneral){

                                if (Object.keys(initBoardGeneral[key])[0] == piece && Object.values(initBoardGeneral[key])[0].color != turn){
                                    //candidates[col_loc][row_loc] = true
                                    if (col_loc == col && row_loc == row) return false
                                    break
                                }
                            }
                            break
                        }
                    }
                    col_loc--;
                    row_loc--;
                }

                while (col_loc_2 >= 0){ // to the left-down side

                    if (row_loc_2 <= 7){

                        // get piece
                        let piece = getPiece(col_loc_2, row_loc_2, true, boardInverseGeneral);

                        if (piece == null){
                            //candidates[col_loc_2][row_loc_2] = true
                            if (col_loc_2 == col && row_loc_2 == row) return false
                        } else {

                            for (let key in initBoardGeneral){

                                if (Object.keys(initBoardGeneral[key])[0] == piece && Object.values(initBoardGeneral[key])[0].color != turn){
                                    //candidates[col_loc_2][row_loc_2] = true
                                    if (col_loc_2 == col && row_loc_2 == row) return false
                                    break
                                }
                            }
                            break
                        }
                    }
                    col_loc_2--;
                    row_loc_2++;
                }

                while (col_loc_3 <= 7){ // to the right-up side

                    if (row_loc_3 >= 0){

                        // get piece
                        let piece = getPiece(col_loc_3, row_loc_3, true, boardInverseGeneral);

                        if (piece == null){
                            //candidates[col_loc_3][row_loc_3] = true
                            if (col_loc_3 == col && row_loc_3 == row) return false
                        } else {

                            for (let key in initBoardGeneral){

                                if (Object.keys(initBoardGeneral[key])[0] == piece && Object.values(initBoardGeneral[key])[0].color != turn){
                                    //candidates[col_loc_3][row_loc_3] = true
                                    if (col_loc_3 == col && row_loc_3 == row) return false
                                    break
                                }
                            }
                            break
                        }
                    }
                    col_loc_3++;
                    row_loc_3--;
                }

                while (col_loc_4 <= 7){ // to the right-down side

                    if (row_loc_4 <= 7){

                        // get piece
                        let piece = getPiece(col_loc_4, row_loc_4, true, boardInverseGeneral);

                        if (piece == null){
                            //candidates[col_loc_4][row_loc_4] = true
                            if (col_loc_4 == col && row_loc_4 == row) return false
                        } else {

                            for (let key in initBoardGeneral){

                                if (Object.keys(initBoardGeneral[key])[0] == piece && Object.values(initBoardGeneral[key])[0].color != turn){
                                    //candidates[col_loc_4][row_loc_4] = true
                                    if (col_loc_4 == col && row_loc_4 == row) return false
                                    break
                                }
                            }
                            break
                        }
                    }
                    col_loc_4++;
                    row_loc_4++;
                }




        } else if (Object.values(piece)[0].kind == "knight"){

         
            if (piece_col_loc - 2 >= 0){

                    if (piece_row_loc +1 <= 7){

                        let piece = getPiece(piece_col_loc-2, piece_row_loc+1, true, boardInverseGeneral)
                        if (piece == null){ // there is no piece, you can draw
                            //candidate[col-2][row+1] = true
                            if (piece_col_loc-2 == col && piece_row_loc+1 == row) return false
                        } else { // there is a piece, make sure it's not black
                            for (let key in initBoardGeneral){
                                if (Object.keys(initBoardGeneral[key])[0] == piece && Object.values(initBoardGeneral[key])[0].color != turn){
                                    //candidate[col-2][row+1] = true
                                    if (piece_col_loc-2 == col && piece_row_loc+1 == row) return false
                                }
                            }
                        }

                        
                    }
                    if (piece_row_loc -1 >= 0){

                        let piece = getPiece(piece_col_loc-2, piece_row_loc-1, true, boardInverseGeneral)
                        if (piece == null){ // there is no piece, draw
                            //candidate[col-2][row-1] = true
                            if (piece_col_loc-2 == col && piece_row_loc-1 == row) return false

                        } else { // there is a piece, if it's not black -> draw
                    
                            for (let key in initBoardGeneral){
                                if (Object.keys(initBoardGeneral[key])[0] == piece && Object.values(initBoardGeneral[key])[0].color != turn){
                                    //candidate[col-2][row-1] = true
                                    if (piece_col_loc-2 == col && piece_row_loc-1 == row) return false
                                }
                            }
                        }
                        
                    }

            }  
                if (piece_col_loc +2 <= 7){

                    if (piece_row_loc +1 <= 7){
                        let piece = getPiece(piece_col_loc+2, piece_row_loc+1, true, boardInverseGeneral)

                        if (piece == null){ // there is no piece, you can draw
                            //candidate[col+2][row+1] = true
                            if (piece_col_loc+2 == col && piece_row_loc+1 == row) return false
                        } else { // there is a piece, make sure it's not black
                            for (let key in initBoardGeneral){
                                if (Object.keys(initBoardGeneral[key])[0] == piece && Object.values(initBoardGeneral[key])[0].color != turn){
                                    //candidate[col+2][row+1] = true
                                    if (piece_col_loc+2 == col && piece_row_loc+1 == row) return false
                                }
                            }
                        }
                        
                    }
                    if (piece_row_loc -1 >= 0){
                        let piece = getPiece(piece_col_loc+2, piece_row_loc-1, true, boardInverseGeneral)

                        if (piece == null){ // there is no piece, you can draw
                            //candidate[col+2][row-1] = true
                            if (piece_col_loc+1 == col && piece_row_loc-1 == row) return false
                        } else { // there is a piece, make sure it's not black
                            for (let key in initBoardGeneral){
                                if (Object.keys(initBoardGeneral[key])[0] == piece && Object.values(initBoardGeneral[key])[0].color != turn){
                                    //candidate[col+2][row-1] = true
                                    if (piece_col_loc+2 == col && piece_row_loc-1 == row) return false
                                }
                            }
                        }
                        
                    }
                } 

                if (piece_row_loc +2 <= 7){

                    if (piece_col_loc -1 >= 0){
                        let piece = getPiece(piece_col_loc-1, piece_row_loc+2, true, boardInverseGeneral)

                        if (piece == null){ // there is no piece, you can draw
                            //candidate[col-1][row+2] = true
                            if (piece_col_loc-1 == col && piece_row_loc+1 == row) return false
                        } else { // there is a piece, make sure it's not black
                            for (let key in initBoardGeneral){
                                if (Object.keys(initBoardGeneral[key])[0] == piece && Object.values(initBoardGeneral[key])[0].color != turn){
                                    //candidate[col-1][row+2] = true
                                    if (piece_col_loc-1 == col && piece_row_loc+2 == row) return false
                                }
                            }
                        }
                        
                    }
                    if (piece_col_loc +1 <= 7){
                        let piece = getPiece(piece_col_loc+1, piece_row_loc+2, true, boardInverseGeneral)

                        if (piece == null){ // there is no piece, you can draw
                            //candidate[col+1][row+2] = true
                            if (piece_col_loc+1 == col && piece_row_loc+2 == row) return false
                        } else { // there is a piece, make sure it's not black
                            for (let key in initBoardGeneral){
                                if (Object.keys(initBoardGeneral[key])[0] == piece && Object.values(initBoardGeneral[key])[0].color != turn){
                                    //candidate[col+1][row+2] = true
                                    if (piece_col_loc+1 == col && piece_row_loc+2 == row) return false
                                }
                            }
                        }
                        
                    }

                }
                if (piece_row_loc -2 >= 0){

                    if (piece_col_loc -1 >= 0){
                        let piece = getPiece(piece_col_loc-1, piece_row_loc-2, true, boardInverseGeneral)

                        if (piece == null){ // there is no piece, you can draw
                            //candidate[col-1][row-2] = true
                            if (piece_col_loc-1 == col && piece_row_loc-2 == row) return false
                        } else { // there is a piece, make sure it's not black
                            for (let key in initBoardGeneral){
                                if (Object.keys(initBoardGeneral[key])[0] == piece && Object.values(initBoardGeneral[key])[0].color != turn){
                                    //candidate[col-1][row-2] = true
                                    if (piece_col_loc == col-1 && piece_row_loc-2 == row) return false
                                }
                            }
                        }
                        
                        
                    }
                    if (piece_col_loc +1 <= 7){
                        let piece = getPiece(piece_col_loc+1, piece_row_loc-2, true, boardInverseGeneral)

                        if (piece == null){ // there is no piece, you can draw
                            //candidate[col+1][row-2] = true
                            if (piece_col_loc+1 == col && piece_row_loc-2 == row) return false
                        } else { // there is a piece, make sure it's not black
                            for (let key in initBoardGeneral){
                                if (Object.keys(initBoardGeneral[key])[0] == piece && Object.values(initBoardGeneral[key])[0].color != turn){
                                    //candidate[col+1][row-2] = true
                                    if (piece_col_loc+1 == col && piece_row_loc-2 == row) return false
                                }
                            }
                        }
                        
                        
                    }
                }
        } else if (Object.values(piece)[0].kind == "rook"){
 
            
                    
            let row_loc = piece_row_loc-1
            let row_loc_2 = piece_row_loc+1
            let col_loc = piece_col_loc-1
            let col_loc_2 = piece_col_loc+1

            while (row_loc >= 0){ // to the up
                        
                let piece = getPiece(piece_col_loc, row_loc, true, boardInverseGeneral)
                if (piece == null){ // empty, draw it
                    
                    if (piece_col_loc == col && row_loc == row) return false;
                } else {

                    for (let key in initBoardGeneral){
                        if (Object.keys(initBoardGeneral[key])[0] == piece && Object.values(initBoardGeneral[key])[0].color != turn){
                            
                            if (piece_col_loc == col && row_loc == row) return false;
                            break;
                        }
                    }
                    break;
                }
                row_loc--;
            }

            while (row_loc_2 <= 7){ // to the down 
                
                let piece = getPiece(piece_col_loc, row_loc_2, true, boardInverseGeneral);
                if (piece == null) {
                    if (piece_col_loc == col && row_loc_2 == row) return false;
                } else {
                    for (let key in initBoardGeneral){
                        if (Object.keys(initBoardGeneral[key])[0] == piece && Object.values(initBoardGeneral[key])[0].color != turn){
                            
                            if (piece_col_loc == col && row_loc_2 == row) return false;
                            break;
                        }
                    }
                    break;
                }
                row_loc_2++;
            }

            while (col_loc >= 0){ // to the left
                
                let piece = getPiece(col_loc, piece_row_loc, true, boardInverseGeneral);
                if (piece == null) {
                    
                    if (col_loc == col && piece_row_loc == row) return false;
                } else {
                    for (let key in initBoardGeneral){
                        if (Object.keys(initBoardGeneral[key])[0] == piece && Object.values(initBoardGeneral[key])[0].color != turn){
                            if (col_loc == col && piece_row_loc == row) return false;
                            break;
                        }
                    }
                    break;
                }
                col_loc--;
            }

            while (col_loc_2 <= 7){ // to the right
                
                let piece = getPiece(col_loc_2, piece_row_loc, true, boardInverseGeneral);
                if (piece == null) {
                    
                    if (col_loc_2 == col && piece_row_loc == row) return false;
                } else {
                    for (let key in initBoardGeneral){
                        if (Object.keys(initBoardGeneral[key])[0] == piece && Object.values(initBoardGeneral[key])[0].color != turn){
                            
                            if (col_loc_2 == col && piece_row_loc == row) return false;
                            break;
                        }
                    }
                    break;
                }
                col_loc_2++;
            }

        } else if (Object.values(piece)[0].kind == "queen"){

            
            let col_loc = piece_col_loc-1
            let col_loc_2 = piece_col_loc-1;
            let col_loc_3 = piece_col_loc+1
            let col_loc_4 = piece_col_loc+1
            let col_loc_5 = piece_col_loc+1
            let col_loc_6 = piece_col_loc-1

            let row_loc = piece_row_loc-1
            let row_loc_2 = piece_row_loc+1
            let row_loc_3 = piece_row_loc-1
            let row_loc_4 = piece_row_loc+1
            let row_loc_5 = piece_row_loc+1
            let row_loc_6 = piece_row_loc-1

            while (col_loc >= 0){ // the left-up side

                if (row_loc >= 0){

                    let piece = getPiece(col_loc, row_loc, true, boardInverseGeneral);

                    if (piece == null){
                        
                        if (col_loc == col && row_loc == row) return false
                    } else {

                        for (let key in initBoardGeneral){

                            if (Object.keys(initBoardGeneral[key])[0] == piece && Object.values(initBoardGeneral[key])[0].color != turn){
                                
                                if (col_loc == col && row_loc == row) return false
                                break
                            }
                        }
                        break
                    }
                }

                col_loc--;
                row_loc--;
            }

            while (col_loc_2 >= 0){ // the left-down side

                if (row_loc_2 <= 7){

                    let piece = getPiece(col_loc_2, row_loc_2, true, boardInverseGeneral);

                    if (piece == null){
                        
                        if (col_loc_2 == col && row_loc_2 == row) return false
                    } else {

                        for (let key in initBoardGeneral){

                            if (Object.keys(initBoardGeneral[key])[0] == piece && Object.values(initBoardGeneral[key])[0].color != turn){
                                
                                if (col_loc_2 == col && row_loc_2 == row) return false
                                break
                            }
                        }
                        break
                    }
                }

                col_loc_2--;
                row_loc_2++;
            }

            while (col_loc_3 <= 7){ // the right-up side

                if (row_loc_3 >= 0){

                    let piece = getPiece(col_loc_3, row_loc_3, true, boardInverseGeneral);

                    if (piece == null){
                        
                        if (col_loc_3 == col && row_loc_3 == row) return false
                    } else {

                        for (let key in initBoardGeneral){

                            if (Object.keys(initBoardGeneral[key])[0] == piece && Object.values(initBoardGeneral[key])[0].color != turn){
                                
                                if (col_loc_3 == col && row_loc_3 == row) return false
                                break
                            }
                        }
                        break
                    }
                }

                col_loc_3++;
                row_loc_3--;
            }

            while (col_loc_4 <= 7){ // the right-down side

                if (row_loc_4 <= 7){

                    let piece = getPiece(col_loc_4, row_loc_4, true, boardInverseGeneral);

                    if (piece == null){
                        
                        if (col_loc_4 == col && row_loc_4 == row) return false
                    } else {

                        for (let key in initBoardGeneral){

                            if (Object.keys(initBoardGeneral[key])[0] == piece && Object.values(initBoardGeneral[key])[0].color != turn){
                                
                                if (col_loc_4 == col && row_loc_4 == row) return false
                                break
                            }
                        }
                        break
                    }
                }

                col_loc_4++;
                row_loc_4++;
            }


            while (col_loc_5 <= 7){ // to right

                let piece = getPiece(col_loc_5, piece_row_loc, true, boardInverseGeneral)
                
                if (piece == null){
                    
                    if (col_loc_5 == col && piece_row_loc == row) return false
                } else {

                    for (let key in initBoardGeneral){

                        if (Object.keys(initBoardGeneral[key])[0] == piece && Object.values(initBoardGeneral[key])[0].color != turn){
                            
                            if (col_loc_5 == col && piece_row_loc == row) return false
                            break
                        }
                    }
                    break
                }

                col_loc_5++;
            }

            while (col_loc_6 >= 0){ // to left

                let piece = getPiece(col_loc_6, piece_row_loc, true, boardInverseGeneral)

                if (piece == null){
                    
                    if (col_loc_6 == col && piece_row_loc == row) return false
                } else {

                    for (let key in initBoardGeneral){

                        if (Object.keys(initBoardGeneral[key])[0] == piece && Object.values(initBoardGeneral[key])[0].color != turn){
                            
                            if (col_loc_6 == col && piece_row_loc == row) return false
                            break
                        }
                    }
                    break
                }

                col_loc_6--;
            }

            while (row_loc_5 <= 7){ // to down

                let piece = getPiece(piece_col_loc, row_loc_5, true, boardInverseGeneral)
                

                if (piece == null){
                    
                    if (piece_col_loc == col && row_loc_5 == row) return false
                } else {

                    for (let key in initBoardGeneral){

                        if (Object.keys(initBoardGeneral[key])[0] == piece && Object.values(initBoardGeneral[key])[0].color != turn){
                            
                            if (piece_col_loc == col && row_loc_5 == row) return false
                            break
                        }
                    }
                    break
                }

                row_loc_5++;
            }

            while (row_loc_6 >= 0){ // to up

                let piece = getPiece(piece_col_loc, row_loc_6, true, boardInverseGeneral)

                if (piece == null){
                    if (piece_col_loc == col && row_loc_6 == row) return false
                } else {

                    for (let key in initBoardGeneral){

                        if (Object.keys(initBoardGeneral[key])[0] == piece && Object.values(initBoardGeneral[key])[0].color != turn){
                            
                            if (piece_col_loc == col && row_loc_6 == row) return false
                            break
                        }
                    }
                    break
                }

                row_loc_6--;
            }
        } else if (Object.values(piece)[0].kind == "pawn"){ 
            // you need to think for the white pawns, so it goes up (down in row index)
            console.log("in pawn")

            if (piece_col_loc + 1 < 8 && piece_row_loc - 1 >= 0){
                        
                    let piece = getPiece(piece_col_loc + 1, piece_row_loc - 1, true, boardInverseGeneral)
                    if (piece == null){
                        if (piece_col_loc +1 == col && piece_row_loc -1 == row) return false
                    }
                    for (let key in initBoardGeneral){ // key is just index here
    
                        if (Object.keys(initBoardGeneral[key])[0] == piece && Object.values(initBoardGeneral[key])[0].color != turn){
                            
                            if (piece_col_loc +1 == col && piece_row_loc -1 == row) return false
                        }
                    }
                } 
                if (piece_col_loc - 1 >= 0 && piece_row_loc -1 >= 0){
                    let piece = getPiece(piece_col_loc - 1, piece_row_loc -1, true, boardInverseGeneral)
                    if (piece == null){
                        if (piece_col_loc-1 == col && piece_row_loc -1 == row) return false
                    }
                    for (let key in initBoardGeneral){ // key is just index here        
                        if (Object.keys(initBoardGeneral[key])[0] == piece && Object.values(initBoardGeneral[key])[0].color != turn){
                            
                            if (piece_col_loc-1 == col && piece_row_loc -1 == row) return false
                        }
                    }
                }
        }

    }

    return true
}

// NOTE: In here probably we need to know the playerTurn too in order to get the correct squares between checking piece and our king
// currently it comes but seems like it inverse, not correct squares. Job for the weekend!!!
function setMoveablePieces(playerTurn: string, checkingPiece: Piece, setColsAndRows: React.Dispatch, initBoardGeneral: {}[]){

    console.log("LOGS:\nturn:", playerTurn, "checkingPiece.color: ", checkingPiece.color, "\ncheckingPiece:", checkingPiece)

    // save the king, we probably need it later
    let turn_king = null
    for (let key in initBoardGeneral){
        if (Object.values(initBoardGeneral[key])[0].kind == "king" && Object.values(initBoardGeneral[key])[0].color != checkingPiece.color){

                
                let unknownKey = Object.keys(initBoardGeneral[key])[0]
                turn_king = initBoardGeneral[key][unknownKey]
                break;
            }
    }
    if (turn_king == null){
        throw new Error("King not found! Strange. function setMoveablePieces")
    }
    let cols_and_rows = []
    cols_and_rows.push({row: checkingPiece.row, col: checkingPiece.col})

    // check for every piece kind
    if (checkingPiece.kind == "rook"){ // take the queen here too, and after if else ifs also add the bishop with if (queen)

        // check for row and col
        if (checkingPiece.row == turn_king.row){ // check the between columns

            if (checkingPiece.col > turn_king.col){ // start from king+1, go up

                let king_col = turn_king.col +1
                while (king_col < checkingPiece.col){
                    cols_and_rows.push({row: turn_king.row, col: king_col})
                    king_col++;
                }
            } else if (checkingPiece.col < turn_king.col){

                let king_col = turn_king.col -1
                while (king_col > checkingPiece.col){
                    cols_and_rows.push({row: turn_king.row, col: king_col})
                    king_col--;
                }
            }

        } else if (checkingPiece.col == turn_king.col){ // check the between rows

            if (checkingPiece.row > turn_king.row){ // start from king+1, go up

                let king_row = turn_king.row +1
                while (king_row < checkingPiece.row){
                    cols_and_rows.push({row: king_row, col: turn_king.col})
                    king_row++;
                }
            } else if (checkingPiece.row < turn_king.row){

                let king_row = turn_king.row -1
                while (king_row > checkingPiece.row){
                    cols_and_rows.push({row: king_row, col: turn_king.col})
                    king_row--;
                }
            }
        } else {throw new Error("Checking rook and king doesnt align. It should. function setMoveablePieces")}


    } else if (checkingPiece.kind == "bishop"){

        if (checkingPiece.row > turn_king.row && checkingPiece.col > turn_king.col){ // king is in left-up

            console.log("king is in left-down")
            let king_col = turn_king.col +1
            let king_row = turn_king.row +1
            while (king_col < checkingPiece.col && king_row < checkingPiece.row){

                cols_and_rows.push({row:  king_row, col: king_col})
                king_col++;
                king_row++;
            }

        } else if (checkingPiece.row < turn_king.row && checkingPiece.col > turn_king.col){ // king is in left down
console.log("king is in left up")
            let king_col = turn_king.col +1
            let king_row = turn_king.row -1
            while (king_col < checkingPiece.col && king_row > checkingPiece.row){

                cols_and_rows.push({row:  king_row, col: king_col})
                king_col++;
                king_row--;
            }

        } else if (checkingPiece.row > turn_king.rook && checkingPiece.col < turn_king.col){ // king is in right up
console.log("king is in right up")
            let king_col = turn_king.col -1
            let king_row = turn_king.row +1
            while (king_col > checkingPiece.col && king_row < checkingPiece.row){

                cols_and_rows.push({row:  king_row, col: king_col})
                king_col--;
                king_row++;
            }

        } else if (checkingPiece.row < turn_king.row && checkingPiece.col < turn_king.col){ // king is in right down 

console.log("king is in right down")
            let king_col = turn_king.col -1
            let king_row = turn_king.row -1
            while (king_col > checkingPiece.col && king_row > checkingPiece.row){

                console.log("pushing: ", king_row, king_col)
                cols_and_rows.push({row:  king_row, col: king_col})
                king_col--;
                king_row--;
            }
        }
    }

    // add queen cross too
    if (checkingPiece.kind == "queen"){

        console.log("confirmed queen")
        console.log("checking row: ", checkingPiece.row)
        console.log("checking col: ", checkingPiece.col)
        console.log("king row: ", turn_king.row)
        console.log("king col: ", turn_king.col)
        // for cross of queen
        if (checkingPiece.row > turn_king.row && checkingPiece.col > turn_king.col){ // king is in left-up

            console.log("king is in left-down (for black)")
            let king_col = turn_king.col +1
            let king_row = turn_king.row -1 // no, there might be a move translation required
            while (king_col < checkingPiece.col && king_row < checkingPiece.row){

                console.log("pushing row: ", king_row, "col: ", king_col)
                cols_and_rows.push({row:  king_row, col: king_col})
                king_col++;
                king_row++;
            }

        } else if (checkingPiece.row < turn_king.row && checkingPiece.col > turn_king.col){ // king is in left down
console.log("king is in left down | king is in right up (for white)") // this works for black
            let king_col = turn_king.col +1
            let king_row = turn_king.row -1

            if (playerTurn == "white"){
                while(king_col < checkingPiece.col && king_row > checkingPiece.row){
            
                    console.log("pushing row: ", king_row, "col: ", king_col)
                    cols_and_rows.push({row:  king_row, col: king_col})
                    king_col++;
                    king_row--;
                }
            } else { // for black

                while (king_col < checkingPiece.col && king_row > checkingPiece.row){

                    console.log("pushing row: ", king_row, "col: ", king_col)
                    cols_and_rows.push({row:  king_row, col: king_col})    
                    king_col++;
                    king_row--;   
                }
            }

        } else if (checkingPiece.row > turn_king.row && checkingPiece.col < turn_king.col){ // king is in right up
console.log("king is in right up (for white)") // this works for white
            let king_col = turn_king.col -1
            let king_row = turn_king.row +1

            if (playerTurn == "white"){

                while (king_col > checkingPiece.col && king_row < checkingPiece.row){
                    console.log("pushing row: ", king_row, "col: ", king_col)
                    cols_and_rows.push({row:  king_row, col: king_col})
                    king_col--;
                    king_row++;
                }
            } else {
                throw new Error("Implement check from black too, you did white but left black for later")
            }

        } else if (checkingPiece.row < turn_king.row && checkingPiece.col < turn_king.col){ // king is in right down 

console.log("king is in right down")
            let king_col = turn_king.col -1
            let king_row = turn_king.row -1
            while (king_col > checkingPiece.col && king_row > checkingPiece.row){

                console.log("pushing: ", king_row, king_col)
                cols_and_rows.push({row:  king_row, col: king_col})
                king_col--;
                king_row--;
            }
        }

        // for cols and rows of queen
        if (checkingPiece.row == turn_king.row){ // check the between columns

            if (checkingPiece.col > turn_king.col){ // start from king+1, go up

                let king_col = turn_king.col +1
                while (king_col < checkingPiece.col){
                    cols_and_rows.push({row: turn_king.row, col: king_col})
                    king_col++;
                }
            } else if (checkingPiece.col < turn_king.col){

                let king_col = turn_king.col -1
                while (king_col > checkingPiece.col){
                    cols_and_rows.push({row: turn_king.row, col: king_col})
                    king_col--;
                }
            }

        } else if (checkingPiece.col == turn_king.col){ // check the between rows

            if (checkingPiece.row > turn_king.row){ // start from king+1, go up

                let king_row = turn_king.row +1
                while (king_row < checkingPiece.row){
                    cols_and_rows.push({row: king_row, col: turn_king.col})
                    king_row++;
                }
            } else if (checkingPiece.row < turn_king.row){

                let king_row = turn_king.row -1
                while (king_row > checkingPiece.row){
                    cols_and_rows.push({row: king_row, col: turn_king.col})
                    king_row--;
                }
            }
        }
    }
    console.log("checking piece is: ", checkingPiece)
    console.log("found cols and rows: ", cols_and_rows)
    //setColsAndRows([...cols_and_rows])
    return cols_and_rows
    // we can find pieces that can go to these cols_and_rows and make them moveable=true
    // or we can save these cols_and_rows and use it when drawing the possible moves
}

interface drawPossibleMovesProps extends Piece {
    setDrawState: React.Dispatch
    turn: string
    isCheck: boolean
    colsAndRows: null|{row: number, col:number}[] // {row: number, col:number}[]
    player_color: string
    is_it_blocked: boolean
    initBoardGeneral: {}[]
    boardInverseGeneral: {}[]
}

// !IMPORTANT
// there could be a bizarre move in the check situation, a piece blocked by a possible check thread could be able to move to 
// block another thread, this move won't give the turn to opponent -> is that bullsh*t since it makes checkmate almost impossible ?

// DONE
// When a check is present, we can only draw the moves either made by king to run away or other pieces to eat the checking piece
// or to block the check

// we should also store the opponent's checking piece so that we can find the trajectoire of the check (or if it's a knight)
// create a dictionary (object) to keep track of the moveable pieces: 
// [{name: "b_king", kind:"king", moveable: true}, {name: "b_pawn_1", kind: "pawn", moveable: false} ...] as initialized
// instead of using this object, we can put a key in the initBoard named moveable, set it from the getMoveablePieces(), use it later
// in check condition, write a function getMoveablePieces() to set this object and use this object in drawPossibleMoves
// DONE

// DONE
// this is another problem, therefore could be solved by another function
// this function should also cover the blocked pieces by a king's possible thread: queen -> pawn -> king: you can't move pawn here
// this object won't be for just kind of pieces, for all the individual pieces
// this could be thinkable by the king's directions, is there only one piece (your piece) between king and opponent's pieces trajectoire
// on the column, row you can check for queen, rook, on the cross you can check for queen, bishop
// DONE
// !IMPORTANT

interface isNotBlockedProps extends Piece {
    turn: string
    initBoardGeneral: RefObject<{}[]>
    //setInitBoardGeneral: React.Dispatch
    boardInverseGeneral: {}[]
}

// clear board inverse
// clear init board
// for now it's working
function isNotBlocked({col, 
    row, 
    name, 
    kind, 
    has_moved, 
    color,
    moveable,
    turn,
    initBoardGeneral,
    boardInverseGeneral}: isNotBlockedProps){

    if (kind == "king") return true

    console.log("isNotBlocked: name: ", name, "kind: ", kind, "row,col : ", row, col)
    console.log("boardInverseLocal in olay mahali but upper: ", boardInverseGeneral)


    // find the king
    let turn_king
    for (let key in initBoardGeneral.current){

        if (Object.values(initBoardGeneral.current[key])[0].color == color && Object.values(initBoardGeneral.current[key])[0].kind == "king"){
            let unknownKey = Object.keys(initBoardGeneral.current[key])[0]
            turn_king = initBoardGeneral.current[key][unknownKey]
            break;
        }
    }

    // find the direction
    if (col == turn_king.col){ // same column

        let no_piece_king = true
        let no_piece_opponent = true
        let opponent_exists = false

        if (row < turn_king.row){ // piece is in up

            let piece_row = row+1
            let obj = boardInverseGeneral[col]

            // for king
            while (piece_row < turn_king.row){

                for (let key in obj){

                    if (Number(String(key)[1]) == piece_row && obj[key] != "empty"){ // if there is another piece between make false
                        no_piece_king = false
                        break
                        
                    }
                }
                if (no_piece_king == false) break;
                piece_row++;
            }   

            // for opponent 
            let piece_row_2 = row-1
            while (piece_row_2 >= 0){

                for (let key in obj){

                    if (Number(String(key)[1]) == piece_row_2){

                        if (obj[key] != "empty") {

                            let piece_there = getPiece(col, piece_row_2, true, boardInverseGeneral)
                            for (let key in initBoardGeneral.current){
                                if (Object.keys(initBoardGeneral.current[key])[0] == piece_there){
                                
                                    if ((Object.values(initBoardGeneral.current[key])[0].kind == "rook" || Object.values(initBoardGeneral.current[key])[0].kind == "queen")
                                        && Object.values(initBoardGeneral.current[key])[0].color != color){
                                        opponent_exists = true
                                        break
                                    } else {
                                        no_piece_opponent = false
                                        break
                                    }
                                    
                                }
                            }
                        }
                    }
                    if (opponent_exists || !no_piece_opponent) break
                    
                }
                if (opponent_exists || !no_piece_opponent) break
                piece_row_2--;
            }



        } else if (row > turn_king.row){ // piece is in down 

            let piece_row = row-1
            let obj = boardInverseGeneral[col]

            while (piece_row > turn_king.row){

                for (let key in obj){

                    if (Number(String(key)[1]) == piece_row && obj[key] != "empty"){ // if there is another piece between make false
                        no_piece_king = false
                        break
                    }
                }
                if (no_piece_king == false) break;
                piece_row--;
            }

            let piece_row_2 = row+1
            while (piece_row_2 <= 7){

                for (let key in obj){

                    if (Number(String(key)[1]) == piece_row_2){

                        if (obj[key] != "empty") {

                            let piece_there = getPiece(col, piece_row_2, true, boardInverseGeneral)
                            for (let key in initBoardGeneral.current){
                                if (Object.keys(initBoardGeneral.current[key])[0] == piece_there){
                                
                                    if ((Object.values(initBoardGeneral.current[key])[0].kind == "rook" || Object.values(initBoardGeneral.current[key])[0].kind == "queen")
                                        && Object.values(initBoardGeneral.current[key])[0].color != color){
                                        opponent_exists = true
                                        break
                                    } else {
                                        no_piece_opponent = false
                                        break
                                    }
                                    
                                }
                            }
                        }
                    }
                    if (opponent_exists || !no_piece_opponent) break
                    
                }
                if (opponent_exists || !no_piece_opponent) break
                piece_row_2++;
            }
        }
        
        // conditions are not met, so not blocked
        let early_return_condition = false
        if (no_piece_king == false || opponent_exists == false || no_piece_opponent == false) {
            console.log("early return, should be cleaned up")
            early_return_condition = true
        }

        if (kind == "pawn"){

            for (let key in initBoardGeneral.current){

                if (Object.keys(initBoardGeneral.current[key])[0] == name){
                    let unknownKey = Object.keys(initBoardGeneral.current[key])[0]

                    if (early_return_condition){
                        let localInitBoard = [...initBoardGeneral.current]
                        localInitBoard[key][unknownKey].moveable = {leftEat: true, rightEat: true, forward: true}    
                        initBoardGeneral.current = [...localInitBoard]

                        break

                    } else {
                        
                        let localInitBoard = [...initBoardGeneral.current]
                        localInitBoard[key][unknownKey].moveable = {leftEat: false, rightEat: false, forward: true}
                        initBoardGeneral.current = [...localInitBoard]
                        
                        break
                    }
                    
                }
            }
        } else if (kind == "knight"){
        
            for (let key in initBoardGeneral.current){

                if (Object.keys(initBoardGeneral.current[key])[0] == name){
                    let unknownKey = Object.keys(initBoardGeneral.current[key])[0]

                    if (early_return_condition){
                        
                        let localInitBoard = [...initBoardGeneral.current]
                        localInitBoard[key][unknownKey].moveable = true
                        initBoardGeneral.current = [...localInitBoard]

                        break
                    } else {

                        let localInitBoard = [...initBoardGeneral.current]
                        localInitBoard[key][unknownKey].moveable = false
                        initBoardGeneral.current = [...localInitBoard]

                        break
                    }
                }
            }
        } else if (kind == "bishop"){
            
            for (let key in initBoardGeneral.current){

                if (Object.keys(initBoardGeneral.current[key])[0] == name){
                    let unknownKey = Object.keys(initBoardGeneral.current[key])[0]
                    
                    if (early_return_condition){
                        let localInitBoard = [...initBoardGeneral.current]
                        localInitBoard[key][unknownKey].moveable = {leftUp: true, rightUp: true}
                        initBoardGeneral.current = [...localInitBoard]
                        
                        break

                    } else {
                        let localInitBoard = [...initBoardGeneral.current]
                        localInitBoard[key][unknownKey].moveable = {leftUp: false, rightUp: false}
                        initBoardGeneral.current = [...localInitBoard]

                        break
                    }
                    
                }
            }
        } else if (kind == "rook"){

            for (let key in initBoardGeneral.current){

                if (Object.keys(initBoardGeneral.current[key])[0] == name){
                    let unknownKey = Object.keys(initBoardGeneral.current[key])[0]

                    if (early_return_condition){
                        let localInitBoard = [...initBoardGeneral.current]
                        localInitBoard[key][unknownKey].moveable = {upDown: true, leftRight: true}
                        initBoardGeneral.current = [...localInitBoard]

                        break

                    } else {
                        let localInitBoard = [...initBoardGeneral.current]
                        localInitBoard[key][unknownKey].moveable = {upDown: true, leftRight: false}
                        initBoardGeneral.current = [...localInitBoard]

                        break
                    }
                    
                }
            }
        } else if (kind == "queen"){
            
            for (let key in initBoardGeneral.current){

                if (Object.keys(initBoardGeneral.current[key])[0] == name){
                    let unknownKey = Object.keys(initBoardGeneral.current[key])[0]

                    if (early_return_condition){
                        console.log("queen is NOT blocked, only updown allowed!!!")
                        let localInitBoard = [...initBoardGeneral.current]
                        localInitBoard[key][unknownKey].moveable = {upDown: true, leftRight: true, leftUp: true, rightUp: true}
                        initBoardGeneral.current = [...localInitBoard]

                        break

                    } else {
                        console.log("queen is blocked, only updown allowed!!!")
                        let localInitBoard = [...initBoardGeneral.current]
                        localInitBoard[key][unknownKey].moveable = {upDown: true, leftRight: false, leftUp: false, rightUp: false}
                        initBoardGeneral.current = [...localInitBoard]
                        
                        break
                    }
                    
                }
            }
        }
        // return false, so blocked piece, then you should be checking moveables of the given piece afterwards, we modified it
        return false

    } else if (row == turn_king.row){ // same row

        let no_piece_king = true
        let no_piece_opponent = true
        let opponent_exists = false


        if (col < turn_king.col){ // piece is in left

            let piece_row = row
            let piece_col = col+1
            let obj = boardInverseGeneral[col]

            // for king
            while (piece_col < turn_king.col){

                for (let key in boardInverseGeneral[piece_col]){

                    if (Number(String(key)[1]) == piece_row && boardInverseGeneral[piece_col][key] != "empty"){ // if there is another piece between make false
                        no_piece_king = false
                        break
                        
                    }
                }
                if (no_piece_king == false) break;
                piece_col++;
            }   

            // for opponent 
            let piece_col_2 = col-1
            while (piece_col_2 >= 0){

                for (let key in boardInverseGeneral[piece_col_2]){

                    if (Number(String(key)[1]) == piece_row){
                        console.log("something found in row,col: ", piece_row, piece_col_2)
                        if (boardInverseGeneral[piece_col_2][key] != "empty") {

                            let piece_there = getPiece(piece_col_2, piece_row, true, boardInverseGeneral)
                            console.log(piece_there)
                            for (let key in initBoardGeneral.current){
                                if (Object.keys(initBoardGeneral.current[key])[0] == piece_there){
                                console.log("a piece found: ", piece_there)

                                    if ((Object.values(initBoardGeneral.current[key])[0].kind == "rook" || Object.values(initBoardGeneral.current[key])[0].kind == "queen")
                                        && Object.values(initBoardGeneral.current[key])[0].color != color){

                                        opponent_exists = true
                                        break
                                    } else {
                                        no_piece_opponent = false
                                        break
                                    }
                                    
                                }
                            }
                        }
                    }
                    if (opponent_exists || !no_piece_opponent) break
                    
                }
                if (opponent_exists || !no_piece_opponent) break
                piece_col_2--;
            }
        } else {
            // piece is in right
            
            let piece_row = row
            let piece_col = col-1

            // for king
            while (piece_col > turn_king.col){

                for (let key in boardInverseGeneral[piece_col]){

                    if (Number(String(key)[1]) == piece_row && boardInverseGeneral[piece_col][key] != "empty"){ // if there is another piece between make false
                        no_piece_king = false
                        break
                        
                    }
                }
                if (no_piece_king == false) break;
                piece_col--;
            }   

            // for opponent 
            let piece_col_2 = col+1
            while (piece_col_2 <= 7){

                for (let key in boardInverseGeneral[piece_col_2]){

                    if (Number(String(key)[1]) == piece_row){
                        console.log("something found in row,col: ", piece_row, piece_col_2)
                        if (boardInverseGeneral[piece_col_2][key] != "empty") {

                            let piece_there = getPiece(piece_col_2, piece_row, true, boardInverseGeneral)
                            console.log(piece_there)
                            for (let key in initBoardGeneral.current){
                                if (Object.keys(initBoardGeneral.current[key])[0] == piece_there){
                                console.log("a piece found: ", piece_there)

                                    if ((Object.values(initBoardGeneral.current[key])[0].kind == "rook" || Object.values(initBoardGeneral.current[key])[0].kind == "queen")
                                        && Object.values(initBoardGeneral.current[key])[0].color != color){

                                        opponent_exists = true
                                        break
                                    } else {
                                        no_piece_opponent = false
                                        break
                                    }
                                    
                                }
                            }
                        }
                    }
                    if (opponent_exists || !no_piece_opponent) break
                    
                }
                if (opponent_exists || !no_piece_opponent) break
                piece_col_2++;
            }
        }

        // conditions are not met, so not blocked
        let early_return_condition = false
        if (no_piece_king == false || opponent_exists == false || no_piece_opponent == false) {
            console.log("early return, should be cleaned up, no_piece_king:", no_piece_king, "opponent_exists: ", opponent_exists, "no_piece_opponent: ", no_piece_opponent)
            early_return_condition = true
        }

        if (kind == "pawn"){

            for (let key in initBoardGeneral.current){

                if (Object.keys(initBoardGeneral.current[key])[0] == name){
                    let unknownKey = Object.keys(initBoardGeneral.current[key])[0]

                    if (early_return_condition){
                        let localInitBoard = [...initBoardGeneral.current]
                        localInitBoard[key][unknownKey].moveable = {leftEat: true, rightEat: true, forward: true}    
                        initBoardGeneral.current = [...localInitBoard]

                        break

                    } else {
                        let localInitBoard = [...initBoardGeneral.current]
                        localInitBoard[key][unknownKey].moveable = {leftEat: false, rightEat: false, forward: false}
                        initBoardGeneral.current = [...localInitBoard]

                        break
                    }
                    
                }
            }
        } else if (kind == "knight"){
        
            for (let key in initBoardGeneral.current){

                if (Object.keys(initBoardGeneral.current[key])[0] == name){
                    let unknownKey = Object.keys(initBoardGeneral.current[key])[0]

                    if (early_return_condition){
                        let localInitBoard = [...initBoardGeneral.current]
                        localInitBoard[key][unknownKey].moveable = true
                        initBoardGeneral.current = [...localInitBoard]
                        
                        break

                    } else {

                        let localInitBoard = [...initBoardGeneral.current]
                        localInitBoard[key][unknownKey].moveable = false
                        initBoardGeneral.current = [...localInitBoard]
                        
                        break
                    }
                }
            }
        } else if (kind == "bishop"){
            
            for (let key in initBoardGeneral.current){

                if (Object.keys(initBoardGeneral.current[key])[0] == name){
                    let unknownKey = Object.keys(initBoardGeneral.current[key])[0]
                    
                    if (early_return_condition){
                        let localInitBoard = [...initBoardGeneral.current]
                        localInitBoard[key][unknownKey].moveable = {leftUp: true, rightUp: true}
                        initBoardGeneral.current = [...localInitBoard]

                        break

                    } else {
                        let localInitBoard = [...initBoardGeneral.current]
                        localInitBoard[key][unknownKey].moveable = {leftUp: false, rightUp: false}
                        initBoardGeneral.current = [...localInitBoard]

                        break
                    }
                    
                }
            }
        } else if (kind == "rook"){

            for (let key in initBoardGeneral.current){

                if (Object.keys(initBoardGeneral.current[key])[0] == name){
                    let unknownKey = Object.keys(initBoardGeneral.current[key])[0]

                    if (early_return_condition){
                        let localInitBoard = [...initBoardGeneral.current]
                        localInitBoard[key][unknownKey].moveable = {upDown: true, leftRight: true}
                        initBoardGeneral.current = [...localInitBoard]
                        
                        break

                    } else {
                        let localInitBoard = [...initBoardGeneral.current]
                        localInitBoard[key][unknownKey].moveable = {upDown: false, leftRight: true}
                        initBoardGeneral.current = [...localInitBoard]
                        
                        break
                    }
                    
                }
            }
        } else if (kind == "queen"){
            
            for (let key in initBoardGeneral.current){

                if (Object.keys(initBoardGeneral.current[key])[0] == name){
                    let unknownKey = Object.keys(initBoardGeneral.current[key])[0]

                    if (early_return_condition){
                        console.log("queen is NOT blocked, only updown allowed!!!")
                        let localInitBoard = [...initBoardGeneral.current]
                        localInitBoard[key][unknownKey].moveable = {upDown: true, leftRight: true, leftUp: true, rightUp: true}
                        initBoardGeneral.current = [...localInitBoard]

                        break

                    } else {
                        console.log("queen is blocked, only updown allowed!!!")
                        let localInitBoard = [...initBoardGeneral.current]
                        localInitBoard[key][unknownKey].moveable = {upDown: false, leftRight: true, leftUp: false, rightUp: false}
                        initBoardGeneral.current = [...localInitBoard]
                        
                        break
                    }
                    
                }
            }
        }

    } else if (Math.abs(col - turn_king.col) == Math.abs(row - turn_king.row)){ // on the cross

        if (col - turn_king.col == row - turn_king.row){ // left up - right down cross
            console.log("left up - right down cross found")

            let no_piece_king = true // no piece between king and piece
            let no_piece_opponent = true // no piece between king and opponent
            let opponent_exists = false // there is a bishop or queen on the cross before than anything

            if (col < turn_king.col){ // piece is in left up
                console.log("piece is in left up")
                
                // for king
                let piece_col = col +1
                let piece_row = row +1

                while (piece_col < turn_king.col){

                    for (let key in boardInverseGeneral[piece_col]){

                        if (Number(String(key)[1]) == piece_row && boardInverseGeneral[piece_col][key] != "empty"){ // if there is another piece between make false
                            no_piece_king = false
                            break
                        
                        }
                    }
                    if (no_piece_king == false) break;
                    piece_col++;
                }


                // for opponent piece
                let piece_col_2 = col -1
                let piece_row_2 = row -1

                console.log("boardInverseLocal in olay mahali: ", boardInverseGeneral)

                while (piece_col_2 >= 0 && piece_row_2 >= 0){

                    for (let key in boardInverseGeneral[piece_col_2]){

                        if (Number(String(key)[1]) == piece_row_2 && boardInverseGeneral[piece_col_2][key] != "empty"){
                            let piece = getPiece(piece_col_2, piece_row_2, true, boardInverseGeneral)
                            
                            for (let key in initBoardGeneral.current){
                                
                                if (Object.keys(initBoardGeneral.current[key])[0] == piece){

                                    console.log("keys : ", Object.keys(initBoardGeneral.current[key])[0])
                                    console.log("info: ", Object.values(initBoardGeneral.current[key])[0])
                                    console.log("piece: ", piece)

                                    if ((Object.values(initBoardGeneral.current[key])[0].kind == "queen" || Object.values(initBoardGeneral.current[key])[0].kind == "bishop") 
                                        && Object.values(initBoardGeneral.current[key])[0].color != color){
                                    
                                        opponent_exists = true
                                        break
                                    } else {
                                        no_piece_opponent = false
                                        break
                                    }
                                }
                            }

                        }
                        if (opponent_exists || !no_piece_opponent) break
                    }
                    if (opponent_exists || !no_piece_opponent) break
                    piece_col_2--;
                    piece_row_2--
                }

            } else {

                // for king
                let piece_col = col -1
                let piece_row = row -1

                while (piece_col > turn_king.col){

                    for (let key in boardInverseGeneral[piece_col]){

                        if (Number(String(key)[1]) == piece_row && boardInverseGeneral[piece_col][key] != "empty"){ // if there is another piece between make false
                            no_piece_king = false
                            break
                        
                        }
                    }
                    if (no_piece_king == false) break;
                    piece_col--;
                }

                console.log("king is done actually")


                // for opponent piece
                let piece_col_2 = col +1
                let piece_row_2 = row +1

                while (piece_col_2 <= 7){

                    for (let key in boardInverseGeneral[piece_col_2]){

                        if (Number(String(key)[1]) == piece_row && boardInverseGeneral[piece_col_2][key] != "empty"){
                            let piece = getPiece(piece_col_2, piece_row_2, true, boardInverseGeneral)
                            
                            for (let key in initBoardGeneral.current){
                                
                                if (Object.keys(initBoardGeneral.current[key])[0] == piece){

                                    if ((Object.values(initBoardGeneral.current[key])[0].kind == "queen" || Object.values(initBoardGeneral.current[key])[0].kind == "bishop") 
                                        && Object.values(initBoardGeneral.current[key])[0].color != color){
                                    
                                        opponent_exists = true
                                        break
                                    } else {
                                        no_piece_opponent = false
                                        break
                                    }
                                }
                            }

                        }
                        if (opponent_exists || !no_piece_opponent) break
                    }
                    if (opponent_exists || !no_piece_opponent) break
                    piece_col_2++;
                    piece_row_2++;
                }
            }

            let early_return_condition = false
            if (no_piece_king == false || no_piece_opponent == false || opponent_exists == false){
                console.log("early return, should be cleaned up, no_piece_king:", no_piece_king, "opponent_exists: ", opponent_exists, "no_piece_opponent: ", no_piece_opponent)
                early_return_condition = true
            }
            
            console.log("kind is ", kind)

            if (kind == "pawn"){

                for (let key in initBoardGeneral.current){
    
                    if (Object.keys(initBoardGeneral.current[key])[0] == name){
                        let unknownKey = Object.keys(initBoardGeneral.current[key])[0]
    
                        if (early_return_condition){
                            let localInitBoard = [...initBoardGeneral.current]
                            localInitBoard[key][unknownKey].moveable = {leftEat: true, rightEat: true, forward: true}    
                            initBoardGeneral.current = [...localInitBoard]

                            break
    
                        } else {
                            let localInitBoard = [...initBoardGeneral.current]
                            localInitBoard[key][unknownKey].moveable = {leftEat: true, rightEat: false, forward: false}
                            initBoardGeneral.current = [...localInitBoard]

                            break
                        }
                        
                    }
                }
            } else if (kind == "knight"){
            
                for (let key in initBoardGeneral.current){
    
                    if (Object.keys(initBoardGeneral.current[key])[0] == name){
                        let unknownKey = Object.keys(initBoardGeneral.current[key])[0]
    
                        if (early_return_condition){
                            let localInitBoard = [...initBoardGeneral.current]
                            localInitBoard[key][unknownKey].moveable = true
                            initBoardGeneral.current = [...localInitBoard]
                            
                            break
    
                        } else {
    
                            let localInitBoard = [...initBoardGeneral.current]
                            localInitBoard[key][unknownKey].moveable = false
                            initBoardGeneral.current = [...localInitBoard]

                            break
                        }
                    }
                }
            } else if (kind == "bishop"){
                
                for (let key in initBoardGeneral.current){
    
                    if (Object.keys(initBoardGeneral.current[key])[0] == name){
                        let unknownKey = Object.keys(initBoardGeneral.current[key])[0]
                        
                        if (early_return_condition){
                            let localInitBoard = [...initBoardGeneral.current]
                            localInitBoard[key][unknownKey].moveable = {leftUp: true, rightUp: true}
                            initBoardGeneral.current = [...localInitBoard]

                            break
    
                        } else {
                            let localInitBoard = [...initBoardGeneral.current]
                            localInitBoard[key][unknownKey].moveable = {leftUp: true, rightUp: false}
                            initBoardGeneral.current = [...localInitBoard]
                                
                            break
                        }
                        
                    }
                }
            } else if (kind == "rook"){
    
                for (let key in initBoardGeneral.current){
    
                    if (Object.keys(initBoardGeneral.current[key])[0] == name){
                        let unknownKey = Object.keys(initBoardGeneral.current[key])[0]
    
                        if (early_return_condition){
                            
                            let localInitBoard = [...initBoardGeneral.current]
                            localInitBoard[key][unknownKey].moveable = {upDown: true, leftRight: true}
                            initBoardGeneral.current = [...localInitBoard]
                                
                            break
    
                        } else {
                            let localInitBoard = [...initBoardGeneral.current]
                            localInitBoard[key][unknownKey].moveable = {upDown: false, leftRight: false}
                            initBoardGeneral.current = [...localInitBoard]

                            break
                        }
                        
                    }
                }
            } else if (kind == "queen"){
                
                for (let key in initBoardGeneral.current){
    
                    if (Object.keys(initBoardGeneral.current[key])[0] == name){
                        let unknownKey = Object.keys(initBoardGeneral.current[key])[0]
    
                        if (early_return_condition){
                            console.log("queen is NOT blocked, only updown allowed!!!")
                            let localInitBoard = [...initBoardGeneral.current]
                            localInitBoard[key][unknownKey].moveable = {upDown: true, leftRight: true, leftUp: true, rightUp: true}
                            initBoardGeneral.current = [...localInitBoard]

                            break
    
                        } else {
                            console.log("queen is blocked, only updown allowed!!!")
                            let localInitBoard = [...initBoardGeneral.current]
                            localInitBoard[key][unknownKey].moveable = {upDown: false, leftRight: false, leftUp: true, rightUp: false}
                            initBoardGeneral.current = [...localInitBoard]

                            break
                        }
                        
                    }
                }
            }
            
        } else { // right up - left down cross

            console.log("right up - left down cross")
            let no_piece_king = true // no piece between king and piece
            let no_piece_opponent = true // no piece between king and opponent
            let opponent_exists = false // there is a bishop or queen on the cross before than anything

            if (col > turn_king.col){ // piece is in right up

                console.log("piece is in right up")
                // for king
                let piece_col = col -1
                let piece_row = row +1

                while (piece_col > turn_king.col && piece_row < turn_king.row){

                    for (let key in boardInverseGeneral[piece_col]){

                        if (Number(String(key)[1]) == piece_row && boardInverseGeneral[piece_col][key] != "empty"){ // if there is another piece between make false
                            no_piece_king = false
                            break
                        
                        }
                    }
                    if (no_piece_king == false) break;
                    piece_col--;
                    piece_row++;
                }


                // for opponent piece
                let piece_col_2 = col +1
                let piece_row_2 = row -1

                while (piece_col_2 <= 7 && piece_row_2 >= 0){

                    for (let key in boardInverseGeneral[piece_col_2]){
                        console.log("piece_row_2: ", piece_row_2, "piece_col_2", piece_col_2)

                        if (Number(String(key)[1]) == piece_row_2 && boardInverseGeneral[piece_col_2][key] != "empty"){
                            let piece = getPiece(piece_col_2, piece_row_2, true, boardInverseGeneral)
                            
                            for (let key in initBoardGeneral.current){
                                
                                if (Object.keys(initBoardGeneral.current[key])[0] == piece){
                                    console.log("keys : ", Object.keys(initBoardGeneral.current[key])[0])
                                    console.log("info: ", Object.values(initBoardGeneral.current[key])[0])
                                    console.log("piece: ", piece)

                                    if ((Object.values(initBoardGeneral.current[key])[0].kind == "queen" || Object.values(initBoardGeneral.current[key])[0].kind == "bishop") 
                                        && Object.values(initBoardGeneral.current[key])[0].color != color){
                                    
                                        opponent_exists = true
                                        break
                                    } else {
                                        no_piece_opponent = false
                                        break
                                    }
                                }
                                
                                
                            }

                        }
                        if (opponent_exists || !no_piece_opponent) break
                    }
                    if (opponent_exists || !no_piece_opponent) break
                    piece_col_2++;
                    piece_row_2--
                }

            } else { // piece is in left down

                console.log("piece is in left down")
                // for king
                let piece_col = col +1
                let piece_row = row -1

                while (piece_col < turn_king.col && piece_row > turn_king.row){

                    for (let key in boardInverseGeneral[piece_col]){

                        if (Number(String(key)[1]) == piece_row && boardInverseGeneral[piece_col][key] != "empty"){ // if there is another piece between make false
                            no_piece_king = false
                            break
                        
                        }
                    }
                    if (no_piece_king == false) break;
                    piece_col++;
                    piece_row--;
                }


                // for opponent piece
                let piece_col_2 = col -1
                let piece_row_2 = row +1

                while (piece_col_2 >= 0 && piece_row_2 <= 7){

                    for (let key in boardInverseGeneral[piece_col_2]){

                        if (Number(String(key)[1]) == piece_row && boardInverseGeneral[piece_col_2][key] != "empty"){
                            let piece = getPiece(piece_col_2, piece_row_2, true, boardInverseGeneral)
                            
                            for (let key in initBoardGeneral.current){
                                
                                if (Object.keys(initBoardGeneral.current[key])[0] == piece){
                                    if ((Object.values(initBoardGeneral.current[key])[0].kind == "queen" || Object.values(initBoardGeneral.current[key])[0].kind == "bishop") 
                                        && Object.values(initBoardGeneral.current[key])[0].color != color){
                                    
                                        opponent_exists = true
                                        break
                                    } else {
                                        no_piece_opponent = false
                                        break
                                    }

                                }
                            }

                        }
                        if (opponent_exists || !no_piece_opponent) break
                    }
                    if (opponent_exists || !no_piece_opponent) break
                    piece_col_2--;
                    piece_row_2++;
                }
            }

            let early_return_condition = false
            if (no_piece_king == false || no_piece_opponent == false || opponent_exists == false){
                console.log("early return, should be cleaned up, no_piece_king:", no_piece_king, "opponent_exists: ", opponent_exists, "no_piece_opponent: ", no_piece_opponent)
                early_return_condition = true
            }
            


            if (kind == "pawn"){

                for (let key in initBoardGeneral.current){
    
                    if (Object.keys(initBoardGeneral.current[key])[0] == name){
                        let unknownKey = Object.keys(initBoardGeneral.current[key])[0]
    
                        if (early_return_condition){
                            let localInitBoard = [...initBoardGeneral.current]
                            localInitBoard[key][unknownKey].moveable = {leftEat: true, rightEat: true, forward: true}    
                            initBoardGeneral.current = [...localInitBoard]

                            break
    
                        } else {
                            let localInitBoard = [...initBoardGeneral.current]
                            localInitBoard[key][unknownKey].moveable = {leftEat: false, rightEat: true, forward: false}
                            initBoardGeneral.current = [...localInitBoard]

                            break
                        }
                        
                    }
                }
            } else if (kind == "knight"){
            
                for (let key in initBoardGeneral.current){
    
                    if (Object.keys(initBoardGeneral.current[key])[0] == name){
                        let unknownKey = Object.keys(initBoardGeneral.current[key])[0]
    
                        if (early_return_condition){
                            let localInitBoard = [...initBoardGeneral.current]
                            localInitBoard[key][unknownKey].moveable = true
                            initBoardGeneral.current = [...localInitBoard]

                            break
    
                        } else {
    
                            let localInitBoard = [...initBoardGeneral.current]
                            localInitBoard[key][unknownKey].moveable = false
                            initBoardGeneral.current = [...localInitBoard]

                            break
                        }
                    }
                }
            } else if (kind == "bishop"){
                
                for (let key in initBoardGeneral.current){
    
                    if (Object.keys(initBoardGeneral.current[key])[0] == name){
                        let unknownKey = Object.keys(initBoardGeneral.current[key])[0]
                        
                        if (early_return_condition){
                            let localInitBoard = [...initBoardGeneral.current]
                            localInitBoard[key][unknownKey].moveable = {leftUp: true, rightUp: true}
                            initBoardGeneral.current = [...localInitBoard]

                            break
    
                        } else {
                            let localInitBoard = [...initBoardGeneral.current]
                            localInitBoard[key][unknownKey].moveable = {leftUp: false, rightUp: true}
                            initBoardGeneral.current = [...localInitBoard]

                            break
                        }
                        
                    }
                }
            } else if (kind == "rook"){
    
                for (let key in initBoardGeneral.current){
    
                    if (Object.keys(initBoardGeneral.current[key])[0] == name){
                        let unknownKey = Object.keys(initBoardGeneral.current[key])[0]
    
                        if (early_return_condition){
                            let localInitBoard = [...initBoardGeneral.current]
                            localInitBoard[key][unknownKey].moveable = {upDown: true, leftRight: true}
                            initBoardGeneral.current = [...localInitBoard]

                            break
    
                        } else {
                            let localInitBoard = [...initBoardGeneral.current]
                            localInitBoard[key][unknownKey].moveable = {upDown: false, leftRight: false}
                            initBoardGeneral.current = [...localInitBoard]

                            break
                        }
                        
                    }
                }
            } else if (kind == "queen"){
                
                for (let key in initBoardGeneral.current){
    
                    if (Object.keys(initBoardGeneral.current[key])[0] == name){
                        let unknownKey = Object.keys(initBoardGeneral.current[key])[0]
    
                        if (early_return_condition){
                            console.log("queen is NOT blocked, only updown allowed!!!")
                            let localInitBoard = [...initBoardGeneral.current]
                            localInitBoard[key][unknownKey].moveable = {upDown: true, leftRight: true, leftUp: true, rightUp: true}
                            initBoardGeneral.current = [...localInitBoard]
                                
                            
                            break
    
                        } else {
                            console.log("queen is blocked, only updown allowed!!!")
                            let localInitBoard = [...initBoardGeneral.current]
                            localInitBoard[key][unknownKey].moveable = {upDown: false, leftRight: false, leftUp: false, rightUp: true}
                            initBoardGeneral.current = [...localInitBoard]
                                
                            
                            break
                        }
                        
                    }
                }
            }
        }
    }
}

/*
    Helper function to check if the given row and col is in cols_and_rows
    Used for after check situation to draw only blocking/eating the checking piece
    Return true if it's in, else false
*/
function isIn(col: number, row: number, cols_and_rows: null|{row: number, col: number}[]){
    

    if (cols_and_rows == null) return true

    // check if it's in 
    for (let key in cols_and_rows){
        if (cols_and_rows[key].row == row && cols_and_rows[key].col == col) return true
    }
    return false
}

function fireGameOver(turn: string){

    console.log(`game won by ${turn == "white" ? "black": "white"}`)

}


function noPieceBetween(from_col: number, from_row: number, to_col: number, to_row: number, BoardInverseGeneral: {}[]): boolean{

    if ((from_col == to_col) && (from_row == to_row)){
        throw new Error("The same position given to noPieceBetween")
    }

    if (from_col == to_col){ // same col
        if (from_row > to_row){

            let row = from_row -1
            while (row > to_row){
                
                if (getPiece(from_col, row, true, BoardInverseGeneral, false) != null){
                    return false
                }

                row--;
            }

        } else {

            let row = from_row +1
            while (row < to_row){

                if (getPiece(from_col, row, true, BoardInverseGeneral, false) != null){
                    return false
                }

                row++;
            }
        }
    } else if (from_row == to_row) { // same row
        if (from_col > to_col){

            let col = from_col -1
            while (col > to_col){

                if (getPiece(col, from_row, true, BoardInverseGeneral, false) != null){
                    return false;
                }

                col--;
            }
        } else {

            let col = from_col +1
            while (col < to_col){

                if (getPiece(col, from_row, true, BoardInverseGeneral, false) != null){
                    return false;
                }

                col++;
            }
        }
    } else if ((from_col - to_col == from_row - to_row) && from_col > to_col){

        let col = from_col -1
        let row = from_row -1

        while (col > to_col){

            if (getPiece(col, row, true, BoardInverseGeneral, false) != null){
                return false
            }

            col--;
            row--;
        }

    } else if ((from_col - to_col == from_row - to_row) && from_col < to_col){

        let col = from_col +1
        let row = from_row +1

        while (col < to_col){

            if (getPiece(col, row, true, BoardInverseGeneral, false) != null){
                return false
            }

            col++;
            row++;
        }

    } else if ((from_col - to_col == -1* (from_row - to_row)) && from_col > to_col){

        let col = from_col -1
        let row = from_row +1

        while (col > to_col){

            if (getPiece(col, row, true, BoardInverseGeneral, false) != null){
                return false
            }

            col--;
            row++;
        }

    } else if ((from_col - to_col == -1* (from_row - to_row)) && from_col < to_col){

        let col = from_col +1
        let row = from_row -1

        while (col < to_col){

            if (getPiece(col, row, true, BoardInverseGeneral, false) != null){
                return false
            }

            col++;
            row--;
        }
    }
     
    return true
}

// clean init board
// we're gonna change the if conditions to include also player_color when deciding inc or dec
// we're gonna also change the initial setup for the different player_color s
function drawPossibleMoves(
    {col, 
    row, 
    name, 
    kind, 
    has_moved, 
    color,        // piece color
    moveable,
    setDrawState,
    turn,
    isCheck,
    colsAndRows,
    player_color, // player's color
    initBoardGeneral,
    boardInverseGeneral,
    is_it_blocked} : drawPossibleMovesProps
){
    /*
        Draws the possible moves according to the color, has_moved, kind from the square (col and row)
    */

    console.log("drawPossibleMoves : isCheck: ", isCheck, "cols_and_rows: ", colsAndRows, "moveable: ", moveable)
    console.log("kind is :", kind)
    if (kind == "pawn"){

        if (has_moved == true){ // draw 1 square

            let col_inc
            let row_inc
            if ((color == "black" && player_color == "white") || (color == "white" && player_color == "black")){ // draw in decendant order of rows

                col_inc = 1
                row_inc = 1   
                
            } else { // white, draw in increasing order of rows

                col_inc = 1
                row_inc = -1
            }

            console.log("kind is pawn, can you see that")

            setDrawState( (old: boolean[][]) => {
                    let candidate = [...old];
                    candidate[col][row] = true;
                    
                    let piece = getPiece(col, row + row_inc, true, boardInverseGeneral)
                    
                    if (row + row_inc < 8 && moveable.forward){ // draw only if the next square is empty
                        
                        
                        if (piece == null){ 
                            isIn(col, row+row_inc, colsAndRows) ? candidate[col][row+row_inc] = true : undefined;
                        }
                    }
                    
                    if (col + col_inc < 8 && row + row_inc < 8 && moveable.rightEat){
                        console.log("col and col_inc: ", col, col_inc)
                        
                        console.log("get piece for col: ", col + col_inc, "row: ", row + row_inc)
                        let piece = getPiece(col + col_inc, row + row_inc, true, boardInverseGeneral)
                        console.log("current initBoardGeneral in drawPossibleMoves: ", initBoardGeneral)

                        for (let key in initBoardGeneral){ // key is just index here
        
                            if (Object.keys(initBoardGeneral[key])[0] == piece && Object.values(initBoardGeneral[key])[0].color != turn){
                                console.log("ok checking is in")

                                isIn(col+col_inc, row+row_inc, colsAndRows) ? candidate[col + col_inc][row+row_inc] = true: undefined;
                            }
                        }

                    } 

                    if (col - col_inc >= 0 && row +row_inc <= 7 && moveable.leftEat){
                        console.log("get piece for col: ", col - col_inc, "row: ", row + row_inc)
                        let piece = getPiece(col - col_inc, row + row_inc, true, boardInverseGeneral)

                        for (let key in initBoardGeneral){ // key is just index here
        
                            if (Object.keys(initBoardGeneral[key])[0] == piece && Object.values(initBoardGeneral[key])[0].color != turn){

                                isIn(col-col_inc, row+row_inc, colsAndRows) ? candidate[col - col_inc][row + row_inc] = true: undefined;
                            }
                        }
                    }
                    return candidate
                })
        } else { // draw 2 square

            let row_inc
            if ((color == "black" && player_color == "white") || (color == "white" && player_color == "black")){ // draw in decendant order of rows

                row_inc = 1
                
            } else { // white, draw in increasing order of rows

                row_inc = -1   
            }


            // NOTE: for the first move of the pawn, you should be able to something !Important

            setDrawState( (old: boolean[][]) => {
                    let candidate = [...old];
                    candidate[col][row] = true;

                    // 1 square further
                    let piece = getPiece(col, row+row_inc, true, boardInverseGeneral)
                    console.log("get piece for col: ", col, "row: ", row + row_inc, "piece: ", piece)
                    console.log("cols and rows is: ", colsAndRows)
                    if (piece == null && moveable.forward){

                        isIn(col, row+row_inc, colsAndRows) ? candidate[col][row+row_inc] = true: undefined;    

                        // 2 square further
                        piece = getPiece(col, row+row_inc*2, true, boardInverseGeneral)
                        if (piece == null){ 
                            isIn(col, row+row_inc*2, colsAndRows) ? candidate[col][row+row_inc*2] = true: undefined;
                        }
                    }
                    
                    // eat in cross square
                    if (col-1 >= 0 && moveable.leftEat){
                        
                        piece = getPiece(col-1, row+row_inc, true, boardInverseGeneral)
                        for (let key in initBoardGeneral){
                            if (Object.keys(initBoardGeneral[key])[0] == piece && Object.values(initBoardGeneral[key])[0].color != turn){
                                isIn(col-1, row+row_inc, colsAndRows) ? candidate[col-1][row+row_inc] = true : undefined
                                break
                            }
                        }
                    }

                    // eat in cross square
                    if (col+1 <= 7 && moveable.rightEat) {

                        piece = getPiece(col+1, row+row_inc, true, boardInverseGeneral)
                        for (let key in initBoardGeneral){
                            if (Object.keys(initBoardGeneral[key])[0] == piece && Object.values(initBoardGeneral[key])[0].color != turn){
                                isIn(col+1, row+row_inc, colsAndRows) ? candidate[col+1][row+row_inc] = true: undefined 
                            }
                        }
                        
                    }
                    
                    return candidate
                })
        }
    } else if (kind == "knight"){
        //if (color == "black"){

            setDrawState((old: boolean[][]) => {
                let candidate = [...old]

                candidate[col][row] = true; // draw itself

                if (col - 2 >= 0 && moveable){  // left side

                    if (row +1 <= 7){ // down

                        let piece = getPiece(col-2, row+1, true, boardInverseGeneral)
                        if (piece == null){ // there is no piece, you can draw
                            isIn(col-2, row+1, colsAndRows) ? candidate[col-2][row+1] = true: undefined
                        } else { // there is a piece, make sure it's not black
                            for (let key in initBoardGeneral){
                                if (Object.keys(initBoardGeneral[key])[0] == piece && Object.values(initBoardGeneral[key])[0].color != turn){
                                    isIn(col-2, row+1, colsAndRows) ? candidate[col-2][row+1] = true: undefined
                                }
                            }
                        }

                        
                    }
                    if (row -1 >= 0){ // up

                        let piece = getPiece(col-2, row-1, true, boardInverseGeneral)
                        if (piece == null){ // there is no piece, draw
                            isIn(col-2, row-2, colsAndRows) ? candidate[col-2][row-1] = true: undefined

                        } else { // there is a piece, if it's not black -> draw
                    
                            for (let key in initBoardGeneral){
                                if (Object.keys(initBoardGeneral[key])[0] == piece && Object.values(initBoardGeneral[key])[0].color != turn){
                                    isIn(col-2, row-1, colsAndRows) ? candidate[col-2][row-1] = true: undefined
                                }
                            }
                        }
                        
                    }

                }  
                if (col +2 <= 7 && moveable){ // right side

                    if (row +1 <= 7){
                        let piece = getPiece(col+2, row+1, true, boardInverseGeneral)

                        if (piece == null){ // there is no piece, you can draw
                            isIn(col+2, row+1, colsAndRows) ? candidate[col+2][row+1] = true: undefined
                        } else { // there is a piece, make sure it's not black
                            for (let key in initBoardGeneral){
                                if (Object.keys(initBoardGeneral[key])[0] == piece && Object.values(initBoardGeneral[key])[0].color != turn){
                                    isIn(col+2, row+1, colsAndRows) ? candidate[col+2][row+1] = true: undefined
                                }
                            }
                        }
                        
                    }
                    if (row -1 >= 0){
                        let piece = getPiece(col+2, row-1, true, boardInverseGeneral)

                        if (piece == null){ // there is no piece, you can draw
                            isIn(col+2, row-1, colsAndRows) ? candidate[col+2][row-1] = true: undefined
                        } else { // there is a piece, make sure it's not black
                            for (let key in initBoardGeneral){
                                if (Object.keys(initBoardGeneral[key])[0] == piece && Object.values(initBoardGeneral[key])[0].color != turn){
                                    isIn(col+2, row-1, colsAndRows) ? candidate[col+2][row-1] = true: undefined
                                }
                            }
                        }
                        
                    }
                } 

                if (row +2 <= 7 && moveable){ // down

                    if (col -1 >= 0){
                        let piece = getPiece(col-1, row+2, true, boardInverseGeneral)

                        if (piece == null){ // there is no piece, you can draw
                            isIn(col-1, row+2, colsAndRows) ? candidate[col-1][row+2] = true: undefined
                        } else { // there is a piece, make sure it's not black
                            for (let key in initBoardGeneral){
                                if (Object.keys(initBoardGeneral[key])[0] == piece && Object.values(initBoardGeneral[key])[0].color != turn){
                                    isIn(col-1, row+2, colsAndRows) ? candidate[col-1][row+2] = true: undefined
                                }
                            }
                        }
                        
                    }
                    if (col +1 <= 7){
                        let piece = getPiece(col+1, row+2, true, boardInverseGeneral)

                        if (piece == null){ // there is no piece, you can draw
                            isIn(col+1, row+2, colsAndRows) ? candidate[col+1][row+2] = true: undefined
                        } else { // there is a piece, make sure it's not black
                            for (let key in initBoardGeneral){
                                if (Object.keys(initBoardGeneral[key])[0] == piece && Object.values(initBoardGeneral[key])[0].color != turn){
                                    isIn(col+1, row+2, colsAndRows) ? candidate[col+1][row+2] = true: undefined
                                }
                            }
                        }
                        
                    }

                }
                if (row -2 >= 0 && moveable){ // up

                    if (col -1 >= 0){ // up-left
                        let piece = getPiece(col-1, row-2, true, boardInverseGeneral)

                        if (piece == null){ // there is no piece, you can draw
                            isIn(col-1, row-2, colsAndRows) ? candidate[col-1][row-2] = true: undefined
                        } else { // there is a piece, make sure it's not black
                            for (let key in initBoardGeneral){
                                if (Object.keys(initBoardGeneral[key])[0] == piece && Object.values(initBoardGeneral[key])[0].color != turn){
                                    isIn(col-1, row-2, colsAndRows) ? candidate[col-1][row-2] = true: undefined
                                }
                            }
                        }
                        
                        
                    }
                    if (col +1 <= 7){ // up-right
                        let piece = getPiece(col+1, row-2, true, boardInverseGeneral)

                        if (piece == null){ // there is no piece, you can draw
                            isIn(col+1, row-2, colsAndRows) ? candidate[col+1][row-2] = true: undefined
                        } else { // there is a piece, make sure it's not black
                            for (let key in initBoardGeneral){
                                if (Object.keys(initBoardGeneral[key])[0] == piece && Object.values(initBoardGeneral[key])[0].color != turn){
                                    isIn(col+1, row-2, colsAndRows) ? candidate[col+1][row-2] = true : undefined
                                }
                            }
                        }
                        
                        
                    }
                }

                return candidate
            })
        
    } else if (kind == "rook"){

            //if (color == "black"){
                setDrawState((old: boolean[][]) => {
                    let candidates = [...old]

                    candidates[col][row] = true;

                    let row_loc = row -1
                    let row_loc_2 = row +1
                    let col_loc = col -1;
                    let col_loc_2 = col +1;
                    while (row_loc >= 0 && moveable.upDown){ // to the up
                        
                        let piece = getPiece(col, row_loc, true, boardInverseGeneral)
                        if (piece == null){ // empty, draw it
                            isIn(col, row_loc, colsAndRows) ? candidates[col][row_loc] = true: undefined
                        } else {

                            for (let key in initBoardGeneral){
                                if (Object.keys(initBoardGeneral[key])[0] == piece && Object.values(initBoardGeneral[key])[0].color != turn){
                                    isIn(col, row_loc, colsAndRows) ? candidates[col][row_loc] = true : undefined
                                    break;
                                }
                            }
                            break;
                        }
                        row_loc--;
                    }

                    while (row_loc_2 <= 7 && moveable.upDown){ // to the down 
                        
                        let piece = getPiece(col, row_loc_2, true, boardInverseGeneral);
                        if (piece == null) {
                            isIn(col, row_loc_2, colsAndRows) ? candidates[col][row_loc_2] = true: undefined
                        } else {

                            for (let key in initBoardGeneral){

                                if (Object.keys(initBoardGeneral[key])[0] == piece && Object.values(initBoardGeneral[key])[0].color != turn){
                                    isIn(col, row_loc_2, colsAndRows) ? candidates[col][row_loc_2] = true : undefined;
                                    break;
                                }
                            }
                            break;
                        }
                        row_loc_2++;
                    }

                    while (col_loc >= 0 && moveable.leftRight){ // to the left
                        
                        let piece = getPiece(col_loc, row, true, boardInverseGeneral);
                        if (piece == null) {
                            isIn(col_loc, row, colsAndRows) ? candidates[col_loc][row] = true: undefined
                        } else {

                            for (let key in initBoardGeneral){

                                if (Object.keys(initBoardGeneral[key])[0] == piece && Object.values(initBoardGeneral[key])[0].color != turn){
                                    isIn(col_loc, row, colsAndRows) ? candidates[col_loc][row] = true: undefined;
                                    break;
                                }
                            }
                            break;
                        }
                        col_loc--;
                    }

                    while (col_loc_2 <= 7 && moveable.leftRight){ // to the right
                        
                        let piece = getPiece(col_loc_2, row, true, boardInverseGeneral);
                        if (piece == null) {
                            isIn(col_loc_2, row, colsAndRows) ? candidates[col_loc_2][row] = true: undefined
                        } else {

                            for (let key in initBoardGeneral){

                                if (Object.keys(initBoardGeneral[key])[0] == piece && Object.values(initBoardGeneral[key])[0].color != turn){
                                    isIn(col_loc_2, row, colsAndRows) ? candidates[col_loc_2][row] = true: undefined;
                                    break;
                                }
                            }
                            break;
                        }
                        col_loc_2++;
                    }

                    return candidates
                })
            
    } else if (kind == "bishop"){

        //if (color == "black"){

            setDrawState((old: boolean[][]) => {

                let candidates = [...old]
                candidates[col][row] = true

                let col_loc = col-1
                let col_loc_2 = col-1
                let col_loc_3 = col+1
                let col_loc_4 = col+1
                let row_loc = row-1
                let row_loc_2 = row+1
                let row_loc_3 = row-1
                let row_loc_4 = row+1
                
                while (col_loc >= 0 && moveable.leftUp){ // to the left-up side

                    if (row_loc >= 0){

                        // get piece
                        let piece = getPiece(col_loc, row_loc, true, boardInverseGeneral);

                        if (piece == null){
                            isIn(col_loc, row_loc, colsAndRows) ? candidates[col_loc][row_loc] = true : undefined
                        } else {

                            for (let key in initBoardGeneral){

                                if (Object.keys(initBoardGeneral[key])[0] == piece && Object.values(initBoardGeneral[key])[0].color != turn){
                                    isIn(col_loc, row_loc, colsAndRows) ? candidates[col_loc][row_loc] = true: undefined
                                    break
                                }
                            }
                            break
                        }
                    }
                    col_loc--;
                    row_loc--;
                }

                while (col_loc_2 >= 0 && moveable.rightUp){ // to the left-down side

                    if (row_loc_2 <= 7){

                        // get piece
                        let piece = getPiece(col_loc_2, row_loc_2, true, boardInverseGeneral);

                        if (piece == null){
                            isIn(col_loc_2, row_loc_2, colsAndRows) ? candidates[col_loc_2][row_loc_2] = true : undefined
                        } else {

                            for (let key in initBoardGeneral){

                                if (Object.keys(initBoardGeneral[key])[0] == piece && Object.values(initBoardGeneral[key])[0].color != turn){
                                    isIn(col_loc_2, row_loc_2, colsAndRows) ? candidates[col_loc_2][row_loc_2] = true : undefined
                                    break
                                }
                            }
                            break
                        }
                    }
                    col_loc_2--;
                    row_loc_2++;
                }

                while (col_loc_3 <= 7 && moveable.rightUp){ // to the right-up side

                    if (row_loc_3 >= 0){

                        // get piece
                        let piece = getPiece(col_loc_3, row_loc_3, true, boardInverseGeneral);

                        if (piece == null){
                            isIn(col_loc_3, row_loc_3, colsAndRows) ? candidates[col_loc_3][row_loc_3] = true : undefined
                        } else {

                            for (let key in initBoardGeneral){

                                if (Object.keys(initBoardGeneral[key])[0] == piece && Object.values(initBoardGeneral[key])[0].color != turn){
                                    isIn(col_loc_3, row_loc_3, colsAndRows) ? candidates[col_loc_3][row_loc_3] = true: undefined
                                    break
                                }
                            }
                            break
                        }
                    }
                    col_loc_3++;
                    row_loc_3--;
                }

                while (col_loc_4 <= 7 && moveable.leftUp){ // to the right-down side

                    if (row_loc_4 <= 7){

                        // get piece
                        let piece = getPiece(col_loc_4, row_loc_4, true, boardInverseGeneral);

                        if (piece == null){
                            isIn(col_loc_4, row_loc_4, colsAndRows) ? candidates[col_loc_4][row_loc_4] = true : undefined
                        } else {

                            for (let key in initBoardGeneral){

                                if (Object.keys(initBoardGeneral[key])[0] == piece && Object.values(initBoardGeneral[key])[0].color != turn){
                                    isIn(col_loc_4, row_loc_4, colsAndRows) ? candidates[col_loc_4][row_loc_4] = true: undefined
                                    break
                                }
                            }
                            break
                        }
                    }
                    col_loc_4++;
                    row_loc_4++;
                }

                return candidates
            })
        
    } else if (kind == "queen"){

        setDrawState((old: boolean[][]) => {

            let candidates = [...old]
            candidates[col][row] = true

            let col_loc = col-1
            let col_loc_2 = col-1;
            let col_loc_3 = col+1
            let col_loc_4 = col+1
            let col_loc_5 = col+1
            let col_loc_6 = col-1

            let row_loc = row-1
            let row_loc_2 = row+1
            let row_loc_3 = row-1
            let row_loc_4 = row+1
            let row_loc_5 = row+1
            let row_loc_6 = row-1

            while (col_loc >= 0 && moveable.leftUp){ // the left-up side

                if (row_loc >= 0){

                    let piece = getPiece(col_loc, row_loc, true, boardInverseGeneral);

                    if (piece == null){
                        isIn(col_loc, row_loc, colsAndRows) ? candidates[col_loc][row_loc] = true: undefined
                    } else {

                        for (let key in initBoardGeneral){

                            if (Object.keys(initBoardGeneral[key])[0] == piece && Object.values(initBoardGeneral[key])[0].color != turn){
                                isIn(col_loc, row_loc, colsAndRows) ? candidates[col_loc][row_loc] = true : undefined
                                break
                            }
                        }
                        break
                    }
                }

                col_loc--;
                row_loc--;
            }

            while (col_loc_2 >= 0 && moveable.rightUp){ // the left-down side

                if (row_loc_2 <= 7){

                    let piece = getPiece(col_loc_2, row_loc_2, true, boardInverseGeneral);

                    if (piece == null){
                        isIn(col_loc_2, row_loc_2, colsAndRows) ? candidates[col_loc_2][row_loc_2] = true : undefined
                    } else {

                        for (let key in initBoardGeneral){

                            if (Object.keys(initBoardGeneral[key])[0] == piece && Object.values(initBoardGeneral[key])[0].color != turn){
                                isIn(col_loc_2, row_loc_2, colsAndRows) ? candidates[col_loc_2][row_loc_2] = true : undefined
                                break
                            }
                        }
                        break
                    }
                }

                col_loc_2--;
                row_loc_2++;
            }

            while (col_loc_3 <= 7 && moveable.rightUp){ // the right-up side

                if (row_loc_3 >= 0){

                    let piece = getPiece(col_loc_3, row_loc_3, true, boardInverseGeneral);

                    if (piece == null){
                        isIn(col_loc_3, row_loc_3, colsAndRows) ? candidates[col_loc_3][row_loc_3] = true : undefined
                    } else {

                        for (let key in initBoardGeneral){

                            if (Object.keys(initBoardGeneral[key])[0] == piece && Object.values(initBoardGeneral[key])[0].color != turn){
                                isIn(col_loc_3, row_loc_3, colsAndRows) ? candidates[col_loc_3][row_loc_3] = true: undefined
                                break
                            }
                        }
                        break
                    }
                }

                col_loc_3++;
                row_loc_3--;
            }

            while (col_loc_4 <= 7 && moveable.leftUp){ // the right-down side

                if (row_loc_4 <= 7){

                    let piece = getPiece(col_loc_4, row_loc_4, true, boardInverseGeneral);

                    if (piece == null){
                        isIn(col_loc_4, row_loc_4, colsAndRows) ? candidates[col_loc_4][row_loc_4] = true : undefined
                    } else {

                        for (let key in initBoardGeneral){

                            if (Object.keys(initBoardGeneral[key])[0] == piece && Object.values(initBoardGeneral[key])[0].color != turn){
                                isIn(col_loc_4, row_loc_4, colsAndRows) ? candidates[col_loc_4][row_loc_4] = true : undefined
                                break
                            }
                        }
                        break
                    }
                }

                col_loc_4++;
                row_loc_4++;
            }


            while (col_loc_5 <= 7 && moveable.leftRight){ // to right

                let piece = getPiece(col_loc_5, row, true, boardInverseGeneral)
                console.log("queen right at: ", col_loc_5,row, )
                if (piece == null){
                    isIn(col_loc_5, row, colsAndRows) ? candidates[col_loc_5][row] = true : undefined
                } else {

                    for (let key in initBoardGeneral){

                        if (Object.keys(initBoardGeneral[key])[0] == piece && Object.values(initBoardGeneral[key])[0].color != turn){
                            isIn(col_loc_5, row, colsAndRows) ? candidates[col_loc_5][row] = true: undefined
                            break
                        }
                    }
                    break
                }

                col_loc_5++;
            }

            while (col_loc_6 >= 0 && moveable.leftRight){ // to left

                let piece = getPiece(col_loc_6, row, true, boardInverseGeneral)

                if (piece == null){
                    isIn(col_loc_6, row, colsAndRows) ? candidates[col_loc_6][row] = true : undefined
                } else {

                    for (let key in initBoardGeneral){

                        if (Object.keys(initBoardGeneral[key])[0] == piece && Object.values(initBoardGeneral[key])[0].color != turn){
                            isIn(col_loc_6, row, colsAndRows) ? candidates[col_loc_6][row] = true: undefined
                            break
                        }
                    }
                    break
                }

                col_loc_6--;
            }

            while (row_loc_5 <= 7 && moveable.upDown){ // to down

                let piece = getPiece(col, row_loc_5, true, boardInverseGeneral)
                

                if (piece == null){
                    isIn(col, row_loc_5, colsAndRows) ? candidates[col][row_loc_5] = true : undefined
                } else {

                    for (let key in initBoardGeneral){

                        if (Object.keys(initBoardGeneral[key])[0] == piece && Object.values(initBoardGeneral[key])[0].color != turn){
                            isIn(col, row_loc_5, colsAndRows) ? candidates[col][row_loc_5] = true : undefined
                            break
                        }
                    }
                    break
                }

                row_loc_5++;
            }

            while (row_loc_6 >= 0 && moveable.upDown){ // to up

                let piece = getPiece(col, row_loc_6, true, boardInverseGeneral)

                if (piece == null){
                    isIn(col, row_loc_6, colsAndRows) ? candidates[col][row_loc_6] = true : undefined
                } else {

                    for (let key in initBoardGeneral){

                        if (Object.keys(initBoardGeneral[key])[0] == piece && Object.values(initBoardGeneral[key])[0].color != turn){
                            isIn(col, row_loc_6, colsAndRows) ? candidates[col][row_loc_6] = true : undefined
                            break
                        }
                    }
                    break
                }

                row_loc_6--;
            }

            return candidates
        })
    
    } else if (kind == "king"){

        /*
        !IMPORTANT
        Position: Black Queen - Black Pawn
                                White King
        In this position, W King can move to right, which shouldn't be able to 

        Position: Black King - White Queen
        In this position B King can move to left down but it is now drawn. Also B King can't move to left but it is shown as can. 
        */


        let has_move = false
        setDrawState((old: boolean[][]) => {

            let candidates = [...old]
            candidates[col][row] = true

            // down
            if (row+1 <= 7){
                let piece = getPiece(col, row+1, true, boardInverseGeneral)
                
                if (piece == null){
                    
                    if (notEatable(col, row+1, turn, initBoardGeneral, boardInverseGeneral)){
                        if ( colsAndRows == null || !isIn(col, row +1, colsAndRows)){ 
                            candidates[col][row+1] = true
                            has_move = true
                        }

                    }
                    
                } else {
                    for (let key in initBoardGeneral){
    
                
                        if ( Object.keys(initBoardGeneral[key])[0] == piece 
                            && Object.values(initBoardGeneral[key])[0].color != turn
                            && Object.values(initBoardGeneral[key])[0].kind != "king"
                            && notKingAdjacent(col, row+1, turn, initBoardGeneral, boardInverseGeneral)
                            && notEatable(col, row+1, turn, initBoardGeneral, boardInverseGeneral)){
    
                                candidates[col][row+1] = true
                                has_move = true
                        }
                    }
                }
            }

            // right
            if (col +1 <= 7){
                console.log("in right, has_moved: ", has_moved)

                let piece_2 = getPiece(col+1, row, true, boardInverseGeneral)
                if (piece_2 == null){
                    if (notEatable(col+1, row, turn, initBoardGeneral, boardInverseGeneral)){
                        if ( colsAndRows == null || !isIn(col+1, row, colsAndRows)){
                            candidates[col+1][row] = true
                            has_move = true
                            console.log("right++")
                        }
                    }
                } else {
    
                    for (let key in initBoardGeneral){
                        if ( Object.keys(initBoardGeneral[key])[0] == piece_2
                            && Object.values(initBoardGeneral[key])[0].color != turn
                            && Object.values(initBoardGeneral[key])[0].kind != "king"
                            && notKingAdjacent(col+1, row, turn, initBoardGeneral, boardInverseGeneral)
                            && notEatable(col+1, row, turn, initBoardGeneral, boardInverseGeneral)){
                    
                                candidates[col+1][row] = true
                                has_move = true

                                console.log("in right++")
                        }
                    }
                }

                // for castle move (to the right)
                if (!has_moved){
                    let rook_2 = getPiece(7, 7, true, boardInverseGeneral, false)
                    // how do we get the piece ?
                    for (let key in initBoardGeneral){ // key is just index here
        
                        if (Object.keys(initBoardGeneral[key])[0] == rook_2 && Object.values(initBoardGeneral[key])[0].color == turn){
                            rook_2 = Object.values(initBoardGeneral[key])[0];
                        }
                    }

                    if (rook_2 && rook_2.has_moved == false){

                        if (noPieceBetween(col, row, 7, 7, boardInverseGeneral)){
    
                            // use opponentCantReach to check no threat for the path of king
                            let is_clear = true
                            let local_col = col+1
                            while (local_col < 7){
    
                                if (!notEatable(local_col, row, turn, initBoardGeneral, boardInverseGeneral)){ // opponentCantReach(local_col, row, turn) == false
                                    is_clear = false
                                    break
                                }
    
                                local_col++;
                            }
                            
                            if (is_clear){
                                console.log("isclear ++")
                                candidates[col+2][row] = true;
                            }
                        }
                    }
                }
            }

            // right down
            if (col+1 <= 7 && row+1 <= 7){

                let piece_3 = getPiece(col+1, row+1, true, boardInverseGeneral)
    
                console.log("res of not Eatable: ")
                let res = notEatable(col+1, row, turn+1, initBoardGeneral, boardInverseGeneral)
                console.log("res: ", res)
                console.log("done")
                if (piece_3 == null){
                    if (notEatable(col+1, row+1, turn, initBoardGeneral, boardInverseGeneral)){
                        if ( colsAndRows == null || !isIn(col+1, row+1, colsAndRows)){
                        
                            candidates[col+1][row+1] = true
                            has_move = true
                        }
                            
                    }
    
                } else {
    
                    for (let key in initBoardGeneral){
    
                        if ( Object.keys(initBoardGeneral[key])[0] == piece_3
                            && Object.values(initBoardGeneral[key])[0].color != turn
                            && Object.values(initBoardGeneral[key])[0].kind != "king"
                            && notKingAdjacent(col+1, row+1, turn, initBoardGeneral, boardInverseGeneral)
                            && notEatable(col+1, row+1, turn, initBoardGeneral, boardInverseGeneral)){
                        
                                candidates[col+1][row+1] = true
                                has_move = true
                        }
                    }
                }
            }

            // right up
            if (col +1 <= 7 && row-1 >= 0){

                let piece_4 = getPiece(col+1, row-1, true, boardInverseGeneral)
    
                if (piece_4 == null){
                    if (notEatable(col+1, row-1, turn, initBoardGeneral, boardInverseGeneral)){
                        if ( colsAndRows == null || !isIn(col+1, row-1, colsAndRows)){
                            candidates[col+1][row-1] = true
                            has_move = true
                        }
                    }
    
                } else {
    
                    for (let key in initBoardGeneral){
    
                        if ( Object.keys(initBoardGeneral[key])[0] == piece_4
                            && Object.values(initBoardGeneral[key])[0].color != turn
                            && Object.values(initBoardGeneral[key])[0].kind != "king"
                            && notKingAdjacent(col+1, row-1, turn, initBoardGeneral, boardInverseGeneral)
                            && notEatable(col+1, row-1, turn, initBoardGeneral, boardInverseGeneral)){
                        
                                candidates[col+1][row-1] = true
                                has_move = true
                        }
                    }
                }
            }

            // left down
            if (col -1 >= 0 && row+1 <= 7){

                let piece_5 = getPiece(col-1, row+1, true, boardInverseGeneral)
                console.log("piece in left down is: ", piece_5)
    
                if (piece_5 == null){
                    if (notEatable(col-1, row+1, turn+1, initBoardGeneral, boardInverseGeneral)){
                        console.log("notEatable is true")
                        if ( colsAndRows == null || !isIn(col-1, row+1, colsAndRows)){
                            candidates[col-1][row+1] = true
                            has_move = true
                        }
                    }
                } else {
    
                    for (let key in initBoardGeneral){
    
                        if ( Object.keys(initBoardGeneral[key])[0] == piece_5
                            && Object.values(initBoardGeneral[key])[0].color != turn
                            && Object.values(initBoardGeneral[key])[0].kind != "king"
                            && notKingAdjacent(col-1, row+1, turn, initBoardGeneral, boardInverseGeneral)
                            && notEatable(col-1, row+1, turn, initBoardGeneral, boardInverseGeneral)){
                            
                                candidates[col-1][row+1] = true
                                has_move = true
                        }
                    }
                }
            }

            // left
            if (col -1 >= 0){

                let piece_6 = getPiece(col-1, row, true, boardInverseGeneral)

                console.log("piece in left is: ", piece_6)
                if (piece_6 == null){
                    if (notEatable(col-1, row, turn, initBoardGeneral, boardInverseGeneral)){
                        console.log("notEatable is true")
                        if ( colsAndRows == null || !isIn(col-1, row, colsAndRows)){
                            candidates[col-1][row] = true
                            has_move = true
                        }
                    }
    
                } else {
    
                    for (let key in initBoardGeneral){
    
                        if ( Object.keys(initBoardGeneral[key])[0] == piece_6
                            && Object.values(initBoardGeneral[key])[0].color != turn
                            && Object.values(initBoardGeneral[key])[0].kind != "king"
                            && notKingAdjacent(col-1, row, turn, initBoardGeneral, boardInverseGeneral)
                            && notEatable(col-1, row, turn, initBoardGeneral, boardInverseGeneral)){
                        
                                candidates[col-1][row] = true
                                has_move = true
                        }
                    }
                }

                if (!has_moved){

                    let rook_1 = getPiece(0, 7, true, boardInverseGeneral, false)

                    for (let key in initBoardGeneral){ // key is just index here
        
                        if (Object.keys(initBoardGeneral[key])[0] == rook_1 && Object.values(initBoardGeneral[key])[0].color == turn){
                            rook_1 = Object.values(initBoardGeneral[key])[0];
                        }
                    }

                    if (rook_1 && rook_1.has_moved == false && noPieceBetween(col, row, 0, 7, boardInverseGeneral)){

                        // use opponentCantReach to check no threat for the path of king
                        let is_clear = true
                        let local_col = col-1
                        while (local_col > 0){

                            if (!notEatable(local_col, row, turn, initBoardGeneral, boardInverseGeneral)){ //   opponentCantReach(local_col, row, turn) == false
                                is_clear = false
                                break
                            }

                            local_col--;
                        }
                        
                        if (is_clear){
                            candidates[col-2][row] = true;
                        }
                        
                    }
                }
            }

            // left up
            if (col -1 >= 0 && row -1 >= 0){

                let piece_7 = getPiece(col-1, row-1, true, boardInverseGeneral)
    
                if (piece_7 == null){
                    if (notEatable(col-1, row-1, turn, initBoardGeneral, boardInverseGeneral)){
                        if ( colsAndRows == null || !isIn(col-1, row-1, colsAndRows)){
                            candidates[col-1][row-1] = true
                            has_move = true
                        }
                    }
    
                } else {
    
                    for (let key in initBoardGeneral){
    
                        if ( Object.keys(initBoardGeneral[key])[0] == piece_7
                            && Object.values(initBoardGeneral[key])[0].color != turn
                            && Object.values(initBoardGeneral[key])[0].kind != "king"
                            && notKingAdjacent(col-1, row-1, turn, initBoardGeneral, boardInverseGeneral)
                            && notEatable(col-1, row-1, turn, initBoardGeneral, boardInverseGeneral)){
                        
                                candidates[col-1][row-1] = true
                                has_move = true
                        }
                    }
                }
            }

            // up
            if (row -1 >= 0){

                let piece_8 = getPiece(col, row-1, true, boardInverseGeneral)
    
                if (piece_8 == null){
                    if (notEatable(col, row-1, turn, initBoardGeneral, boardInverseGeneral)){
                        if ( colsAndRows == null || !isIn(col, row-1, colsAndRows)){
                            candidates[col][row-1] = true
                            has_move = true
                        }
                    }
    
                } else {
    
                    for (let key in initBoardGeneral){
    
                        if ( Object.keys(initBoardGeneral[key])[0] == piece_8
                            && Object.values(initBoardGeneral[key])[0].color != turn
                            && Object.values(initBoardGeneral[key])[0].kind != "king"
                            && notKingAdjacent(col, row-1, turn, initBoardGeneral, boardInverseGeneral)
                            && notEatable(col, row-1, turn, initBoardGeneral, boardInverseGeneral)){
                        
                                candidates[col][row-1] = true
                                has_move = true
                        }
                    }
                }
            }

            if (!has_moved) fireGameOver(turn)

            return candidates

        })
    }
}

// clear initboard
// NOTE: Check if move is makeable - if it's drawn, it's makeable
function makeMove(col_id: number, row_id: number, setDrawState: React.Dispatch | null, selectedPiece: Piece,
                   wsInstance: WebSocket|null, initBoardGeneral: RefObject<{}[]>, //setInitBoardGeneral: React.Dispatch, 
                   boardInverseGeneral: RefObject<{}[]>, setIsUpgradingMove: React.Dispatch, isUpgradingMove: number, isCastle?: Boolean) : any{

    // first clear the board
    if (setDrawState != null) { // if it's null, it means we're doing the opponent's move
        setDrawState(initDrawState);
    }
    console.log("makeMove: col: ", col_id, "row: ", row_id)

    // for opponent move, you also need to check the 7th row
    let pawn_upgrade = (selectedPiece.kind == "pawn" && (row_id == 0 || row_id == 7))
    let choice = ""
    let moveables

    if (pawn_upgrade && isUpgradingMove == -1){

        setIsUpgradingMove(col_id) // set the flag
        return null
        
    } else if (isUpgradingMove != -1 && isUpgradingMove == col_id){

        console.log("upgrading: col_id: ", col_id)

        pawn_upgrade = true
        if (row_id == 0){
            choice = "queen"
            moveables = {upDown: true, leftRight: true, leftUp: true, rightUp: true}
        } else if (row_id == 1){
            choice = "rook"
            moveables = {upDown: true, leftRight: true}
        } else if (row_id == 2){
            choice = "bishop"
            moveables = {leftUp: true, rightUp: true}
        } else if (row_id == 3){
            choice = "knight"
            moveables = true
        }
        console.log("upgrading to: ", choice)
        if (wsInstance != null){
            row_id = 0
        } else {
            row_id = 7
        }
        
        
    } else if (isUpgradingMove == -1) {
        console.log("continue")
    } else {
        throw new Error("upgrading move error, probably should't call makeMove, inspect")
    }

    // for castle move
    let castle_updated_piece
    let castle = ""
    if (selectedPiece.kind == "king"){
        if (selectedPiece.col - col_id > 1){

            castle = "left"
            console.log("castle to left: ")
            let rook = getPiece(0, 7, true, boardInverseGeneral.current, false)

            for (let key in initBoardGeneral.current){ // key is just index here
        
                if (Object.keys(initBoardGeneral.current[key])[0] == rook && Object.values(initBoardGeneral.current[key])[0].color == selectedPiece.color){
                    rook = Object.values(initBoardGeneral.current[key])[0];
                    // somehow update the rook
                    castle_updated_piece = makeMove(col_id+1, row_id, setDrawState, rook, wsInstance, initBoardGeneral, boardInverseGeneral, setIsUpgradingMove, isUpgradingMove, true)

                    console.log("castle updated piece: ", castle_updated_piece)
                }
            }

        } else if (selectedPiece.col - col_id < -1){
            
            castle = "right"
            console.log("castle to right: ")
            let rook = getPiece(7, 7, true, boardInverseGeneral.current, false)

            for (let key in initBoardGeneral.current){ // key is just index here
        
                if (Object.keys(initBoardGeneral.current[key])[0] == rook && Object.values(initBoardGeneral.current[key])[0].color == selectedPiece.color){
                    rook = Object.values(initBoardGeneral.current[key])[0];
                    // somehow update the rook
                    castle_updated_piece = makeMove(col_id-1, row_id, setDrawState, rook, wsInstance, initBoardGeneral, boardInverseGeneral, setIsUpgradingMove, isUpgradingMove, true)

                    console.log("castle updated piece: ", castle_updated_piece)
                }
            }
        }
    }

    // move the piece, remove from one square, add to another square
    let selected_col = selectedPiece.col
    let selected_row = selectedPiece.row
    if (selected_col == -1 || selected_row == -1){
        throw new Error("Selected col or Selected row of SelectedPiece shouldn't be -1. Function makeMove");
    }

    let updated_piece

    console.log("inside setBoardInverseGeneral")
    let newBoardInverseLocal = [...boardInverseGeneral.current]
    let sourceObj = newBoardInverseLocal[selected_col]

    let obj = newBoardInverseLocal[col_id]
    for (let key in obj){
        if (Number(String(key)[1]) == row_id){

            obj[key] = !pawn_upgrade ? selectedPiece.name : `${selectedPiece.name}_upgraded_${choice}`
            //console.log("make Move - add piece:", obj[key])
            console.log("Found piece")
            

        }
        if (Number(String(key)[1]) == selected_row){
            //console.log("make Move - delete piece:", sourceObj[key])
            sourceObj[key] = "empty" // empty the source location
            console.log("emptied it")
        }
    }

    console.log("current board Inverse: ", newBoardInverseLocal[selected_col])

    let piece = getPiece(col_id, row_id, true, newBoardInverseLocal); 
    console.log("what piece is: ",piece)

    
    // has_moved
    let localInitBoardGeneral = [...initBoardGeneral.current]
    for (let key in localInitBoardGeneral){ // key is just index here
        
        if ((Object.keys(localInitBoardGeneral[key])[0] == piece) || (pawn_upgrade && Object.keys(localInitBoardGeneral[key])[0] == `${selectedPiece.name}`)){
            
            console.log("changing has moved")
            let unknownKey  = Object.keys(localInitBoardGeneral[key])[0]

            
                let newInitBoardLocal = [...localInitBoardGeneral]
                newInitBoardLocal[key][unknownKey].has_moved = true
                newInitBoardLocal[key][unknownKey].col = col_id
                newInitBoardLocal[key][unknownKey].row = row_id

                if (pawn_upgrade) {

                    newInitBoardLocal[key][unknownKey].kind = choice // to be changed as selection of user - later
                    newInitBoardLocal[key][unknownKey].name = `${selectedPiece.name}_upgraded_${newInitBoardLocal[key][unknownKey].kind}` // name + upgraded + kind
                    newInitBoardLocal[key][unknownKey].moveable = moveables
                    // can we change the key of initboardGeneral, it stays as W_pawn_4. If can't we shouldn't be using the key, instead we can use name value
                    console.log("pawn goes to queen: ", newInitBoardLocal[key][unknownKey])

                    newInitBoardLocal[key][unknownKey+`_upgraded_${choice}`] = newInitBoardLocal[key][unknownKey]
                    updated_piece = newInitBoardLocal[key][unknownKey+`_upgraded_${choice}`]

                    delete newInitBoardLocal[key][unknownKey]
                } else {

                    updated_piece = newInitBoardLocal[key][unknownKey]
                }

                
                
                console.log("Update piece inside is : ", updated_piece)
            
            initBoardGeneral.current = newInitBoardLocal
            
            

            console.log("current piece data: ", initBoardGeneral.current[key][unknownKey+`_upgraded_${choice}`])
            console.log("col is : ", col_id," row is : ", row_id)
            
            break;
        }
    }
    boardInverseGeneral.current = [...newBoardInverseLocal];

    console.log("After changing board Invere General: ", boardInverseGeneral)
    console.log("The new updated piece is", updated_piece)
    console.log("current piece data after all (initBoardGeneral): ", initBoardGeneral.current)

    console.log("is castle is: ", isCastle)

    let move_type = ""
    let upgrade_to = ""
    if (isCastle){
        move_type = "Castle"
    } else if (isUpgradingMove != -1){
        move_type = "Upgrade"
        upgrade_to = choice
    } else {
        move_type = "Move"
    }

    let move_msg: Move = {
        type: move_type,
        from_col: selected_col,
        from_row: selected_row,
        piece_name: selectedPiece.name,
        to_col: col_id,
        to_row: row_id,
        upgrade_to: upgrade_to
    }

    if (setDrawState != null){
        sendMoveToServer(wsInstance, move_msg);
    }
    
    
    if (castle != ""){
        return castle_updated_piece; // return the updated rook since king cannot cause check etc.
    } else {
        return updated_piece;
    }
}

function clearBoard(setDrawState: React.Dispatch){

    setDrawState([
            [false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false]
        ]);
    return;
}

// after take piece, we should remove it from initboards cause later in the game there are dead pieces that actually blocks checks etc

// clear init board
function takePiece(col_id: number, row_id: number, selectedPiece: Piece, wsInstance: WebSocket|null, initBoardGeneral: RefObject<{}[]>
                    , boardInverseGeneral: RefObject<{}[]>, setIsUpgradingMove: React.Dispatch, isUpgradingMove: number){
    /*
        Function that runs when a piece is taken, col_id, row_id is the location of the eaten piece, selected piece is the one that eats
            If wsInstance is null, it means we're executing move coming from opponent, no need to send it back
    */

    let pawn_upgrade = selectedPiece.kind == "pawn" && (row_id == 0 || row_id == 7) && isUpgradingMove == -1
    let choice = ""
    let moveables

    if (pawn_upgrade){

        console.log("upgrade in takePiece: col_id: ", col_id)
        setIsUpgradingMove(col_id)
        return null
    } else if (isUpgradingMove == col_id){

        console.log("upgrading: col_id: ", col_id)

        pawn_upgrade = true
        if (row_id == 0){
            choice = "queen"
            moveables = {upDown: true, leftRight: true, leftUp: true, rightUp: true}
        } else if (row_id == 1){
            choice = "rook"
            moveables = {upDown: true, leftRight: true}
        } else if (row_id == 2){
            choice = "bishop"
            moveables = {leftUp: true, rightUp: true}
        } else if (row_id == 3){
            choice = "knight"
            moveables = true
        }
        console.log("upgrading to: ", choice)
        if (wsInstance != null){
            row_id = 0
        } else {
            row_id = 7
        }
    }
    
    let from_row = selectedPiece.row
    let from_col = selectedPiece.col

    let piece_eaten = getPiece(col_id, row_id, true, boardInverseGeneral.current)
    let init_board_len1 = initBoardGeneral.current.length

    let initBoard = [...initBoardGeneral.current]
    initBoard = initBoard.filter((elem) => Object.keys(elem)[0] != piece_eaten)
    initBoardGeneral.current = [...initBoard]
      
    
    let init_board_len2 = initBoardGeneral.current.length
    if (init_board_len1 == init_board_len2) throw new Error (`Couldn't found the piece by it's locations: ${row_id}, ${col_id}. function takePiece`)
    
    console.log("selectedPiece.row: ", selectedPiece.row)

    let localBoardInverse = boardInverseGeneral.current
        let obj = localBoardInverse[selectedPiece.col]

        for (let key in obj){
            if (Number(String(key)[1]) == selectedPiece.row){ // find the old piece and make it empty
                
                obj[key] = "empty" 
                
                
            }
        }
    
    
        let second_obj = localBoardInverse[col_id]
    
        for (let key in second_obj){
            if (Number(String(key)[1]) == row_id){ // find the eaten piece and make it's place the selected piece
                second_obj[key] = !pawn_upgrade ? selectedPiece.name : `${selectedPiece.name}_upgraded_${choice}`    
            }
        }
    boardInverseGeneral.current = localBoardInverse
    


    let updated_piece
    for (let elem in initBoardGeneral.current){
        if (Object.keys(initBoardGeneral.current[elem])[0] == selectedPiece.name){ // find the selectedPiece and change info
            let unknownKey = Object.keys(initBoardGeneral.current[elem])[0]

            let localInitBoard = initBoardGeneral.current
                localInitBoard[elem][unknownKey].has_moved = true
                localInitBoard[elem][unknownKey].col = col_id
                localInitBoard[elem][unknownKey].row = row_id

                if (pawn_upgrade){
                 
                    localInitBoard[key][unknownKey].kind = choice // to be changed as selection of user - later
                    localInitBoard[key][unknownKey].name = `${selectedPiece.name}_upgraded_${localInitBoard[key][unknownKey].kind}` // name + upgraded + kind
                    localInitBoard[key][unknownKey].moveable = moveables
                    // can we change the key of initboardGeneral, it stays as W_pawn_4. If can't we shouldn't be using the key, instead we can use name value
                    console.log("pawn goes to queen: ", localInitBoard[key][unknownKey])

                    localInitBoard[key][unknownKey+`_upgraded_${choice}`] = localInitBoard[key][unknownKey]
                    updated_piece = localInitBoard[key][unknownKey+`_upgraded_${choice}`]

                    delete localInitBoard[key][unknownKey]
                } else {
                    updated_piece = localInitBoard[elem][unknownKey]
                }

                

            initBoardGeneral.current = [...localInitBoard]
            
        }
    }

    if (updated_piece == null) {console.log("Big error in take piece !!!!")}

    isCheckCondition(col_id, row_id, initBoardGeneral.current, boardInverseGeneral.current)

    let move_msg: Move = {
        type: "Move",
        from_col: from_col,
        from_row: from_row,
        piece_name: selectedPiece.name,
        to_col: col_id,
        to_row: row_id,
        upgrade_to: choice
    }

    if (wsInstance != null) {sendMoveToServer(wsInstance, move_msg);}

    return updated_piece
}
// This currently only checks the checks from recently moved piece, not by others (i.e. the opening checks where you move a piece and
// another piece is now threating the king other than moving piece). For this you'd have to check for every opponent's other piece
// if it has a clear direction to the king (similar to what we did in setMoveablePieces where we found the opponent pieces toward king with a 
// (one) blocking piece)
function isCheckCondition(col_id: number, row_id: number, initBoardGeneral: {}[], boardInverseGeneral: {}[]){

    if (boardInverseGeneral == null || boardInverseGeneral == undefined){
        console.log("BoardInverseGeneral shouldn't be null or undefined ever")
    }
    console.log("boardInverseGeneral inside isCheckCondition: ", boardInverseGeneral)
    console.log("initBoardGeneral in isCheckCondition: ", initBoardGeneral)
    let piece = getPiece(col_id, row_id, true, boardInverseGeneral)
    if (piece == null){
        throw new Error("for the given location, piece should've been found. In isCheckCondition")
    }

    let piece_in = null
    for (let key in initBoardGeneral){
        if (Object.values(initBoardGeneral[key])[0].name == piece){
            piece_in = initBoardGeneral[key]
            break
        }
    }

    let local_turn = Object.values(piece_in)[0].color
    let piece_kind = Object.values(piece_in)[0].kind

    if (piece_kind == "pawn"){

        let row_inc
        if (local_turn == "white"){
            row_inc = -1
        } else {
            row_inc = 1
        }

        let piece_target = getPiece(col_id+1, row_id + row_inc, true, boardInverseGeneral)
        if (piece_target != null){
            for (let key in initBoardGeneral){
                if (Object.keys(initBoardGeneral[key])[0] == piece_target 
                    && Object.values(initBoardGeneral[key])[0].kind == "king"
                    && Object.values(initBoardGeneral[key])[0].color != local_turn){
                        return true
                }
            }
        }

        piece_target = getPiece(col_id-1, row_id + row_inc, true, boardInverseGeneral)
        if (piece_target != null){
            for (let key in initBoardGeneral){
                if (Object.keys(initBoardGeneral[key])[0] == piece_target 
                    && Object.values(initBoardGeneral[key])[0].kind == "king"
                    && Object.values(initBoardGeneral[key])[0].color != local_turn){
                        return true
                }
            }
        }
    } else if (piece_kind == "knight"){


        if (col_id - 2 >= 0){

                    if (row_id +1 <= 7){

                        let piece = getPiece(col_id-2, row_id+1, true, boardInverseGeneral)
                        if (piece != null){ // there is no piece, you can draw
                            
                            for (let key in initBoardGeneral){
                                if (Object.keys(initBoardGeneral[key])[0] == piece 
                                    && Object.values(initBoardGeneral[key])[0].color != local_turn
                                    && Object.values(initBoardGeneral[key])[0].kind == "king"){
                                    return true
                                }
                            }
                        }

                        
                    }
                    if (row_id -1 >= 0){

                        let piece = getPiece(col_id-2, row_id-1, true, boardInverseGeneral)
                        if (piece != null){ // there is no piece, draw
                             // there is a piece, if it's not black -> draw
                    
                            for (let key in initBoardGeneral){
                                if (Object.keys(initBoardGeneral[key])[0] == piece 
                                    && Object.values(initBoardGeneral[key])[0].color != local_turn
                                    && Object.values(initBoardGeneral[key])[0].kind == "king"){
                                    return true
                                }
                            }
                        }
                        
                    }

                }  
                if (col_id +2 <= 7){

                    if (row_id +1 <= 7){
                        let piece = getPiece(col_id+2, row_id+1, true, boardInverseGeneral)

                        if (piece != null){ // there is no piece, you can draw
                             // there is a piece, make sure it's not black
                            for (let key in initBoardGeneral){
                                if (Object.keys(initBoardGeneral[key])[0] == piece 
                                    && Object.values(initBoardGeneral[key])[0].color != local_turn
                                    && Object.values(initBoardGeneral[key])[0].kind == "king"){
                                    return true
                                }
                            }
                        }
                        
                    }
                    if (row_id -1 >= 0){
                        let piece = getPiece(col_id+2, row_id-1, true, boardInverseGeneral)

                        if (piece != null){ // there is no piece, you can draw
                             // there is a piece, make sure it's not black
                            for (let key in initBoardGeneral){
                                if (Object.keys(initBoardGeneral[key])[0] == piece 
                                    && Object.values(initBoardGeneral[key])[0].color != local_turn
                                    && Object.values(initBoardGeneral[key])[0].kind == "king"){
                                    return true
                                }
                            }
                        }
                        
                    }
                } 

                if (row_id +2 <= 7){

                    if (col_id -1 >= 0){
                        let piece = getPiece(col_id-1, row_id+2, true, boardInverseGeneral)

                        if (piece != null){ // there is no piece, you can draw
                             // there is a piece, make sure it's not black
                            for (let key in initBoardGeneral){
                                if (Object.keys(initBoardGeneral[key])[0] == piece 
                                    && Object.values(initBoardGeneral[key])[0].color != local_turn
                                    && Object.values(initBoardGeneral[key])[0].kind == "king"){
                                    return true
                                }
                            }
                        }
                        
                    }
                    if (col_id +1 <= 7){
                        let piece = getPiece(col_id+1, row_id+2, true, boardInverseGeneral)

                        if (piece != null){ // there is no piece, you can draw
                            
                             // there is a piece, make sure it's not black
                            for (let key in initBoardGeneral){
                                if (Object.keys(initBoardGeneral[key])[0] == piece 
                                    && Object.values(initBoardGeneral[key])[0].color != local_turn
                                    && Object.values(initBoardGeneral[key])[0].kind == "king"){
                                    return true
                                }
                            }
                        }
                        
                    }

                }
                if (row_id -2 >= 0){

                    if (col_id -1 >= 0){
                        let piece = getPiece(col_id-1, row_id-2, true, boardInverseGeneral)

                        if (piece != null){ // there is no piece, you can draw
                            
                             // there is a piece, make sure it's not black
                            for (let key in initBoardGeneral){
                                if (Object.keys(initBoardGeneral[key])[0] == piece 
                                    && Object.values(initBoardGeneral[key])[0].color != local_turn
                                    && Object.values(initBoardGeneral[key])[0].kind == "king"){
                                    return true
                                }
                            }
                        }
                        
                        
                    }
                    if (col_id +1 <= 7){
                        let piece = getPiece(col_id+1, row_id-2, true, boardInverseGeneral)

                        if (piece != null){ // there is no piece, you can draw
                            
                            // there is a piece, make sure it's not black
                            for (let key in initBoardGeneral){
                                if (Object.keys(initBoardGeneral[key])[0] == piece 
                                    && Object.values(initBoardGeneral[key])[0].color != local_turn
                                    && Object.values(initBoardGeneral[key])[0].kind == "king"){
                                    return true
                                }
                            }
                        }
                        
                        
                    }
                }
    } else if (piece_kind == "rook"){


        let row_loc = row_id -1
                let row_loc_2 = row_id +1
                let col_loc = col_id -1;
                let col_loc_2 = col_id +1;
                while (row_loc >= 0){ // to the left
                    
                    let piece = getPiece(col_id, row_loc, true, boardInverseGeneral)
                    if (piece != null){ // empty, draw it
                        
                        for (let key in initBoardGeneral){
                            if (Object.keys(initBoardGeneral[key])[0] == piece 
                                && Object.values(initBoardGeneral[key])[0].color != local_turn
                                && Object.values(initBoardGeneral[key])[0].kind == "king"){
                                
                                    return true
                            }
                        }
                        break;
                    }
                    row_loc--;
                }
                while (row_loc_2 <= 7){ // to the down 
                    
                    let piece = getPiece(col_id, row_loc_2, true, boardInverseGeneral);
                    if (piece != null) {
                        
                        
                        for (let key in initBoardGeneral){
                            if (Object.keys(initBoardGeneral[key])[0] == piece 
                                && Object.values(initBoardGeneral[key])[0].color != local_turn
                                && Object.values(initBoardGeneral[key])[0].kind == "king"){
                                
                                    return true
                            }
                        }
                        break;
                    }
                    row_loc_2++;
                }
                while (col_loc >= 0){ // to the up
                    
                    let piece = getPiece(col_loc, row_id, true, boardInverseGeneral);
                    if (piece != null) {
                        
                        
                        for (let key in initBoardGeneral){
                            if (Object.keys(initBoardGeneral[key])[0] == piece 
                                && Object.values(initBoardGeneral[key])[0].color != local_turn
                                && Object.values(initBoardGeneral[key])[0].kind == "king"){
                                
                                    return true
                            }
                        }
                        break;
                    }
                    col_loc--;
                }
                while (col_loc_2 <= 7){ // to the right
                    
                    let piece = getPiece(col_loc_2, row_id, true, boardInverseGeneral);
                    if (piece != null) {
                        

                        for (let key in initBoardGeneral){
                            if (Object.keys(initBoardGeneral[key])[0] == piece 
                                && Object.values(initBoardGeneral[key])[0].color != local_turn
                                && Object.values(initBoardGeneral[key])[0].kind == "king"){
                                
                                    return true
                            }
                        }
                        break;
                    }
                    col_loc_2++;
                }
    } else if (piece_kind == "bishop"){

        let col_loc = col_id-1
                let col_loc_2 = col_id-1
                let col_loc_3 = col_id+1
                let col_loc_4 = col_id+1
                let row_loc = row_id-1
                let row_loc_2 = row_id+1
                let row_loc_3 = row_id-1
                let row_loc_4 = row_id+1
                
                while (col_loc >= 0){ // to the left-up side

                    if (row_loc >= 0){

                        // get piece
                        let piece = getPiece(col_loc, row_loc, true, boardInverseGeneral);

                        if (piece != null){
                            

                            for (let key in initBoardGeneral){

                                if (Object.keys(initBoardGeneral[key])[0] == piece 
                                    && Object.values(initBoardGeneral[key])[0].color != local_turn
                                    && Object.values(initBoardGeneral[key])[0].kind == "king"){

                                        return true

                                }
                            }
                            break
                        }
                    }
                    col_loc--;
                    row_loc--;
                }

                while (col_loc_2 >= 0){ // to the left-down side

                    if (row_loc_2 <= 7){

                        // get piece
                        let piece = getPiece(col_loc_2, row_loc_2, true, boardInverseGeneral);

                        if (piece != null){
                            

                            for (let key in initBoardGeneral){

                                if (Object.keys(initBoardGeneral[key])[0] == piece 
                                    && Object.values(initBoardGeneral[key])[0].color != local_turn
                                    && Object.values(initBoardGeneral[key])[0].kind == "king"){
                                    
                                        return true

                                }
                            }
                            break
                        }
                    }
                    col_loc_2--;
                    row_loc_2++;
                }

                while (col_loc_3 <= 7){ // to the right-up side

                    if (row_loc_3 >= 0){

                        // get piece
                        let piece = getPiece(col_loc_3, row_loc_3, true, boardInverseGeneral);

                        if (piece != null){
                            

                            for (let key in initBoardGeneral){

                                if (Object.keys(initBoardGeneral[key])[0] == piece 
                                    && Object.values(initBoardGeneral[key])[0].color != local_turn
                                    && Object.values(initBoardGeneral[key])[0].kind == "king"){

                                        return true

                                }
                            }
                            break
                        }
                    }
                    col_loc_3++;
                    row_loc_3--;
                }

                while (col_loc_4 <= 7){ // to the right-down side

                    if (row_loc_4 <= 7){

                        // get piece
                        let piece = getPiece(col_loc_4, row_loc_4, true, boardInverseGeneral);

                        if (piece != null){
                            

                            for (let key in initBoardGeneral){

                                if (Object.keys(initBoardGeneral[key])[0] == piece 
                                    && Object.values(initBoardGeneral[key])[0].color != local_turn
                                    && Object.values(initBoardGeneral[key])[0].kind == "king"){

                                        return true
                                }
                            }
                            break
                        }
                    }
                    col_loc_4++;
                    row_loc_4++;
                }
    } else if (piece_kind == "queen"){


        let col_loc = col_id-1
            let col_loc_2 = col_id-1;
            let col_loc_3 = col_id+1
            let col_loc_4 = col_id+1
            let col_loc_5 = col_id+1
            let col_loc_6 = col_id-1

            let row_loc = row_id-1
            let row_loc_2 = row_id+1
            let row_loc_3 = row_id-1
            let row_loc_4 = row_id+1
            let row_loc_5 = row_id+1
            let row_loc_6 = row_id-1

            while (col_loc >= 0){ // the left-up side

                if (row_loc >= 0){

                    let piece = getPiece(col_loc, row_loc, true, boardInverseGeneral);

                    if (piece != null){
                        

                        for (let key in initBoardGeneral){

                            if (Object.keys(initBoardGeneral[key])[0] == piece 
                                && Object.values(initBoardGeneral[key])[0].color != local_turn
                                && Object.values(initBoardGeneral[key])[0].kind == "king"){
                                
                                    return true
                            }
                        }
                        break
                    }
                }

                col_loc--;
                row_loc--;
            }

            while (col_loc_2 >= 0){ // the left-down side

                if (row_loc_2 <= 7){

                    let piece = getPiece(col_loc_2, row_loc_2, true, boardInverseGeneral);

                    if (piece != null){
                        

                        for (let key in initBoardGeneral){

                            if (Object.keys(initBoardGeneral[key])[0] == piece 
                                && Object.values(initBoardGeneral[key])[0].color != local_turn
                                && Object.values(initBoardGeneral[key])[0].kind == "king"){
                                
                                    return true
                            }
                        }
                        break
                    }
                }

                col_loc_2--;
                row_loc_2++;
            }

            while (col_loc_3 <= 7){ // the right-up side

                if (row_loc_3 >= 0){

                    let piece = getPiece(col_loc_3, row_loc_3, true, boardInverseGeneral);

                    if (piece != null){
                        

                        for (let key in initBoardGeneral){

                            if (Object.keys(initBoardGeneral[key])[0] == piece 
                                && Object.values(initBoardGeneral[key])[0].color != local_turn
                                && Object.values(initBoardGeneral[key])[0].kind == "king"){
                                
                                    return true
                            }
                        }
                        break
                    }
                }

                col_loc_3++;
                row_loc_3--;
            }

            while (col_loc_4 <= 7){ // the right-down side

                if (row_loc_4 <= 7){

                    let piece = getPiece(col_loc_4, row_loc_4, true, boardInverseGeneral);

                    if (piece != null){
                        

                        for (let key in initBoardGeneral){

                            if (Object.keys(initBoardGeneral[key])[0] == piece 
                                && Object.values(initBoardGeneral[key])[0].color != local_turn
                                && Object.values(initBoardGeneral[key])[0].kind == "king"){
                                
                                    return true
                            }
                        }
                        break
                    }
                }

                col_loc_4++;
                row_loc_4++;
            }


            while (col_loc_5 <= 7){ // to right

                let piece = getPiece(col_loc_5, row_id, true, boardInverseGeneral)
                
                if (piece != null){
                    

                    for (let key in initBoardGeneral){

                        if (Object.keys(initBoardGeneral[key])[0] == piece 
                            && Object.values(initBoardGeneral[key])[0].color != local_turn
                            && Object.values(initBoardGeneral[key])[0].kind == "king"){
                            
                                return true
                        }
                    }
                    break
                }

                col_loc_5++;
            }

            while (col_loc_6 >= 0){ // to left

                let piece = getPiece(col_loc_6, row_id, true, boardInverseGeneral)

                if (piece != null){
                    

                    for (let key in initBoardGeneral){

                        if (Object.keys(initBoardGeneral[key])[0] == piece 
                            && Object.values(initBoardGeneral[key])[0].color != local_turn
                            && Object.values(initBoardGeneral[key])[0].kind == "king"){
                            
                                return true
                        }
                    }
                    break
                }

                col_loc_6--;
            }

            while (row_loc_5 <= 7){ // to down

                let piece = getPiece(col_id, row_loc_5, true, boardInverseGeneral)
                

                if (piece != null){
                    

                    for (let key in initBoardGeneral){

                        if (Object.keys(initBoardGeneral[key])[0] == piece 
                            && Object.values(initBoardGeneral[key])[0].color != local_turn
                            && Object.values(initBoardGeneral[key])[0].kind == "king"){
                            
                                return true
                        }
                    }
                    break
                }

                row_loc_5++;
            }

            while (row_loc_6 >= 0){ // to up

                let piece = getPiece(col_id, row_loc_6, true, boardInverseGeneral)

                if (piece != null){
                    

                    for (let key in initBoardGeneral){

                        if (Object.keys(initBoardGeneral[key])[0] == piece 
                            && Object.values(initBoardGeneral[key])[0].color != local_turn
                            && Object.values(initBoardGeneral[key])[0].kind == "king"){
                            
                                return true
                        }
                    }
                    break
                }

                row_loc_6--;
            }
    }

    return false
}

/*
   This function checks our rooks, bishops, and queen(s) if they can reach (or eat) opponent's king, then it's (indirect) check condition
*/
function isIndirectCheckCondition(turn: string, initBoardGeneral: {}[], boardInverseGeneral: {}[]){

    // get opponent's king
    let opp_king
    for (let key in initBoardGeneral){

        if (Object.values(initBoardGeneral[key])[0].color != turn && Object.values(initBoardGeneral[key])[0].kind == "king"){
            let unknownKey = Object.keys(initBoardGeneral[key])[0]
            opp_king = initBoardGeneral[key][unknownKey]
            break;
        }
    }

    // iterate on our pieces
    for (let key in initBoardGeneral){

        let is_indirect_check_cause = true;
        let may_return = false;
        let piece: any = Object.values(initBoardGeneral[key])[0]
        
        if (piece.color == turn){
            
            if (piece.kind == "bishop"){
    
                if (((piece.col - opp_king.col) == (piece.row - opp_king.row)) && (piece.col - opp_king.col > 0)){ // king is in left-up

                    may_return = true;
                    let piece_row = piece.row -1
                    let piece_col = piece.col -1

                    while ((piece_col > opp_king.col) && (piece_row > opp_king.row)){

                        let piece_in = getPiece(piece_col, piece_row, true, boardInverseGeneral, false);
                        if (piece_in != null){
                            is_indirect_check_cause = false;
                            break;
                        }

                        piece_row--;
                        piece_col--;
                    }

                } else if (((piece.col - opp_king.col) == (piece.row - opp_king.row)) && (piece.col - opp_king.col < 0)){ // king is in right-bottom

                    may_return = true;
                    let piece_row = piece.row +1
                    let piece_col = piece.col +1

                    while ((piece_col < opp_king.col) && (piece_row < opp_king.row)){

                        let piece_in = getPiece(piece_col, piece_row, true, boardInverseGeneral, false);
                        if (piece_in != null){
                            is_indirect_check_cause = false;
                            break;
                        }

                        piece_row++;
                        piece_col++;
                    }

                } else if (((piece.col - opp_king.col) == -1 * (piece.row - opp_king.row)) && (piece.col - opp_king.col > 0)){ // king is in left-bottom

                    may_return = true;
                    let piece_row = piece.row +1
                    let piece_col = piece.col -1

                    while ((piece_col > opp_king.col) && (piece_row < opp_king.row)){

                        let piece_in = getPiece(piece_col, piece_row, true, boardInverseGeneral, false);
                        if (piece_in != null){
                            is_indirect_check_cause = false;
                            break;
                        }

                        piece_row++;
                        piece_col--;
                    }

                } else if (((piece.col - opp_king.col) == -1 * (piece.row - opp_king.row)) && (piece.col - opp_king.col > 0)){ // king is in right-up

                    may_return = true;
                    let piece_row = piece.row -1
                    let piece_col = piece.col +1

                    while ((piece_col < opp_king.col) && (piece_row > opp_king.row)){

                        let piece_in = getPiece(piece_col, piece_row, true, boardInverseGeneral, false);
                        if (piece_in != null){
                            is_indirect_check_cause = false;
                            break;
                        }

                        piece_row--;
                        piece_col++;
                    }
                }

            } else if (piece.kind == "rook"){

                if (piece.col == opp_king.col){ // on the same col

                    may_return = true;
                    if (piece.row > opp_king.row){ // king is in up

                        let piece_row = piece.row -1
                        while (piece_row > opp_king.row){

                            let piece_in = getPiece(piece.col, piece_row, true, boardInverseGeneral, false)
                            if (piece_in != null){
                                is_indirect_check_cause = false;
                                break;
                            }

                            piece_row--;
                        }
                    } else { // king is in bottom

                        let piece_row = piece.row +1
                        while (piece_row < opp_king.row){

                            let piece_in = getPiece(piece.col, piece_row, true, boardInverseGeneral, false)
                            if (piece_in != null){
                                is_indirect_check_cause = false;
                                break;
                            }

                            piece_row++;
                        }
                    }
                } else if (piece.row == opp_king.row){ // on the same row

                    may_return = true;
                    if (piece.col > opp_king.col){ // king is on left

                        let piece_col = piece.col -1
                        while (piece_col > opp_king.col){

                            let piece_in = getPiece(piece_col, piece.row, true, boardInverseGeneral, false);
                            if (piece_in != null){
                                is_indirect_check_cause = false;
                                break;
                            }

                            piece_col--;
                        }

                    } else { // king is in right

                        let piece_col = piece.col +1
                        while (piece_col < opp_king.col){

                            let piece_in = getPiece(piece_col, piece.row, true, boardInverseGeneral, false);
                            if (piece_in != null){
                                is_indirect_check_cause = false;
                                break;
                            }

                            piece_col++;
                        }
                    }
                }

            } else if (piece.kind == "queen"){
                console.log("piece is in ", piece.col, piece.row)
                console.log("king is in ", opp_king.col, opp_king.row)
                if (piece.col == opp_king.col){ // on the same col

                    may_return = true;
                    if (piece.row > opp_king.row){ // king is in up

                        let piece_row = piece.row -1
                        while (piece_row > opp_king.row){

                            let piece_in = getPiece(piece.col, piece_row, true, boardInverseGeneral, false)
                            if (piece_in != null){
                                is_indirect_check_cause = false;
                                break;
                            }

                            piece_row--;
                        }
                    } else { // king is in bottom

                        let piece_row = piece.row +1
                        while (piece_row < opp_king.row){

                            let piece_in = getPiece(piece.col, piece_row, true, boardInverseGeneral, false)
                            if (piece_in != null){
                                is_indirect_check_cause = false;
                                break;
                            }

                            piece_row++;
                        }
                    }
                } else if (piece.row == opp_king.row){ // on the same row

                    may_return = true;
                    if (piece.col > opp_king.col){ // king is on left

                        let piece_col = piece.col -1
                        while (piece_col > opp_king.col){

                            let piece_in = getPiece(piece_col, piece.row, true, boardInverseGeneral, false);
                            if (piece_in != null){
                                is_indirect_check_cause = false;
                                break;
                            }

                            piece_col--;
                        }

                    } else { // king is in right

                        let piece_col = piece.col +1
                        while (piece_col < opp_king.col){

                            let piece_in = getPiece(piece_col, piece.row, true, boardInverseGeneral, false);
                            if (piece_in != null){
                                is_indirect_check_cause = false;
                                break;
                            }

                            piece_col++;
                        }
                    }
                } else if (((piece.col - opp_king.col) == (piece.row - opp_king.row)) && (piece.col - opp_king.col > 0)){ // king is in left-up

                    console.log("ok in here, king is in left up")
                    may_return = true;
                    let piece_row = piece.row -1
                    let piece_col = piece.col -1

                    while ((piece_col > opp_king.col) && (piece_row > opp_king.row)){

                        let piece_in = getPiece(piece_col, piece_row, true, boardInverseGeneral, false);
                        if (piece_in != null){
                            is_indirect_check_cause = false;
                            break;
                        }

                        piece_row--;
                        piece_col--;
                    }

                } else if (((piece.col - opp_king.col) == (piece.row - opp_king.row)) && (piece.col - opp_king.col < 0)){ // king is in right-bottom

                    console.log("ok in here, king is in right bottom")
                    may_return = true;
                    let piece_row = piece.row +1
                    let piece_col = piece.col +1

                    while ((piece_col < opp_king.col) && (piece_row < opp_king.row)){

                        let piece_in = getPiece(piece_col, piece_row, true, boardInverseGeneral, false);
                        if (piece_in != null){
                            is_indirect_check_cause = false;
                            break;
                        }

                        piece_row++;
                        piece_col++;
                    }

                } else if (((piece.col - opp_king.col) == -1 * (piece.row - opp_king.row)) && (piece.col - opp_king.col > 0)){ // king is in left-bottom

                    console.log("ok in here, king is in left bottom")
                    may_return = true;
                    let piece_row = piece.row +1
                    let piece_col = piece.col -1

                    while ((piece_col > opp_king.col) && (piece_row < opp_king.row)){

                        let piece_in = getPiece(piece_col, piece_row, true, boardInverseGeneral, false);
                        if (piece_in != null){
                            is_indirect_check_cause = false;
                            break;
                        }

                        piece_row++;
                        piece_col--;
                    }

                } else if (((piece.col - opp_king.col) == -1 * (piece.row - opp_king.row)) && (piece.col - opp_king.col < 0)){ // king is in right-up

                    console.log("ok in here, king is in right up")
                    may_return = true;
                    let piece_row = piece.row -1 
                    let piece_col = piece.col +1

                    while ((piece_col < opp_king.col) && (piece_row > opp_king.row)){

                        let piece_in = getPiece(piece_col, piece_row, true, boardInverseGeneral, false);
                        if (piece_in != null){
                            console.log("there is a piece: ", piece_in)
                            is_indirect_check_cause = false;
                            break;
                        }

                        piece_row--;
                        piece_col++;
                    }
                }
                
            }

            if (may_return && is_indirect_check_cause == true){

                return piece;
            }
        }

        
    }

    return null;
}

/*
    TODO : 
      - other pieces : rook+, knight+, bishop+, queen+, king+
      - moves for white too: pawn+, knight+, rook+, bishop+, queen+, king+
      - moves in sequential order (white, black, white, black...) +
      - check conditions: rook+, knight+, bishop+, queen+, pawn+
      - check condition animation -> next move is forced to king +
      - king shouldn't be able to eat something that is protected by other opponent's piece +
      - checkmate conditions -> write it completetly in fireGameOver()
      - rook move O-O O-O-O +++
      - pawn goes to queen -> this will be when pawn makeMove to last row || pawn takePiece to last row. Then turn it into queen/others +++
      - pawn goes to other pieces (a selection required) +++
      - pawn goes to upgrade for takePiece +++


      - implement after makeMove function protocols +
      
      - board square colors are not right +
      - in check situation if king can't move but a piece block the check it's not game over (isNotBlocked function has some flaws
      identifying the blocked pieces) +
      - the opening checks in isCheckCondition is not satisfied (next weeks job) (partially: setMoveablePieces is not solid for both colors) +
      - implement opponent's take piece situation, currently there is only makeMove, so when opponent take a piece, it doesn't dissappear +
      

      all above is done except:
      - checkmate conditions -> write it completetly in fireGameOver()
      - lots of bugs in check conditions: B King - W Queen (King can move left and can't move left down - wrong || B King 
                                                                                                                          \ 
                                                                                                                            W Pawn, not check by white but check by black - wrong)

      --- later ? (after backend in rust)
      - piece move by mouse hold ++ (seems done)
      - premove
      - time (frontend first, backend next)
      - username
      - account creation (all kind of backend stuff)
      - game registery (in backend, to a sqlite3-like db)
      - bizarre moves of FFA (Fatih Furkan Altınkaya) 
*/
function onclickSquare(col_id: number, row_id: number, setDrawState: React.Dispatch, allDrawState: boolean[][], setSelectedPiece: React.Dispatch, 
                       selectedPiece: Piece, turn: string, setTurn: React.Dispatch, setIsCheck: React.Dispatch, isCheck: boolean, 
                       checkingPiece: Piece, setCheckingPiece: React.Dispatch, colsAndRows: null|{row: number, col:number}[], 
                       setColsAndRows: React.Dispatch, wsInstance: WebSocket|null, playerTurn: RefObject<string>, initBoardGeneral: RefObject<{}[]>, 
                       boardInverseGeneral: RefObject<{}[]>, setIsUpgradingMove: React.Dispatch, isUpgradingMove: number){
    /*
        Onclick handler on squares. It draws the possible moves, and should handle the move
        Notes: could be two separate function -> draw possible moves and leave, handle the move
    */
    console.log("onclickSquare :")
    if (playerTurn.current != turn){
        console.log("turn is: ", turn)
        return;
    }

    let piece = getPiece(col_id, row_id, true, boardInverseGeneral.current)
    console.log("destination is : ", piece)
    // get the piece information from board
    let piece_in = null;

    if (piece == null ){ // handle not drawn empty square - || isUpgradingMove != -1


        if (allDrawState[col_id][row_id] == true || isUpgradingMove == col_id) { // making move to empty place
            console.log("we make move to empty place")
            console.log("selected piece is (before makeMove): ", selectedPiece)

            let updated_piece = makeMove(col_id, row_id, setDrawState, selectedPiece, wsInstance, initBoardGeneral, 
                                          boardInverseGeneral, setIsUpgradingMove, isUpgradingMove); 

            if (updated_piece == null){ // upgrading move return, maybe could be something better than null
                console.log("Upgrading move detected, returning early from onClickSquare, so user will select the next piece")
                return;
            }
            
            if (isUpgradingMove == -1){


            } else {
                setIsUpgradingMove(-1) // clear the number
                row_id = 0
            }
            

            // check if the piece in the given location can thread the opponent king
            let is_check_local = isCheckCondition(col_id, row_id, initBoardGeneral.current, boardInverseGeneral.current) 
            setIsCheck(is_check_local)

            let is_indirect_check_local = isIndirectCheckCondition(turn, initBoardGeneral.current, boardInverseGeneral.current);
            console.log("the result of INDIRECT:", is_indirect_check_local);

            if (is_check_local && is_indirect_check_local != null && is_check_local == is_indirect_check_local){

                // WHAT DO WE DO?
                throw new Error("Handle the double check condition");

            } else if (is_check_local) {
                
                setCheckingPiece({...updated_piece})

                let cols_and_rows = setMoveablePieces(playerTurn.current, updated_piece, setColsAndRows, initBoardGeneral.current)

                setColsAndRows([...cols_and_rows])

            } else if (is_indirect_check_local != null){
                
                setCheckingPiece(is_indirect_check_local);

                let cols_and_rows = setMoveablePieces(playerTurn.current, is_indirect_check_local, setColsAndRows, initBoardGeneral.current)
                    
                setColsAndRows([...cols_and_rows])

                setIsCheck(true)
            }
            else {
                setColsAndRows(null)
            }
            
            clearBoard(setDrawState);
            setSelectedPiece({...nullPiece})
            
            setTurn((old: string) => {
                return old == "white" ? "black" : "white" // just flip the turn
            })

            // console.log(selectedPiece)
            return;
        }

        else if (allDrawState[col_id][row_id] == false) {
            clearBoard(setDrawState);
            console.log("empty click")
        }
        return;

    } else { // we taking a piece or first selection

        for (let key in initBoardGeneral.current){ // key is just index here
        
            
            if (Object.keys(initBoardGeneral.current[key])[0] == piece){
            
                piece_in = initBoardGeneral.current[key]
                console.log("piece_in here: ",piece_in)
                break;
            }
        }

        if (piece_in == null){
            console.log("current situation of initboardGeneral: ", initBoardGeneral.current)
            throw new Error("The piece is not found, it should've been found. Function: onClickSquare")
        } else if (Object.values(piece_in)[0].color != turn) { // opponent piece

            if (allDrawState[col_id][row_id] == true) {

                let updated_piece = takePiece(col_id, row_id, selectedPiece, wsInstance, initBoardGeneral, 
                                               boardInverseGeneral, setIsUpgradingMove, isUpgradingMove);
                
                                            
                if (updated_piece == null){
                    return;
                }

                clearBoard(setDrawState);

                // check if the piece in the given location can thread the opponent king
                let is_check_local = isCheckCondition(col_id, row_id, initBoardGeneral.current, boardInverseGeneral.current) 
                setIsCheck(is_check_local)

                let is_indirect_check_local = isIndirectCheckCondition(turn, initBoardGeneral.current, boardInverseGeneral.current);
                

            
                // if both check occur in the same time, we have no other option than moving the king
                if (is_check_local && is_indirect_check_local != null && is_check_local == is_indirect_check_local){

                    // ONLY KING CAN MOVE
                    throw new Error("Handle the double check condition");

                } else if (is_check_local) { // normal check
                    
                    setCheckingPiece(updated_piece)
                    
                    let cols_and_rows = setMoveablePieces(playerTurn.current, updated_piece, setColsAndRows, initBoardGeneral.current)
                    
                    setColsAndRows([...cols_and_rows])

                } else if (is_indirect_check_local != null){ // it's indirect check condition

                    setCheckingPiece(is_indirect_check_local);

                    let cols_and_rows = setMoveablePieces(playerTurn.current, updated_piece, setColsAndRows, initBoardGeneral.current)
                    
                    setColsAndRows([...cols_and_rows])

                    setIsCheck(true)

                } else {
                    setColsAndRows(null)
                }
                
            
                setSelectedPiece({...nullPiece})
                setTurn((old: string) => {
                    return old == "white" ? "black" : "white" // just flip the turn
                })

                // send the move to the server
                //sendMoveToServer(wsInstance, "")
                console.log("take piece")
            }
            else {
                clearBoard(setDrawState);
                console.log("opponent non eatable click")
            }
                

        } else { // our piece

            if (allDrawState[col_id][row_id] == true) { // second click
                clearBoard(setDrawState);
                console.log("second click")
            } 

            else { // first click, selecting
                clearBoard(setDrawState);
                
                // select the piece
                setSelectedPiece({...Object.values(piece_in)[0]});
                

                console.log(Object.values(piece_in)[0])
                
                let localBoardInverse = [...boardInverseGeneral.current]
                console.log("local board Inverse before error: ", localBoardInverse)
                let is_it_blocked = isNotBlocked({...Object.values(piece_in)[0], turn, initBoardGeneral, boardInverseGeneral: localBoardInverse})
                console.log("Ok, is it blocked ? : ", is_it_blocked)

                let localInitBoardGeneral = [...initBoardGeneral.current]
                let args = {...Object.values(piece_in)[0], setDrawState, turn, isCheck, colsAndRows, is_it_blocked, playerTurn, 
                             initBoardGeneral: localInitBoardGeneral, boardInverseGeneral: localBoardInverse}
                // handle this issue later ^^^^^^^^^^^^^
                console.log(args)

                // IN here there is a mistake on drawing the pawn that could eat right
                drawPossibleMoves(args)
            }
            
        }
    }    
}

interface Move {
    type: string
    from_col: number
    from_row: number
    piece_name: string
    to_col: number
    to_row: number
    upgrade_to: string
}

/*
    Funtion to realize moves coming from server, receiving                                 
*/
function makeOpponentMove(move: Move, setIsCheck: React.Dispatch, setCheckingPiece: React.Dispatch, setColsAndRows: React.Dispatch,
                            setTurn: React.Dispatch, turn: string, initboardGeneral: RefObject<{}[]>,
                            boardInverseGeneral: RefObject<{}[]>, playerTurn: RefObject<string>, setIsUpgradingMove: React.Dispatch, isUpgradingMove: number){

    console.log("OK now we need to do the move: ", move)

    move.from_row = 7 - move.from_row
    move.to_row = 7 - move.to_row
    move.from_col = 7 - move.from_col
    move.to_col = 7 - move.to_col

    let is_upgrade_local = isUpgradingMove
    let old_to_row = move.to_row

    console.log("translated move: ", move)
    console.log("current initBoard: ", initboardGeneral.current)
    console.log("current boardInverseGeneral: ", boardInverseGeneral.current)
    console.log("player Turn: ", playerTurn.current)

    if (move.type == "Upgrade"){
        console.log("Upgrade to :", move.upgrade_to)

        //setIsUpgradingMove(move.to_col)
        is_upgrade_local = move.to_col
        

        switch (move.upgrade_to) {
            case "queen":
              move.to_row = 0;
              break;
            case "rook":
              move.to_row = 1;
              break;
            case "bishop":
              move.to_row = 2;
              break;
            case "knight":
              move.to_row = 3;
              break;
        }
    }
  
    let piece = getPiece(move.from_col, move.from_row, true, boardInverseGeneral.current)
    console.log("Looking for ", move.from_col, move.from_row)
    console.log("Piece found is ", piece)

    let piece_in = null
    for (let key in initboardGeneral.current){ // key is just index here
        
        if (Object.keys(initboardGeneral.current[key])[0] == piece){
            
            piece_in = initboardGeneral.current[key]
            console.log("piece_in here: ",piece_in)
            break;
        }
    }
    if (piece_in == null) {console.log("There should be an ERROR"); return;}
    let custom_selected_piece = {...Object.values(piece_in)[0]}
    console.log("For opponent custom selected piece is: ", custom_selected_piece)
    console.log("moving to col:", move.to_col, " to row: ", move.to_row)

    let piece_there = getPiece(move.to_col, move.to_row, true, boardInverseGeneral.current, false)
    
    let updated_piece
    if (piece_there == null){
        updated_piece = makeMove(move.to_col, move.to_row, null, custom_selected_piece, null, initboardGeneral,
                                  boardInverseGeneral, setIsUpgradingMove, is_upgrade_local)
    } else {
        updated_piece = takePiece(move.to_col, move.to_row, custom_selected_piece, null, initboardGeneral, boardInverseGeneral, setIsUpgradingMove, isUpgradingMove)
    }
    
    if (move.type == "Upgrade"){
        //setIsUpgradingMove(-1)
        move.to_row = old_to_row
    }
    
    // check if the piece in the given location can thread the opponent king
    let is_check_local = isCheckCondition(move.to_col, move.to_row, initboardGeneral.current, boardInverseGeneral.current) 
    setIsCheck(is_check_local)

    let is_indirect_check_local = isIndirectCheckCondition(turn, initboardGeneral.current, boardInverseGeneral.current);

    
    if (is_check_local && is_indirect_check_local != null && is_check_local == is_indirect_check_local){
        throw new Error();
    } else if (is_check_local) {
        
        setCheckingPiece({...updated_piece})
        // console.log("check came by: ", updated_piece)
        let cols_and_rows = setMoveablePieces(playerTurn.current, updated_piece, setColsAndRows, initboardGeneral.current)
        // console.log("real cols and rows: ", cols_and_rows)
        setColsAndRows([...cols_and_rows])

    } else if (is_indirect_check_local != null){

        console.log("Opponent INDIRECT check path")

        setCheckingPiece({...is_indirect_check_local})

        let cols_and_rows = setMoveablePieces(playerTurn.current, is_indirect_check_local, setColsAndRows, initboardGeneral.current)

        setColsAndRows([...cols_and_rows])
        console.log("set cols and rows after opponent move:\n", cols_and_rows)
        setIsCheck(true);

    }
    else {
        setColsAndRows(null)
    }
    
    // for castle moves, do not flip turn for king, rook will handle it
    if (!(move.type == "Castle" && move.piece_name.toLowerCase().includes("rook"))){

        
        setTurn((old: string) => {
            return old == "white" ? "black" : "white" // just flip the turn
        })
    } else {console.log("castle move detected (rook), not flipping the turn")}
    


    console.log("current initBoard: ", initboardGeneral.current)
    console.log("current boardInverseGeneral: ", boardInverseGeneral.current)
    console.log("player Turn: ", playerTurn.current)
    console.log("turn: ", turn)


    console.log("Opponent move is done")

    // - implement after makeMove function protocols
}

/*
    Function to send the given message to the server
*/
function sendMoveToServer(wsInstance: WebSocket|null, msg: Move){
    if (wsInstance) {

        wsInstance.send(JSON.stringify(msg));

    } else {
        throw new Error("websocket connection is not found")
    }
}

const COLORS = {
    WHITE: "white",
    BLACK: "black"
}

// Source - https://stackoverflow.com/a/3710226
// Posted by Gumbo, modified by community. See post 'Timeline' for change history
// Retrieved 2026-06-26, License - CC BY-SA 4.0

function isJsonString(str: string) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

const makeMovingArr = () => Array.from({length: 8}, () => Array(8).fill(false))

export default function Board(){

    const [isGameReady, setIsGameReady] = useState(false);
    const [boardState, setBoardState] = useState()

    const [drawState, setDrawState] = useState(
        [...initDrawState]
    ) // initial state of possible moves

    const initBoardGeneral = useRef<{}[]>(initBoard_fromWhite)
    const boardInverseGeneral = useRef<{}[]>(boardInverse_fromWhite)

    const [selectedPiece, setSelectedPiece] = useState<Piece>({...nullPiece});

    const [turn, setTurn] = useState<string>("white")
    //const [playerTurn, setPlayerTurn] = useState<string>("") 
    const playerTurn = useRef("")

    // NOTE: We need to and these two when clicking to a piece

    const [isCheck, setIsCheck] = useState<boolean>(false)
    const [checkingPiece, setCheckingPiece] = useState<Piece>({...nullPiece})
    const [colsAndRows, setColsAndRows] = useState<null|{row:number, col: number}[]>(null)
    const [isUpgradingMove, setIsUpgradingMove] = useState<number>(-1)

    // mouseHold move
    const [isMovingArr, setIsMovingArr] = useState<boolean[][]>(makeMovingArr)
    const [isMouseMove, setIsMouseMove] = useState<boolean>(false)
    const [mouseLoc, setMouseLoc] = useState<{x:number, y:number}>({x: 0, y: 0})


    function mouseUp(){
        console.log("Mouse is up")
        setIsMovingArr(makeMovingArr())
        setIsMouseMove(false)
    }

    function handleMouseMove(e: React.MouseEvent){
        if (isMouseMove){
            setMouseLoc({x : e.clientX, y: e.clientY})
        }
    }

    function setIsMoving(col: number, row: number, to_what: boolean, x:number, y:number){

        //if (turn == playerTurn.current){
            setIsMovingArr((old) => {
                old[col][row] = to_what
    
                return [...old]
            })
            setIsMouseMove(true)
            setMouseLoc({x: x, y:y})
        //}
    }
    // end mouseHold move

    const isBrowser = typeof window !== "undefined";
    const [wsInstance, setWsInstance] = useState<WebSocket | null>(null)

    // do the web socket connection
    useEffect(() => {
        console.log(`My turn is ${playerTurn}`)
        if (isBrowser && !isGameReady && !wsInstance) {
            const ws = new WebSocket("ws://localhost:4000")
            setWsInstance(ws)
            
            console.log("websocket is connected")
        } else {
            console.log("not a browser, weird")
        }
    }, [isBrowser, 0])

    useEffect(() => {

        // websocket connection event listeners
        if (wsInstance) {
    
            wsInstance.addEventListener("open", () => {
                console.log("connection created, waiting...")
            })
    
            wsInstance.addEventListener("error", (e) => {
                console.log("error occured in websocket: ", e)
            })
    
            wsInstance.addEventListener("close", () => {
                console.log("webscoket connection closed");
            })
    
            wsInstance.addEventListener("message", (e) => {
                console.log("received message: ", e.data)
                console.log(e)
    
                if (e.data == "GameStarting"){ // game start message

                    console.log("game is starting now")
                    setIsGameReady(true)

                } else if (isJsonString(e.data) && 
                (JSON.parse(e.data).type == "Move" || JSON.parse(e.data).type == "Castle" || JSON.parse(e.data).type == "Upgrade")){ // move message
    
                    makeOpponentMove(JSON.parse(e.data), setIsCheck, setCheckingPiece, setColsAndRows, setTurn, turn, initBoardGeneral,
                                      boardInverseGeneral, playerTurn, setIsUpgradingMove, isUpgradingMove)
                    

                } else if (e.data.includes("opponent")){ // color deciding message

                    if (e.data.includes("white")){

                        console.log("ANNOUNCEMENT: changing player turn to white")
                        playerTurn.current = "white";
                        initBoardGeneral.current = [...initBoard_fromWhite]
                        boardInverseGeneral.current = [...boardInverse_fromWhite]
                        if (!e.data.includes("do_not_sent_back")) {
                            wsInstance.send("youre black (opponent) do_not_sent_back")
                        }
                            
                    } else {

                        console.log("ANNOUNCEMENT: changing player turn to black")
                        playerTurn.current = "black";
                        initBoardGeneral.current = [...initBoard_fromBlack]
                        boardInverseGeneral.current = [...boardInverse_fromBlack]
                        if (!e.data.includes("do_not_sent_back")) {
                            wsInstance.send("youre white (opponent) do_not_sent_back")
                        }
                    }
                } else { // error case
                    console.log(typeof((e.data)))
    
                    console.log("Unexpected message: ", e.data)
                }
            })
        }
    }, [wsInstance])
    


    let columns = []
    for (let i = 0; i<BOARD_SIZE; i++){
        columns.push(i)
    }
    let displayColumns: React.JSX.Element = []

    
    columns.map((elem, index) => {        
        displayColumns.push(
        <Column 
            key={index} 
            id={index} 
            allDrawState={drawState} 
            drawState={drawState[index]} 
            setDrawState={setDrawState} 
            setSelectedPiece={setSelectedPiece}
            selectedPiece={selectedPiece}
            turn={turn}
            setTurn={setTurn}
            setIsCheck={setIsCheck}
            isCheck={isCheck}
            checkingPiece={checkingPiece} 
            setCheckingPiece={setCheckingPiece}
            colsAndRows={colsAndRows}
            setColsAndRows={setColsAndRows}
            wsInstance={wsInstance}
            playerTurn={playerTurn}
            initBoardGeneral={initBoardGeneral}
            boardInverseGeneral={boardInverseGeneral}
            setIsUpgradingMove={setIsUpgradingMove}
            isUpgradingMove={isUpgradingMove}
            isMovingArrColumn={isMovingArr[index]}
            setIsMoving={setIsMoving}
            mouseLoc={mouseLoc}
        />)
    })
    

    return(
        <>
            <div className="Board flex m-5 " onMouseUp={mouseUp} onMouseMove={(e) =>  handleMouseMove(e)}>
                {isGameReady ? displayColumns : <div>Game searching ... Wait</div>}
            </div>
        </>
    )
}

interface ColumnProps {
    id: number;
    allDrawState: boolean[][];
    drawState: boolean[];
    setDrawState: React.Dispatch<React.SetStateAction<boolean[][]>>
    setSelectedPiece: React.Dispatch
    selectedPiece: Piece
    turn: string
    setTurn: React.Dispatch
    setIsCheck: React.Dispatch
    isCheck: boolean
    checkingPiece: Piece
    setCheckingPiece: React.Dispatch
    colsAndRows: null|{row:number, col:number}[]
    setColsAndRows: React.Dispatch
    wsInstance: WebSocket | null
    playerTurn: RefObject<string>
    initBoardGeneral: RefObject<{}[]>
    boardInverseGeneral: RefObject<{}[]>
    setIsUpgradingMove: React.Dispatch
    isUpgradingMove: number
    isMovingArrColumn: boolean[]
    setIsMoving: (col: number, row: number, to_what: boolean, x:number, y:number) => void
    mouseLoc: {x:number, y:number}
}

function Column({id, allDrawState, drawState, setDrawState, setSelectedPiece, selectedPiece, turn, setTurn, setIsCheck,
                 isCheck, checkingPiece, setCheckingPiece, colsAndRows, setColsAndRows, wsInstance, playerTurn, initBoardGeneral,
                 boardInverseGeneral, setIsUpgradingMove, isUpgradingMove, isMovingArrColumn, setIsMoving, mouseLoc} : ColumnProps){

    let squares = Array()
    for (let i = 0; i<BOARD_SIZE; i++){
        squares.push(i)
    }

    let displaySquare: React.JSX.Element = []

    
    squares.map((elem, index) => {

        let color = index % 2 == 0 ? (id % 2 == 0 ? "bg-chess-light" : "bg-chess-dark") : (id % 2 == 0 ? "bg-chess-dark" : "bg-chess-light")
        let label_color = color == "bg-chess-dark" ? "text-chess-light" : "text-chess-dark"
        displaySquare.push(
            <Square 
            key={id*10 + index} 
            col_id={id} 
            row_id={index} 
            color={color}
            label_color={label_color}
            setDrawState={setDrawState}
            drawState={drawState[index]}
            allDrawState={allDrawState}
            setSelectedPiece={setSelectedPiece}
            selectedPiece={selectedPiece}
            turn={turn}
            setTurn={setTurn}
            setIsCheck={setIsCheck}
            isCheck={isCheck}
            checkingPiece={checkingPiece}
            setCheckingPiece={setCheckingPiece}
            colsAndRows={colsAndRows}
            setColsAndRows={setColsAndRows}
            wsInstance={wsInstance}
            playerTurn={playerTurn}
            initBoardGeneral={initBoardGeneral}
            boardInverseGeneral={boardInverseGeneral}
            setIsUpgradingMove={setIsUpgradingMove}
            isUpgradingMove={isUpgradingMove}
            isMovingSquare={isMovingArrColumn[index]}
            setIsMoving={setIsMoving}
            mouseLoc={mouseLoc}
            />
        )
    })
    

    return (
        <>
            <div className="cols">
                {displaySquare}
            </div>
        </>
    )
}

interface SquareProps{
    col_id: number;
    row_id: number;
    color: string;
    label_color: string;
    setDrawState: React.Dispatch<React.SetStateAction<boolean[][]>>;
    drawState: boolean;
    allDrawState: boolean[][];
    setSelectedPiece: React.Dispatch
    selectedPiece: Piece;
    turn: string;
    setTurn: React.Dispatch
    setIsCheck: React.Dispatch
    isCheck: boolean
    checkingPiece: Piece
    setCheckingPiece: React.Dispatch
    colsAndRows: null|{row:number, col:number}[]
    setColsAndRows: React.Dispatch
    wsInstance: WebSocket | null
    playerTurn: RefObject<string>
    initBoardGeneral: RefObject<{}[]>
    boardInverseGeneral: RefObject<{}[]>
    setIsUpgradingMove: React.Dispatch
    isUpgradingMove: number
    isMovingSquare: boolean
    setIsMoving: (col: number, row: number, to_what: boolean, x:number, y:number) => void
    mouseLoc: {x:number, y:number}
}

function Square({col_id, row_id, color, label_color, setDrawState, drawState, allDrawState, setSelectedPiece, selectedPiece, turn, 
                 setTurn, setIsCheck, isCheck, checkingPiece, setCheckingPiece, colsAndRows, setColsAndRows, wsInstance, playerTurn,
                 initBoardGeneral, boardInverseGeneral, setIsUpgradingMove, isUpgradingMove, isMovingSquare, setIsMoving, mouseLoc}: SquareProps){

    let piece = getPiece(col_id, row_id, false, boardInverseGeneral.current) // piece is like wking.svg
    let piece_name = getPiece(col_id, row_id, true, boardInverseGeneral.current)

    if (piece_name && piece_name.includes("upgraded")) {

        piece = piece_name[0].toLowerCase()

        if (piece_name.includes("queen")){
            piece += "Q.svg"
        } else if (piece_name.includes("rook")){
            piece += "R.svg"
        } else if (piece_name.includes("bishop")){
            piece += "B.svg"
        } else if (piece_name.includes("knight")){
            piece += "N.svg"
        }
        
    }

    let isDarken = false

    if (isUpgradingMove == col_id){ // upgrading move column

        if (row_id == 0){ // queen

            piece = playerTurn.current == "white" ? "wQ.svg" : "bQ.svg"
        } else if (row_id == 1){ // rook

            piece = playerTurn.current == "white" ? "wR.svg" : "bR.svg"
        } else if (row_id == 2){ // bishop

            piece = playerTurn.current == "white" ? "wB.svg" : "bB.svg"
        } else if (row_id == 3){ // knight

            piece = playerTurn.current == "white" ? "wN.svg" : "bN.svg"
        } else {
            isDarken = true
        }
    } else if (isUpgradingMove != -1){
        isDarken = true
    }

    let piece_in

    for (let key in initBoardGeneral.current){

        if (piece != null && Object.keys(initBoardGeneral.current[key])[0] == piece_name){
            piece_in = initBoardGeneral.current[key]
        }
    }

    const isOpponent = piece != null && piece_in != null && piece_in[piece_name].color != turn // String(piece).startsWith("w")
    const showCaptureMarker = drawState && isOpponent
    const showDotMarker = drawState && piece == null
    const showHighlight = drawState && piece != null && !isOpponent

    const bgColor = showHighlight ? "bg-chess-highlight" : color
    const bgHover = showCaptureMarker ? "hover:bg-[#84794E]" : ""

    const isKingChecked = piece != null && isCheck && turn == piece_in[piece_name].color && piece_in[piece_name].kind == "king"
    if (isKingChecked) console.log("check camee!!!!")

    function handleMouseUp(e: React.MouseEvent){
        if (!isMovingSquare){
            console.log("mouse is up on: col", col_id, " row", row_id, " -> making move")
            onclickSquare(col_id, row_id, setDrawState, allDrawState, setSelectedPiece, selectedPiece, turn, setTurn, setIsCheck, 
                isCheck, checkingPiece, setCheckingPiece, colsAndRows, setColsAndRows, wsInstance, playerTurn, initBoardGeneral,
                boardInverseGeneral, setIsUpgradingMove, isUpgradingMove)
    
            console.log("onClickSquare must be down after mouse up")
        }
    }


    return (
        <div
          className={`${bgColor} w-25 h-25 relative ${bgHover} `} // ${isDarken ? 'darken' : ''}
          row-id={row_id}
          col-id={col_id}
          style={isDarken ? { filter: 'brightness(0.6) saturate(0.3) drop-shadow(0 2px 4px rgba(0,0,0,0.5))', opacity: '0.85' } : {}}
          onMouseDown={() => onclickSquare(col_id, row_id, setDrawState, allDrawState, setSelectedPiece, selectedPiece, turn, setTurn, setIsCheck, 
            isCheck, checkingPiece, setCheckingPiece, colsAndRows, setColsAndRows, wsInstance, playerTurn, initBoardGeneral,
            boardInverseGeneral, setIsUpgradingMove, isUpgradingMove)}
        
          onMouseUp={(e) => handleMouseUp(e)}
        >
          {/* Şah işareti */}
          {isKingChecked && (
            <div className="absolute inset-0 z-10 pointer-events-none rounded-sm"
              style={{
                background: "radial-gradient(circle, rgb(250, 18, 18) 0%, rgba(247, 22, 22, 0.95) 35%, rgba(200,0,0,0.6) 65%, rgba(158,0,0,0) 100%)"
              }}
            />
          )}
        
          {piece != null && 
          <Piece piece={piece} key={col_id*10 + row_id} isMovingPiece={isMovingSquare} setIsMoving={setIsMoving} col_id={col_id} row_id={row_id} mouseLoc={mouseLoc}/>}
          {col_id == 7 && (
            <span className={`${label_color} text-xs absolute top-0 right-0 p-1 z-20`}>
              {8 - row_id}
            </span>
          )}
          {showDotMarker && (
            <div className="bg-gray-500 w-7 h-7 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20" />
          )}
          {showCaptureMarker && (
            <div className="absolute inset-0 z-20 pointer-events-none">
              <div className="absolute top-0 left-0 w-4 h-4 bg-[#84794E] [clip-path:polygon(0_0,100%_0,0_100%)]" />
              <div className="absolute top-0 right-0 w-4 h-4 bg-[#84794E] [clip-path:polygon(0_0,100%_0,100%_100%)]" />
              <div className="absolute bottom-0 left-0 w-4 h-4 bg-[#84794E] [clip-path:polygon(0_0,0_100%,100%_100%)]" />
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#84794E] [clip-path:polygon(100%_0,100%_100%,0_100%)]" />
            </div>
          )}
        </div>
    )
}
// <img src={piece} className="relative z-20" />
interface PieceProps {
    piece: string
    isMovingPiece: boolean
    setIsMoving: (col: number, row: number, to_what: boolean, x:number, y:number) => void
    col_id: number
    row_id: number
    mouseLoc: {x:number, y:number}
}

function Piece({piece, isMovingPiece, setIsMoving, col_id, row_id, mouseLoc} : PieceProps){
    

 

  let moving_styles = isMovingPiece ? {position: "fixed", left: mouseLoc.x - 45, top: mouseLoc.y - 45, height: 90, width: 90, pointerEvents: "none", zIndex: 1000} :
     {position: "relative", left: 0, top: 0}

    return (
        <div style={{backgroundImage: `url(${piece})`, height: '100%', width: '100%', cursor: "grab", ...moving_styles} as React.CSSProperties} 
             onMouseDown={(e) => {e.preventDefault();setIsMoving(col_id, row_id, true, e.clientX, e.clientY);}} >
            
        </div>
    )
}
//restingPos.current = {x: e.clientX, y: e.clientY}; 