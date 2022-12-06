import { User } from "./user";

export class OrderDto {
    id: number;
    orderDate: Date;
    county: string;
    city: string;
    street: string;
    zipCode: string;
    phoneNumber: string;
    additionalInformation: string;
    orderStatus: string;
    user: User;
    totalCost: number;
}