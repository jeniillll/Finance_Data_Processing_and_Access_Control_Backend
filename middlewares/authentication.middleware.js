import jwt from "jsonwebtoken";
import { findUserById } from "../repositories/rbac/userrole.repository.js";

export const checkForAuthenticationCookie = (cookieName) => {
  return async (req, res, next) => {
    const token = req.cookies?.[cookieName];

    if (!token) {
      return next();
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await findUserById(decoded.id);

      if (!user || user.isDeleted) {
        return res.status(401).json({
          message: "User no longer exists"
        });
      }

      if (!user.isActive) {
        return res.status(403).json({
          message: "Your account has been deactivated by admin"
        });
      }

      req.user = decoded;
      next();
    } catch {
      return res.status(401).json({
        message: "Invalid or expired authentication token"
      });
    }
  };
};