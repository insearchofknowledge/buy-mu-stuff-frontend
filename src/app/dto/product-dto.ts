import { CategoryDto } from "./category-dto";
import { ProducerDto } from "./producer-dto";

export class ProductDto {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    productType: number;
    producerDto: ProducerDto;       // producerDto holds both names for producerDto object of ProducerDto and for AddProducerDto id
    categoryDto: CategoryDto; 
}