export class ProductSucuModel{
    constructor(
        public id: string,
        public name: string,
        public stock: number,
        public sales: number,
        public sucursal: string
    ){}
}