import { GuestRequestDTO } from "../Guest DTO/guestReservationRequest";

export interface walkInReservationRequestDTO{
    WalkInGuest: GuestRequestDTO;
    checkIn: string;
    checkOut: string;
    numberOfNights: number;
    selectedRoomId: number;
    specialRequest?: string;
    totalAmount: number;
    remainingBalance: number;
    paymentMethod:string;
}