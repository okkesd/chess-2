"use client"

import { React, useState, createContext } from "react"
const BOARD_SIZE = 8

let initBoard = [
    {"W_bishop_black" : {"col": 5, "row": 7, "name": "W_bishop_black", "kind": "bishop", "has_moved": false, "color": "white", "moveable": {leftUp: true, rightUp: true}}},
    {"W_bishop_white" : {"col": 2, "row": 7, "name": "W_bishop_white","kind": "bishop", "has_moved": false, "color": "white", "moveable": {leftUp: true, rightUp: true}}},
    {"W_knight_1" : {"col": 1, "row" : 7, "name": "W_knight_1", "kind": "knight", "has_moved": false, "color": "white", "moveable": true}},
    {"W_knight_2" : {"col": 6, "row": 7, "name": "W_knight_2", "kind": "knight", "has_moved": false, "color": "white", "moveable": true}},
    {"W_rook_1" : {"col": 0, "row": 7, "name": "W_rook_1", "kind": "rook", "has_moved": false, "color": "white", "moveable": {upDown: true, leftRight: true}}},
    {"W_rook_2" : {"col": 7, "row": 7, "name": "W_rook_2", "kind": "rook", "has_moved": false, "color": "white", "moveable": {upDown: true, leftRight: true}}},
    {"W_queen" : {"col": 3, "row": 7, "name": "W_queen", "kind": "queen", "color": "white", "moveable": {upDown: true, leftRight: true, leftUp: true, rightUp: true}}},
    {"W_king" : {"col": 4, "row": 7, "name": "W_king", "kind": "king", "has_moved": false, "color": "white", "moveable": true}},

    {"B_bishop_black" : {"col": 2, "row": 0, "name": "B_bishop_black", "kind": "bishop", "has_moved": false, "color": "black", "moveable": {leftUp: true, rightUp: true}}},
    {"B_bishop_white" : {"col": 5, "row": 0, "name": "B_bishop_white", "kind": "bishop", "has_moved": false, "color": "black", "moveable": {leftUp: true, rightUp: true}}},
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

let boardInverse = [
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
        r0 : "B_bishop_black",
        r1 : "B_pawn_3",
        r2 : "empty",
        r3 : "empty",
        r4 : "empty",
        r5 : "empty",
        r6 : "W_pawn_3",
        r7 : "W_bishop_white",
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
        r0 : "B_bishop_white",
        r1 : "B_pawn_6",
        r2 : "empty",
        r3 : "empty",
        r4 : "empty",
        r5 : "empty",
        r6 : "W_pawn_6",
        r7 : "W_bishop_black",
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

function getPiece(col_id: number, row_id: number, get_name: boolean){
    /*
        Get the piece name or image path by given col_id and row_id
    */

    let obj = boardInverse[col_id]
    if (get_name){
        /*console.log("col_id: ", col_id, "row_id: ", row_id)
console.log("copy in getPiece: ", obj)*/
    }
    
    for (let key in obj){
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

function notKingAdjacent(col: number, row: number, turn: string){
    /*
        Helper function to check if given is a opponent king adjacent to prevent drawing that square
        Returns false if it's king adjacent, else true which passes to draw
    */

    // right down
    let piece = getPiece(col+1, row+1, true)
    if (piece != null){
        for (let key in initBoard){
            let value = Object.values(initBoard[key])[0]
            if (Object.keys(initBoard[key])[0] == piece && value.color != turn && value.kind == "king"){
                return false
            }
        }
    }

    // right
    piece = getPiece(col+1, row, true)
    if (piece != null){
        for (let key in initBoard){
            let value = Object.values(initBoard[key])[0]
            if (Object.keys(initBoard[key])[0] == piece && value.color != turn && value.kind == "king"){
                return false
            }
        }
    }

    // right up
    piece = getPiece(col+1, row-1, true)
    if (piece != null){
        for (let key in initBoard){
            let value = Object.values(initBoard[key])[0]
            if (Object.keys(initBoard[key])[0] == piece && value.color != turn && value.kind == "king"){
                return false
            }
        }
    }

    // down
    piece = getPiece(col, row+1, true)
    if (piece != null){
        for (let key in initBoard){
            let value = Object.values(initBoard[key])[0]
            if (Object.keys(initBoard[key])[0] == piece && value.color != turn && value.kind == "king"){
                return false
            }
        }
    }

    // up
    piece = getPiece(col, row-1, true)
    if (piece != null){
        for (let key in initBoard){
            let value = Object.values(initBoard[key])[0]
            if (Object.keys(initBoard[key])[0] == piece && value.color != turn && value.kind == "king"){
                return false
            }
        }
    }

    // left down
    piece = getPiece(col-1, row+1, true)
    if (piece != null){
        for (let key in initBoard){
            let value = Object.values(initBoard[key])[0]
            if (Object.keys(initBoard[key])[0] == piece && value.color != turn && value.kind == "king"){
                return false
            }
        }
    }

    // left
    piece = getPiece(col-1, row, true)
    if (piece != null){
        for (let key in initBoard){
            let value = Object.values(initBoard[key])[0]
            if (Object.keys(initBoard[key])[0] == piece && value.color != turn && value.kind == "king"){
                return false
            }
        }
    }

    // left up
    piece = getPiece(col-1, row-1, true) 
    if (piece != null){
        for (let key in initBoard){
            let value = Object.values(initBoard[key])[0]
            if (Object.keys(initBoard[key])[0] == piece && value.color != turn && value.kind == "king"){
                return false
            }
        }
    }

    return true
}

// NOTE: This should be traversing the alive pieces of opponent !Important
function notEatable(col: number, row: number, turn: string){
    /*
        Helper function for king to not draw eatable squares
        Returns true if the given square is not Eatable by oppponent, else false which prevents drawing
    */

    // the idea is to traverse every opponent piece and traverse their possible moves like in drawPossibleMoves
    // and if we encounter to the given square location return false

    let opponent_pieces: string[] = []

    // add the opponent pieces (as names)
    for (let key in initBoard){
        if (Object.values(initBoard[key])[0].color != turn) opponent_pieces.push(Object.keys(initBoard[key])[0])
    }

    console.log("for col: ", col, " for row: ", row)
    for (let op_piece in opponent_pieces){

        let piece_col_loc
        let piece_row_loc
        let piece: Object = nullPiece // not sure of this
        for (let key in initBoard){

            if (Object.keys(initBoard[key])[0] == opponent_pieces[op_piece]){
                piece = initBoard[key]
                piece_col_loc = Object.values(initBoard[key])[0].col
                piece_row_loc = Object.values(initBoard[key])[0].row
                break
            }
        }

        if (Object.values(piece)[0].kind == "bishop"){
            console.log("in bishop")
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
                        let piece = getPiece(col_loc, row_loc, true);

                        if (piece == null){
                            //candidates[col_loc][row_loc] = true
                            if (col_loc == col && row_loc == row) return false
                        } else {

                            for (let key in initBoard){

                                if (Object.keys(initBoard[key])[0] == piece && Object.values(initBoard[key])[0].color != turn){
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
                        let piece = getPiece(col_loc_2, row_loc_2, true);

                        if (piece == null){
                            //candidates[col_loc_2][row_loc_2] = true
                            if (col_loc_2 == col && row_loc_2 == row) return false
                        } else {

                            for (let key in initBoard){

                                if (Object.keys(initBoard[key])[0] == piece && Object.values(initBoard[key])[0].color != turn){
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
                        let piece = getPiece(col_loc_3, row_loc_3, true);

                        if (piece == null){
                            //candidates[col_loc_3][row_loc_3] = true
                            if (col_loc_3 == col && row_loc_3 == row) return false
                        } else {

                            for (let key in initBoard){

                                if (Object.keys(initBoard[key])[0] == piece && Object.values(initBoard[key])[0].color != turn){
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
                        let piece = getPiece(col_loc_4, row_loc_4, true);

                        if (piece == null){
                            //candidates[col_loc_4][row_loc_4] = true
                            if (col_loc_4 == col && row_loc_4 == row) return false
                        } else {

                            for (let key in initBoard){

                                if (Object.keys(initBoard[key])[0] == piece && Object.values(initBoard[key])[0].color != turn){
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

        console.log("in knight")    
            if (piece_col_loc - 2 >= 0){

                    if (piece_row_loc +1 <= 7){

                        let piece = getPiece(piece_col_loc-2, piece_row_loc+1, true)
                        if (piece == null){ // there is no piece, you can draw
                            //candidate[col-2][row+1] = true
                            if (piece_col_loc-2 == col && piece_row_loc+1 == row) return false
                        } else { // there is a piece, make sure it's not black
                            for (let key in initBoard){
                                if (Object.keys(initBoard[key])[0] == piece && Object.values(initBoard[key])[0].color != turn){
                                    //candidate[col-2][row+1] = true
                                    if (piece_col_loc-2 == col && piece_row_loc+1 == row) return false
                                }
                            }
                        }

                        
                    }
                    if (piece_row_loc -1 >= 0){

                        let piece = getPiece(piece_col_loc-2, piece_row_loc-1, true)
                        if (piece == null){ // there is no piece, draw
                            //candidate[col-2][row-1] = true
                            if (piece_col_loc-2 == col && piece_row_loc-1 == row) return false

                        } else { // there is a piece, if it's not black -> draw
                    
                            for (let key in initBoard){
                                if (Object.keys(initBoard[key])[0] == piece && Object.values(initBoard[key])[0].color != turn){
                                    //candidate[col-2][row-1] = true
                                    if (piece_col_loc-2 == col && piece_row_loc-1 == row) return false
                                }
                            }
                        }
                        
                    }

            }  
                if (piece_col_loc +2 <= 7){

                    if (piece_row_loc +1 <= 7){
                        let piece = getPiece(piece_col_loc+2, piece_row_loc+1, true)

                        if (piece == null){ // there is no piece, you can draw
                            //candidate[col+2][row+1] = true
                            if (piece_col_loc+2 == col && piece_row_loc+1 == row) return false
                        } else { // there is a piece, make sure it's not black
                            for (let key in initBoard){
                                if (Object.keys(initBoard[key])[0] == piece && Object.values(initBoard[key])[0].color != turn){
                                    //candidate[col+2][row+1] = true
                                    if (piece_col_loc+2 == col && piece_row_loc+1 == row) return false
                                }
                            }
                        }
                        
                    }
                    if (piece_row_loc -1 >= 0){
                        let piece = getPiece(piece_col_loc+2, piece_row_loc-1, true)

                        if (piece == null){ // there is no piece, you can draw
                            //candidate[col+2][row-1] = true
                            if (piece_col_loc+1 == col && piece_row_loc-1 == row) return false
                        } else { // there is a piece, make sure it's not black
                            for (let key in initBoard){
                                if (Object.keys(initBoard[key])[0] == piece && Object.values(initBoard[key])[0].color != turn){
                                    //candidate[col+2][row-1] = true
                                    if (piece_col_loc+2 == col && piece_row_loc-1 == row) return false
                                }
                            }
                        }
                        
                    }
                } 

                if (piece_row_loc +2 <= 7){

                    if (piece_col_loc -1 >= 0){
                        let piece = getPiece(piece_col_loc-1, piece_row_loc+2, true)

                        if (piece == null){ // there is no piece, you can draw
                            //candidate[col-1][row+2] = true
                            if (piece_col_loc-1 == col && piece_row_loc+1 == row) return false
                        } else { // there is a piece, make sure it's not black
                            for (let key in initBoard){
                                if (Object.keys(initBoard[key])[0] == piece && Object.values(initBoard[key])[0].color != turn){
                                    //candidate[col-1][row+2] = true
                                    if (piece_col_loc-1 == col && piece_row_loc+2 == row) return false
                                }
                            }
                        }
                        
                    }
                    if (piece_col_loc +1 <= 7){
                        let piece = getPiece(piece_col_loc+1, piece_row_loc+2, true)

                        if (piece == null){ // there is no piece, you can draw
                            //candidate[col+1][row+2] = true
                            if (piece_col_loc+1 == col && piece_row_loc+2 == row) return false
                        } else { // there is a piece, make sure it's not black
                            for (let key in initBoard){
                                if (Object.keys(initBoard[key])[0] == piece && Object.values(initBoard[key])[0].color != turn){
                                    //candidate[col+1][row+2] = true
                                    if (piece_col_loc+1 == col && piece_row_loc+2 == row) return false
                                }
                            }
                        }
                        
                    }

                }
                if (piece_row_loc -2 >= 0){

                    if (piece_col_loc -1 >= 0){
                        let piece = getPiece(piece_col_loc-1, piece_row_loc-2, true)

                        if (piece == null){ // there is no piece, you can draw
                            //candidate[col-1][row-2] = true
                            if (piece_col_loc-1 == col && piece_row_loc-2 == row) return false
                        } else { // there is a piece, make sure it's not black
                            for (let key in initBoard){
                                if (Object.keys(initBoard[key])[0] == piece && Object.values(initBoard[key])[0].color != turn){
                                    //candidate[col-1][row-2] = true
                                    if (piece_col_loc == col-1 && piece_row_loc-2 == row) return false
                                }
                            }
                        }
                        
                        
                    }
                    if (piece_col_loc +1 <= 7){
                        let piece = getPiece(piece_col_loc+1, piece_row_loc-2, true)

                        if (piece == null){ // there is no piece, you can draw
                            //candidate[col+1][row-2] = true
                            if (piece_col_loc+1 == col && piece_row_loc-2 == row) return false
                        } else { // there is a piece, make sure it's not black
                            for (let key in initBoard){
                                if (Object.keys(initBoard[key])[0] == piece && Object.values(initBoard[key])[0].color != turn){
                                    //candidate[col+1][row-2] = true
                                    if (piece_col_loc+1 == col && piece_row_loc-2 == row) return false
                                }
                            }
                        }
                        
                        
                    }
                }
        } else if (Object.values(piece)[0].kind == "rook"){
 
            console.log("in rook")
                    
            let row_loc = piece_row_loc-1
            let row_loc_2 = piece_row_loc+1
            let col_loc = piece_col_loc-1
            let col_loc_2 = piece_col_loc+1

            while (row_loc >= 0){ // to the up
                        
                let piece = getPiece(piece_col_loc, row_loc, true)
                if (piece == null){ // empty, draw it
                    
                    if (piece_col_loc == col && row_loc == row) return false;
                } else {

                    for (let key in initBoard){
                        if (Object.keys(initBoard[key])[0] == piece && Object.values(initBoard[key])[0].color != turn){
                            
                            if (piece_col_loc == col && row_loc == row) return false;
                            break;
                        }
                    }
                    break;
                }
                row_loc--;
            }

            while (row_loc_2 <= 7){ // to the down 
                
                let piece = getPiece(piece_col_loc, row_loc_2, true);
                if (piece == null) {
                    if (piece_col_loc == col && row_loc_2 == row) return false;
                } else {
                    for (let key in initBoard){
                        if (Object.keys(initBoard[key])[0] == piece && Object.values(initBoard[key])[0].color != turn){
                            
                            if (piece_col_loc == col && row_loc_2 == row) return false;
                            break;
                        }
                    }
                    break;
                }
                row_loc_2++;
            }

            while (col_loc >= 0){ // to the left
                
                let piece = getPiece(col_loc, piece_row_loc, true);
                if (piece == null) {
                    
                    if (col_loc == col && piece_row_loc == row) return false;
                } else {
                    for (let key in initBoard){
                        if (Object.keys(initBoard[key])[0] == piece && Object.values(initBoard[key])[0].color != turn){
                            if (col_loc == col && piece_row_loc == row) return false;
                            break;
                        }
                    }
                    break;
                }
                col_loc--;
            }

            while (col_loc_2 <= 7){ // to the right
                
                let piece = getPiece(col_loc_2, piece_row_loc, true);
                if (piece == null) {
                    
                    if (col_loc_2 == col && piece_row_loc == row) return false;
                } else {
                    for (let key in initBoard){
                        if (Object.keys(initBoard[key])[0] == piece && Object.values(initBoard[key])[0].color != turn){
                            
                            if (col_loc_2 == col && piece_row_loc == row) return false;
                            break;
                        }
                    }
                    break;
                }
                col_loc_2++;
            }

        } else if (Object.values(piece)[0].kind == "queen"){

            console.log("in queen")
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

                    let piece = getPiece(col_loc, row_loc, true);

                    if (piece == null){
                        
                        if (col_loc == col && row_loc == row) return false
                    } else {

                        for (let key in initBoard){

                            if (Object.keys(initBoard[key])[0] == piece && Object.values(initBoard[key])[0].color != turn){
                                
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

                    let piece = getPiece(col_loc_2, row_loc_2, true);

                    if (piece == null){
                        
                        if (col_loc_2 == col && row_loc_2 == row) return false
                    } else {

                        for (let key in initBoard){

                            if (Object.keys(initBoard[key])[0] == piece && Object.values(initBoard[key])[0].color != turn){
                                
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

                    let piece = getPiece(col_loc_3, row_loc_3, true);

                    if (piece == null){
                        
                        if (col_loc_3 == col && row_loc_3 == row) return false
                    } else {

                        for (let key in initBoard){

                            if (Object.keys(initBoard[key])[0] == piece && Object.values(initBoard[key])[0].color != turn){
                                
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

                    let piece = getPiece(col_loc_4, row_loc_4, true);

                    if (piece == null){
                        
                        if (col_loc_4 == col && row_loc_4 == row) return false
                    } else {

                        for (let key in initBoard){

                            if (Object.keys(initBoard[key])[0] == piece && Object.values(initBoard[key])[0].color != turn){
                                
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

                let piece = getPiece(col_loc_5, piece_row_loc, true)
                
                if (piece == null){
                    
                    if (col_loc_5 == col && piece_row_loc == row) return false
                } else {

                    for (let key in initBoard){

                        if (Object.keys(initBoard[key])[0] == piece && Object.values(initBoard[key])[0].color != turn){
                            
                            if (col_loc_5 == col && piece_row_loc == row) return false
                            break
                        }
                    }
                    break
                }

                col_loc_5++;
            }

            while (col_loc_6 >= 0){ // to left

                let piece = getPiece(col_loc_6, piece_row_loc, true)

                if (piece == null){
                    
                    if (col_loc_6 == col && piece_row_loc == row) return false
                } else {

                    for (let key in initBoard){

                        if (Object.keys(initBoard[key])[0] == piece && Object.values(initBoard[key])[0].color != turn){
                            
                            if (col_loc_6 == col && piece_row_loc == row) return false
                            break
                        }
                    }
                    break
                }

                col_loc_6--;
            }

            while (row_loc_5 <= 7){ // to down

                let piece = getPiece(piece_col_loc, row_loc_5, true)
                

                if (piece == null){
                    
                    if (piece_col_loc == col && row_loc_5 == row) return false
                } else {

                    for (let key in initBoard){

                        if (Object.keys(initBoard[key])[0] == piece && Object.values(initBoard[key])[0].color != turn){
                            
                            if (piece_col_loc == col && row_loc_5 == row) return false
                            break
                        }
                    }
                    break
                }

                row_loc_5++;
            }

            while (row_loc_6 >= 0){ // to up

                let piece = getPiece(piece_col_loc, row_loc_6, true)

                if (piece == null){
                    if (piece_col_loc == col && row_loc_6 == row) return false
                } else {

                    for (let key in initBoard){

                        if (Object.keys(initBoard[key])[0] == piece && Object.values(initBoard[key])[0].color != turn){
                            
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
                        
                    let piece = getPiece(piece_col_loc + 1, piece_row_loc - 1, true)
                    if (piece == null){
                        if (piece_col_loc +1 == col && piece_row_loc -1 == row) return false
                    }
                    for (let key in initBoard){ // key is just index here
    
                        if (Object.keys(initBoard[key])[0] == piece && Object.values(initBoard[key])[0].color != turn){
                            
                            if (piece_col_loc +1 == col && piece_row_loc -1 == row) return false
                        }
                    }
                } 
                if (piece_col_loc - 1 >= 0 && piece_row_loc -1 >= 0){
                    let piece = getPiece(piece_col_loc - 1, piece_row_loc -1, true)
                    if (piece == null){
                        if (piece_col_loc-1 == col && piece_row_loc -1 == row) return false
                    }
                    for (let key in initBoard){ // key is just index here        
                        if (Object.keys(initBoard[key])[0] == piece && Object.values(initBoard[key])[0].color != turn){
                            
                            if (piece_col_loc-1 == col && piece_row_loc -1 == row) return false
                        }
                    }
                }
        }

    }

    return true
}

function setMoveablePieces(turn: string, checkingPiece: Piece, setColsAndRows: React.Dispatch){

    // save the king, we probably need it later
    let turn_king = null
    for (let key in initBoard){
        if (Object.values(initBoard[key])[0].kind == "king" && Object.values(initBoard[key])[0].color != turn){

                
                let unknownKey = Object.keys(initBoard[key])[0]
                turn_king = initBoard[key][unknownKey]
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
            while (king_col > checkingPiece.col && king_row < checkingPiece.row){

                cols_and_rows.push({row:  king_row, col: king_col})
                king_col--;
                king_row++;
            }

        } else if (checkingPiece.row > turn_king.rook && checkingPiece.col < turn_king.col){ // king is in right up
console.log("king is in right up")
            let king_col = turn_king.col -1
            let king_row = turn_king.row +1
            while (king_col < checkingPiece.col && king_row > checkingPiece.row){

                cols_and_rows.push({row:  king_row, col: king_col})
                king_col++;
                king_row--;
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
    is_it_blocked: boolean
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
    //turn: string
}

// for now it's working
function isNotBlocked({col, 
    row, 
    name, 
    kind, 
    has_moved, 
    color}: isNotBlockedProps){

    if (kind == "king") return true

    console.log("isNotBlocked: name: ", name, "kind: ", kind, "row,col : ", row, col)

    // find the king
    let turn_king
    for (let key in initBoard){

        if (Object.values(initBoard[key])[0].color == color && Object.values(initBoard[key])[0].kind == "king"){
            let unknownKey = Object.keys(initBoard[key])[0]
            turn_king = initBoard[key][unknownKey]
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
            let obj = boardInverse[col]

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

                            let piece_there = getPiece(col, piece_row_2, true)
                            for (let key in initBoard){
                                if (Object.keys(initBoard[key])[0] == piece_there){
                                
                                    if ((Object.values(initBoard[key])[0].kind == "rook" || Object.values(initBoard[key])[0].kind == "queen")
                                        && Object.values(initBoard[key])[0].color != color){
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
            let obj = boardInverse[col]

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

                            let piece_there = getPiece(col, piece_row_2, true)
                            for (let key in initBoard){
                                if (Object.keys(initBoard[key])[0] == piece_there){
                                
                                    if ((Object.values(initBoard[key])[0].kind == "rook" || Object.values(initBoard[key])[0].kind == "queen")
                                        && Object.values(initBoard[key])[0].color != color){
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

            for (let key in initBoard){

                if (Object.keys(initBoard[key])[0] == name){
                    let unknownKey = Object.keys(initBoard[key])[0]

                    if (early_return_condition){
                        initBoard[key][unknownKey].moveable = {leftEat: true, rightEat: true, forward: true}    
                        break

                    } else {
                        initBoard[key][unknownKey].moveable = {leftEat: false, rightEat: false, forward: true}
                        break
                    }
                    
                }
            }
        } else if (kind == "knight"){
        
            for (let key in initBoard){

                if (Object.keys(initBoard[key])[0] == name){
                    let unknownKey = Object.keys(initBoard[key])[0]

                    if (early_return_condition){
                        initBoard[key][unknownKey].moveable = true
                        break

                    } else {

                        initBoard[key][unknownKey].moveable = false
                        break
                    }
                }
            }
        } else if (kind == "bishop"){
            
            for (let key in initBoard){

                if (Object.keys(initBoard[key])[0] == name){
                    let unknownKey = Object.keys(initBoard[key])[0]
                    
                    if (early_return_condition){
                        initBoard[key][unknownKey].moveable = {leftUp: true, rightUp: true}
                        break

                    } else {
                        initBoard[key][unknownKey].moveable = {leftUp: false, rightUp: false}
                        break
                    }
                    
                }
            }
        } else if (kind == "rook"){

            for (let key in initBoard){

                if (Object.keys(initBoard[key])[0] == name){
                    let unknownKey = Object.keys(initBoard[key])[0]

                    if (early_return_condition){
                        initBoard[key][unknownKey].moveable = {upDown: true, leftRight: true}
                        break

                    } else {
                        initBoard[key][unknownKey].moveable = {upDown: true, leftRight: false}
                        break
                    }
                    
                }
            }
        } else if (kind == "queen"){
            
            for (let key in initBoard){

                if (Object.keys(initBoard[key])[0] == name){
                    let unknownKey = Object.keys(initBoard[key])[0]

                    if (early_return_condition){
                        console.log("queen is NOT blocked, only updown allowed!!!")
                        initBoard[key][unknownKey].moveable = {upDown: true, leftRight: true, leftUp: true, rightUp: true}
                        break

                    } else {
                        console.log("queen is blocked, only updown allowed!!!")
                        initBoard[key][unknownKey].moveable = {upDown: true, leftRight: false, leftUp: false, rightUp: false}
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
            let obj = boardInverse[col]

            // for king
            while (piece_col < turn_king.col){

                for (let key in boardInverse[piece_col]){

                    if (Number(String(key)[1]) == piece_row && boardInverse[piece_col][key] != "empty"){ // if there is another piece between make false
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

                for (let key in boardInverse[piece_col_2]){

                    if (Number(String(key)[1]) == piece_row){
                        console.log("something found in row,col: ", piece_row, piece_col_2)
                        if (boardInverse[piece_col_2][key] != "empty") {

                            let piece_there = getPiece(piece_col_2, piece_row, true)
                            console.log(piece_there)
                            for (let key in initBoard){
                                if (Object.keys(initBoard[key])[0] == piece_there){
                                console.log("a piece found: ", piece_there)

                                    if ((Object.values(initBoard[key])[0].kind == "rook" || Object.values(initBoard[key])[0].kind == "queen")
                                        && Object.values(initBoard[key])[0].color != color){

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

                for (let key in boardInverse[piece_col]){

                    if (Number(String(key)[1]) == piece_row && boardInverse[piece_col][key] != "empty"){ // if there is another piece between make false
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

                for (let key in boardInverse[piece_col_2]){

                    if (Number(String(key)[1]) == piece_row){
                        console.log("something found in row,col: ", piece_row, piece_col_2)
                        if (boardInverse[piece_col_2][key] != "empty") {

                            let piece_there = getPiece(piece_col_2, piece_row, true)
                            console.log(piece_there)
                            for (let key in initBoard){
                                if (Object.keys(initBoard[key])[0] == piece_there){
                                console.log("a piece found: ", piece_there)

                                    if ((Object.values(initBoard[key])[0].kind == "rook" || Object.values(initBoard[key])[0].kind == "queen")
                                        && Object.values(initBoard[key])[0].color != color){

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

            for (let key in initBoard){

                if (Object.keys(initBoard[key])[0] == name){
                    let unknownKey = Object.keys(initBoard[key])[0]

                    if (early_return_condition){
                        initBoard[key][unknownKey].moveable = {leftEat: true, rightEat: true, forward: true}    
                        break

                    } else {
                        initBoard[key][unknownKey].moveable = {leftEat: false, rightEat: false, forward: false}
                        break
                    }
                    
                }
            }
        } else if (kind == "knight"){
        
            for (let key in initBoard){

                if (Object.keys(initBoard[key])[0] == name){
                    let unknownKey = Object.keys(initBoard[key])[0]

                    if (early_return_condition){
                        initBoard[key][unknownKey].moveable = true
                        break

                    } else {

                        initBoard[key][unknownKey].moveable = false
                        break
                    }
                }
            }
        } else if (kind == "bishop"){
            
            for (let key in initBoard){

                if (Object.keys(initBoard[key])[0] == name){
                    let unknownKey = Object.keys(initBoard[key])[0]
                    
                    if (early_return_condition){
                        initBoard[key][unknownKey].moveable = {leftUp: true, rightUp: true}
                        break

                    } else {
                        initBoard[key][unknownKey].moveable = {leftUp: false, rightUp: false}
                        break
                    }
                    
                }
            }
        } else if (kind == "rook"){

            for (let key in initBoard){

                if (Object.keys(initBoard[key])[0] == name){
                    let unknownKey = Object.keys(initBoard[key])[0]

                    if (early_return_condition){
                        initBoard[key][unknownKey].moveable = {upDown: true, leftRight: true}
                        break

                    } else {
                        initBoard[key][unknownKey].moveable = {upDown: false, leftRight: true}
                        break
                    }
                    
                }
            }
        } else if (kind == "queen"){
            
            for (let key in initBoard){

                if (Object.keys(initBoard[key])[0] == name){
                    let unknownKey = Object.keys(initBoard[key])[0]

                    if (early_return_condition){
                        console.log("queen is NOT blocked, only updown allowed!!!")
                        initBoard[key][unknownKey].moveable = {upDown: true, leftRight: true, leftUp: true, rightUp: true}
                        break

                    } else {
                        console.log("queen is blocked, only updown allowed!!!")
                        initBoard[key][unknownKey].moveable = {upDown: false, leftRight: true, leftUp: false, rightUp: false}
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

                    for (let key in boardInverse[piece_col]){

                        if (Number(String(key)[1]) == piece_row && boardInverse[piece_col][key] != "empty"){ // if there is another piece between make false
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

                while (piece_col_2 >= 0 && piece_row_2 >= 0){

                    for (let key in boardInverse[piece_col_2]){

                        if (Number(String(key)[1]) == piece_row_2 && boardInverse[piece_col_2][key] != "empty"){
                            let piece = getPiece(piece_col_2, piece_row_2, true)
                            
                            for (let key in initBoard){
                                
                                if (Object.keys(initBoard[key])[0] == piece){

                                    console.log("keys : ", Object.keys(initBoard[key])[0])
                                    console.log("info: ", Object.values(initBoard[key])[0])
                                    console.log("piece: ", piece)

                                    if ((Object.values(initBoard[key])[0].kind == "queen" || Object.values(initBoard[key])[0].kind == "bishop") 
                                        && Object.values(initBoard[key])[0].color != color){
                                    
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

                    for (let key in boardInverse[piece_col]){

                        if (Number(String(key)[1]) == piece_row && boardInverse[piece_col][key] != "empty"){ // if there is another piece between make false
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

                    for (let key in boardInverse[piece_col_2]){

                        if (Number(String(key)[1]) == piece_row && boardInverse[piece_col_2][key] != "empty"){
                            let piece = getPiece(piece_col_2, piece_row_2, true)
                            
                            for (let key in initBoard){
                                
                                if (Object.keys(initBoard[key])[0] == piece){

                                    if ((Object.values(initBoard[key])[0].kind == "queen" || Object.values(initBoard[key])[0].kind == "bishop") 
                                        && Object.values(initBoard[key])[0].color != color){
                                    
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

                for (let key in initBoard){
    
                    if (Object.keys(initBoard[key])[0] == name){
                        let unknownKey = Object.keys(initBoard[key])[0]
    
                        if (early_return_condition){
                            initBoard[key][unknownKey].moveable = {leftEat: true, rightEat: true, forward: true}    
                            break
    
                        } else {
                            initBoard[key][unknownKey].moveable = {leftEat: true, rightEat: false, forward: false}
                            break
                        }
                        
                    }
                }
            } else if (kind == "knight"){
            
                for (let key in initBoard){
    
                    if (Object.keys(initBoard[key])[0] == name){
                        let unknownKey = Object.keys(initBoard[key])[0]
    
                        if (early_return_condition){
                            initBoard[key][unknownKey].moveable = true
                            break
    
                        } else {
    
                            initBoard[key][unknownKey].moveable = false
                            break
                        }
                    }
                }
            } else if (kind == "bishop"){
                
                for (let key in initBoard){
    
                    if (Object.keys(initBoard[key])[0] == name){
                        let unknownKey = Object.keys(initBoard[key])[0]
                        
                        if (early_return_condition){
                            initBoard[key][unknownKey].moveable = {leftUp: true, rightUp: true}
                            break
    
                        } else {
                            initBoard[key][unknownKey].moveable = {leftUp: true, rightUp: false}
                            break
                        }
                        
                    }
                }
            } else if (kind == "rook"){
    
                for (let key in initBoard){
    
                    if (Object.keys(initBoard[key])[0] == name){
                        let unknownKey = Object.keys(initBoard[key])[0]
    
                        if (early_return_condition){
                            initBoard[key][unknownKey].moveable = {upDown: true, leftRight: true}
                            break
    
                        } else {
                            initBoard[key][unknownKey].moveable = {upDown: false, leftRight: false}
                            break
                        }
                        
                    }
                }
            } else if (kind == "queen"){
                
                for (let key in initBoard){
    
                    if (Object.keys(initBoard[key])[0] == name){
                        let unknownKey = Object.keys(initBoard[key])[0]
    
                        if (early_return_condition){
                            console.log("queen is NOT blocked, only updown allowed!!!")
                            initBoard[key][unknownKey].moveable = {upDown: true, leftRight: true, leftUp: true, rightUp: true}
                            break
    
                        } else {
                            console.log("queen is blocked, only updown allowed!!!")
                            initBoard[key][unknownKey].moveable = {upDown: false, leftRight: false, leftUp: true, rightUp: false}
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

                    for (let key in boardInverse[piece_col]){

                        if (Number(String(key)[1]) == piece_row && boardInverse[piece_col][key] != "empty"){ // if there is another piece between make false
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

                    for (let key in boardInverse[piece_col_2]){
                        console.log("piece_row_2: ", piece_row_2, "piece_col_2", piece_col_2)

                        if (Number(String(key)[1]) == piece_row_2 && boardInverse[piece_col_2][key] != "empty"){
                            let piece = getPiece(piece_col_2, piece_row_2, true)
                            
                            for (let key in initBoard){
                                
                                if (Object.keys(initBoard[key])[0] == piece){
                                    console.log("keys : ", Object.keys(initBoard[key])[0])
                                    console.log("info: ", Object.values(initBoard[key])[0])
                                    console.log("piece: ", piece)

                                    if ((Object.values(initBoard[key])[0].kind == "queen" || Object.values(initBoard[key])[0].kind == "bishop") 
                                        && Object.values(initBoard[key])[0].color != color){
                                    
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

                    for (let key in boardInverse[piece_col]){

                        if (Number(String(key)[1]) == piece_row && boardInverse[piece_col][key] != "empty"){ // if there is another piece between make false
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

                    for (let key in boardInverse[piece_col_2]){

                        if (Number(String(key)[1]) == piece_row && boardInverse[piece_col_2][key] != "empty"){
                            let piece = getPiece(piece_col_2, piece_row_2, true)
                            
                            for (let key in initBoard){
                                
                                if (Object.keys(initBoard[key])[0] == piece){
                                    if ((Object.values(initBoard[key])[0].kind == "queen" || Object.values(initBoard[key])[0].kind == "bishop") 
                                        && Object.values(initBoard[key])[0].color != color){
                                    
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

                for (let key in initBoard){
    
                    if (Object.keys(initBoard[key])[0] == name){
                        let unknownKey = Object.keys(initBoard[key])[0]
    
                        if (early_return_condition){
                            initBoard[key][unknownKey].moveable = {leftEat: true, rightEat: true, forward: true}    
                            break
    
                        } else {
                            initBoard[key][unknownKey].moveable = {leftEat: false, rightEat: true, forward: false}
                            break
                        }
                        
                    }
                }
            } else if (kind == "knight"){
            
                for (let key in initBoard){
    
                    if (Object.keys(initBoard[key])[0] == name){
                        let unknownKey = Object.keys(initBoard[key])[0]
    
                        if (early_return_condition){
                            initBoard[key][unknownKey].moveable = true
                            break
    
                        } else {
    
                            initBoard[key][unknownKey].moveable = false
                            break
                        }
                    }
                }
            } else if (kind == "bishop"){
                
                for (let key in initBoard){
    
                    if (Object.keys(initBoard[key])[0] == name){
                        let unknownKey = Object.keys(initBoard[key])[0]
                        
                        if (early_return_condition){
                            initBoard[key][unknownKey].moveable = {leftUp: true, rightUp: true}
                            break
    
                        } else {
                            initBoard[key][unknownKey].moveable = {leftUp: false, rightUp: true}
                            break
                        }
                        
                    }
                }
            } else if (kind == "rook"){
    
                for (let key in initBoard){
    
                    if (Object.keys(initBoard[key])[0] == name){
                        let unknownKey = Object.keys(initBoard[key])[0]
    
                        if (early_return_condition){
                            initBoard[key][unknownKey].moveable = {upDown: true, leftRight: true}
                            break
    
                        } else {
                            initBoard[key][unknownKey].moveable = {upDown: false, leftRight: false}
                            break
                        }
                        
                    }
                }
            } else if (kind == "queen"){
                
                for (let key in initBoard){
    
                    if (Object.keys(initBoard[key])[0] == name){
                        let unknownKey = Object.keys(initBoard[key])[0]
    
                        if (early_return_condition){
                            console.log("queen is NOT blocked, only updown allowed!!!")
                            initBoard[key][unknownKey].moveable = {upDown: true, leftRight: true, leftUp: true, rightUp: true}
                            break
    
                        } else {
                            console.log("queen is blocked, only updown allowed!!!")
                            initBoard[key][unknownKey].moveable = {upDown: false, leftRight: false, leftUp: false, rightUp: true}
                            break
                        }
                        
                    }
                }
            }
        }
    }
}

function isIn(col: number, row: number, cols_and_rows: null|{row: number, col: number}[]){
    /*
        Helper function to check if the given row and col is in cols_and_rows
        Used for after check situation to draw only blocking/eating the checking piece
        Return true if it's in, else false
    */

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

function drawPossibleMoves(
    {col, 
    row, 
    name, 
    kind, 
    has_moved, 
    color, 
    moveable,
    setDrawState,
    turn,
    isCheck,
    colsAndRows,
    is_it_blocked} : drawPossibleMovesProps
){
    /*
        Draws the possible moves according to the color, has_moved, kind from the square (col and row)
    */

    console.log("drawPossibleMoves : isCheck: ", isCheck, "cols_and_rows: ", colsAndRows, "moveable: ", moveable)
    if (kind == "pawn"){

        if (has_moved == true){ // draw 1 square

            let col_inc
            let row_inc
            if (color == "black"){ // draw in decendant order of rows

                col_inc = 1
                row_inc = 1   
                
            } else { // white, draw in increasing order of rows

                col_inc = 1
                row_inc = -1
            }

            

            setDrawState( (old: boolean[][]) => {
                    let candidate = [...old];
                    candidate[col][row] = true;
                    
                    if (row + row_inc < 8 && moveable.forward){ // draw only if the next square is empty
                        let piece = getPiece(col, row + row_inc, true)
                        //console.log("get piece for col: ", col, "row: ", row + row_inc)
                        
                        if (piece == null){ 
                            isIn(col, row+row_inc, colsAndRows) ? candidate[col][row+row_inc] = true : undefined;
                        }
                    }
                    
                    if (col + col_inc < 8 && row + row_inc < 8 && moveable.rightEat){
                        console.log("get piece for col: ", col + col_inc, "row: ", row + row_inc)
                        let piece = getPiece(col + col_inc, row + row_inc, true)

                        for (let key in initBoard){ // key is just index here
        
                            if (Object.keys(initBoard[key])[0] == piece && Object.values(initBoard[key])[0].color != turn){

                                isIn(col+col_inc, row+row_inc, colsAndRows) ? candidate[col + col_inc][row+row_inc] = true: undefined;
                            }
                        }

                    } 

                    if (col - col_inc >= 0 && row +row_inc <= 7 && moveable.leftEat){
                        console.log("get piece for col: ", col - col_inc, "row: ", row + row_inc)
                        let piece = getPiece(col - col_inc, row + row_inc, true)

                        for (let key in initBoard){ // key is just index here
        
                            if (Object.keys(initBoard[key])[0] == piece && Object.values(initBoard[key])[0].color != turn){

                                isIn(col-col_inc, row+row_inc, colsAndRows) ? candidate[col - col_inc][row + row_inc] = true: undefined;
                            }
                        }
                    }
                    return candidate
                })
        } else { // draw 2 square

            let row_inc
            if (color == "black"){ // draw in decendant order of rows

                row_inc = 1
                
            } else { // white, draw in increasing order of rows

                row_inc = -1   
            }

            // NOTE: for the first move of the pawn, you should be able to something !Important

            setDrawState( (old: boolean[][]) => {
                    let candidate = [...old];
                    candidate[col][row] = true;

                    // 1 square further
                    let piece = getPiece(col, row+row_inc, true)
                    if (piece == null && moveable.forward){

                        isIn(col, row+row_inc, colsAndRows) ? candidate[col][row+row_inc] = true: undefined;    

                        // 2 square further
                        piece = getPiece(col, row+row_inc*2, true)
                        if (piece == null){ 
                            isIn(col, row+row_inc*2, colsAndRows) ? candidate[col][row+row_inc*2] = true: undefined;
                        }
                    }
                    
                    // eat in cross square
                    if (col-1 >= 0 && moveable.leftEat){
                        
                        piece = getPiece(col-1, row+row_inc, true)
                        for (let key in initBoard){
                            if (Object.keys(initBoard[key])[0] == piece && Object.values(initBoard[key])[0].color != turn){
                                isIn(col-1, row+row_inc, colsAndRows) ? candidate[col-1][row+row_inc] = true : undefined
                                break
                            }
                        }
                    }

                    // eat in cross square
                    if (col+1 <= 7 && moveable.rightEat) {

                        piece = getPiece(col+1, row+row_inc, true)
                        for (let key in initBoard){
                            if (Object.keys(initBoard[key])[0] == piece && Object.values(initBoard[key])[0].color != turn){
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

                        let piece = getPiece(col-2, row+1, true)
                        if (piece == null){ // there is no piece, you can draw
                            isIn(col-2, row+1, colsAndRows) ? candidate[col-2][row+1] = true: undefined
                        } else { // there is a piece, make sure it's not black
                            for (let key in initBoard){
                                if (Object.keys(initBoard[key])[0] == piece && Object.values(initBoard[key])[0].color != turn){
                                    isIn(col-2, row+1, colsAndRows) ? candidate[col-2][row+1] = true: undefined
                                }
                            }
                        }

                        
                    }
                    if (row -1 >= 0){ // up

                        let piece = getPiece(col-2, row-1, true)
                        if (piece == null){ // there is no piece, draw
                            isIn(col-2, row-2, colsAndRows) ? candidate[col-2][row-1] = true: undefined

                        } else { // there is a piece, if it's not black -> draw
                    
                            for (let key in initBoard){
                                if (Object.keys(initBoard[key])[0] == piece && Object.values(initBoard[key])[0].color != turn){
                                    isIn(col-2, row-1, colsAndRows) ? candidate[col-2][row-1] = true: undefined
                                }
                            }
                        }
                        
                    }

                }  
                if (col +2 <= 7 && moveable){ // right side

                    if (row +1 <= 7){
                        let piece = getPiece(col+2, row+1, true)

                        if (piece == null){ // there is no piece, you can draw
                            isIn(col+2, row+1, colsAndRows) ? candidate[col+2][row+1] = true: undefined
                        } else { // there is a piece, make sure it's not black
                            for (let key in initBoard){
                                if (Object.keys(initBoard[key])[0] == piece && Object.values(initBoard[key])[0].color != turn){
                                    isIn(col+2, row+1, colsAndRows) ? candidate[col+2][row+1] = true: undefined
                                }
                            }
                        }
                        
                    }
                    if (row -1 >= 0){
                        let piece = getPiece(col+2, row-1, true)

                        if (piece == null){ // there is no piece, you can draw
                            isIn(col+2, row-1, colsAndRows) ? candidate[col+2][row-1] = true: undefined
                        } else { // there is a piece, make sure it's not black
                            for (let key in initBoard){
                                if (Object.keys(initBoard[key])[0] == piece && Object.values(initBoard[key])[0].color != turn){
                                    isIn(col+2, row-1, colsAndRows) ? candidate[col+2][row-1] = true: undefined
                                }
                            }
                        }
                        
                    }
                } 

                if (row +2 <= 7 && moveable){ // down

                    if (col -1 >= 0){
                        let piece = getPiece(col-1, row+2, true)

                        if (piece == null){ // there is no piece, you can draw
                            isIn(col-1, row+2, colsAndRows) ? candidate[col-1][row+2] = true: undefined
                        } else { // there is a piece, make sure it's not black
                            for (let key in initBoard){
                                if (Object.keys(initBoard[key])[0] == piece && Object.values(initBoard[key])[0].color != turn){
                                    isIn(col-1, row+2, colsAndRows) ? candidate[col-1][row+2] = true: undefined
                                }
                            }
                        }
                        
                    }
                    if (col +1 <= 7){
                        let piece = getPiece(col+1, row+2, true)

                        if (piece == null){ // there is no piece, you can draw
                            isIn(col+1, row+2, colsAndRows) ? candidate[col+1][row+2] = true: undefined
                        } else { // there is a piece, make sure it's not black
                            for (let key in initBoard){
                                if (Object.keys(initBoard[key])[0] == piece && Object.values(initBoard[key])[0].color != turn){
                                    isIn(col+1, row+2, colsAndRows) ? candidate[col+1][row+2] = true: undefined
                                }
                            }
                        }
                        
                    }

                }
                if (row -2 >= 0 && moveable){ // up

                    if (col -1 >= 0){ // up-left
                        let piece = getPiece(col-1, row-2, true)

                        if (piece == null){ // there is no piece, you can draw
                            isIn(col-1, row-2, colsAndRows) ? candidate[col-1][row-2] = true: undefined
                        } else { // there is a piece, make sure it's not black
                            for (let key in initBoard){
                                if (Object.keys(initBoard[key])[0] == piece && Object.values(initBoard[key])[0].color != turn){
                                    isIn(col-1, row-2, colsAndRows) ? candidate[col-1][row-2] = true: undefined
                                }
                            }
                        }
                        
                        
                    }
                    if (col +1 <= 7){ // up-right
                        let piece = getPiece(col+1, row-2, true)

                        if (piece == null){ // there is no piece, you can draw
                            isIn(col+1, row-2, colsAndRows) ? candidate[col+1][row-2] = true: undefined
                        } else { // there is a piece, make sure it's not black
                            for (let key in initBoard){
                                if (Object.keys(initBoard[key])[0] == piece && Object.values(initBoard[key])[0].color != turn){
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
                        
                        let piece = getPiece(col, row_loc, true)
                        if (piece == null){ // empty, draw it
                            isIn(col, row_loc, colsAndRows) ? candidates[col][row_loc] = true: undefined
                        } else {

                            for (let key in initBoard){
                                if (Object.keys(initBoard[key])[0] == piece && Object.values(initBoard[key])[0].color != turn){
                                    isIn(col, row_loc, colsAndRows) ? candidates[col][row_loc] = true : undefined
                                    break;
                                }
                            }
                            break;
                        }
                        row_loc--;
                    }

                    while (row_loc_2 <= 7 && moveable.upDown){ // to the down 
                        
                        let piece = getPiece(col, row_loc_2, true);
                        if (piece == null) {
                            isIn(col, row_loc_2, colsAndRows) ? candidates[col][row_loc_2] = true: undefined
                        } else {

                            for (let key in initBoard){

                                if (Object.keys(initBoard[key])[0] == piece && Object.values(initBoard[key])[0].color != turn){
                                    isIn(col, row_loc_2, colsAndRows) ? candidates[col][row_loc_2] = true : undefined;
                                    break;
                                }
                            }
                            break;
                        }
                        row_loc_2++;
                    }

                    while (col_loc >= 0 && moveable.leftRight){ // to the left
                        
                        let piece = getPiece(col_loc, row, true);
                        if (piece == null) {
                            isIn(col_loc, row, colsAndRows) ? candidates[col_loc][row] = true: undefined
                        } else {

                            for (let key in initBoard){

                                if (Object.keys(initBoard[key])[0] == piece && Object.values(initBoard[key])[0].color != turn){
                                    isIn(col_loc, row, colsAndRows) ? candidates[col_loc][row] = true: undefined;
                                    break;
                                }
                            }
                            break;
                        }
                        col_loc--;
                    }

                    while (col_loc_2 <= 7 && moveable.leftRight){ // to the right
                        
                        let piece = getPiece(col_loc_2, row, true);
                        if (piece == null) {
                            isIn(col_loc_2, row, colsAndRows) ? candidates[col_loc_2][row] = true: undefined
                        } else {

                            for (let key in initBoard){

                                if (Object.keys(initBoard[key])[0] == piece && Object.values(initBoard[key])[0].color != turn){
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
                        let piece = getPiece(col_loc, row_loc, true);

                        if (piece == null){
                            isIn(col_loc, row_loc, colsAndRows) ? candidates[col_loc][row_loc] = true : undefined
                        } else {

                            for (let key in initBoard){

                                if (Object.keys(initBoard[key])[0] == piece && Object.values(initBoard[key])[0].color != turn){
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
                        let piece = getPiece(col_loc_2, row_loc_2, true);

                        if (piece == null){
                            isIn(col_loc_2, row_loc_2, colsAndRows) ? candidates[col_loc_2][row_loc_2] = true : undefined
                        } else {

                            for (let key in initBoard){

                                if (Object.keys(initBoard[key])[0] == piece && Object.values(initBoard[key])[0].color != turn){
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
                        let piece = getPiece(col_loc_3, row_loc_3, true);

                        if (piece == null){
                            isIn(col_loc_3, row_loc_3, colsAndRows) ? candidates[col_loc_3][row_loc_3] = true : undefined
                        } else {

                            for (let key in initBoard){

                                if (Object.keys(initBoard[key])[0] == piece && Object.values(initBoard[key])[0].color != turn){
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
                        let piece = getPiece(col_loc_4, row_loc_4, true);

                        if (piece == null){
                            isIn(col_loc_4, row_loc_4, colsAndRows) ? candidates[col_loc_4][row_loc_4] = true : undefined
                        } else {

                            for (let key in initBoard){

                                if (Object.keys(initBoard[key])[0] == piece && Object.values(initBoard[key])[0].color != turn){
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

                    let piece = getPiece(col_loc, row_loc, true);

                    if (piece == null){
                        isIn(col_loc, row_loc, colsAndRows) ? candidates[col_loc][row_loc] = true: undefined
                    } else {

                        for (let key in initBoard){

                            if (Object.keys(initBoard[key])[0] == piece && Object.values(initBoard[key])[0].color != turn){
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

                    let piece = getPiece(col_loc_2, row_loc_2, true);

                    if (piece == null){
                        isIn(col_loc_2, row_loc_2, colsAndRows) ? candidates[col_loc_2][row_loc_2] = true : undefined
                    } else {

                        for (let key in initBoard){

                            if (Object.keys(initBoard[key])[0] == piece && Object.values(initBoard[key])[0].color != turn){
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

                    let piece = getPiece(col_loc_3, row_loc_3, true);

                    if (piece == null){
                        isIn(col_loc_3, row_loc_3, colsAndRows) ? candidates[col_loc_3][row_loc_3] = true : undefined
                    } else {

                        for (let key in initBoard){

                            if (Object.keys(initBoard[key])[0] == piece && Object.values(initBoard[key])[0].color != turn){
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

                    let piece = getPiece(col_loc_4, row_loc_4, true);

                    if (piece == null){
                        isIn(col_loc_4, row_loc_4, colsAndRows) ? candidates[col_loc_4][row_loc_4] = true : undefined
                    } else {

                        for (let key in initBoard){

                            if (Object.keys(initBoard[key])[0] == piece && Object.values(initBoard[key])[0].color != turn){
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

                let piece = getPiece(col_loc_5, row, true)
                console.log("queen right at: ", col_loc_5,row, )
                if (piece == null){
                    isIn(col_loc_5, row, colsAndRows) ? candidates[col_loc_5][row] = true : undefined
                } else {

                    for (let key in initBoard){

                        if (Object.keys(initBoard[key])[0] == piece && Object.values(initBoard[key])[0].color != turn){
                            isIn(col_loc_5, row, colsAndRows) ? candidates[col_loc_5][row] = true: undefined
                            break
                        }
                    }
                    break
                }

                col_loc_5++;
            }

            while (col_loc_6 >= 0 && moveable.leftRight){ // to left

                let piece = getPiece(col_loc_6, row, true)

                if (piece == null){
                    isIn(col_loc_6, row, colsAndRows) ? candidates[col_loc_6][row] = true : undefined
                } else {

                    for (let key in initBoard){

                        if (Object.keys(initBoard[key])[0] == piece && Object.values(initBoard[key])[0].color != turn){
                            isIn(col_loc_6, row, colsAndRows) ? candidates[col_loc_6][row] = true: undefined
                            break
                        }
                    }
                    break
                }

                col_loc_6--;
            }

            while (row_loc_5 <= 7 && moveable.upDown){ // to down

                let piece = getPiece(col, row_loc_5, true)
                

                if (piece == null){
                    isIn(col, row_loc_5, colsAndRows) ? candidates[col][row_loc_5] = true : undefined
                } else {

                    for (let key in initBoard){

                        if (Object.keys(initBoard[key])[0] == piece && Object.values(initBoard[key])[0].color != turn){
                            isIn(col, row_loc_5, colsAndRows) ? candidates[col][row_loc_5] = true : undefined
                            break
                        }
                    }
                    break
                }

                row_loc_5++;
            }

            while (row_loc_6 >= 0 && moveable.upDown){ // to up

                let piece = getPiece(col, row_loc_6, true)

                if (piece == null){
                    isIn(col, row_loc_6, colsAndRows) ? candidates[col][row_loc_6] = true : undefined
                } else {

                    for (let key in initBoard){

                        if (Object.keys(initBoard[key])[0] == piece && Object.values(initBoard[key])[0].color != turn){
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
        */

        let has_move = false
        setDrawState((old: boolean[][]) => {

            let candidates = [...old]
            candidates[col][row] = true

            // down
            if (row+1 <= 7){
                let piece = getPiece(col, row+1, true) 
                
                if (piece == null){
                    
                    if (notEatable(col, row+1, turn)){
                        if ( colsAndRows == null || !isIn(col, row +1, colsAndRows)){ 
                            candidates[col][row+1] = true; has_move=true
                            has_move = true
                        }

                    }
                    
                } else {
                    for (let key in initBoard){
    
                
                        if ( Object.keys(initBoard[key])[0] == piece 
                            && Object.values(initBoard[key])[0].color != turn
                            && Object.values(initBoard[key])[0].kind != "king"
                            && notKingAdjacent(col, row+1, turn)
                            && notEatable(col, row+1, turn)){
    
                                candidates[col][row+1] = true
                                has_move = true
                        }
                    }
                }
            }

            // right
            if (col +1 <= 7){

                let piece_2 = getPiece(col+1, row, true)
                if (piece_2 == null){
                    if (notEatable(col+1, row, turn)){
                        if ( colsAndRows == null || !isIn(col+1, row, colsAndRows)){
                            candidates[col+1][row] = true
                            has_move = true
                        }
                    }
                } else {
    
                    for (let key in initBoard){
                        if ( Object.keys(initBoard[key])[0] == piece_2
                            && Object.values(initBoard[key])[0].color != turn
                            && Object.values(initBoard[key])[0].kind != "king"
                            && notKingAdjacent(col+1, row, turn)
                            && notEatable(col+1, row, turn)){
                    
                                candidates[col+1][row] = true
                                has_move = true
                        }
                    }
                }
            }

            // right down
            if (col+1 <= 7 && row+1 <= 7){

                let piece_3 = getPiece(col+1, row+1, true)
    
                console.log("res of not Eatable: ")
                let res = notEatable(col+1, row, turn+1)
                console.log("res: ", res)
                console.log("done")
                if (piece_3 == null){
                    if (notEatable(col+1, row+1, turn)){
                        if ( colsAndRows == null || !isIn(col+1, row+1, colsAndRows)){
                        
                            candidates[col+1][row+1] = true
                            has_move = true
                        }
                            
                    }
    
                } else {
    
                    for (let key in initBoard){
    
                        if ( Object.keys(initBoard[key])[0] == piece_3
                            && Object.values(initBoard[key])[0].color != turn
                            && Object.values(initBoard[key])[0].kind != "king"
                            && notKingAdjacent(col+1, row+1, turn)
                            && notEatable(col+1, row+1, turn)){
                        
                                candidates[col+1][row+1] = true
                                has_move = true
                        }
                    }
                }
            }

            // right up
            if (col +1 <= 7 && row-1 >= 0){

                let piece_4 = getPiece(col+1, row-1, true)
    
                if (piece_4 == null){
                    if (notEatable(col+1, row-1, turn)){
                        if ( colsAndRows == null || !isIn(col+1, row-1, colsAndRows)){
                            candidates[col+1][row-1] = true
                            has_move = true
                        }
                    }
    
                } else {
    
                    for (let key in initBoard){
    
                        if ( Object.keys(initBoard[key])[0] == piece_4
                            && Object.values(initBoard[key])[0].color != turn
                            && Object.values(initBoard[key])[0].kind != "king"
                            && notKingAdjacent(col+1, row-1, turn)
                            && notEatable(col+1, row-1, turn)){
                        
                                candidates[col+1][row-1] = true
                                has_move = true
                        }
                    }
                }
            }

            // left down
            if (col -1 >= 0 && row+1 <= 7){

                let piece_5 = getPiece(col-1, row+1, true)
    
                if (piece_5 == null){
                    if (notEatable(col-1, row+1, turn+1)){
                        if ( colsAndRows == null || !isIn(col-1, row+1, colsAndRows)){
                            candidates[col-1][row+1] = true
                            has_move = true
                        }
                    }
                } else {
    
                    for (let key in initBoard){
    
                        if ( Object.keys(initBoard[key])[0] == piece_5
                            && Object.values(initBoard[key])[0].color != turn
                            && Object.values(initBoard[key])[0].kind != "king"
                            && notKingAdjacent(col-1, row+1, turn)
                            && notEatable(col-1, row+1, turn)){
                            
                                candidates[col-1][row+1] = true
                                has_move = true
                        }
                    }
                }
            }

            // left
            if (col -1 >= 0){

                let piece_6 = getPiece(col-1, row, true)
    
                if (piece_6 == null){
                    if (notEatable(col-1, row, turn)){
                        if ( colsAndRows == null || !isIn(col-1, row, colsAndRows)){
                            candidates[col-1][row] = true
                            has_move = true
                        }
                    }
    
                } else {
    
                    for (let key in initBoard){
    
                        if ( Object.keys(initBoard[key])[0] == piece_6
                            && Object.values(initBoard[key])[0].color != turn
                            && Object.values(initBoard[key])[0].kind != "king"
                            && notKingAdjacent(col-1, row, turn)
                            && notEatable(col-1, row, turn)){
                        
                                candidates[col-1][row] = true
                                has_move = true
                        }
                    }
                }
            }

            // left up
            if (col -1 >= 0 && row -1 >= 0){

                let piece_7 = getPiece(col-1, row-1, true)
    
                if (piece_7 == null){
                    if (notEatable(col-1, row-1, turn)){
                        if ( colsAndRows == null || !isIn(col-1, row-1, colsAndRows)){
                            candidates[col-1][row-1] = true
                            has_move = true
                        }
                    }
    
                } else {
    
                    for (let key in initBoard){
    
                        if ( Object.keys(initBoard[key])[0] == piece_7
                            && Object.values(initBoard[key])[0].color != turn
                            && Object.values(initBoard[key])[0].kind != "king"
                            && notKingAdjacent(col-1, row-1, turn)
                            && notEatable(col-1, row-1, turn)){
                        
                                candidates[col-1][row-1] = true
                                has_move = true
                        }
                    }
                }
            }

            // up
            if (row -1 >= 0){

                let piece_8 = getPiece(col, row-1, true)
    
                if (piece_8 == null){
                    if (notEatable(col, row-1, turn)){
                        if ( colsAndRows == null || !isIn(col, row-1, colsAndRows)){
                            candidates[col][row-1] = true
                            has_move = true
                        }
                    }
    
                } else {
    
                    for (let key in initBoard){
    
                        if ( Object.keys(initBoard[key])[0] == piece_8
                            && Object.values(initBoard[key])[0].color != turn
                            && Object.values(initBoard[key])[0].kind != "king"
                            && notKingAdjacent(col, row-1, turn)
                            && notEatable(col, row-1, turn)){
                        
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


// NOTE: Check if move is makeable
function makeMove(col_id: number, row_id: number, setDrawState: React.Dispatch, setSelectedPiece: React.Dispatch, selectedPiece: Piece){

    // first clear the board
    setDrawState(initDrawState);
    console.log("makeMove: col: ", col_id, "row: ", row_id)


    // move the piece, remove from one square, add to another square
    let selected_col = selectedPiece.col
    let selected_row = selectedPiece.row
    if (selected_col == -1 || selected_row == -1){
        throw new Error("Selected col or Selected row of SelectedPiece shouldn't be -1. Function makeMove");
    }

    let sourceObj = boardInverse[selected_col]

    let obj = boardInverse[col_id]
    for (let key in obj){
        if (Number(String(key)[1]) == row_id){

            obj[key] = selectedPiece.name
            //console.log("make Move - add piece:", obj[key])

        }
        if (Number(String(key)[1]) == selected_row){
            //console.log("make Move - delete piece:", sourceObj[key])
            sourceObj[key] = "empty" // empty the source location
        }
    }

    console.log("current board Inverse: ", boardInverse[selected_col])

    let piece = getPiece(col_id, row_id, true);
    //console.log(piece)

    let updated_piece
    // has_moved
    for (let key in initBoard){ // key is just index here
        
        if (Object.keys(initBoard[key])[0] == piece){
            
            console.log("changing has moved")
            let unknownKey  = Object.keys(initBoard[key])[0]
            initBoard[key][unknownKey].has_moved = true
            initBoard[key][unknownKey].col = col_id
            initBoard[key][unknownKey].row = row_id
            updated_piece = initBoard[key][unknownKey]
            //setSelectedPiece({...initBoard[key][unknownKey]})
            console.log("current piece data: ", initBoard[key][unknownKey])
            console.log("col is : ", col_id," row is : ", row_id)
            //Object.values(initBoard[key])[0].has_moved = true
            //console.log(initBoard[key])
            //Object.values(initBoard[key])[0]
            break;
        }
    }


    
    

    return updated_piece;
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

function takePiece(col_id: number, row_id: number, selectedPiece: Piece){
    /*
        Function that runs when a piece is taken, col_id, row_id is the location of the eaten piece, selected piece is the one that eats
    */

    let piece_eaten = getPiece(col_id, row_id, true)
    let init_board_len1 = initBoard.length
    // remove
    initBoard = initBoard.filter((elem) => Object.keys(elem)[0] != piece_eaten)

    let init_board_len2 = initBoard.length
    if (init_board_len1 == init_board_len2) throw new Error (`Couldn't found the piece by it's locations: ${row_id}, ${col_id}. function takePiece`)
    
    console.log("selectedPiece.row: ", selectedPiece.row)
    let obj = boardInverse[selectedPiece.col]

    for (let key in obj){
        if (Number(String(key)[1]) == selectedPiece.row){ // find the old piece and make it empty
            obj[key] = "empty" 
        }
    }

    

    

    let second_obj = boardInverse[col_id]

    for (let key in second_obj){
        if (Number(String(key)[1]) == row_id){ // find the eaten piece and make it's place the selected piece
            second_obj[key] = selectedPiece.name;
        }
    }


    let updated_piece
    for (let elem in initBoard){
        if (Object.keys(initBoard[elem])[0] == selectedPiece.name){ // find the selectedPiece and change info
            let unknownKey = Object.keys(initBoard[elem])[0]
            initBoard[elem][unknownKey].has_moved = true
            initBoard[elem][unknownKey].col = col_id
            initBoard[elem][unknownKey].row = row_id
            updated_piece = initBoard[elem][unknownKey]
        }
    }

    isCheckCondition(col_id, row_id)
    return updated_piece
}

function isCheckCondition(col_id: number, row_id: number){

    let piece = getPiece(col_id, row_id, true)
    if (piece == null){
        throw new Error("for the given location, piece should've been found. In isCheckCondition")
    }

    let piece_in = null
    for (let key in initBoard){
        if (Object.keys(initBoard[key])[0] == piece){
            piece_in = initBoard[key]
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

        let piece_target = getPiece(col_id+1, row_id + row_inc, true)
        if (piece_target != null){
            for (let key in initBoard){
                if (Object.keys(initBoard[key])[0] == piece_target 
                    && Object.values(initBoard[key])[0].kind == "king"
                    && Object.values(initBoard[key])[0].color != local_turn){
                        return true
                }
            }
        }

        piece_target = getPiece(col_id-1, row_id + row_inc, true)
        if (piece_target != null){
            for (let key in initBoard){
                if (Object.keys(initBoard[key])[0] == piece_target 
                    && Object.values(initBoard[key])[0].kind == "king"
                    && Object.values(initBoard[key])[0].color != local_turn){
                        return true
                }
            }
        }
    } else if (piece_kind == "knight"){


        if (col_id - 2 >= 0){

                    if (row_id +1 <= 7){

                        let piece = getPiece(col_id-2, row_id+1, true)
                        if (piece != null){ // there is no piece, you can draw
                            
                            for (let key in initBoard){
                                if (Object.keys(initBoard[key])[0] == piece 
                                    && Object.values(initBoard[key])[0].color != local_turn
                                    && Object.values(initBoard[key])[0].kind == "king"){
                                    return true
                                }
                            }
                        }

                        
                    }
                    if (row_id -1 >= 0){

                        let piece = getPiece(col_id-2, row_id-1, true)
                        if (piece != null){ // there is no piece, draw
                             // there is a piece, if it's not black -> draw
                    
                            for (let key in initBoard){
                                if (Object.keys(initBoard[key])[0] == piece 
                                    && Object.values(initBoard[key])[0].color != local_turn
                                    && Object.values(initBoard[key])[0].kind == "king"){
                                    return true
                                }
                            }
                        }
                        
                    }

                }  
                if (col_id +2 <= 7){

                    if (row_id +1 <= 7){
                        let piece = getPiece(col_id+2, row_id+1, true)

                        if (piece != null){ // there is no piece, you can draw
                             // there is a piece, make sure it's not black
                            for (let key in initBoard){
                                if (Object.keys(initBoard[key])[0] == piece 
                                    && Object.values(initBoard[key])[0].color != local_turn
                                    && Object.values(initBoard[key])[0].kind == "king"){
                                    return true
                                }
                            }
                        }
                        
                    }
                    if (row_id -1 >= 0){
                        let piece = getPiece(col_id+2, row_id-1, true)

                        if (piece != null){ // there is no piece, you can draw
                             // there is a piece, make sure it's not black
                            for (let key in initBoard){
                                if (Object.keys(initBoard[key])[0] == piece 
                                    && Object.values(initBoard[key])[0].color != local_turn
                                    && Object.values(initBoard[key])[0].kind == "king"){
                                    return true
                                }
                            }
                        }
                        
                    }
                } 

                if (row_id +2 <= 7){

                    if (col_id -1 >= 0){
                        let piece = getPiece(col_id-1, row_id+2, true)

                        if (piece != null){ // there is no piece, you can draw
                             // there is a piece, make sure it's not black
                            for (let key in initBoard){
                                if (Object.keys(initBoard[key])[0] == piece 
                                    && Object.values(initBoard[key])[0].color != local_turn
                                    && Object.values(initBoard[key])[0].kind == "king"){
                                    return true
                                }
                            }
                        }
                        
                    }
                    if (col_id +1 <= 7){
                        let piece = getPiece(col_id+1, row_id+2, true)

                        if (piece != null){ // there is no piece, you can draw
                            
                             // there is a piece, make sure it's not black
                            for (let key in initBoard){
                                if (Object.keys(initBoard[key])[0] == piece 
                                    && Object.values(initBoard[key])[0].color != local_turn
                                    && Object.values(initBoard[key])[0].kind == "king"){
                                    return true
                                }
                            }
                        }
                        
                    }

                }
                if (row_id -2 >= 0){

                    if (col_id -1 >= 0){
                        let piece = getPiece(col_id-1, row_id-2, true)

                        if (piece != null){ // there is no piece, you can draw
                            
                             // there is a piece, make sure it's not black
                            for (let key in initBoard){
                                if (Object.keys(initBoard[key])[0] == piece 
                                    && Object.values(initBoard[key])[0].color != local_turn
                                    && Object.values(initBoard[key])[0].kind == "king"){
                                    return true
                                }
                            }
                        }
                        
                        
                    }
                    if (col_id +1 <= 7){
                        let piece = getPiece(col_id+1, row_id-2, true)

                        if (piece != null){ // there is no piece, you can draw
                            
                            // there is a piece, make sure it's not black
                            for (let key in initBoard){
                                if (Object.keys(initBoard[key])[0] == piece 
                                    && Object.values(initBoard[key])[0].color != local_turn
                                    && Object.values(initBoard[key])[0].kind == "king"){
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
                    
                    let piece = getPiece(col_id, row_loc, true)
                    if (piece != null){ // empty, draw it
                        
                        for (let key in initBoard){
                            if (Object.keys(initBoard[key])[0] == piece 
                                && Object.values(initBoard[key])[0].color != local_turn
                                && Object.values(initBoard[key])[0].kind == "king"){
                                
                                    return true
                            }
                        }
                        break;
                    }
                    row_loc--;
                }
                while (row_loc_2 <= 7){ // to the down 
                    
                    let piece = getPiece(col_id, row_loc_2, true);
                    if (piece != null) {
                        
                        
                        for (let key in initBoard){
                            if (Object.keys(initBoard[key])[0] == piece 
                                && Object.values(initBoard[key])[0].color != local_turn
                                && Object.values(initBoard[key])[0].kind == "king"){
                                
                                    return true
                            }
                        }
                        break;
                    }
                    row_loc_2++;
                }
                while (col_loc >= 0){ // to the up
                    
                    let piece = getPiece(col_loc, row_id, true);
                    if (piece != null) {
                        
                        
                        for (let key in initBoard){
                            if (Object.keys(initBoard[key])[0] == piece 
                                && Object.values(initBoard[key])[0].color != local_turn
                                && Object.values(initBoard[key])[0].kind == "king"){
                                
                                    return true
                            }
                        }
                        break;
                    }
                    col_loc--;
                }
                while (col_loc_2 <= 7){ // to the right
                    
                    let piece = getPiece(col_loc_2, row_id, true);
                    if (piece != null) {
                        

                        for (let key in initBoard){
                            if (Object.keys(initBoard[key])[0] == piece 
                                && Object.values(initBoard[key])[0].color != local_turn
                                && Object.values(initBoard[key])[0].kind == "king"){
                                
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
                        let piece = getPiece(col_loc, row_loc, true);

                        if (piece != null){
                            

                            for (let key in initBoard){

                                if (Object.keys(initBoard[key])[0] == piece 
                                    && Object.values(initBoard[key])[0].color != local_turn
                                    && Object.values(initBoard[key])[0].kind == "king"){

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
                        let piece = getPiece(col_loc_2, row_loc_2, true);

                        if (piece != null){
                            

                            for (let key in initBoard){

                                if (Object.keys(initBoard[key])[0] == piece 
                                    && Object.values(initBoard[key])[0].color != local_turn
                                    && Object.values(initBoard[key])[0].kind == "king"){
                                    
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
                        let piece = getPiece(col_loc_3, row_loc_3, true);

                        if (piece != null){
                            

                            for (let key in initBoard){

                                if (Object.keys(initBoard[key])[0] == piece 
                                    && Object.values(initBoard[key])[0].color != local_turn
                                    && Object.values(initBoard[key])[0].kind == "king"){

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
                        let piece = getPiece(col_loc_4, row_loc_4, true);

                        if (piece != null){
                            

                            for (let key in initBoard){

                                if (Object.keys(initBoard[key])[0] == piece 
                                    && Object.values(initBoard[key])[0].color != local_turn
                                    && Object.values(initBoard[key])[0].kind == "king"){

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

                    let piece = getPiece(col_loc, row_loc, true);

                    if (piece != null){
                        

                        for (let key in initBoard){

                            if (Object.keys(initBoard[key])[0] == piece 
                                && Object.values(initBoard[key])[0].color != local_turn
                                && Object.values(initBoard[key])[0].kind == "king"){
                                
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

                    let piece = getPiece(col_loc_2, row_loc_2, true);

                    if (piece != null){
                        

                        for (let key in initBoard){

                            if (Object.keys(initBoard[key])[0] == piece 
                                && Object.values(initBoard[key])[0].color != local_turn
                                && Object.values(initBoard[key])[0].kind == "king"){
                                
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

                    let piece = getPiece(col_loc_3, row_loc_3, true);

                    if (piece != null){
                        

                        for (let key in initBoard){

                            if (Object.keys(initBoard[key])[0] == piece 
                                && Object.values(initBoard[key])[0].color != local_turn
                                && Object.values(initBoard[key])[0].kind == "king"){
                                
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

                    let piece = getPiece(col_loc_4, row_loc_4, true);

                    if (piece != null){
                        

                        for (let key in initBoard){

                            if (Object.keys(initBoard[key])[0] == piece 
                                && Object.values(initBoard[key])[0].color != local_turn
                                && Object.values(initBoard[key])[0].kind == "king"){
                                
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

                let piece = getPiece(col_loc_5, row_id, true)
                
                if (piece != null){
                    

                    for (let key in initBoard){

                        if (Object.keys(initBoard[key])[0] == piece 
                            && Object.values(initBoard[key])[0].color != local_turn
                            && Object.values(initBoard[key])[0].kind == "king"){
                            
                                return true
                        }
                    }
                    break
                }

                col_loc_5++;
            }

            while (col_loc_6 >= 0){ // to left

                let piece = getPiece(col_loc_6, row_id, true)

                if (piece != null){
                    

                    for (let key in initBoard){

                        if (Object.keys(initBoard[key])[0] == piece 
                            && Object.values(initBoard[key])[0].color != local_turn
                            && Object.values(initBoard[key])[0].kind == "king"){
                            
                                return true
                        }
                    }
                    break
                }

                col_loc_6--;
            }

            while (row_loc_5 <= 7){ // to down

                let piece = getPiece(col_id, row_loc_5, true)
                

                if (piece != null){
                    

                    for (let key in initBoard){

                        if (Object.keys(initBoard[key])[0] == piece 
                            && Object.values(initBoard[key])[0].color != local_turn
                            && Object.values(initBoard[key])[0].kind == "king"){
                            
                                return true
                        }
                    }
                    break
                }

                row_loc_5++;
            }

            while (row_loc_6 >= 0){ // to up

                let piece = getPiece(col_id, row_loc_6, true)

                if (piece != null){
                    

                    for (let key in initBoard){

                        if (Object.keys(initBoard[key])[0] == piece 
                            && Object.values(initBoard[key])[0].color != local_turn
                            && Object.values(initBoard[key])[0].kind == "king"){
                            
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
    TODO : 
      - other pieces : rook+, knight+, bishop+, queen+, king+
      - moves for white too: pawn+, knight+, rook+, bishop+, queen+, king+
      - moves in sequential order (white, black, white, black...) +
      - check conditions: rook+, knight+, bishop+, queen+, pawn+
      - check condition animation -> next move is forced to king +
      - king shouldn't be able to eat something that is protected by other opponent's piece +
      - checkmate conditions -> write it completetly in fireGameOver()
      - pawn goes to queen
      - pawn goes to other pieces (a selection required)
      - rook move O-O O-O-O

      --- later ? (after backend in rust)
      - piece move by mouse hold
*/
function onclickSquare(col_id: number, row_id: number, setDrawState: React.Dispatch, allDrawState: boolean[][], 
                       setSelectedPiece: React.Dispatch, selectedPiece: Piece, turn: string, setTurn: React.Dispatch,
                       setIsCheck: React.Dispatch, isCheck: boolean, checkingPiece: Piece, setCheckingPiece: React.Dispatch,
                       colsAndRows: null|{row: number, col:number}[], setColsAndRows: React.Dispatch){
    /*
        Onclick handler on squares. It draws the possible moves, and should handle the move
        Notes: could be two separate function -> draw possible moves and leave, handle the move
    */
   console.log("onclickSquare :")

    let piece = getPiece(col_id, row_id, true)
    console.log("destination is : ", piece)
    // get the piece information from board
    let piece_in = null;

    if (piece == null){ // handle not drawn empty square


        if (allDrawState[col_id][row_id] == true) {
            console.log("we make move to empty place")
            console.log("selected piece is (before makeMove): ", selectedPiece)

            let updated_piece = makeMove(col_id, row_id, setDrawState, setSelectedPiece, selectedPiece); 
            
            
            let is_check_local = isCheckCondition(col_id, row_id) // check if the piece in the given location can thread the opponent king
            setIsCheck(is_check_local)

            if (is_check_local) {
                
                setCheckingPiece({...updated_piece})
                console.log("check came by: ", updated_piece)
                let cols_and_rows = setMoveablePieces(turn, updated_piece, setColsAndRows)
                console.log("real cols and rows: ", cols_and_rows)
                setColsAndRows([...cols_and_rows])
                console.log("cols and rows: ", colsAndRows)
            } else {
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

        for (let key in initBoard){ // key is just index here
        
            //console.log(initBoard[key])
            if (Object.keys(initBoard[key])[0] == piece){
            
                piece_in = initBoard[key]
                console.log("piece_in here: ",piece_in)
                break;
            }
        }

        if (piece_in == null){
            console.log("current situation of initboard: ", initBoard)
            throw new Error("The piece is not found, it should've been found. Function: onClickSquare")
        } else if (Object.values(piece_in)[0].color != turn) { // opponent piece

            if (allDrawState[col_id][row_id] == true) {

                let updated_piece = takePiece(col_id, row_id, selectedPiece);
                
                clearBoard(setDrawState);

                let is_check_local = isCheckCondition(col_id, row_id) // check if the piece in the given location can thread the opponent king
                setIsCheck(is_check_local)

                if (is_check_local) {
                    setCheckingPiece(updated_piece)
                    
                    let cols_and_rows = setMoveablePieces(turn, updated_piece, setColsAndRows)
                    
                    setColsAndRows([...cols_and_rows])
                } else {
                    setColsAndRows(null)
                }
                
            
                setSelectedPiece({...nullPiece})
                setTurn((old: string) => {
                    return old == "white" ? "black" : "white" // just flip the turn
                })
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
                

                let is_it_blocked = isNotBlocked({...Object.values(piece_in)[0], turn})

                let args = {...Object.values(piece_in)[0], setDrawState, turn, isCheck, colsAndRows, is_it_blocked}
                console.log(args)
                drawPossibleMoves(args)
            }
            
        }
    }    
}

const COLORS = {
    WHITE: "white",
    BLACK: "black"
}

export default function Board(){

    const [boardState, setBoardState] = useState()

    const [drawState, setDrawState] = useState(
        [...initDrawState]
    ) // initial state of possible moves

    const [selectedPiece, setSelectedPiece] = useState<Piece>({...nullPiece});
    const [turn, setTurn] = useState<string>("white")
    const [isCheck, setIsCheck] = useState<boolean>(false)
    const [checkingPiece, setCheckingPiece] = useState<Piece>({...nullPiece})
    const [colsAndRows, setColsAndRows] = useState<null|{row:number, col: number}[]>(null)

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
        />)
    })
    

    return(
        <>
            <div className="Board flex m-5 ">
                {displayColumns}
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
}

function Column({id, allDrawState, drawState, setDrawState, setSelectedPiece, selectedPiece, turn, setTurn, setIsCheck,
                 isCheck, checkingPiece, setCheckingPiece, colsAndRows, setColsAndRows} : ColumnProps){

    let squares = Array()
    for (let i = 0; i<BOARD_SIZE; i++){
        squares.push(i)
    }

    let displaySquare: React.JSX.Element = []

    
    squares.map((elem, index) => {

        let color = index % 2 == 0 ? (id % 2 == 0 ? "bg-chess-dark" : "bg-chess-light") : (id % 2 == 0 ? "bg-chess-light" : "bg-chess-dark")
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
}

function Square({col_id, row_id, color, label_color, setDrawState, drawState, allDrawState, setSelectedPiece, selectedPiece, turn, 
                 setTurn, setIsCheck, isCheck, checkingPiece, setCheckingPiece, colsAndRows, setColsAndRows}: SquareProps){

    let piece = getPiece(col_id, row_id, false) // piece is like wking.svg
    let piece_name = getPiece(col_id, row_id, true)
    let piece_in

    for (let key in initBoard){

        if (piece != null && Object.keys(initBoard[key])[0] == piece_name){
            piece_in = initBoard[key]
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

    

    return (
        <div
          className={`${bgColor} w-25 h-25 relative ${bgHover}`}
          onClick={() => onclickSquare(col_id, row_id, setDrawState, allDrawState, setSelectedPiece, selectedPiece, turn,
            setTurn, setIsCheck, isCheck, checkingPiece, setCheckingPiece, colsAndRows, setColsAndRows)}
        >
          {/* Şah işareti */}
          {isKingChecked && (
            <div className="absolute inset-0 z-10 pointer-events-none rounded-sm"
              style={{
                background: "radial-gradient(circle, rgb(250, 18, 18) 0%, rgba(247, 22, 22, 0.95) 35%, rgba(200,0,0,0.6) 65%, rgba(158,0,0,0) 100%)"
              }}
            />
          )}
        
          {piece != null && <img src={piece} className="relative z-20" />}
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