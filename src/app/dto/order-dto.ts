import { User } from "./user";

export class OrderDto {
    id: number;
    orderDate: Date;
    county: string;
    city: string;
    street: string;
    zipCode: string;
    phoneNumber: string;
    additionalInformtion: string;
    orderStatus: string;
    user: User;
    totalCost: number;

}