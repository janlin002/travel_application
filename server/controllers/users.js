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

// 整個驗證的流程:
// 1. 伺服器端在收到登入請求後驗證使用者
// 2. 伺服器端產生和回傳一組帶有資訊，且僅能在伺服器端被驗證的 Token
// 3. Token 被回傳後，存取在「客戶端」（大多存在瀏覽器的 Storage 當中）
// 4. 往後客戶端向伺服器端發送請求時，皆附帶此 Token 讓伺服器端驗證
// 5. 若伺服器端在請求中沒有找到 Token，回傳錯誤；若有找到 Token 則驗證


// jwt.sign(payload, secretOrPrivateKey, [options, callback])
// payload => 要新增項目
// secretOrPrivateKey => 自訂密鑰
// options => expiresIn => 設定 Token 多久後會過期
// jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );