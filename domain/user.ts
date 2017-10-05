import { Program } from './program';

export class User {
    constructor(
        public id: string,
        public exercises: Program[], 
        public name: string,
        public email: string,
        public password: string
    ) {}

}