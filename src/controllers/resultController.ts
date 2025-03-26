import { Request, Response } from "express";
import db from "../models/index";

export const getResults = async (req: Request, res: Response) => {
    try {
        const result = await db.models.Result.findAll({
            include: [
              { model: db.models.Student, as: "student" }, 
              { model: db.models.Exam, as: "exam" },
              { model: db.models.Faculty, as: "faculties" }
            ],
          });

        if (!result) {
           res.status(404).json({ message: "Result not found" });
           return ;
        }
        res.json(result);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
};
