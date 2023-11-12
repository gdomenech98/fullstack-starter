import jwt from 'jsonwebtoken'
require('dotenv').config({ path: __dirname+'/../../../../../.env' });


export const jwtSign = (data: any, secret?: string, expiration?: any) => {
    const sk = secret ?? process.env.JWT_SECRET
    return jwt.sign(data, sk, { expiresIn: expiration ?? '1y' });
}

export const jwtVerify = (token: string, secret?: string) => {
    if (!token) throw 'Token must be provided.'
    const sk = secret ?? process.env.JWT_SECRET
    try {
        const decodedData = jwt.verify(token, sk);
        return decodedData
    }catch(e){
       throw "Unauthorized token."
    }
}