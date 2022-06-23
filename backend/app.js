const express = require('express');
const path = require('path');
const helmet = require('helmet');
const nocache = require('nocache');

const usersRoutes = require('./routes/usersRoutes');
const postsRoutes = require('./routes/postsRoutes');
const commentsRoutes = require('./routes/commentsRoutes');
const likesRoutes = require('./routes/likesRoutes');

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

app.use(helmet());

app.use('/api/auth', usersRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/like', likesRoutes);

app.use(nocache());

module.exports = app;