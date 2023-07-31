const mongoose = require('mongoose');

require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL;


mongoose.connect(MONGO_URL, {
    dbName: 'todoApp'
})
.then(() => {
    console.log('MongoDB connected');
})
.catch((err) => {
    console.log('MongoDB connection failed '+ err);
});

