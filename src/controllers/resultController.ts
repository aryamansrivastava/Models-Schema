import { Request, Response } from "express";
import Exams from "../models/Exams";
import Faculty from "../models/Faculty";
import Result from "../models/Result";
import Student from "../models/Student";

export const getResultById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await Result.findOne({
            where: { id },
            include: [
                { model: Student }, 
                { model: Exams }, 
                { model: Faculty }, 
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
