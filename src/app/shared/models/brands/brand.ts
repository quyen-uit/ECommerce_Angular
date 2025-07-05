export class CreateBrand {
    id?: number; // type = number
    name?: string; // type = text
    description?: string;
    logoUrl?: string;
}

export class Brand extends CreateBrand {
    override id: number = 0;
}