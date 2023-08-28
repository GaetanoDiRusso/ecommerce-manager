export class Item {
    constructor(
        readonly id: string,
        readonly title: string,
        readonly description: string,
        readonly imageUrl: string,
        readonly price: number,
    ){}
}