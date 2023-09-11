"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchFoods = exports.updateRecord = exports.deleteRecord = exports.createRecord = exports.getRecords = void 0;
const axios_1 = __importDefault(require("axios"));
const health_model_1 = require("../models/health-model");
const records_1 = __importDefault(require("../data/records"));
const records_2 = require("../data/records");
// initialize with base data, edit dataset under /data
let RECORDS = records_1.default;
// #region MAIN FUNCTIONS
const getRecords = (req, res, next) => {
    const currentDate = req.query.datestring;
    let formattedRecs = {
        breakfast: [],
        lunch: [],
        dinner: [],
        snack1: [],
        snack2: [],
        snack3: []
    };
    records_2.Meals.forEach((meal) => {
        let mealRecords = [];
        mealRecords = RECORDS.filter((record) => {
            return record.meal === meal && record.date === currentDate;
        });
        if (mealRecords)
            formattedRecs[meal] = mealRecords;
    });
    return res.status(200).json({
        "records": formattedRecs
    });
};
exports.getRecords = getRecords;
const createRecord = (req, res, next) => {
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
    const recordDate = (new Date()).toISOString().split('T')[0];
    const previousRecord = RECORDS.reduce((prev, current) => {
        return (prev.id > current.id) ? prev : current;
    });
    const nextRecordNumber = previousRecord.id + 1;
    const userName = req.body.user || "User1";
    const newRecord = new health_model_1.Record(recordDate, nextRecordNumber, req.body.name, req.body.calories, req.body.status, req.body.amount, req.body.serving, req.body.meal, userName);
    RECORDS.push(newRecord);
    return res.status(201).json({
        message: `Record ${nextRecordNumber} created.`,
        record: newRecord
    });
};
exports.createRecord = createRecord;
const deleteRecord = (req, res, next) => {
    const id = parseInt(req.params.id);
    const newRecords = RECORDS.filter((record) => {
        return record.id !== id;
    });
    RECORDS = newRecords;
    res.status(200).json({
        message: `Record ${id} deleted.`
    });
};
exports.deleteRecord = deleteRecord;
const updateRecord = (req, res, next) => {
    const id = parseInt(req.params.id);
    const recordIdx = RECORDS.findIndex((record) => {
        return record.id === id;
    });
    RECORDS[recordIdx].status = req.body.status;
    RECORDS[recordIdx].serving = req.body.serving;
    RECORDS[recordIdx].amount = req.body.amount;
    RECORDS[recordIdx].calories = req.body.calories;
    return res.status(200).json({
        message: `Record ${id} updated.`
    });
};
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
