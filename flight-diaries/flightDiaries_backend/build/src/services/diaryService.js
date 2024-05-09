"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entries_1 = __importDefault(require("../../data/entries"));
const getEntries = () => {
    return entries_1.default;
};
// const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
//   return diaries.map((entry) => ({
//     id: entry.id,
//     date: entry.date,
//     weather: entry.weather,
//     visibility: entry.visibility
//   }));
// };
const addDiary = (entry) => {
    const newDiaryEntry = Object.assign({ id: entries_1.default.length + 1 }, entry);
    entries_1.default.push(newDiaryEntry);
    return newDiaryEntry;
};
const findById = (id) => {
    const entry = entries_1.default.find((diary) => diary.id === id);
    return entry;
};
exports.default = {
    getEntries,
    addDiary,
    findById
};
