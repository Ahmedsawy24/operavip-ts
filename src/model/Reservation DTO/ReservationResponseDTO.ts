export interface ReservationResponseDTO{
   reservationId   : number;
   status : string;
   roomNumber: string;
   roomType : string;
   ArrivalDate : string ;
   DepartureDate: string ;
   guestName : string;
   phoneNumber : string;
   paymentStatus : string;
   totalAmount : number;
   SpecialRequests?: string
}