"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Meals = void 0;
exports.Meals = [
    "breakfast",
    "lunch",
    "dinner",
    "snack1",
    "snack2",
    "snack3"
];
function createData(date, id, name, calories, status, amount, serving, meal, user) {
    return {
        date,
        id,
        name,
        calories,
        status,
        amount,
        serving,
        meal,
        user
    };
}
const records = [
    createData("2023-08-31", 1000000001, "Egg (Large)", 70, "Logged", 1, "serving", "breakfast", "User1"),
    createData("2023-08-31", 1000000002, "Orange Juice", 70, "Logged", 1, "cup", "breakfast", "User1"),
    createData("2023-08-31", 1000000003, "Chicken Breast", 120, "Logged", 4, "oz", "dinner", "User1"),
    createData("2023-08-31", 1000000004, "Marinara", 90, "Logged", 0.5, "cup", "dinner", "User1"),
    createData("2023-08-31", 1000000005, "Spaghetti", 200, "Logged", 2, "oz", "dinner", "User1"),
];
exports.default = records;
