const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const uploadRoute = require('./routes/upload');

app.use(express.json())
app.use(cors())
app.use('/api/v1', uploadRoute)



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
 
 module.exports = app;