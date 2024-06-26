import { Router } from 'express';
import { User, Comment, Post } from '../../models/index.js';
import { withAuth } from '../../utils/auth.js';

export const postRoutes = Router()

// all posts
postRoutes.get('/', async (req, res) => {
    try {
        const allPosts = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ],
        });
        res.status(200).json(allPosts);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// getting a single post
postRoutes.get('/:id', async (req, res) => {
    try {
        const singlePost = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    include: [
                        {
                            model: User,
                            attributes: ['username']
                        }
                    ],
                },
            ],
        });
        if(!singlePost || singlePost.length === 0) {
            res.status(404).json({message: 'No post found'});
            return;
        }
        res.status(200).json(singlePost);
    }
    catch(err) {
        res.status(500).json(err);
    }
});

// create a new post
postRoutes.post('/', withAuth, async (req,res) => {
    try{
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost)
    }
    catch(err) {
        res.status(500).json(newPost)
    }
});

// update a post
postRoutes.put('/:id', withAuth, async (req,res) => {
    try{
        const updatedPost = await Post.update(req.body, {
            where: {
                id: req.params.id
            },
        });

        if(!updatedPost) {
            res.status(404).json({message: 'No post found'});
            return;
        }
        res.status(200).json(updatedPost)
    }
    catch(err) {
        res.status(500).json(err);
    }
});

// delete post
postRoutes.delete('/:id', withAuth, async (req,res) => {
    try{
        const deletePost = await Promise.all([
            Comment.destroy(
                {where: {post_id: req.params.id}}
            ),
            Post.destroy({
                where: {id: req.params.id}
            })
        ]);

        if (!deletePost) {
            res.status(404).json({message: 'No post found'});
            return;
        }
        res.status(200).json(deletePost)
    }
    catch(err) {
        res.status(500).json(err);
    }
});