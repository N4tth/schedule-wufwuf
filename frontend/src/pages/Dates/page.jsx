'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '@/style/Dates.module.css'
import { backend, catalogPet, userManagement } from '../../tools';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CalendarWidget from '@/components/calendar';



export default function Dates() {
    const [formData, setFormData] = useState({
        date_time: '',
        hour_date_time: '',
        pet_id: 23,
        phone_number: '',
        nombre: '',
        apellido: '',
        email: ''
    });

    const [isUser, setIsUser] = useState(false);
    const [dates, setDates] = useState([]);
    
    const [clientAppointments, setClientAppointments] = useState([]);
    const [isCalendarOpen, setCalendarOpen] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Generar opciones de horas en intervalos de 20 minutos
    const generateTimeOptions = () => {
        const options = [];
        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 20) {
                const hourString = hour.toString().padStart(2, '0');
                const minuteString = minute.toString().padStart(2, '0');
                options.push(`${hourString}:${minuteString}`);
            }
        }
        return options;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formData);
        console.log(dates)

        // Validar si la fecha y hora ya existen
        const selectedDate = formData.date_time;
        const selectedTime = formData.hour_date_time;
        const dateExists = dates.some(date => date.date_time === selectedDate && date.hour_date_time === selectedTime);

        // Verificar que todos los campos estén completos
        var requiredFields = [];
        var isFormComplete = false;

        if(isUser){
            requiredFields = ['date_time', 'hour_date_time'];
            isFormComplete = requiredFields.every(field => formData[field].trim() !== '');
        }else{
            requiredFields = ['date_time', 'hour_date_time', 'phone_number', 'nombre', 'apellido', 'email'];
            isFormComplete = requiredFields.every(field => formData[field].trim() !== '');
        }

        if(isFormComplete){
            if (dateExists) {
                toast.error("Ya hay una cita en ese horario, escoge otro");
            } else {
                await axios.post(backend, formData)
                    .then((res) => {
                        console.log(res);
                    }).catch((err) => {
                        console.error(err);
                    });
            }
        }else{
            toast.error("LLena todos los campos");
        }
    };


    const handleShowClientAppointments = async () => {
        try {
            const appointmentsResponse = await axios.get('/api/client/appointments');
            setClientAppointments(appointmentsResponse.data);
        } catch (error) {
            console.error('Error fetching client appointments:', error);
        }
    };


    useEffect(() => {
        const fetchDates = async () => {
            await axios.get(backend
            ).then((res) => {
                setDates(res.data)
            }).catch((err) => {
                console.error(err);
            });
        };
        const fetchPet = async () => {
            await axios.get(catalogPet
            ).then((res) => {
                console.log(res.data);
                setFormData({
                    ...formData,
                    pet_id: res.data
                });
            }).catch((err) => {
                console.error(err);
            });
        };
        const fetchUser = async () => {
            await axios.get(userManagement
            ).then((res) => {
                console.log(res.data);
                // setFormData({
                //     ...formData,
                //     username: datesResponse
                // });
                //setIsUser()
            }).catch((err) => {
                console.error(err);
            });
        };
        fetchDates();
        //fetchPet();
        //fetchUser();
    }, []);



    return (
        <div className="w-screen h-screen flex flex-col">
            <header className='inset-x-0 top-0 text-white bg-[#668a4c] flex flex-col text-center'>
                <div>
                    <h1 className='p-4 text-4xl'>Wuf Wuf</h1>
                </div>
                <div className={styles.logoContainer}>
                    <img src="/service-dates/logo.jpeg" className={styles.logo} alt="logo" />
                </div>
                <div className={styles.buttonContainer}>
                    <nav>
                        <ul className={styles.navLinks}>
                            <li><a href="#">Inicio</a></li>
                            <li><a href="#">Catálogo</a></li>
                            <li><button onClick={handleShowClientAppointments} className='open-calendar-btn'>Tus citas</button></li>
                            <CalendarWidget isOpen={isCalendarOpen} onClose={closeCalendar} />
                            {clientAppointments.length > 0 && clientAppointments.map(appointment => (
                                <li key={appointment.id}>{appointment.date} - {appointment.time}</li>
                            ))}
                        </ul>
                    </nav>
                    
                </div>
            </header>
            <div className='w-screen h-screen'>
                <p className='text-center text-black text-2xl'>¡Agenda tu cita y adopta tu peludito!</p>
                <div className={styles.formContainer}>
                    <form onSubmit={handleSubmit} className='text-black'>
                        <label className={styles.formLabel}>
                            Escoge una fecha:
                            <input type="date" className={styles.inputField} name="date_time" placeholder="Fecha de la cita" value={formData.date_time} onChange={handleChange} />
                        </label>
                        <div>
                            <label htmlFor="hour_date_time">Hora</label>
                            <select
                                id="hour_date_time"
                                name="hour_date_time"
                                value={formData.hour_date_time}
                                onChange={handleChange}
                            >
                                <option value="">Seleccione una hora</option>
                                {generateTimeOptions().map((time) => (
                                    <option key={time} value={time}>{time}</option>
                                ))}
                            </select>
                        </div>

                        {!isUser && (
                            <>
                                <label className={styles.formLabel}>
                                    Teléfono:
                                    <input type="tel" className={styles.inputField} name="phone_number" placeholder="Número de teléfono" value={formData.phone_number} onChange={handleChange} />
                                </label>
                                <label className={styles.formLabel}>
                                    Nombre:
                                    <input type="text" className={styles.inputField} name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} />
                                </label>
                                <label className={styles.formLabel}>
                                    Apellido:
                                    <input type="text" className={styles.inputField} name="apellido" placeholder="Apellido" value={formData.apellido} onChange={handleChange} />
                                </label>
                                <label className={styles.formLabel}>
                                    Email:
                                    <input type="email" className={styles.inputField} name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                                </label>
                            </>
                        )}

                        <button type="submit">Crear cita</button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

