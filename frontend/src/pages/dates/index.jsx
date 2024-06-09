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
  const [pet, setPet] = useState({
    name: 'Lulu',
    description: 'Soy una descripcion',
    especie: 'mitad Gato',
    breed: 'No se',
    urls_images: [ 
      "https://firebasestorage.googleapis.com/v0/b/catalog-wufwuf.appspot.com/o/pets%2Ffe5c55f6-7006-43fa-b2ce-83daa72fa65f?alt=media&token=0d7d86da-7c29-4992-aed4-daf52fd423ff",
    ]
  });
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
    const fetchPet = () => {
      const value = localStorage.getItem('selectedAnimal');
      if (value) {
        const pet = JSON.parse(value);
        setPet(pet)
        setFormData({
          ...formData,
          pet_id: pet.id
        });
      }
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
      await fetchUser();
      fetchPet();
      setLoading(false);
    };

    fetchData()
  }, []);


  return (
    <div className="w-screen h-auto">
      {isCalendarOpen && <CalendarWidget isOpen={isCalendarOpen} onClose={closeCalendar} />}
      <p className={`h-auto w-full size-4 py-4 text-center text-4xl mt-8 text-olivine-800 font-extrabold mb-9`}>¡Agenda tu cita y adopta tu peludito!</p>
      <div className="flex flex-row h-auto justify-around">
        {loading ? (
          <ClipLoader size={50} color={"#668A4C"} loading={loading} />
        ) : (
          <>
            <div className={`${styles.formContainer} relative`} style={{ overflow: 'hidden' }}>
              <div className={styles.promoContainer}>
                <img src={pet.urls_images[0]} alt="Mascota" />
              </div>
              <div className={`${styles.promoContainer2} relative`} style={{ overflow: 'auto', width: '300px', height: '300px' }}>
                <div style={{ marginBottom: '20px' }}>
                <h2 className="text-olivine-700 font-bold text-center mb-2">Información de la mascota</h2>
                <p className="text-olivine-700 text-justify" style={{ maxHeight: '100px', overflowY: 'auto' }}>{pet.description}</p>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <h2 className="text-olivine-700 font-bold text-center mb-2">Especie y raza</h2>
                <p className="text-olivine-700 text-justify">{`Soy un ${pet.especie} y de raEl patrón de API Gateway actúa como un punto de entrada único para gestionar las solicitudes de clientes en un sistema de microservicios. Proporciona funcionalidades como enrutamiento, autenticación, autorización y agregación de datos, simplificando así la complejidad para los clientes y mejorando la eficiencia.za ${pet.breed}`}</p>
              </div>
              <div>
                <h2 className="text-olivine-700 font-bold text-center">¡Adóptame, por favor!</h2>
              </div>
            </div>
          </div>
            <div className={`${styles.formContainer} relative space-y-4`}>
              <div className='flex flex-col justify-center h-full w-full items-center relative space-y-4'>
                <p>Pulsa aquí para ver tus citas</p>
                <button onClick={handleCalendar} className={styles.calButton}>
                  Tus citas
                </button>
              </div>
              <form onSubmit={handleSubmit}>
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
                    <label className="block mb-4 ">
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
                <div className='flex justify-center selected-none'>
                  <button className={`${styles.formButton}`} type="submit">Crear cita</button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
  





}
