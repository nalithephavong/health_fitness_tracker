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
exports.searchFoods = exports.updateRecord = exports.deleteRecord = exports.createRecord = exports.getRecords = void 0;
const axios_1 = __importDefault(require("axios"));
const records_1 = require("../data/records");
const DBConfig_1 = __importDefault(require("../db/DBConfig"));
// #region MAIN FUNCTIONS
const getRecords = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const currentDate = req.query.datestring;
    let formattedRecs = {
        breakfast: [],
        lunch: [],
        dinner: [],
        snack1: [],
        snack2: [],
        snack3: []
    };
    try {
        const records = yield DBConfig_1.default.query(`SELECT * FROM items WHERE date='${currentDate}'`);
        records_1.Meals.forEach((meal) => {
            let mealRecords = [];
            mealRecords = records.rows.filter((record) => {
                return record.meal === meal;
            });
            if (mealRecords)
                formattedRecs[meal] = mealRecords;
        });
        return res.status(200).json({
            "records": formattedRecs
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: err });
    }
});
exports.getRecords = getRecords;
const createRecord = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!req.body.name) {
        return res.status(400).json({
            message: 'Invalid field.'
        });
    }
    if (!req.body.calories && isNaN(req.body.calories)) {
        return res.status(400).json({
            message: 'Invalid field.'
        });
    }
    const username = (_a = req.body.username) !== null && _a !== void 0 ? _a : "User1";
    const { date, name, calories, status, amount, serving, meal } = req.body;
    try {
        const command = `INSERT INTO items (name, calories, date, status, amount, serving, meal, username)
            VALUES ('${name}', ${calories}, '${date}', '${status}', ${amount}, '${serving}', '${meal}', '${username}')`;
        const records = yield DBConfig_1.default.query(command);
        return res.status(201).json({
            message: `Record created.`,
            record: records
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: err });
    }
});
exports.createRecord = createRecord;
const deleteRecord = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        yield DBConfig_1.default.query(`DELETE FROM items WHERE id=${id}`);
        res.status(200).json({
            message: `Record ${id} deleted.`
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: err });
    }
});
exports.deleteRecord = deleteRecord;
const updateRecord = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { calories, status, amount, serving } = req.body;
    try {
        const command = `UPDATE items SET status='${status}', amount=${amount}, serving='${serving}', calories=${calories}`;
        yield DBConfig_1.default.query(command);
        return res.status(200).json({
            message: `Record ${id} updated.`
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: err });
    }
});
exports.updateRecord = updateRecord;
const searchFoods = (req, res, next) => {
    const url = process.env.API_URL + "foods/search";
    const query = req.query.querystring;
    axios_1.default.get(url, {
        params: {
            api_key: process.env.API_KEY,
            query: query || "",
            dataType: "Branded",
            pageSize: 25
        }
    })
        .then((response) => {
        return res.status(200).json(response.data);
    })
        .catch((error) => {
        return res.status(400).json({
            error: `${error}`
        });
    });
};
exports.searchFoods = searchFoods;
// #endregion
