import { seedUsers } from './user-seeds.js'
import { seedPosts } from './mockPost.js'
import { seedComments } from './mockComments.js'

import { Sequelize } from '../config/connection.js'

const seedAll = async () => {
    await Sequelize.sync({force: true})
    console.log('\n----- DATABASE SYNCED -----\n');

    await seedUsers()
    console.log('\n----- USERS SEEDED -----\n');

    await seedPosts()
    console.log('\n----- POSTS SEEDED -----\n');

    await seedComments()
    console.log('\n----- COMMENTS SEEDED -----\n');

    process.exit(0)
};

seedAll()