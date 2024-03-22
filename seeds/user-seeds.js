import { User } from '../models/User.js'
import bcrypt from 'bcrypt'

const keyword = process.env.SEED_PASS
const hash = bcrypt.hashSync(keyword,10)

const userData = [
    {
        username:"SparkleNinja92",
        email:"sparkleninja@mail.com",
        password:hash,
    },
    {
        username:"CrimsonPineapple",
        email:"crimsonpineapple@mail.com",
        password:hash,
    },
    {
        username:"LunarEcho33",
        email:"lunarecho@mail.com",
        password:hash,
    }
]

export const seedUsers = () => User.bulkCreate(userData)