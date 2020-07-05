import jwt from 'jsonwebtoken'

export const getId=(req,requireAuth=true) => {
    const header = req.request.headers.authorization
    if(header){
        const token = header.replace("Bearer ","")
        const decoded = jwt.verify(token,'JWT_SECRET')
        return decoded.userId
    }
    if(requireAuth){
        throw new Error("invalid auth ")
    }
    return null
}

