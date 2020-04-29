export class ToDo {
    id: number;
    title: string;
    description: string;
    isDone: boolean;
    fromDate: Date;
    toDate: Date;

    constructor() {
        this.id = 0;
        this.title = null;
        this.description = null;
        this.isDone = false;
        this.fromDate = null;
        this.toDate = null;
    }
}
