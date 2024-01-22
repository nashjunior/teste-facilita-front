import { type IUser } from './user';

export interface ICoordinate {
  id: string;
  latitude: number;
  longitude: number;
  client: IUser;
}

export interface ICreateCoordinate {
  coordinates: [number, number];
}
