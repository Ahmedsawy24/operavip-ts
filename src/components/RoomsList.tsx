// src/components/RoomsList.tsx
import React, { useEffect, useState } from 'react';
import { getRooms } from '../api/roomService';
import { Rooms } from '../model/room DTO/room';

const RoomsList: React.FC = () => {
  const [rooms, setRooms] = useState<Rooms[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getRooms()
      .then(data => {
        setRooms(data);
      })
      .catch(err => {
        console.error(err);
        setError(err.message || 'Error fetching rooms');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading rooms…</p>;
  if (error)   return <p>Error: {error}</p>;

  return (
    <ul>
      {rooms.map(room => (
        <li key={room.roomId}>
          <strong>Room {room.roomNumber}</strong> — {room.roomType} · {room.roomStatus} ·
        </li>
      ))}
    </ul>
  );
};

export default RoomsList;
