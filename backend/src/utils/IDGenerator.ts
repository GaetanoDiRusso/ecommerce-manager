import {v4 as uuid} from 'uuid';

export class IDGenerator {
    static getNewId(): string {
        return `${uuid()}-${new Date().getTime()}`
    }
}