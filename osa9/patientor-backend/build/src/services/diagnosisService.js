"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const diagnoses_ts_1 = __importDefault(require("../../data/diagnoses.ts"));
const diagnoses = diagnoses_ts_1.default;
const getDiagnoses = () => {
    return diagnoses;
};
const addDiagnosis = () => {
    return null;
};
exports.default = {
    getDiagnoses,
    addDiagnosis,
};
