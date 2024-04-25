const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')
require('express-async-errors')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    if (request.body.password === undefined) {
        return response.status(400).json({ error: 'password missing' })
    } else if (request.body.password.length < 3) {
        return response.status(400).json({ error: 'password minimum length is 3' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })

    

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

module.exports = usersRouter