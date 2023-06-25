import express from 'express';
import logger from 'morgan';
import path from 'path';
import liveReload from 'livereload';
import connectLiveReload from 'connect-livereload';

import loginRouter from "./routes/login";
import logoutRouter from './routes/logout';
import saleRouter from './routes/salepage';
import custRouter from "./routes/custpage";
import custcarRouter from "./routes/custcar";
import custtruRouter from "./routes/custtru";
import custsuvRouter from "./routes/custsuv";
import custresRouter from "./routes/custres";
import custvehRouter from "./routes/custveh";
import salecarRouter from "./routes/salecar";
import saletruRouter from "./routes/saletru";
import salesuvRouter from "./routes/salesuv";
import saleresRouter from "./routes/saleres";


const PORT = 3000;

const liveReloadServer = liveReload.createServer();
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh('/');
  }, 100)
});

const app = express();

app.use(connectLiveReload());

app.use(express.static(path.join(__dirname, '/src')));
app.use(express.urlencoded({extended: false}))
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')))

app.use(logger('dev'));

app.use('/', loginRouter);
app.use("/logout", logoutRouter);
app.use('/custpage', custRouter);
app.use('/custcar', custcarRouter);
app.use('/custtru', custtruRouter);
app.use('/custsuv', custsuvRouter);
app.use('/custres', custresRouter);
app.use('/custveh', custvehRouter);
app.use('/salepage', saleRouter);
app.use('/salecar', salecarRouter);
app.use('/saletru', saletruRouter);
app.use('/salesuv', salesuvRouter);
app.use('/saleres', saleresRouter);

app.listen(PORT, ()=> {
    console.log(`Server is running at http://localhost:${PORT}`)
});