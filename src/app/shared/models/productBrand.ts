export interface CreateProductBrand {
    name: string;           
    description: string;      
    logoUrl: string;       
}

export interface ProductBrand extends CreateProductBrand{
    id: number
}