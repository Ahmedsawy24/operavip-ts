// src/api/reservationService.ts
import { DashboardResponseDTO } from '../model/Reservation DTO/DashboardResponseDTO';
import { walkInReservationRequestDTO } from '../model/Reservation DTO/walkInReservationRequestDTO';
import { httpGet, httpPost } from './httpClient';


export function createWalkInReservation(
  payload: walkInReservationRequestDTO
): Promise<void> {
  // endpoint path must match your controller route
  return httpPost<void>(
    '/Reservation',
    payload
  );
}

export function getDashboardReservations() {
    return httpGet<DashboardResponseDTO>('/Reservation/Dashboard');
  }