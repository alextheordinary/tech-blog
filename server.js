// Import dependencies
const express = require('express'); // express server
const session = require('express-session'); // for session data / cookies
const exphbs = require('express-handlebars'); // handlebars template engine
const routes = require('./controllers'); // importing routes from controllers/index.js
const sequelize = require('./config/connection'); // connection.js
// Used to store session data / cookies
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Defining the express server and the port it will run on
const app = express();
const PORT = process.env.PORT || 3001;

// Creating the session - 5 minute maxAge

const sess = {
    secret: process.env.SESS_SECRET,
    cookie: {
        maxAge: 5 * 60 * 1000,
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };

// Settings up handlebars as the template engine
const hbs = exphbs.create();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Setting up middleware
app.use(session(sess)); 
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });