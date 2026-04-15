    require("dotenv").config();
    const express = require("express");
    const cors = require("cors");
    require('./config/connection'); 
    const server = express();

    const contactRouter = require('./routes/contactRouter');
    const authRouter = require('./routes/authRouter');

    // Middleware
    server.use(cors());
    server.use(express.json());

    server.use('/api/contact', contactRouter);
    server.use('/api/auth', authRouter);


    // Test route
    server.get('/', (req, res) => {
        res.status(200).send(`<h1>Server Running.....!</h1>`);
    });

    // Port
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
        console.log(`Server Running at Port ${PORT}`);
    });