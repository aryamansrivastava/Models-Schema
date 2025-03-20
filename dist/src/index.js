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
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./config/database");
require("./models/Department");
require("./models/Course");
require("./models/Faculty");
require("./models/Student");
require("./models/StudentAttendance");
require("./models/FacultyAttendance");
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.sequelize
            .sync()
            .then(() => console.log("Database connected successfully!"))
            .catch((err) => {
            console.error("Database cannot be connected", err);
            throw new Error(err.toString());
        });
    }
    catch (e) {
        console.error(e);
        process.exit(1);
    }
}))();
