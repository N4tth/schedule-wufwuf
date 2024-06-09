"use client"; 

import React from "react";
import Link from "next/link";
import styles from "@/style/Dates.module.css"

import logo from "../../public/logo.png"

const Navbar = () => {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-olivine-400">
      <Link className="flex items-center justify-center" href="/">
	  <img src={logo} alt="logo" width={50}/>
        <span className="sr-only">Acme Inc</span>
      </Link>
      <form className="ml-auto flex items-center space-x-2">
        <Link href="/register">
          <button className="bg-white h-8 w-16" type="submit" variant="outline">
            <span className={styles.navbarButton}>Register</span>
          </button>
        </Link>
        <Link href="/login">
          <button className="h-8 w-14" type="submit" variant="outline">
            <span className="text-olivine-700">Login</span>
          </button>
        </Link>
      </form>
    </header>
  );
};

export default Navbar;