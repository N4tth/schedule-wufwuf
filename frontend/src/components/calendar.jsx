'use client';
import { useState } from 'react';
import Calendar from 'react-calendar';
import styles from '@/style/widget.module.css';

function CalendarWidget({ isOpen, onClose }) {
    const [date, setDate] = useState(new Date());
    const [appointments] = useState([
        { id: 1, date: new Date(2024, 5, 8), title: 'Perro 1' },
        { id: 2, date: new Date(2024, 5, 8), title: 'Perro 2' },
        { id: 3, date: new Date(2024, 5, 10), title: 'Adopción perro 1' },
    ]);

    const appointmentsForSelectedDate = appointments.filter(
        appointment => appointment.date.toDateString() === date.toDateString()
    );

    if (!isOpen) {
        return null;
    }

    const formatDate = (date) => {
        const options = { day: '2-digit', month: 'short' };
        return date.toLocaleDateString('es-ES', options);
    };

    return (
        <div className={styles['calendar-overlay']}>
            <div className={styles['calendar-widget']}>
                <button className={styles['close-btn']} onClick={onClose}>X</button>
                <h1 className="text-2xl font-bold mb-4 text-center">Tus citas</h1>
                <div className="mb-4">
                    <Calendar onChange={setDate} value={date} className="w-full" />
                </div>
                <div className={styles['appointments']}>
                    <h2 className="text-lg font-semibold mb-2">Tus citas para {formatDate(date)}</h2>
                    <ul className="list-none p-0">
                        {appointmentsForSelectedDate.length === 0 ? (
                            <p className="text-gray-600">No hay citas para esta fecha.</p>
                        ) : (
                            appointmentsForSelectedDate.map(appointment => (
                                <li key={appointment.id} className={styles['list-item']}>
                                    {appointment.title}
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default CalendarWidget;

