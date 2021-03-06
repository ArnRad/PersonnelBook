const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Import Auth
const authRoute = require('./routes/auth');
app.use('/api', authRoute);

// Import Employees
const employees = require('./routes/api/employees');
app.use('/api/employees', employees);

// Import Users
const users = require('./routes/api/users');
app.use('/api/users', users);

// Import Workplaces
const workplaces = require('./routes/api/workplaces');
app.use('/api/workplaces', workplaces);

// Import Divisions
const divisions = require('./routes/api/divisions');
app.use('/api/divisions', divisions);

// Import Subdivisions
const subdivisions = require('./routes/api/subdivisions');
app.use('/api/subdivisions', subdivisions);

// Import Regions
const regions = require('./routes/api/regions');
app.use('/api/regions', regions);

// Import Groups
const groups = require('./routes/api/groups');
app.use('/api/groups', groups);

// Import Subgroups
const subgroups = require('./routes/api/subgroups');
app.use('/api/subgroups', subgroups);

// Connect to DB
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    // console.log('Connected to DB!')
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));