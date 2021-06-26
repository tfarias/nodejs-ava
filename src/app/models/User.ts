import mongoose,{ Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string; 
  username: string; 
  email: string; 
  password: string; 
};

interface IUserDocument extends IUser, Document {
  setPassword: (password: string) => Promise<void>
  checkPassword: (password: string) => Promise<boolean>
}

interface IUserModel extends Model<IUserDocument> {
  findByUsername: (username: string) => Promise<IUserDocument>
}

const UserSchema: Schema<IUserDocument> = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    required: true
  }
})

UserSchema.methods.setPassword = async function (password: string) {
  const hash = await bcrypt.hash(password, 10)
  this.password = hash
}

UserSchema.methods.checkPassword = async function (password: string) {
  const result = await bcrypt.compare(password, this.password)
  return result
}

UserSchema.statics.findByUsername = function (username: string) {
  return this.findOne({ username })
}

const User = mongoose.model<IUserDocument, IUserModel>("User", UserSchema)
export default User