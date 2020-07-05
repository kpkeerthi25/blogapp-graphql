import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {getId} from '../utils/getId'


const Mutation={
    async createUser(parent, args, {prisma},info){
        const isEmail = await prisma.exists.User({email:args.data.email})
        if(isEmail){
            throw new Error("email already taken")
        }
        const password = await bcrypt.hash(args.data.password,8)
        
        const optArgs= {
            ...args
        }
        optArgs.data.password=password
        const user = await prisma.mutation.createUser(optArgs)
        const token = jwt.sign({userId:user.id},'JWT_SECRET')
        

        return {
            user,
            token
        }

    },

    async login(parent, args, {prisma},info){
        const user = await prisma.query.user({where: {
            email:args.data.email
        }})
        if(!user){
            throw new Error("unable to login")
        }
        console.log(user)
        const isMatch = await bcrypt.compare(args.data.password,user.password)
        if(!isMatch){
            throw new Error("unable to login")
        }   
        const token = jwt.sign({userId:user.id},'JWT_SECRET')

        return {
            user,
            token
        }
    },

    async deleteUser(parent,args,{prisma},info){
        const optArgs={
            where:{
                ...args
            }
        }
        return await prisma.mutation.deleteUser(optArgs,info)
    },

    async updateUser(parent, args, {prisma,request}, info){
        const userId = getId(request)
        const isUser = await prisma.exists.User({id:userId})
        if(!isUser){
            throw new Error("user not found")
        }
        const optArgs = {
            data:{
                ...args.data,
            },
            where:{
                id:userId
            }   
        }
        if(args.data.password){
            const password = await bcrypt.hash(args.data.password,8)
            optArgs.data.password = password
        }
        return await prisma.mutation.updateUser(optArgs,info)


    },

    async createPost(parent,args,{prisma,request},info){
        const userId = getId(request)
        const optArgs = {
            data:args.data,
        }
        optArgs.data.author={
            connect:{
                id:userId
            }
        }
        return await prisma.mutation.createPost(optArgs,info)
    },

    async deletePost(parent,args,{prisma,request},info){
        const userId = getId(request)
        const isPost = await prisma.exists.Post({
            id:args.id,
            author:{
                id:userId
            }
        })
        if(!isPost){
            throw new Error("post not found")
        }
        const optArgs = {
            where:{
                id:args.id
            }
        }
        return await prisma.mutation.deletePost(optArgs,info)
    },

    async updatePost(parent,args,{prisma,request},info){

        const {id,data}=args
        const userId = getId(request)
        const isPost = await prisma.exists.Post({
            id:args.id,
            author:{
                id:userId
            }
        })
        if(!isPost){
            throw new Error("post not found")
        }
        const optArgs = {
            ...data,
            where:{
                id
            }
        }
        return await prisma.mutation.updatePost(optArgs,info)
    },

    async createComment(parent, args,{prisma,request},info){
        const userId = getId(request)
        const isPost = await prisma.exists.Post({
            id:args.post,
            published:true
        })
        if(!isPost){
            throw new Error("post not found")
        }
        const optArgs={
            data:{
            text:args.text,
            author:{
                connect:{
                    id:userId
                }
            },
            post:{
                connect:{
                    id:args.post
                }
            }
        }
        }
        return await prisma.mutation.createComment(optArgs, info)
    },

    async deleteComment(parent,args,{prisma,request},info){
        const userId = getId(request)
        const isComment = await prisma.exists.Comment({
            id:args.id,
            author:{
                id:userId
            }
        })
        if(!isComment){
            throw new Error("comment not found")
        }
        const optArgs = {
            where:{
                id:args.id
            }
        }
        return await prisma.mutation.deleteComment(optArgs,info)
    },

    async updateComment(parent,args,{prisma,request},info){
        const userId = getId(request)
        const{id,data}=args
        const isComment = await prisma.exists.Comment({
            id,
            author:{
                id:userId
            }
        })
        if(!isComment){
            throw new Error("comment not found")
        }
        const optArgs = {
            where:{
                id
            },
            data
        }
        return await prisma.mutation.updateComment(optArgs,info)
    }
}

export default Mutation