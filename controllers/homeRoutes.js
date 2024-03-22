import { Router } from 'express'
import { withAuth} from '../utils/auth.js'
import { User, Post, Comments } from '../models/index.js'

export const homeRoutes= Router()

//route for homepage
homeRoutes.get ('/', async (req,res) => {
// render the homepage.handlebars with existing blog posts
   try{
    const existingPosts = await Post.findAll({
        include: [
           { User,
            attributes: ['username'],
           }
        ],
    });
    // converting to plain JavaScript
    const posts = existingPosts.map((post) => post.get({plain:true}));

    //rendering the homepage.handlebars
    res.render("homepage", {
        posts,
        logged_in: req.session.logged_in,
    });
   }
   catch(err){
    res.status(500).json(err);
   }
});

// sign up 
homeRoutes.get('/signup', (req,res) => {
    if(req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    res.render('signup');
});

// log in
homeRoutes.get('/login', (req,res) => {
    if(req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login');
})

// showing existing post 
homeRoutes.get('/post/:id', withAuth, async(req,res) => {
    try{
        const existingPost = await Post.findByPk(req.params.id, {
            include: [
                {User,
                attributes: ['username']},
                {
                    Comments,
                    include: [
                        {User,
                        attributes: ['username']}
                    ],
                },
            ],
        });

        const post = existingPost.get({plain:true});

        //render the post.handlebars
        // use spread syntax to include all properties within the post object
        res.render('post', {
            ...post,
            logged_in: req.session.logged_in,
        });
    }
    catch(err) {
        res.status(500).json(err);
    }
});

// when the user clicks on the dashboard option on THEIR own homepage they will be presented with their own posts
homeRoutes.get('/dashboard', withAuth, async (req,res) => {
    try{
        const postDash = await Post.findAll({
            where: {user_id: req.session.user_id},
            include: [
                {User,
                attributes:['username']
                }
            ],
        });

        const dashPosts = postDash.map((post) => post.get({plain:true}));

        res.render('dashboard', {
            dashPosts,
            logged_in: req.session.logged_in,
        });
    }
    catch(err) {
        res.status(500).json(err);
    }
});

//adding a new blog post
homeRoutes.get('/newBlog', (req,res) => {
    if(req.session.logged_in) {
        res.render('newBlog');
        return;
    }
    res.redirect('/login');
});

// update post
homeRoutes.get('/editBlog/:id', async (req,res) => {
    try {
        const edit = await Post.findByPk(req.params.id, {
            include: [
                {User,
                attributes: ['username']
                },
                {
                    Comment,
                    include: [
                        {User,
                        attributes: ['username']
                        }
                    ],
                },
            ],
        });

        const blog = edit.get({plain:true});

        res.render('editBlog', {
            ...blog,
            logged_in: req.session.logged_in,
        });
    }
    catch(err){
        res.status(500).json(err);
    }
});

// delete post
homeRoutes.delete('/deletePost/:id', withAuth, async(req,res) => {
    try{
        const deletePost = await Post.findByPk(req.params.id);

        await deletePost.destroy();

        res.redirect('/dashboard');
    }
    catch(err){
        res.status(500).json(err);
    }
});