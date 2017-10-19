import { Activity } from "./activity";

export class User {
    constructor(
        public id: string,
        public activities: Activity[], 
        public name: string,
        public email: string,
        public password: string
    ) {}

}