require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors")
const userRouter = require("./routes/user.routes");
const categoryRouter = require("./routes/gategory.routes");
const ApiError = require("./utils/apiError");
const globalError = require("./controllers/error.controller");

const app = express();

const PORT  = process.env.PORT || 3000;
const dbURL = process.env.dbURL;
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
  ],
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('images'))

app.use('/users',userRouter);
app.use('/category',categoryRouter);

app.all('*',(req, res, next)=>{
    next(new ApiError(`can't find this route ${req.originalUrl}`, 400))
})


app.use(globalError);

mongoose.connect(dbURL, () => {
    app.listen(PORT, () => {
      console.log(`server listening on http://localhost:${PORT}`);
    });
});
