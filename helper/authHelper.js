import bcrypt from 'bcrypt'
import otpGenerator from "otp-generator";

export const hashed = async string => {
    try {
        const salt = await bcrypt.genSalt(10)
        return await bcrypt.hash(string, salt)
    } catch (err) {
        console.log(err)
    }
}

export const comparePassword = async (password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword)
}

export const createOTP = async () => {
    const otp = await otpGenerator.generate(6, {
        digits: true,
        specialChars: false,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false
    })
    return otp
}