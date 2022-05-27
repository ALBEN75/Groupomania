const express = require('express');
const path = require('path');

const usersRoutes = require('./routes/usersRoutes');
const logsRoutes = require('./routes/logsRoutes');

const db = require('./models/index');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(express.json());

db.connexion.sync();

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', usersRoutes);
app.use('/api/logs', logsRoutes);

module.exports = app;