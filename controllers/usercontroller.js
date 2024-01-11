var User = require("../models/UserModel");
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const addUser = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await user.findOne({ email });

  if (user) {
    res.status(404).json({ status: false, message: "user already exist" });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);

    let user = await User.create({ name, email, password: hashedPassword });
    const token = jwt.sign({ _id: user._id }, "fefesfeergergewfew");
    res
      .status(201)
      .cookie("token", token, { httpOnly: true, maxAge: 15 * 60 * 1000 })
      .json({ status: true, message: "added succesfully" });
  }
};
