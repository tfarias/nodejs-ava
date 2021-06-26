import mongoose from 'mongoose';

class Database {
  
  constructor() {
    this.mongo();
    console.log('connected on mongoose');
  }

  mongo() {
    const mongoURI = `mongodb://localhost:27017/node_api`;
     mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true
    });
  }
}
export default new Database();
