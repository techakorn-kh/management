const express = require('express');
const session = require('express-session');
const config = require('./config');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || config.APP_PORT;

require('./models/index');

const apiRoutes = require('./routes/api');
const webRoutes = require('./routes/web');

app.use(cors());
app.use(session({
    secret: 'secret',
    name: 'session',
    keys: ['key1','key2']
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRoutes); //Service API

app.use('/', webRoutes); //Application

app.use(function(req, res){
    return res.status(500).json({
        code: 500, 
        status: 'error', 
        message: 'Internal Server Error'
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

module.exports = app;