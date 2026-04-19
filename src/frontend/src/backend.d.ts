import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Event {
    id: bigint;
    date: string;
    name: string;
    description: string;
    category: Category;
    location: string;
}
export enum Category {
    Food = "Food",
    Tech = "Tech",
    Music = "Music"
}
export interface backendInterface {
    filterByCategory(categories: Array<Category>): Promise<Array<Event>>;
    listEvents(): Promise<Array<Event>>;
}
