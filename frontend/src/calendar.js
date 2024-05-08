import {useState} from  'react';
import Calendar from 'react-calendar';
import './calendar.css';

function calendar(){
    const[date,setDate] = useState(new Date());
    return(
        <div className='calendar'>
            <h1 className='text-center'>calendario</h1>
            <div className='calendar-container'>
                <Calendar onChange={setDate} value={date}/>
            </div>
            <p className='text-center'>
                <span className='bold'>fecha seleccionada</span>{' '}
                {date.toDateString()}
            </p>
        </div>
    );
}

export default calendar;