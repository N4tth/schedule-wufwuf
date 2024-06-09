"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { userManagement } from "@/tools";

const Navbar = () => {
  const [isAdmin, setIsAdmin] = useState(false);

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

      }).catch((err) => {
      });
    };
    fetchUser()
    //setIsAdmin(true)
  }, []);

  return (
    <header className="flex flex-row justify-between w-screen h-20 bg-olivine-400">
      <div className="flex flex-row items-center justify-center">
        <Link className="pl-4" href="/service-users/">
          <img src="/service-dates/logo.png" alt="logo" width={70} />
          <span className="sr-only">Wuf wuf Icono</span>
        </Link>
        <h1 className="text-5xl font-bold pl-8">Wuf Wuf</h1>
      </div>
      <div className="flex flex-row items-center justify-center">
        {isAdmin &&
          <Link href="/service-users/users-panel" className="mx-4 h-8 w-18 hover:text-[#ddd] flex items-center justify-center text-white font-semibold border-b-4 border-transparent hover:border-olivine-600">
            Editar usuarios
          </Link>
        }
        {isAdmin &&
          <Link href="/service-pets/lista_mascotas" className="mx-4 h-8 w-18 hover:text-[#ddd] flex items-center justify-center text-white font-semibold border-b-4 border-transparent hover:border-olivine-600">
            Editar mascotas
          </Link>
        }
        {isAdmin &&
          <Link href="/service-dates/admin" className="mx-4 h-8 w-18 hover:text-[#ddd] flex items-center justify-center text-white font-semibold border-b-4 border-transparent hover:border-olivine-600">
            Editar citas
          </Link>
        }
        <Link href="/service-users/register" className="mx-4 h-8 w-16 hover:text-[#ddd] flex items-center justify-center text-white font-semibold  border-b-4 border-transparent hover:border-olivine-600">
          Register
        </Link>

        <Link href="/service-users/login" className="mx-4 h-8 w-14 hover:text-[#ddd] flex items-center justify-center text-white font-semibold  border-b-4 border-transparent hover:border-olivine-600">
          Login
        </Link>
      </div>
    </header>
  );
};

export default Navbar;