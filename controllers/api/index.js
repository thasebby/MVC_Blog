import { Router } from 'express'
import { commentRoutes } from './commentRoutes.js'
import { postRoutes } from './postRoutes.js'
import { userRoutes } from './userRoutes.js' 
import { withAuth } from '../../utils/auth.js'

// export this for use outside of this directory
export const apiIndex = Router()

apiIndex.use('/users', userRoutes)
apiIndex.use('/posts', withAuth, postRoutes)
apiIndex.use('/comments', withAuth, commentRoutes)