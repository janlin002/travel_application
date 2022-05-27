import express from 'express';
import mongoose from "mongoose"

import UserMessage from '../models/userMesssage'

const router = express.Router()

export const signin = async(req, res) =>{
    const { email, password} = req.body

    try{
        
    }catch(err){
        console.error(err)
    }
}