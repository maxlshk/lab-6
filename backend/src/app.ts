import express, { Express } from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import bodyParser from 'body-parser';
import AppRouter from './routes';
import cors from 'cors';
import passport from 'passport';

const port = 3030;
const app: Express = express();
const router = new AppRouter(app);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

const uri = process.env.MONGO_URI || '';

async function connectToDatabase() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
}

router.init();

app.listen(port, async () => {
  await connectToDatabase();
  console.log(`Now listening on port ${port}`);
});
