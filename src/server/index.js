                    require ('dotenv').config ();
const cors        = require ('cors') ();
const bodyParser  = require ('body-parser');
const moment      = require ('moment');
const ua          = require ('express-useragent').express ();
const ip          = require ('request-ip');
const mongoose    = require ('mongoose');
const routes      = require ('./routes');
const express     = require ('express');

const app = express ();
app.use (bodyParser.json ());
app.use (bodyParser.urlencoded ({ extended: true }));
app.use (cors);
app.use (ua);
app.use (ip.mw ());
app.use (routes);
app.use (express.static ('build'));

mongoose.connect (process.env.ONLINE.toLowerCase () === 'true' ? process.env.DBURL : 'mongodb://127.0.0.1:27017/portfolio', {
  useFindAndModify: false,
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then (() =>   console.log (`${ moment ().format (process.env.DTF_LOG ) } Connected to MongoDb.`))
  .catch ((ex) => console.error (`${ moment ().format (process.env.DTF_LOG ) } Error while initiation of the server.`, ex));

const port = process.env.PORT || 9000;
app.listen (port, () => console.log (`${ moment ().format (process.env.DTF_LOG) } Server established at port ${ port }.`));
