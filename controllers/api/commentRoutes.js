import { Router } from 'express';
import { Comment } from '../../models';
import { withAuth }  from '../../utils/auth.js';

export const commentRoutes = Router()

// new comment
commentRoutes.post('/', withAuth, async(req,res) => {
    try{
        const newComment = {
            ...req.body,
            user_id: req.session.user_id,
        }

        await Comment.create(newComment);

        res.status(200).json(newComment)
    }
    catch(err) {
        res.status(500).json(err)
    }
});