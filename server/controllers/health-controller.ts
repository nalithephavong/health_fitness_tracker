import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

import { Meals, MealTypes } from '../data/records';
import itemsPool from '../db/DBConfig';

export interface CreateRecordRequest extends Request {
    body: {
        date: string;
        name: string;
        calories: number;
        status: string;
        amount: number;
        serving: string;
        meal: string;
        username: string;
    }
}

export interface UpdateRecordRequest extends Request {
    body: {
        amount: number;
        serving: string;
        status: string;
        calories: number;
    }
}

// #region MAIN FUNCTIONS
export const getRecords = async (req: Request, res: Response, next: NextFunction) => {
    const currentDate = req.query.datestring;

    let formattedRecs: MealTypes = {
        breakfast: [],
        lunch: [],
        dinner: [],
        snack1: [],
        snack2: [],
        snack3: []
    };

    try {
        const records = await itemsPool.query( `SELECT * FROM items WHERE date='${currentDate}'`);
        Meals.forEach((meal) => {
            let mealRecords = [];
            mealRecords = records.rows.filter((record) => {
                return record.meal === meal;
            });
    
            if (mealRecords) formattedRecs[meal as keyof MealTypes] = mealRecords;
        });

        return res.status(200).json({
            "records": formattedRecs
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err});
    }
}

export const createRecord = async (req: CreateRecordRequest, res: Response, next: NextFunction) => {
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

    const username = req.body.username ?? "User1";
    const { date, name, calories, status, amount, serving, meal } = req.body;

    try {
        const command = `INSERT INTO items (name, calories, date, status, amount, serving, meal, username)
            VALUES ('${name}', ${calories}, '${date}', '${status}', ${amount}, '${serving}', '${meal}', '${username}')`;
        const records = await itemsPool.query(command);
        return res.status(201).json({
            message: `Record created.`,
            record: records
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err});
    }
}

export const deleteRecord = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    
    try {
        await itemsPool.query( `DELETE FROM items WHERE id=${id}`);
        res.status(200).json({
            message: `Record ${id} deleted.`
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err});
    }
}

export const updateRecord = async (req: UpdateRecordRequest, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    const { calories, status, amount, serving } = req.body;
    
    try {
        const command = `UPDATE items SET status='${status}', amount=${amount}, serving='${serving}', calories=${calories}`;
        await itemsPool.query(command);
        return res.status(200).json({
            message: `Record ${id} updated.`
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err});
    }
}

export const searchFoods = (req: Request, res: Response, next: NextFunction) => {
    const url = process.env.API_URL + "foods/search";
    const query = req.query.querystring;

    axios.get(url, {
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
}
// #endregion