import Jwt from "jsonwebtoken";

export const logAccess = (req, res, next) => {
    const { user } = req.cookies;
    try {
        const userInfo = Jwt.verify(user, process.env.jwtKey);
        req.user = userInfo;
        res.redirect('/home')
    } catch (err) { next(); }
}

export const publicAccess = (req, res, next) => {
    const { user } = req.cookies;
    try {
        const userInfo = Jwt.verify(user, process.env.jwtKey);
        req.user = userInfo;
    } catch (err) { }
    next();
}

export const privateAccess = (req, res, next) => {
    const { user } = req.cookies;
    try {
        const userInfo = Jwt.verify(user, process.env.jwtKey);
        req.user = userInfo;
        next();
    } catch (err) { res.redirect('/home') }
}