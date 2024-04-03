const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const morgan = require('morgan')
require('dotenv').config()


const URL = `http://20.244.56.144/test`

const app = express();
const PORT = 3000
const GetProducts = require('./product');
app.use(bodyParser.json())

app.use(morgan('dev'))
app.use(cors())

app.use('/api/getProducts/',GetProducts);

app.get('/', (req, res) => {
    const data ={
        message:"Working",
        timestamp: new Date().toISOString(),
    }
  res.status(200).json(data);
});


app.listen(PORT || 3000, () => {
  console.log(`SERVER : http://localhost:${PORT}`);
})