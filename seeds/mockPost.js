import { Post } from '../models/Post.js'

const postData = [
    {
        title: "Full Stack Web Development Overview",
        content: "Full stack web development refers to the practice of developing both the front-end (client-side) and back-end (server-side) components of web applications. This includes working with technologies such as HTML, CSS, and JavaScript for the front-end, and databases, servers, and application frameworks for the back-end.",
        user_id: 1,
    },
    {
        title: "Technologies Used in Full Stack Development",
        content: "In full stack web development, a variety of technologies are employed. For the front-end, popular frameworks/libraries like React, Angular, or Vue.js are commonly used, along with HTML, CSS preprocessors like Sass or LESS, and JavaScript. On the back-end, technologies such as Node.js, Python (with frameworks like Django or Flask), Ruby on Rails, or Java (with Spring Boot) are prevalent. Databases like MySQL, PostgreSQL, MongoDB, or SQLite are used to store application data.",
        user_id: 2,
    },
    {
        title: "Career Opportunities in Full Stack Web Development",
        content: "Full stack web developers are in high demand across industries due to their versatile skill set. They can work as freelancers, join startups, or be employed by large corporations. Career paths may include roles such as web developer, software engineer, technical lead, or even startup founder. With the increasing reliance on web-based applications, the demand for skilled full stack developers continues to grow, offering abundant career opportunities and potential for advancement.",
        user_id: 3,
    }
]

export const seedPosts = () => Post.bulkCreate(postData);