declare var require, process;
import * as mongoose from 'mongoose';
const models = require('./models');
mongoose.Promise = Promise;

let dbURI = 'mongodb://localhost/FitnessApp';
if (process.env.NODE_ENV === 'production') {
  dbURI = process.env.MONGODB_URI;
}
var promise = mongoose.connect(dbURI, {
  useMongoClient: true
});

promise.then((db) => {
});

mongoose.connection.on('open', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});
mongoose.connection.on('error', err => {
  console.log('Mongoose connection error:', err);
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

const gracefulShutdown = (msg, callback) => {
  mongoose.connection.close(() => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  });
};

// For nodemon restarts                                 
process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});
// For app termination
process.on('SIGINT', () => {
  gracefulShutdown('app termination', () => {
    process.exit(0);
  });
});
// For Heroku app termination
process.on('SIGTERM', () => {
  gracefulShutdown('Heroku app shutdown', () => {
    process.exit(0);
  });
});   

mongoose.model('Program', models.programSchema);
mongoose.model('Exercise', models.exerciseSchema);