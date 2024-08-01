export interface CreateColor {
    name: string;
    hexCode: string;
}

export interface Color extends CreateColor{
    id: number
}