export class Exercise {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public repetitions: number,
        public sets: number,
        public isRepetition: boolean,
        public time?: number
    ) {}
}