import { createUserService, loginUserService, deleteUserService } from "../services/auth.service.js";

export async function createUserController(req, res) {
  try {
    const result = await createUserService(req.body);

    return res.status(result.statusCode).json({
      message: result.message
    });
  } catch (err) {
    return res.status(500).json({ message: "Signup failed" });
  }
}

export async function loginUserController(req, res) {
  try {
    const result = await loginUserService(req.body);

    if (result.token) {
      res.cookie("token", result.token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
      });
    }

    return res.status(result.statusCode).json({
      message: result.message
    });
  } catch (err) {
    return res.status(500).json({ message: "Login failed" });
  }
}

export async function deleteUserController(req, res) {
  try {
    const result = await deleteUserService(req.params);

    return res.status(result.statusCode).json({
      message: result.message
    });
  } catch (err) {
    return res.status(500).json({ message: "Delete failed" });
  }
}

export function logOutController(req, res) {
  res.clearCookie("token");
  return res.status(200).json({
    message: "Logout successful"
  });
}

export function getUserController(req, res) {
  return res.status(200).json({
    user: req.user
  });
}