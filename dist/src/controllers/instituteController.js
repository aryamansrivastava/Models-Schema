"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInstitute = exports.updateInstitute = exports.createInstitute = exports.getInstituteById = exports.getAllInstitutes = void 0;
const Institute_1 = __importDefault(require("../models/Institute"));
const Course_1 = __importDefault(require("../models/Course"));
const sequelize_1 = require("sequelize");
const getAllInstitutes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 10, search = "", filter = "" } = req.query;
        const pageNumber = Number(page);
        const pageSize = Number(limit);
        const searchFilter = search
            ? {
                [sequelize_1.Op.or]: [
                    { name: { [sequelize_1.Op.like]: `%${search}%` } },
                    { email: { [sequelize_1.Op.like]: `%${search}%` } },
                ],
            }
            : {};
        const additionalFilter = filter
            ? { established: { [sequelize_1.Op.gte]: filter } }
            : {};
        const { rows: institutes, count } = yield Institute_1.default.findAndCountAll({
            where: Object.assign(Object.assign({}, searchFilter), additionalFilter),
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching institutes" });
    }
});
exports.getAllInstitutes = getAllInstitutes;
const getInstituteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const institute = yield Institute_1.default.findOne({ where: { id },
            include: [{ model: Course_1.default }], });
        if (!institute) {
            res.status(404).json({ error: "Institute not found" });
            return;
        }
        res.status(200).json(institute);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching institute" });
    }
});
exports.getInstituteById = getInstituteById;
const createInstitute = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const institute = yield Institute_1.default.create(req.body);
        res.status(201).json(institute);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error creating institute" });
    }
});
exports.createInstitute = createInstitute;
const updateInstitute = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const institute = yield Institute_1.default.findByPk(req.params.id);
        if (!institute) {
            res.status(404).json({ error: "Institute not found" });
            return;
        }
        yield institute.update(req.body);
        res.status(200).json(institute);
    }
    catch (error) {
        res.status(500).json({ error: "Error updating institute" });
    }
});
exports.updateInstitute = updateInstitute;
const deleteInstitute = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const institute = yield Institute_1.default.findByPk(req.params.id);
        if (!institute) {
            res.status(404).json({ error: "Institute not found" });
            return;
        }
        yield institute.destroy();
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: "Error deleting institute" });
    }
});
exports.deleteInstitute = deleteInstitute;
