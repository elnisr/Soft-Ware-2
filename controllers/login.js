import user from "../models/usersSchema.js"
import bcrypt from 'bcryptjs'
import Jwt from "jsonwebtoken"

// login

export const loginPage = async (req, res) => {
    res.render('login', { pageTitle: 'login', userMessage: '', passwordMessage: '', user: req.user, layout: false })
}

export const login = async (req, res) => {
    const { username, password } = req.body
    const logedUser = await user.findOne({ username })
    if (logedUser) {
        const dcryptPassword = bcrypt.compareSync(password, logedUser.password);
        if (dcryptPassword) {
            const userData = {
                _id: logedUser._id,
                username: logedUser.username,
                firstName: logedUser.firstName,
                lastName: logedUser.lastName,
                email: logedUser.email,
            }
            const jwtToken = Jwt.sign(userData, process.env.jwtKey)
            res.cookie('user', jwtToken)
            res.redirect('/home')
        } else { res.render('login', { pageTitle: 'login', userMessage: '', passwordMessage: 'invalid password', user: req.user, layout: false }) }
    } else { res.render('login', { pageTitle: 'login', userMessage: 'invalid username', passwordMessage: '', user: req.user, layout: false }) }
}

// signup

export const signupPage = async (req, res) => {
    res.render('signup', { pageTitle: 'signUp', userMessage: '', emailMessage: '', user: req.user, layout: false })
}

export const createUser = async (req, res) => {
    const { firstName, lastName, username, password, email } = req.body;
    const existingUser = await user.findOne({ username })
    const existingEmail = await user.findOne({ email })
    var salt = bcrypt.genSaltSync(10);
    var bcryptedPassword = bcrypt.hashSync(password, salt);
    if (existingUser) {
        return res.render('signup', { pageTitle: 'signUp', userMessage: "username is not available", emailMessage: '', user: req.user, layout: false })
    }
    if (existingEmail) {
        return res.render('signup', { pageTitle: 'signUp', userMessage: '', emailMessage: "email is not available", user: req.user, layout: false })
    }
    await user.create({ firstName, lastName, username, password: bcryptedPassword, email })
        .then(() => { res.redirect('/login'); })
        .catch((err) => { console.log(err); })
}