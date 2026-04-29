import { ROUTE_NAME } from "../data";

export type RouteName = (typeof ROUTE_NAME)[keyof typeof ROUTE_NAME];
