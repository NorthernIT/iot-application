"use client";
import { useEffect, useState } from 'react';
import styles from '../styles/deviceData.module.css'
import { getNetvoxData } from '@/actions/deviceData';

type NetvoxDataType = {
  time: Date;
  BATTERY: number;
  TEMPERATURE: number;
  ILLUMINANCE: number;
  OCCUPIED: boolean;
  LORA_RSSI: number;
  LORA_SNR: number;
  LORA_DATARATE: string;
};

const NetvoxData = () => {
  const [netvoxData, setNetvoxData] = useState<NetvoxDataType | null>(null);

  const fetchData = async () =>{
    try{
      const result = await getNetvoxData();
      if (result.status == 200 && result.result && result.result.length > 0) {
        setNetvoxData(result.result[0]);
      } else {
        console.error("error getting data");
      }
    } catch (error: any){
      console.error("error getting data", error);
    } 
  }

  useEffect(() => {
    fetchData();
  },[]);


  return(
    <div className={styles.container}>
      <div className={styles.timestampBox}>
        <p>Time: {netvoxData?.time ? new Date(netvoxData.time).toString() : 'N/A'}</p>
      </div>
      <h1>Latest Data</h1>
      <div className={styles.grid}>
        <div className={styles.card}>
          <h2>Battery</h2>
          <p>{netvoxData?.BATTERY ?? 'N/A'}V</p>
        </div>
        <div className={styles.card}>
          <h2>Temperature</h2>
          <p>{netvoxData?.TEMPERATURE ?? 'N/A'}&deg;C</p>
        </div>
        <div className={styles.card}>
          <h2>Illuminance</h2>
          <p>{netvoxData?.ILLUMINANCE ?? 'N/A'}lux</p>
        </div>
        <div className={styles.card}>
          <h2>Occupied</h2>
          <p>{netvoxData?.OCCUPIED ? 'Yes':'No' ?? 'N/A'}</p>
        </div>
        <div className={styles.card}>
          <h2>LORA RSSI</h2>
          <p>{netvoxData?.LORA_RSSI ?? 'N/A'}dBm</p>
        </div>
        <div className={styles.card}>
          <h2>LORA SNR</h2>
          <p>{netvoxData?.LORA_SNR ?? 'N/A'}dB</p>
        </div>
        <div className={styles.card}>
          <h2>LORA Data Rate</h2>
          <p>{netvoxData?.LORA_DATARATE ?? 'N/A'}</p>
        </div>
      </div>
    </div>
  )
}

export default NetvoxData;