const express = require('express');
const bodyParser = require('body-parser');
const todoRoutes = require('./ROUTES/TodoRoutes');
const app = express();

const cors = require('cors');
const PORT = process.env.PORT || 3000;
require('dotenv').config();
require('./db');


app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use('/todos', todoRoutes);


          



app.get('/', (req, res) => {
    res.json({ message: 'The API is working' });
});





// ERROR HANDLING MIDDLEWARE
app.use((err , req, res , next) => {
    console.log('error middleware called ', err);
    res.status(500).json({ message: err.message });
})


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
