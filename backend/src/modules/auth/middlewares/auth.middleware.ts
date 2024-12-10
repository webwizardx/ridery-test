import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../../users/types";

/**
 * Middleware to handle authentication by verifying the JWT token in the Authorization header.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 *
 * @throws {401} If the Authorization header is missing.
 * @throws {401} If the token is missing.
 * @throws {401} If the token is invalid.
 *
 * @author Jonathan Alvarado
 */
export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: "Authorization header missing" });
    return;
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Token missing" });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY as string,
    ) as JwtPayload;
    req.user = decoded.user as User;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
}
