"use client";

import React from "react";
import styles from './styles/home.module.css';
import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <div>
      <h1>Bienvenido a la aplicación</h1>
      <Button className="rounded-full" variant="outline">
        <span className="px-1">Empieza Aqui</span>
      </Button>  
      <div className={`${styles.circle} ${styles.circle1}`} />
      <div className={`${styles.circle} ${styles.circle2}`} />
      <div className={`${styles.circle} ${styles.circle1}`} />
      <div className={`${styles.circle} ${styles.circle2}`} />
    </div>
  );
};
export default HomePage;
