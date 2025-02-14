import {extractFragmentReplacements} from 'prisma-binding'

import Query from './Query'
import Mutation from './Mutation'
import Post from './Post'
import User from './User'
import Comment from './Comment'
import Subscription from './subscription'

const resolvers={
    Query,
    Mutation,
    Post,
    User,
    Comment,
    Subscription
}

const fragmentReplacements=extractFragmentReplacements(resolvers)

export  {resolvers,fragmentReplacements}