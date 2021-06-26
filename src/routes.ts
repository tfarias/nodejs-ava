import { Router } from "express";
import CreateUserController from "./app/controllers/UserController/CreateUserController";

const router = Router();
router.get("/", async (req, res) => {
  return res.json({ msg: "Hello" });
});

router.get("/user/:id", CreateUserController.find);
router.get("/user", CreateUserController.all);
router.post("/user", CreateUserController.create);
router.delete("/user/:id", CreateUserController.delete);

export { router };
