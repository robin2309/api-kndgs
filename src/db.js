import mongoose from 'mongoose';

// return promise
export const connectDB = () => {
  const {bdd} = global.__CONFIG__;
  const dbURI = `${bdd.host}:${bdd.port}/${bdd.database}`;
  mongoose.Promise = global.Promise;

  // If the Node process ends, close the Mongoose connection
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });
  return mongoose.connect(dbURI);
};
