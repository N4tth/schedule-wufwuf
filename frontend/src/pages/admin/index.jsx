'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { backend } from '../../tools';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from 'react-spinners/ClipLoader';
import { redirect } from 'next/navigation';

export default function Admin() {
    const [dates, setDates] = useState([]);
    const [creating, setCreating] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true); // Estado de carga

    


    async function deleteDate(id) {
        await axios.delete(deleteDate, {
            data: {
                id
            }
        }).catch(
            toast.error("Error delete")
        )
    }

    // async function editDate(id) {
    //     await axios.edit(editDate, {
    //         data: {
    //             id
    //         }
    //     }).catch(
    //         toast.error("Error edit")
    //     )
    // }

    useEffect(() => {

        //Carga citas
        const fetchDates = async () => {
            await axios.get(backend
            ).then((res) => {
                setDates(res.data)
            }).catch((err) => {
                setDates([])
                toast.error('Error al cargar las citas')
            });
        };

        //Verifica si es admin
        const fetchUser = async () => {
            var boolean = false
            await axios.get(userManagement
            ).then((res) => {
                const userData = res.data;

                //Verifica si es admin
                if (userData.role !== "member") {
                    boolean = true
                } else {
                    boolean = false
                }

            }).catch((err) => {
            });
            if(boolean){
                setIsAdmin(boolean)
            }else{
                
            }
        };

        const fetchData = async () => {
            setLoading(true)
            await fetchUser()
            await fetchDates()
            setLoading(false)
        };
        
        fetchData()
    }, []);


    return (
        <>
            {loading ? (
                <div className="flex justify-center items-center h-full">
                    <ClipLoader size={50} color={"#668a4c"} loading={loading} />
                </div>
            ) : (
                <section className='flex flex-col justify-center align-center'>
                    <h1 className="text-center text-2xl font-bold mb-4 m-8">Date Admin Panel</h1>
                    {creating && <RegisterComponent />}
                    {creating ? <button
                        className="inline-flex h-9 items-center m-5 p-2 justify-center rounded-md bg-olivine-600 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-olivine-200 hover:text-olivine-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                        onClick={() => { setCreating(false) }}
                    >
                        Hide
                    </button> : <button
                        className="inline-flex h-9 items-center max-w-24 m-5 p-2  justify-center rounded-md bg-olivine-600 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-olivine-200 hover:text-olivine-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                        onClick={() => { setCreating(true) }}
                    >
                        New date
                    </button>}
                    <hr />
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">ID</th>
                                <th className="py-2 px-4 border-b">Nombre</th>
                                <th className="py-2 px-4 border-b">Correo</th>
                                <th className="py-2 px-4 border-b">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dates.map(date => (
                                <tr key={date.id}>
                                    <td className="py-2 px-4 border-b text-center">{date.id}</td>
                                    <td className="py-2 px-4 border-b  text-center">{date.name}</td>
                                    <td className="py-2 px-4 border-b text-center">{date.email}</td>
                                    <td className="py-2 px-4 border-b text-center">
                                        {/* Add actions buttons here, e.g. edit, delete */}

                                        <button
                                            className="inline-flex h-9 items-center justify-center rounded-md bg-olivine-600 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-olivine-200 hover:text-olivine-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                                            onClick={() => editDate(date.id)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="inline-flex h-9 items-center justify-center rounded-md bg-olivine-600 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-olivine-200 hover:text-olivine-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                                            onClick={() => deleteDate(date.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <hr />
                </section>
            )}
            <ToastContainer />
        </>
    );
}
