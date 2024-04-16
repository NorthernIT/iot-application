"use client";
import React, {useState, useEffect} from "react";
import { addDevice, getUserDevices } from "@/actions/deviceActions";
import toast, { Toaster } from "react-hot-toast";

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
                console.error('Error adding device:', message);
            }
        } catch (error) {
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
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="devEUI">
                            DevEUI
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="devEUI"
                            type="text"
                            placeholder="Enter DevEUI"
                            value={newDevice.DevEUI}
                            onChange={(e) => setNewDevice({ ...newDevice, DevEUI: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            placeholder="Enter Name"
                            value={newDevice.Name}
                            onChange={(e) => setNewDevice({ ...newDevice, Name: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="appEUI">
                            AppEUI
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="appEUI"
                            type="text"
                            placeholder="Enter AppEUI"
                            value={newDevice.AppEUI}
                            onChange={(e) => setNewDevice({ ...newDevice, AppEUI: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="NwAppKey">
                            NwAppKey
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="NwAppKey"
                            type="text"
                            placeholder="Enter NwAppKey"
                            value={newDevice.NwAppKey}
                            onChange={(e) => setNewDevice({ ...newDevice, NwAppKey: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Freq">
                            Freq
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="Freq"
                            type="text"
                            placeholder="Enter Freq"
                            value={newDevice.Freq}
                            onChange={(e) => setNewDevice({ ...newDevice, Freq: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Class">
                        Class
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                                    className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            DevEUI
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Name
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            AppEUI
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            NwAppKey
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Freq
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Class
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {devices.map((device, index) => (
                                        <tr key={index}>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">{device.DevEUI}</td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{device.Name}</td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{device.AppEUI}</td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{device.NwAppKey}</td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{device.Freq}</td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{device.Class}</td>
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