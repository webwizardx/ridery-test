import { Request, Response, NextFunction } from "express";
import { z, ZodError, ZodIssue } from "zod";

export function validationMiddleware(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: ZodIssue) => ({
          [issue.path[0]]: issue.message,
        }));
        res.status(422).json({ error: "Invalid data", data: errorMessages });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  };
}
