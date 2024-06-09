"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { cookieDelete, userManagement } from "@/tools";
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const handleLogout = async () => {
    const response = await fetch(cookieDelete, {
      method: 'DELETE',
    });

    if (response.ok) {
      console.log('Cookie borrada con éxito');
      setIsLogged(false)
      router.push('/service-users/login');
    } else {
      console.error('Error al borrar la cookie');
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      await axios.get(userManagement
      ).then((res) => {
        const userData = res.data;

        //Verifica si es admin
        if (userData.role !== "member") {
          setIsAdmin(true)
        } else {
          setIsAdmin(false)
        }
        setIsLogged(true)
      }).catch((err) => {
        setIsLogged(false)
      });
    };
    fetchUser()
  }, []);

  return (
    <header className="flex flex-row justify-between w-screen h-20 bg-olivine-400">
      <div className="flex flex-row items-center justify-center">
        <Link className="pl-4" href="/service-users/">
          <img src="/service-dates/logo.png" alt="logo" width={70} className="select-none" />
          <span className="sr-only select-none">Wuf wuf Icono</span>
        </Link>
        <h1 className="text-5xl font-bold pl-8 select-none">Wuf Wuf</h1>
      </div>
      <div className="flex flex-row items-center justify-center">
        {isAdmin &&
          <Link href="/service-users/users-panel" className="select-none mx-4 h-8 w-18 hover:text-[#ddd] flex items-center justify-center text-white font-semibold border-b-4 border-transparent hover:border-olivine-600">
            Editar usuarios
          </Link>
        }
        {isAdmin &&
          <Link href="/service-pets/lista_mascotas" className="select-none mx-4 h-8 w-18 hover:text-[#ddd] flex items-center justify-center text-white font-semibold border-b-4 border-transparent hover:border-olivine-600">
            Editar mascotas
          </Link>
        }
        {isAdmin &&
          <Link href="/service-dates/admin" className="select-none mx-4 h-8 w-18 hover:text-[#ddd] flex items-center justify-center text-white font-semibold border-b-4 border-transparent hover:border-olivine-600">
            Editar citas
          </Link>
        }
        <Link href="/service-pets/catalogo"className="select-none mx-4 h-8 w-18 hover:text-[#ddd] flex items-center justify-center text-white font-semibold  border-b-4 border-transparent hover:border-olivine-600">
          Catalogo
        </Link>
        {isLogged ? (
          <>
            <a onClick={handleLogout} className="select-none mx-4 h-8 w-18 hover:text-[#ddd] flex items-center justify-center text-white font-semibold border-b-4 border-transparent hover:border-olivine-600">
              Cerrar Sesión
            </a>
          </>
        ) : (
          <>
            <Link href="/service-users/register" className="select-none mx-4 h-8 w-18 hover:text-[#ddd] flex items-center justify-center text-white font-semibold  border-b-4 border-transparent hover:border-olivine-600">
              Registro
            </Link>
            <Link href="/service-users/login" className="select-none mx-4 h-8 w-18 hover:text-[#ddd] flex items-center justify-center text-white font-semibold  border-b-4 border-transparent hover:border-olivine-600">
              Iniciar Sesión
            </Link>
          </>
        )}



      </div>
    </header>
  );
};

export default Navbar;