import { Request, Response } from "express";
import Faculty from "../models/Faculty";
import Course from "../models/Course";
import FacultyAttendance from "../models/FacultyAttendance";
import Institute from "../models/Institute";

export const getAllFaculties = async (req: Request, res: Response) => {
  try {
    const faculties = await Faculty.findAll();
    res.status(200).json(faculties);
  } catch (error) {
    res.status(500).json({ error: "Error fetching faculties" });
  }
};

export const getFacultyById = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const faculty = await Faculty.findAll({
      where: { id },
      include: [
          { model: Course },           
          { model: Institute },         
          { model: FacultyAttendance }, 
      ],
  });
    if (!faculty) {
      res.status(404).json({ error: "Faculty not found" });
      return;
    }

    res.status(200).json(faculty);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching faculty" });
  }
};


export const getFacultiesByInstitute = async (req: Request, res: Response) => {
  try {
    const {instituteId} = req.params;
    if(!instituteId){
      res.status(400).json({ error: "Institute ID is required" });
      return;
    }
    const faculty = await Faculty.findAll({
      where: { institute_id: instituteId },
    });
    const totalFaculty = await Faculty.count({
      where: { institute_id: instituteId },
    });
    
    if (!faculty) {
      res.status(404).json({ error: "Faculty not found" });
      return;
    }

    res.status(200).json({faculty,totalFaculty});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching faculty" });
  }
};

export const createFaculty = async (req: Request, res: Response) => {
  try {
    const faculty = await Faculty.create(req.body);
    res.status(201).json(faculty);
  } catch (error) {
    console.error("Error creating faculty:", error);
    res.status(500).json({ error: "Error creating faculty" });
  }
};

export const updateFaculty = async (req: Request, res: Response) => {
  try {
    const faculty = await Faculty.findByPk(req.params.id);
    if (!faculty) {
      res.status(404).json({ error: "Faculty not found" });
      return;
    }

    await faculty.update(req.body);
    res.status(200).json(faculty);
  } catch (error) {
    res.status(500).json({ error: "Error updating faculty" });
  }
};

export const deleteFaculty = async (req: Request, res: Response) => {
  try {
    const faculty = await Faculty.findByPk(req.params.id);
    if (!faculty) {
      res.status(404).json({ error: "Faculty not found" });
      return;
    }

    await faculty.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error deleting faculty" });
  }
};
