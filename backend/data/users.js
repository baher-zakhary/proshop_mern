import bcryptjs from "bcryptjs"

const users = [
    {
        name: "Admin User",
        email: "admin@example.com",
        password: bcryptjs.hashSync('password', 10),
        isAdmin: true
    },
    {
        name: "John Doe",
        email: "john@example.com",
        password: bcryptjs.hashSync('password', 10)
    },
    {
        name: "Adam Williams",
        email: "adam@example.com",
        password: bcryptjs.hashSync('password', 10)
    }
]

export default users