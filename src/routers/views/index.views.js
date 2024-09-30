import {Router} from 'express';

const viewRouter = Router()

viewRouter.get("/", (req, res, next) => {
    try {
        return res.render("index")
    } catch (error) {
        return next(error)
    }
})



export default viewRouter;