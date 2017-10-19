import { Program } from "./program";

export class Activity {
    constructor(
        public comment: string,
        public program: Program,
        public date:Date
    ) {}
}