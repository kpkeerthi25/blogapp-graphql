import { Prisma } from 'prisma-binding'
import {fragmentReplacements} from './resolvers/index'

const prisma = new Prisma({
    typeDefs:"src/generated/prisma.graphql",
    endpoint:process.env.PRISMA_ENDPOINT,
    secret: "mysecret",
    fragmentReplacements
})


export default prisma

// prisma.query.users(null,'{id,name,email}').then(data=>console.log(data)).catch(
//     err => console.log("error")
// )

// const createPost = async (authorId,data) => {
//     const post = await Prisma.mutation.createPost({
//         data:{
//             ...data,
//             author:{
//                 connect:{
//                     id:authorId
//                 }
//             }
//         }
//     },'{id title body author{ id name email}}')
    
//     return post;
// }

// createPost('')