import { Request, Response } from "express";
import Institute from "../models/Institute";

export const getAllInstitutes = async (req: Request, res: Response) => {
  try {
    const institutes = await Institute.findAll();
    res.status(200).json(institutes);
  } catch (error) {
    res.status(500).json({ error: "Error fetching institutes" });
  }
};

export const getInstituteById = async (req: Request, res: Response) => {
  try {
    const institute = await Institute.findByPk(req.params.id);
    if (!institute) {
        res.status(404).json({ error: "Institute not found" });
    return;}
    res.status(200).json(institute);
  } catch (error) {
    res.status(500).json({ error: "Error fetching institute" });
  }
};

export const createInstitute = async (req: Request, res: Response) => {
  try {
    const institute = await Institute.create(req.body);
    res.status(201).json(institute);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating institute" });
  }
};

export const updateInstitute = async (req: Request, res: Response) => {
  try {
    const institute = await Institute.findByPk(req.params.id);
    if (!institute){res.status(404).json({ error: "Institute not found" });
return;}

    await institute.update(req.body);
    res.status(200).json(institute);
  } catch (error) {
    res.status(500).json({ error: "Error updating institute" });
  }
};

export const deleteInstitute = async (req: Request, res: Response) => {
  try {
    const institute = await Institute.findByPk(req.params.id);
    if (!institute) {res.status(404).json({ error: "Institute not found" });return;}

    await institute.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error deleting institute" });
  }
};
