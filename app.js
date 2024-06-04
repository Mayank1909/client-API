import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import helmet from 'helmet'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
const app = express();

// connnection to mongodb
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Connected!'));

app.use(helmet());
app.use(cors());
app.use(morgan());
// setting body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.NODE_ENV !== "production") {
    const mDb = mongoose.connection;
    mDb.on("open", () => {
        console.log("MongoDB is conneted");
    });

    mDb.on("error", (error) => {
        console.log(error);
    });

    //Logger
    app.use(morgan("tiny"));
}
const port = process.env.PORT || 3001;
import userRouter from "./src/routers/user.js"
import ticketRouter from "./src/routers/ticket.js"
import handleError from './src/errorhandle.js'

app.use("/v1/user", userRouter);
app.use("/v1/ticket", ticketRouter)
// app.use("/", (req, res, next) => {
//     res.json("hey I am Good")
// })
app.use((error, req, res, next) => {
    handleError(error, res)
})



app.listen(port, () => {
    console.log(" Iam working at 3001")
})
