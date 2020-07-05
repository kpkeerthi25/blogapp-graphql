const Subscription={
    comment:{
        subscribe(parent, {postId}, {prisma},info){
            const optArgs={
                where:{
                    node:{
                        post:{
                            id:postId
                        }
                    }
                }
            }
            return prisma.subscription.comment(optArgs,info)
        }
    },
    post:{
        subscribe(parent,args,{prisma},info){
            return prisma.subscription.post(null,info)
        }
    }
}

export default Subscription