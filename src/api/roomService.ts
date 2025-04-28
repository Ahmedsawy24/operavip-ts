// src/api/userService.ts
import { Rooms } from '../model/room DTO/room';
import { httpGet, httpPost, httpPut, httpDelete } from './httpClient';


export function getRooms() {
  return httpGet<Rooms[]>('/Room');
}

/* export function getUser(id: number) {
  return httpGet<Room>(`/users/${id}`);
}

export function createUser(user: Partial<Room>) {
  return httpPost<Room>('/users', user);
}

export function updateUser(id: number, user: Partial<Room>) {
  return httpPut<Room>(`/users/${id}`, user);
}

export function deleteUser(id: number) {
  return httpDelete(`/users/${id}`);
} */
