"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const instituteController_1 = require("../controllers/instituteController");
const router = express_1.default.Router();
router.get("/", instituteController_1.getAllInstitutes);
router.get("/:id", instituteController_1.getInstituteById);
router.post("/", instituteController_1.createInstitute);
router.patch("/:id", instituteController_1.updateInstitute);
router.delete("/:id", instituteController_1.deleteInstitute);
exports.default = router;
