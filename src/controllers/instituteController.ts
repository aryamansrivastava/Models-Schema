import { Request, Response } from "express";
import Institute from "../models/Institute";
import Course from "../models/Course";
import { Op } from "sequelize";

export const getAllInstitutes = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, search = "", filter = "" } = req.query;

    const pageNumber = Number(page);
    const pageSize = Number(limit);

    const searchFilter = search
      ? {
          [Op.or]: [
            { name: { [Op.like]: `%${search}%` } },
            { email: { [Op.like]: `%${search}%` } },
          ],
        }
      : {};

    const additionalFilter = filter
      ? { established: { [Op.gte]: filter } }
      : {};

    const { rows: institutes, count } = await Institute.findAndCountAll({
      where: {
        ...searchFilter,
        ...additionalFilter,
      },
      limit: pageSize,
      offset: (pageNumber - 1) * pageSize,
      order: [["name", "ASC"]],
    });

    res.status(200).json({
      data: institutes,
      total: count,
      totalPages: Math.ceil(count / pageSize),
      currentPage: pageNumber,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching institutes" });
  }
};

export const getInstituteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const institute = await Institute.findOne({
      where: { id },
      include: [{ model: Course }],
    });
    if (!institute) {
      res.status(404).json({ error: "Institute not found" });
      return;
    }
    res.status(200).json(institute);
  } catch (error) {
    console.error(error);
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
    if (!institute) {
      res.status(404).json({ error: "Institute not found" });
      return;
    }

    await institute.update(req.body);
    res.status(200).json(institute);
  } catch (error) {
    res.status(500).json({ error: "Error updating institute" });
  }
};

export const deleteInstitute = async (req: Request, res: Response) => {
  try {
    const institute = await Institute.findByPk(req.params.id);
    if (!institute) {
      res.status(404).json({ error: "Institute not found" });
      return;
    }

    await institute.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error deleting institute" });
  }
};
