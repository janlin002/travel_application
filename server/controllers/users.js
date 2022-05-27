import express from 'express';
import mongoose from "mongoose"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import UserMessage from '../models/userMesssage'

const router = express.Router()

// 登入
export const signin = async(req, res) =>{
    const { email, password} = req.body

    try{
        const oldUser = await UserMessage.findOne({ email });

        if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password); // 驗證是否相同 -> password: 輸入的密碼, oldUser.password: 資料庫裡面的密碼

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" }); // 生成Token

        res.status(200).json({ result: oldUser, token });
    }catch(err){
        console.error(err)
    }
}

// 註冊
export const signUp = async(req, res) =>{
    const { email, password, firstName, lastName } = req.body;

    try {
        const oldUser = await UserMessage.findOne({ email });

        if (oldUser) return res.status(400).json({ message: "User already exists" }); // 帳號已被注冊

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await UserMessage.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` }); // 新增一筆新的賬號

        const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );

        res.status(201).json({ result, token });
    }catch(err){
        console.error(err)
    }
}