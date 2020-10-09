import { ImageModel } from '../image/image.model';

export class ProductListModel {
    id: number = 0;
    name: string = '';
    size: string = '';
    color: string = '';
    type: string = '';
    price: number = 0;
    discountPrice: number = 0;
    quantity: number = 0;
    images: ImageModel[];

    constructor() {
        this.images = [];
    }
}