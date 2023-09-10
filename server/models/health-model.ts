export class Record {
    date: string;
    id: number;
    name: string;
    calories: number;
    status: string;
    amount: number;
    serving: string;
    meal: string;
    user: string;
    constructor (
        date: string,
        id: number,
        name: string,
        calories: number,
        status: string,
        amount: number,
        serving: string,
        meal: string,
        user: string
    ) {
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