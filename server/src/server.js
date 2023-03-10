import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import routes from './routes';
import sendReports from './controllers/sendReportsController';
import addSchedules from './seed/addSchedules';
import cron from 'node-cron';
import { main } from './schedules/submissions';

const app = express();
const Port = process.env.PORT || 8080;
const dbUri = process.env.MONGO_URI;

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.set('strictQuery', false);

mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', err => {
  console.log(err);
});
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use('/api/v1', routes);

// run every 1 minute
cron.schedule('*/1 * * * *', () => {
  sendReports();
});

// run main after every 2 hours
cron.schedule('0 */2 * * *', () => {
  main();
});

app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});

// addSchedules();
