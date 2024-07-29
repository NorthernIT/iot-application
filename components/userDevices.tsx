"use client";
import React, {useState, useEffect} from "react";
import { addDevice, getUserDevices } from "@/actions/deviceActions";
import toast, { Toaster } from "react-hot-toast";
import styles from "@/styles/userDevice.module.css"

const UserDevices = ({ user }: { user: any }) => {
    const [devices, setDevices] = useState<any[]>([]); // State to hold devices
    const [showAddDeviceForm, setShowAddDeviceForm] = useState<boolean>(false); // State to control add device form visibility
    const [newDevice, setNewDevice] = useState<{ DevEUI: string, Name: string, AppEUI: string, NwAppKey: string, Freq: string, Class: string }>({
        DevEUI: '',
        Name: '',
        AppEUI: '',
        NwAppKey: '',
        Freq: '',
        Class: ''
    }); // State to hold new device parameters

    // Function to fetch devices from database
    const fetchDevices = async () => {
        try {
            const { status, results } = await getUserDevices(user.id); 
            if (status === 200) {
                setDevices(results || []);
            } else {
                console.error('Error fetching devices:', results);
            }
        } catch (error) {
            console.error('Error fetching devices:', error);
        }
    };

    const handleAddDevice = async () => {
        try {
            const { status, message } = await addDevice(
                user.id,
                newDevice.DevEUI,
                newDevice.Name,
                newDevice.AppEUI,
                newDevice.NwAppKey,
                newDevice.Freq,
                newDevice.Class
            ); // Assuming user.id contains the user ID
            if (status === 200) {
                toast.success("Device added successfully") // Log success message
                setNewDevice({
                    DevEUI: '',
                    Name: '',
                    AppEUI: '',
                    NwAppKey: '',
                    Freq: '',
                    Class: ''
                }); // Reset new device parameters
                setShowAddDeviceForm(false); // Hide the add device form after submission
                fetchDevices(); // Refresh devices
            } else {
                toast.error("Error adding device. DevEUI may already be in use");
                console.log('Error adding device:', message);
            }
        } catch (error) {
            toast.error("Error adding device");
            console.error('Error adding device:', error);
        }
    };

    // Function to handle canceling add device form
    const cancelAddDevice = () => {
        setShowAddDeviceForm(false);
    };

    // Fetch devices when component mounts
    useEffect(() => {
        fetchDevices();
    }, []);

    return(
        <div className="py-1 bg-blueGray-50 w-full xl:w-10/12 px-4 mx-auto mt-24">
            {showAddDeviceForm && (
                <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h2 className="text-2xl font-bold mb-4">Add New Device</h2>
                    <div className="mb-4">
                        <label className={styles.formLabel} htmlFor="devEUI">
                            DevEUI
                        </label>
                        <input
                            className={styles.formInput}
                            id="devEUI"
                            type="text"
                            placeholder="Enter DevEUI"
                            value={newDevice.DevEUI}
                            onChange={(e) => setNewDevice({ ...newDevice, DevEUI: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <label className={styles.formLabel}  htmlFor="name">
                            Name
                        </label>
                        <select
                            className={styles.formInput}
                            id="name"
                            value={newDevice.Name}
                            onChange={(e) => setNewDevice({ ...newDevice, Name: e.target.value })}
                        >
                            <option value="">Select Name</option>
                            <option value="dragino-lht65n-temp-hum-79">dragino-lht65n-temp-hum-79</option>
                            <option value="netvox-rb11e-occupancy-temperaturelight-senso-1">netvox-rb11e-occupancy-temperaturelight-senso-1</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className={styles.formLabel}  htmlFor="appEUI">
                            AppEUI
                        </label>
                        <input
                            className={styles.formInput}
                            id="appEUI"
                            type="text"
                            placeholder="Enter AppEUI"
                            value={newDevice.AppEUI}
                            onChange={(e) => setNewDevice({ ...newDevice, AppEUI: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <label className={styles.formLabel}  htmlFor="NwAppKey">
                            NwAppKey
                        </label>
                        <input
                            className={styles.formInput}
                            id="NwAppKey"
                            type="text"
                            placeholder="Enter NwAppKey"
                            value={newDevice.NwAppKey}
                            onChange={(e) => setNewDevice({ ...newDevice, NwAppKey: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <label className={styles.formLabel}  htmlFor="Freq">
                            Freq
                        </label>
                        <input
                            className={styles.formInput}
                            id="Freq"
                            type="text"
                            placeholder="Enter Freq"
                            value={newDevice.Freq}
                            onChange={(e) => setNewDevice({ ...newDevice, Freq: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <label className={styles.formLabel}  htmlFor="Class">
                        Class
                        </label>
                        <input
                            className={styles.formInput}
                            id="Class"
                            type="text"
                            placeholder="Enter Class"
                            value={newDevice.Class}
                            onChange={(e) => setNewDevice({ ...newDevice, Class: e.target.value })}
                        />
                    </div>
                    {/* Add similar styling for other input fields */}
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={handleAddDevice}
                        >
                            Add Device
                        </button>
                        <button
                            className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={cancelAddDevice}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
            <section className="py-1 bg-blueGray-50 w-full xl:w-10/12 px-4 mx-auto mt-24">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-10 shadow-lg rounded">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3 className="font-semibold text-base text-blueGray-700">User Devices</h3>
                                </div>
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                <button 
                                    onClick={() => setShowAddDeviceForm(true)}
                                    className={styles.tableButton}
                                    >
                                        + Add Device
                                </button>
                                </div>
                            </div>
                        </div>

                        <div className="block w-full overflow-x-auto">
                            <table className="items-center bg-transparent w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className={styles.tableHeaders}>
                                            DevEUI
                                        </th>
                                        <th className={styles.tableHeaders}>
                                            Name
                                        </th>
                                        <th className={styles.tableHeaders}>
                                            AppEUI
                                        </th>
                                        <th className={styles.tableHeaders}>
                                            NwAppKey
                                        </th>
                                        <th className={styles.tableHeaders}>
                                            Freq
                                        </th>
                                        <th className={styles.tableHeaders}>
                                            Class
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {devices.map((device, index) => (
                                        <tr key={index}>
                                            <td className={styles.tableEntry}>{device.DevEUI}</td>
                                            <td className={styles.tableEntry}>{device.Name}</td>
                                            <td className={styles.tableEntry}>{device.AppEUI}</td>
                                            <td className={styles.tableEntry}>{device.NwAppKey}</td>
                                            <td className={styles.tableEntry}>{device.Freq}</td>
                                            <td className={styles.tableEntry}>{device.Class}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <Toaster />
            </section>
        </div>
    );
};

export default UserDevices