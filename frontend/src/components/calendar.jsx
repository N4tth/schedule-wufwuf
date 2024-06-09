import { useState } from 'react';
import Calendar from 'react-calendar';

import styles from '@/style/calendar.module.css';
import widgetStyles from '@/style/widget.module.css';


function CalendarWidget({ isOpen, onClose }) {
    const [date, setDate] = useState(new Date());
    const [appointments] = useState([
        //Modificar para get
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
        <div className={styles.calendarOverlay}>
            <div className={widgetStyles.calendarWidget}>
                <button className={widgetStyles.closeBtn} onClick={onClose}>X</button>
                <h1 className={widgetStyles.title}>Tus citas</h1>
                <div className={widgetStyles.calendarContainer}>
                    <Calendar onChange={setDate} value={date} />
                </div>
                <div className={widgetStyles.appointments}>
                    <h2 className={widgetStyles.subtitle}>Tus citas para {formatDate(date)}</h2>
                    <ul className={styles.widgetUl}>
                        {appointmentsForSelectedDate.length === 0 ? (
                            <p className={widgetStyles.noAppointments}>No hay citas para esta fecha.</p>
                        ) : (
                            appointments.map(appointment => (
                                <li key={appointment.id} className={styles.listItem}>{appointment.title}</li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}    

export default CalendarWidget;