'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '@/style/Dates.module.css'
import { backend, catalogPet, userManagement } from '../../tools';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from 'react-spinners/ClipLoader';

import CalendarWidget from '@/components/calendar';


export default function Dates() {
    const [formData, setFormData] = useState({
        date_time: '',
        hour_date_time: '',
        username: '',
        pet_id: 0,
        name: '',
        last_name: '',
        email: ''
    });

    const [isUser, setIsUser] = useState(false);
    const [dates, setDates] = useState([]);
    const [loading, setLoading] = useState(true); // Estado de carga
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

        // Validar si la fecha y hora ya existen
        const selectedDate = formData.date_time;
        const selectedTime = formData.hour_date_time;
        const dateExists = dates.some(date => date.date_time === selectedDate && date.hour_date_time === selectedTime);

        // Verificar que todos los campos estén completos
        var requiredFields = [];
        var isFormComplete = false;

        if (isUser) {
            requiredFields = ['date_time', 'hour_date_time'];
            isFormComplete = requiredFields.every(field => formData[field].trim() !== '');
        } else {
            requiredFields = ['date_time', 'hour_date_time', 'name', 'last_name', 'email'];
            isFormComplete = requiredFields.every(field => formData[field].trim() !== '');
        }

        if (isFormComplete) {
            if (!dateExists) {
                console.log(formData)
                await axios.post(backend, formData)
                    .then((res) => {
                        console.log(res);
                        toast.success("¡Cita creada exitosamente! y correo de confirmación enviado");
                        // TODO: redireccionar a algo. Que haga algo lmao
                    }).catch((err) => {
                        console.error(err);
                        toast.error("Error con la base de datos, inténtalo después");
                    });
            } else {
                toast.error("Ya hay una cita en ese horario, escoge otro");
            }
        } else {
            toast.error("Llena todos los campos");
        }
    };


    const openCalendar = () => {
        setCalendarOpen(true);
    };
    
    const closeCalendar = () => {
        setCalendarOpen(false);
    };

    const handleCalendar = () => {
        if (isUser) {
            setCalendarOpen(true);
        } else {
            toast.error("Debes iniciar sesión para ver tus citas");
            //setCalendarOpen(true); 
        }
    }
    


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
                setFormData({
                    ...formData,
                    pet_id: 0
                });
            });
        };
        const fetchUser = async () => {
            await axios.get(userManagement
            ).then((res) => {
                console.log(res.data);
                const userData = res.data;
                setFormData((prevData) => ({
                    ...prevData,
                    username: userData.username,
                    name: userData.name,
                    last_name: userData.lastname,
                    email: userData.email
                }));
                setIsUser(true)
            }).catch((err) => {
                setIsUser(false)
            });
        };

        const fetchData = async () => {
            setLoading(true);
            await fetchDates();
            await fetchPet();
            await fetchUser();
            setLoading(false);
        };

        fetchData()
    }, []);


    return (
        <div className="w-screen h-screen flex flex-col">
            <header className='inset-x-0 top-0 text-white bg-[#668a4c] flex flex-col text-center'>
                <div>
                    <h1 className={styles.tittleContainer}>Wuf Wuf</h1>
                </div>
                
                <div className={styles.buttonContainer}>
                    <nav>
                        <ul className={styles.navLinks}>
                            <li><a href="#">Inicio</a></li>
                            <li><a href="#">Catálogo</a></li>
                            <li>
                                <button onClick={handleCalendar} className='open-calendar-btn'>
                                    Tus citas
                                </button>
                                {isCalendarOpen && <CalendarWidget isOpen={isCalendarOpen} onClose={closeCalendar} />}
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <div className='w-screen h-screen'>
                <div className={styles.formContainer}>
                    {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <ClipLoader size={50} color={"#668a4c"} loading={loading} />
                    </div>
                        ) : (
                        <>
                        <p className={styles.introMessage}>¡Agenda tu cita y adopta tu peludito!</p>
                        <form className="p-5 border w-96 mx-auto rounded-lg bg-white shadow-lg" onSubmit={handleSubmit}>
                            <label className={styles.formLabel}>
                                Escoge una fecha:
                                <input type="date" className={styles.inputField} name="date_time" placeholder="Fecha de la cita" value={formData.date_time} onChange={handleChange} />
                            </label>
                            <div>
                                <label className={styles.formLabel}>Hora</label>
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
                            <label htmlFor="name" className="p-2 flex items-center">
                                Nombre:
                                
                                <input type="text" className="border border-olivine-700 w-full rounded-md" name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} />
                            </label>
                            <label className={styles.formLabel}>
                                Apellido:
                                <input type="text" className={styles.inputField} name="last_name" placeholder="Apellido" value={formData.last_name} onChange={handleChange} />
                            </label>
                            <label className={styles.formLabel}>
                                Email:
                                <input type="email" className={styles.inputField} name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                            </label>
                            </>
                            )}
                            <button className={styles.formButton} type="submit">Crear cita</button>
                        </form>
                        </>
                    )}
                </div>
            </div>
        <ToastContainer />
        </div >  
    );

}
