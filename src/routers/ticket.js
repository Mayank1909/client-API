import { Router } from 'express'
const router = Router()


const ticketRouter = router.all("/", (req, res, next) => {
    res.json({ message: "return form ticket router" })
})
export default ticketRouter;