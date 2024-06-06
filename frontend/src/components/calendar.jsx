import React, { useState } from 'react';
import CustomCalendar from 'react-calendar';
import '@/styles/calendar';

function CalendarComponent() {
    const [date, setDate] = useState(new Date());
    return (
        <div className='Calendar'>
            <h1 className='text-center'>calendario</h1>
            <div className='calendar-container'>
                <CustomCalendar onChange={setDate} value={date} />
            </div>
            <p className='text-center'>
                <span className='bold'>fecha seleccionada</span>{' '}
                {date.toDateString()}
            </p>
        </div>
    );
}

export default CalendarComponent;