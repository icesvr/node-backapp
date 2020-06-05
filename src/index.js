const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
require('./database');
const profileRouter = require('./routes/profile');
const loginRouter = require('./routes/login');



app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use("/uploads", express.static(path.resolve("uploads")));

app.use("/profile", profileRouter);
app.use("/login",loginRouter);



app.listen( 3000, () => {
    console.log('Servidor iniciado');
});