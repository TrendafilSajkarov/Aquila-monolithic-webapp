const path = require('path');

const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

// Load env variables
dotenv.config({ path: './config/config.env' });

// Connect to MongoDB
connectDB();

// hi
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
