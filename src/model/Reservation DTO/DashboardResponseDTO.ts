import { ReservationResponseDTO } from "./ReservationResponseDTO";

export interface DashboardResponseDTO{
    arrivals: ReservationResponseDTO[];
    departures: ReservationResponseDTO[];
    inHouse: ReservationResponseDTO[];
}