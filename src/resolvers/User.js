import {getId} from '../utils/getId'

const User= {
    email:{
        fragment:'fragment Userid on User {id}',
        resolve(parent,args,{prisma,request},info){
            const userId = getId(request,false)
            if(userId && parent.id===userId){
                return parent.email
            }
            return null
        }
    }

}

export default User