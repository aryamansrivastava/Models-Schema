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
exports.getResultById = void 0;
const Exam_1 = __importDefault(require("../models/Exam"));
const Faculty_1 = __importDefault(require("../models/Faculty"));
const Result_1 = __importDefault(require("../models/Result"));
const Student_1 = __importDefault(require("../models/Student"));
const getResultById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield Result_1.default.findOne({
            where: { id },
            include: [
                { model: Student_1.default },
                { model: Exam_1.default },
                { model: Faculty_1.default },
            ],
        });
        if (!result) {
            res.status(404).json({ message: "Result not found" });
            return;
        }
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getResultById = getResultById;
