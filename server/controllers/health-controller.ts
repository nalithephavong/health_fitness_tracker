import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

import { Record } from '../models/health-model';
import records from '../data/records';
import { Meals, MealTypes } from '../data/records';

export interface CreateRecordRequest extends Request {
    body: {
        date: string;
        name: string;
        calories: number;
        status: string;
        amount: number;
        serving: string;
        meal: string;
        user: string;
    }
}

export interface UpdateRecordRequest extends Request {
    body: {
        amount: number;
        serving: string;
        status: string;
    }
}

// initialize with base data, edit dataset under /data
let RECORDS: Record[] = records;

// #region MAIN FUNCTIONS
export const getRecords = (req: Request, res: Response, next: NextFunction) => {
    let formattedRecs: MealTypes = {
        breakfast: [],
        lunch: [],
        dinner: [],
        snack1: [],
        snack2: [],
        snack3: []
    };

    Meals.forEach((meal) => {
        let mealRecords = [];
        mealRecords = RECORDS.filter((record) => {
            return record.meal === meal;
        });

        if (mealRecords) formattedRecs[meal as keyof MealTypes] = mealRecords;
    })

    return res.status(200).json({
        "records": formattedRecs
    });
}

export const createRecord = (req: CreateRecordRequest, res: Response, next: NextFunction) => {
    if (!req.body.name) {
        return res.status(400).json({
            message: 'Invalid field.'
        });
    }

    if (!req.body.calories && isNaN(req.body.calories as any)) {
        return res.status(400).json({
            message: 'Invalid field.'
        });
    }

    const recordDate = (new Date()).toISOString().split('T')[0];

    const previousRecord = RECORDS.reduce((prev, current) => {
        return (prev.id > current.id) ? prev : current
    });

    const nextRecordNumber = previousRecord.id + 1;
    const userName = req.body.user || "User1";

    const newRecord = new Record (
        recordDate,
        nextRecordNumber,
        req.body.name,
        req.body.calories,
        req.body.status,
        req.body.amount,
        req.body.serving,
        req.body.meal,
        userName
    );

    RECORDS.push(newRecord);
    
    return res.status(201).json({
        message: `Record ${nextRecordNumber} created.`,
        record: newRecord
    });
}

export const deleteRecord = (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    const newRecords = RECORDS.filter((record) => {
        return record.id !== id;
    });

    RECORDS = newRecords;

    res.status(200).json({
        message: `Record ${id} deleted.`
    });
}

export const updateRecord = (req: UpdateRecordRequest, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    const recordIdx = RECORDS.findIndex((record) => {
        return record.id === id;
    });

    const status = req.body.status;
    RECORDS[recordIdx].status = status;

    return res.status(200).json({
        message: `Record ${id} updated.`
    });
}

export const searchFoods = (req: Request, res: Response, next: NextFunction) => {
    let url = process.env.API_URL + "foods/search";
    let query = req.params.query;

    axios.get(url, {
        params: {
            api_key: process.env.API_KEY,
            query: query || "",
            dataType: "Branded",
            pageSize: 25
        }
    })
    .then((response) => {
        console.log(JSON.stringify(response.data));
        return res.status(200).json(response.data);
    })
    .catch((error) => {
        return res.status(400).json({
            error: `${error}`
        });
    });
}
// #endregion