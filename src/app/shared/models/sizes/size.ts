export class CreateSize {
    id?: number;
    name: string = '';
    sortOrder: number = 0;
    sizeType?: string;
}

export class Size extends CreateSize {
    override id: number = 0;
}