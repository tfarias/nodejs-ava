import { Request, Response } from "express";
import User from "../../models/User";
import mongoose from "mongoose";

class CreateUserController {
  async create(request: Request, response: Response) {
    try {
      const user = new User(request.body);
      user.setPassword(user.password);
      user.save();
      return response.status(201).json(user);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async all(request: Request, response: Response) {
    try {
      const all = await User.find();
      return response.status(200).json(all);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async find(request: Request, response: Response) {
    try {
      if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
        throw new Error("Id invalid!");
      }
      const all = await User.findById(request.params.id);
      return response.json(all);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async delete(request: Request, response: Response) {
    try {
      if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
        throw new Error("Id invalid!");
      }
      await User.findByIdAndDelete(request.params.id);
      return response.status(203).end();
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

export default new CreateUserController();
