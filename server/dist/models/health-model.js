"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Record = void 0;
class Record {
    constructor(date, id, name, calories, status, amount, serving, meal, user) {
        this.date = date;
        this.id = id;
        this.name = name;
        this.calories = calories;
        this.status = status;
        this.amount = amount;
        this.serving = serving;
        this.meal = meal;
        this.user = user;
    }
}
exports.Record = Record;
