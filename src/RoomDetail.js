// RoomDetail.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './chat.css';

const RoomDetail = ({ roomId }) => {
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get(`http://localhost:8000/api/chat_rooms/${roomId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setRoom(response.data);
                setLoading(false); // Veri yükleme tamamlandı
            } catch (error) {
                console.error('Oda bilgileri alınırken bir hata oluştu:', error);
            }
        };

        fetchRoom();
    }, [roomId]);

    return (
        <div className="room-detail-container">
            {loading ? ( // Veri yükleniyor mu kontrolü
                <div>Oda yükleniyor...</div>
            ) : (
                <div>
                    <h2>Merhaba, burası oda "{room.name}" ({room.id})</h2>
                    {/* Oda detayları */}
                </div>
            )}
        </div>
    );
};

export default RoomDetail;
