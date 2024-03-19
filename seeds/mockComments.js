import {Comments} from '../models/Comments.js'

const commentData = [
    {
        comment: "I thought this skill set would only apply to large corporations. The thought of freelancing or joining a startup never crossed my mind! Great post!!",
        user_id:1,
        post_id:3,
    },
    {
        comment: "I have been learning HTML and CSS. Excited to learn new technologies like React!",
        user_id:3,
        post_id:2,
    },
    {
        comment: "Great summarization of what full stack web development entails!",
        user_id:2,
        post_id:1
    },
]

export const seedComments = () => Comments.bulkCreate(commentData)