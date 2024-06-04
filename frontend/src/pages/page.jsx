'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../style/Dates.module.css';
import { backend } from '../tools';

export default function Dates() {
    const [formData, setFormData] = useState({
        date_time: '',
        hour_date_time: '',
        username: '',
        pet_id: 23,
        phone_number: '',
        nombre: '',
        apellido: '',
        email: ''
    });

    const [isUser, setIsUser] = useState(false);
    const [dates, setDates] = useState([]);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        await axios.post(backend, formData)
            .then((res) => {
                console.log(res);
            }).catch((err) => {
                console.error(err);
            });
    };

    useEffect(() => {
        // Coloca a la mascota en el formulario
        setFormData({
            ...formData,
            pet_id: 23
        });
    }, []);

    useEffect(() => {
        const fetchDates = async () => {
            const datesResponse = await axios.get(backend
            ).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.error(err);
            });
        };
        fetchDates();
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
                            <li><a href="#">Tus citas</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
            <div className='w-screen h-screen'>
                <p className='text-center text-black text-2xl'>¡Agenda tu cita y adopta tu peludito!</p>
                <div className={styles.formContainer}>
                    <form onSubmit={handleSubmit}>
                        <label className={styles.formLabel}>
                            Escoge una fecha:
                            <input type="date" className={styles.inputField} name="date_time" placeholder="Fecha de la cita" value={formData.date_time} onChange={handleChange} />
                        </label>
                        <label className={styles.formLabel}>
                            Selecciona una hora:
                            <input type="time" className={styles.inputField} name="hour_date_time" placeholder="Hora" value={formData.hour_date_time} onChange={handleChange} />
                        </label>

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
            <footer className="bg-[#668a4c] text-white p-[20px] text-center inset-x-0 bottom-0">
                <p>Contacto: contact@wufwuf.com</p>
            </footer>
        </div>
    );
}
