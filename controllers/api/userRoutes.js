import { Router } from 'express';
import { User } from '../../models/User.js';
import { withAuth } from '../../utils/auth.js';

export const userRoutes = Router();

// all routes
userRoutes.get('/', async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] },
        });
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// sign up route
userRoutes.post('/signup', async (req, res) => {
    try {
        const signupUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        req.session.user_id = signupUser.id;
        req.session.logged_in = true;
        req.session.save();
        
        res.status(200).json(singupUser);
    }
    catch (err) {
        console.log("signup error",err);
        res.status(500).json(err);
    }
});

// log in route
userRoutes.post('/login', async (req, res) => {
    try {
        const loginUser = await User.findOne({
            where: { username: req.body.username }
        });

        if (!loginUser) {
            res.status(400).json({ message: 'Incorrect email or password' });
            return;
        }
        // checking if the stored hashed password matches
        const validPassword = await loginUser.checkPassword(req.body.password);

        if(!validPassword) {
            res.status(400).json({message: 'Incorrect email or password'});
            return;
        }

        req.session.save(() => {
            req.session.user_id = loginUser.id;
            req.session.logged_in = true;
            console.log("USER LOG---",res.session);

            res.json({
                user: loginUser,
                message: 'Logged In'
            });
        });

    }
    catch(err) {
        console.log("Login error",err);

        res.status(400).json(err);
    }
});

// log out 
userRoutes.post('/logout', (req,res) => {
    if(req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end()
        });
    }
    else{
        res.status(404).end();
    }
});