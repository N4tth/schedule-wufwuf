"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Importa useRouter
import Link from "next/link";

import logo from "../../public/logo.png"
import axios from "axios";
import { userManagement } from "@/tools";

const Navbar = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter(); // Inicializa el router

  useEffect(() => {
    // const fetchUser = async () => {
    //   await axios.get(userManagement
    //   ).then((res) => {
    //     const userData = res.data;

    //     //Verifica si es admin
    //     if (userData.role !== "member") {
    //       setIsAdmin(true)
    //     } else {
    //       setIsAdmin(false)
    //     }

    //   }).catch((err) => {
    //   });
    // };
    // fetchUser()
    setIsAdmin(true)
  }, []);

  return (
    <header className="px-4 lg:px-6 h-18 flex items-center bg-olivine-400">
      <Link className="flex items-center justify-center" href="/service-users/">
        <img src="/service-dates/logo.png" alt="logo" width={70} />
        <span className="sr-only">Wuf wuf Icono</span>
      </Link>
      <form className="ml-auto flex items-center space-x-5">
        {isAdmin &&
          <Link href="/service-users/get/users" className="mx-4 h-8 w-18 hover:text-[#ddd] flex items-center justify-center text-white font-semibold border-b-4 border-transparent hover:border-olivine-600">
            Editar usuarios
          </Link>
        }
        {isAdmin &&
          <Link href="/service-pets/admin" className="mx-4 h-8 w-18 hover:text-[#ddd] flex items-center justify-center text-white font-semibold border-b-4 border-transparent hover:border-olivine-600">
            Editar mascotas
          </Link>
        }
        {isAdmin &&
          <Link href="/service-dates/admin" className="mx-4 h-8 w-18 hover:text-[#ddd] flex items-center justify-center text-white font-semibold border-b-4 border-transparent hover:border-olivine-600">
            Editar citas
          </Link>
        }
        <Link href="/service-users/register" className="mx-4 h-8 w-16 hover:text-[#ddd] flex items-center justify-center text-white font-semibold border-b-4 border-transparent hover:border-olivine-600">
          Register
        </Link>

        <Link href="/service-users/login" className="mx-4 h-8 w-14 hover:text-[#ddd] flex items-center justify-center text-white font-semibold border-b-4 border-transparent hover:border-olivine-600">
          Login
        </Link>
      </form>
    </header>
  );
};

export default Navbar;