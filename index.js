require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); 

const svg = require('./database/svg');
const { request, response } = require('express');

app.get('/getSvg/:nome', svg.getSVG);

app.get('/getViewBox/:nome',svg.getViewBox);

app.get('/getSvgEstado/:cidade', svg.getSvgEstado);

app.get('/getViewBoxEstado/:cidade', svg.getViewBoxEstado)

app.get('/getInfoCidade/:cidade', svg.getInfoCidade)


app.listen(process.env.PORT, () => { 
  console.log(`Server listening on port ${process.env.PORT}`); 
});