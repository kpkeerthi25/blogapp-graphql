import {getId} from '../utils/getId'

const Query={
    async me(parent, args, {prisma,request}, info){
        const userId=getId(request)
        return await prisma.query.user({where:{
            id:userId
        }},info)
    },
    posts(parent, args, {prisma}, info){
        const optArgs={
            where:{
                published:true,
            }
        }
        if(args.query){
            optArgs.where.OR=[{
                title_contains:args.query
            },{
                body_contains:args.query
            }]
        }
        return prisma.query.posts(optArgs,info)
    },
    async users(parent, args, {prisma,request}, info) {
        const optArgs={
            where:{
                name_contains:args.query
            }
        }
        return await prisma.query.users(optArgs,info)
    },
    comments(parent, args, {prisma}, info){
        return prisma.query.comments(null,info)
    },

    async post(parent, args, {prisma,request},info){
        const userId = getId(request,false)
        const post= await prisma.query.posts({
            where: { id:args.id ,
                OR:[{
                    published:true
                },{
                    author:{
                        id:userId
                    }
                }]
            }
        },info)
        console.log(post)
        if(post.length==0){
            throw new Error("post not found")
        }
        return post[0]
    }
    
}

export default Query