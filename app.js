import express from "express"
import dotenv from "dotenv"
import ejsLayout from "express-ejs-layouts";
import mongoose from "mongoose";
import methodOverride from "method-override";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import loginRouter from "./routes/loginRouter.js"
import signupRouter from "./routes/signupRouter.js"
import { logAccess } from "./middleware/loginAccess.js";

dotenv.config();
const app = express()
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'))
app.use(ejsLayout)
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(cookieParser())
app.use(helmet())

// mongoose connection
mongoose.connect(process.env.mongoConnection)
    .then((result) => {
        app.listen(process.env.port, () => {
            console.log(`Example app listening on port ${process.env.port}`)
        })
    }).catch((err) => {
        console.log(err);
    })

app.use('/login', logAccess, loginRouter)
app.use('/signup', logAccess, signupRouter)
app.use((req, res) => { res.status(404).render('NotFound', { layout: false }) })