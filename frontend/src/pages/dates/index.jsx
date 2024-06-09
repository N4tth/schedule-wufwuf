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
        <div className="w-screen h-screen flex flex-col relative"> 
          <header className="inset-x-0 top-0 text-white bg-olivine-700 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-4">Wuf Wuf</h1>
          </header>
          <button onClick={handleCalendar} className={styles.calButton}> 
            Tus citas
          </button>
          {isCalendarOpen && <CalendarWidget isOpen={isCalendarOpen} onClose={closeCalendar} />}
          <p className={`${styles.introMessage} text-olivine-700 absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2`}>¡Agenda tu cita y adopta tu peludito!</p>
          <div className="w-full h-full">
          <div className="flex items-center h-full">
              {loading ? (
                <ClipLoader size={50} color={"#668A4C"} loading={loading} />
              ) : (
                    
                    <div className={`${styles.formContainer} relative`}>
                        <form onSubmit={handleSubmit} className="relative">
                      <label className="block mb-4">
                        Escoge una fecha:
                        <input
                          type="date"
                          className="border border-olivine-700 w-full rounded-md p-1"
                          name="date_time"
                          placeholder="Fecha de la cita"
                          value={formData.date_time}
                          onChange={handleChange}
                        />
                      </label>
                      <div className="mb-4">
                        <label className="block text-olivine-700">Hora</label>
                        <select
                          id="hour_date_time"
                          name="hour_date_time"
                          value={formData.hour_date_time}
                          onChange={handleChange}
                          className="border border-olivine-700 w-full rounded-md p-1"
                        >
                          <option value="">Seleccione una hora</option>
                          {generateTimeOptions().map((time) => (
                            <option key={time} value={time}>{time}</option>
                          ))}
                        </select>
                      </div>
                      {!isUser && (
                        <>
                          <label className="block mb-4 text-olivine-700">
                            Nombre:
                            <input
                              type="text"
                              className="border border-olivine-700 w-full rounded-md p-1"
                              name="name"
                              placeholder="Nombre"
                              value={formData.name}
                              onChange={handleChange}
                            />
                          </label>
                          <label className="block mb-4 text-olivine-700">
                            Apellido:
                            <input
                              type="text"
                              className="border border-olivine-700 w-full rounded-md p-1"
                              name="last_name"
                              placeholder="Apellido"
                              value={formData.last_name}
                              onChange={handleChange}
                            />
                          </label>
                          <label className="block mb-4 text-olivine-700">
                            Email:
                            <input
                              type="email"
                              className="border border-olivine-700 w-full rounded-md p-1"
                              name="email"
                              placeholder="Email"
                              value={formData.email}
                              onChange={handleChange}
                            />
                          </label>
                        </>
                      )}
                      <button className={styles.formButton} type="submit">Crear cita</button>
                    </form>
                        
                        
                  </div>
             
              )}
            </div>
          </div>
          <ToastContainer />
        </div>
      );
      
      
      
      

}
