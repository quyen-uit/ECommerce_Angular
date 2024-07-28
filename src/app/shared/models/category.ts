export interface CreateCategory {
    name: string;
    order: number;
    isActive: boolean;
}

export interface Category extends CreateCategory{
    id: number
}