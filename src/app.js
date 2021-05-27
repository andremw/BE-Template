const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./model')

const { getProfile } = require('./middleware/getProfile')
const contracts = require('./controllers/contracts')
const jobs = require('./controllers/jobs')

const app = express();

app.use(bodyParser.json());
app.set('sequelize', sequelize)
app.set('models', sequelize.models)

app.get('/contracts/:id', getProfile, contracts.getById)
app.get('/contracts', getProfile, contracts.get)
app.get('/jobs/unpaid', getProfile, jobs.getUnpaid)

module.exports = app;
