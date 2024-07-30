"use client";
import { useEffect, useState } from 'react';
import styles from '../styles/deviceData.module.css'
import { getLatestNetvoxData, getNetvoxTimes, getNetvoxData } from '@/actions/netvoxDeviceData';

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
  const [netvoxTimes, setNetvoxTimes] = useState<Date[]>([]);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  // Fetched all times for drop down
  const fetchTimes = async () => {
    try {
      const result = await getNetvoxTimes();
      if (result.status === 200 && result.result) {
        setNetvoxTimes(result.result.map(entry => entry.time));
      } else {
        console.error("Error getting times");
      }
    } catch (error: any) {
      console.error("Error getting times", error);
    }
  }

  // Fetch data for specified time or get latest if time not given
  const fetchData = async (time: Date | null) => {
    try {
      const result = await (time ? getNetvoxData(time): getLatestNetvoxData());
      if (result.status == 200 && result.result) {
        setNetvoxData(result.result[0]);
      } else {
        console.error("Error fetching data");
      }
    } catch (error: any) {
      console.error("Error fetching data");
    }
  }

  useEffect(() => {
    const initializeData = async () => {
      await fetchTimes();
      const latestData = await getLatestNetvoxData();
      if (latestData.status == 200 && latestData.result) {
        setNetvoxData(latestData.result[0]);
        setSelectedTime(latestData.result[0].time);
      } else {
        console.error("Error initializing data!");
      }
    };
    initializeData();
  }, []);

  // Effect depends on selectedTime
  // If selectedTime is changed then this effect is
  useEffect(() => {
    if(selectedTime) {
      fetchData(selectedTime);
    }
  }, [selectedTime]);

  const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTimeValue = event.target.value;
    setSelectedTime(new Date(selectedTimeValue));
  };


  return(
    <div className={styles.container}>
      <div className={styles.timestampBox}>
        <label htmlFor="timeSelect">Time: </label>
        <select id="timeSelect" onChange={handleTimeChange} value={selectedTime?.toISOString() ?? ''}>
          {netvoxTimes.map((time, index) => (
            <option key={index} value={time.toISOString()}>
              {time.toTimeString()}
            </option>
          ))}
        </select>
      </div>
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