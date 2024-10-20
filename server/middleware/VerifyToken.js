import jwt from "jsonwebtoken";
import { createError } from "../error.js";

export const verifyToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return next(createError(401, "You are not authenticated!"));
    }
    //  console.log(req.headers.authorization);
    //Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTNlYzEyYjM1YmIxZGNjZWY4ZjAyMSIsImlhdCI6MTcyOTQwNTc3MiwiZXhwIjozMTcyNzM4NDgxNzJ9.0uePI01Ugj4kPsm38Wq4NMKMsiiGrAe2SEIQACOigxg
    const token = req.headers.authorization.split(" ")[1];

    if (!token) return next(createError(401, "You are not authenticated"));

    const decode = jwt.verify(token, process.env.JWT);
    req.user = decode;
    return next();
  } catch (err) {
    next(err);
  }
};
