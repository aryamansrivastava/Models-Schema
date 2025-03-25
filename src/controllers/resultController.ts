import { Request, Response } from "express";
import db from "../models/index";

export const getResultById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await db.models.Result.findAll({
            include: [
              { model: db.models.Student, as: "student" }, 
              { model: db.models.Exam, as: "exam" },
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
