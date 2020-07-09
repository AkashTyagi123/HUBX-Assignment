const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('config');
const eventRouter = require('./routes/event');
const userRouter = require('./routes/User');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/event',eventRouter);
app.use('/api/user',userRouter);
const port = config.get("PORT");
const db = config.get("DB_URI");
mongoose.connect(db,{useCreateIndex:true,useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log("db connected"))
.catch(err=>console.log(err));
app.listen(port,()=>console.log(`App staretd on ${port}`));
