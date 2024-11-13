"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_ts_1 = __importDefault(require("../../data/patients.ts"));
const patients = patients_ts_1.default;
const getPatients = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
const addPatient = () => {
    return null;
};
exports.default = {
    getPatients,
    addPatient,
};
