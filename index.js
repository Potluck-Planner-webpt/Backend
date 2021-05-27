const express = require("express");
const cors = require("cors");
const helmet = require('helmet');
const jwt = require('jsonwebtoken');

const restricted = require('./middleware/restricted-middleware');

const authRouter = require('./routers/authRouter');
const userRouter = require('./routers/userRouter');

const server = express();
const port = process.env.PORT || 5000

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/users', restricted, userRouter);

server.get("/", (req, res) => {
    res.json({message: "Welcome to the server!"})
})

server.get('/token', (req, res) => {
    const payload = {
        subject: "thisuser",
        userid: 'danielbeggs',
        color: 'green'
    }
    const secret = 'privatekey';

    const options = {
        expiresIn: '30m'
    }
    const token = jwt.sign(payload, secret, options);

    res.json(token);
})

server.use((err, req, res, next) => {
    res.status(500).json({message: "Something went worng"})
})




if(!module.parent) {
    server.listen(port, () => {
        console.log(`Running at http://localhost:${port}`)
    })
}

module.exports = server