import { User } from '../models/User.js'
// import bcrypt from 'bcrypt'

// const keyword = process.env.SEED_PASS
// const hash = bcrypt.hashSync(keyword,10)

const userData = [
    {
        username:"JuanEste",
        email:"sparkleninja@mail.com",
        password:"password123",
    },
    {
        username:"SammyLu",
        email:"crimsonpineapple@mail.com",
        password:"password123",
    },
    {
        username:"RonJon",
        email:"lunarecho@mail.com",
        password:"password123",
    }
];

export const seedUsers = () => User.bulkCreate(userData)