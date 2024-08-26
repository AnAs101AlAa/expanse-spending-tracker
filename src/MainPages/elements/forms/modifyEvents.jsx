import { useState } from "react";
import { X } from "lucide-react";
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { useNotification } from "../../../globalPopUps/notificationProvider";
import propTypes from 'prop-types';
import { newEvent, setPacks } from "../../../Redux/Slices/planerSlice";

export default function ModifyEvents({ setOpen, fetch }) {
    const [add, setAdd] = useState(false);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const notification = useNotification();
    const username = useSelector((state => state.Account.username));
    const planer = useSelector((state) => state.Planer);
    const [pack, setPack] = useState('');
    const dispatch = useDispatch();

    function submitEditEvent() {
        try {
            const dateGot = new Date(date);
            const today = new Date();
            if (today > dateGot) {
                notification("can't set a date in the past", 'e');
                return;
            }
            const newPack = { title: title, items: pack.items, sum: pack.sum, createdAt: date };
            if(title === ""){
                newPack.title = pack.title;
            }
            if(date === "")
                newPack.createdAt = pack.createdAt;

            const newPacks = planer.packages.map(item => item.title === pack.title ? newPack : item);
            
            axios.patch(`http://localhost:3001/profiles/${username}`, {
                packages: newPacks
            });
            dispatch(setPacks(newPacks));
            notification('item Edited successfully', 's');
            fetch(true);
            setOpen(false);
        }
        catch {
            notification('failed to Edit item please try again', 'e');
        }
    }


    function submitNewEvent() {
        if (title === '' || date === '') {
            notification('Please set all fields', 'e');
            return;
        }
        try {
            axios.get(`http://localhost:3001/profiles/${username}`)
                .then(res => {
                    const found = res.data.packages.find(item => item[title] === title);
                    if (found) {
                        notification('An event with this name already exists', 'e');
                        return;
                    }
                    const dateGot = new Date(date);
                    const today = new Date();
                    if (today > dateGot) {
                        notification("can't set a date in the past", 'e');
                        return;
                    }
                    const newPack = { title: title, items: [], sum: 0, createdAt: date };
                    axios.patch(`http://localhost:3001/profiles/${username}`, {
                        packages: [...res.data.packages, newPack]
                    });
                    dispatch(newEvent(newPack));
                    notification('item added successfully', 's');
                    fetch(true);
                    setOpen(false);
                });
        }
        catch {
            notification('failed to add item please try again', 'e');
        }
    }

    return (
        <>
            <div className={`fixed w-full h-full inset-0 z-30 flex justify-center bg-black bg-opacity-50 text-white`}>
                <div className={`fixed top-[30%] w-[30%] outline-teal-500 outline-2 outline animate-shadowGlow p-4 bg-slate-950 rounded-lg my-auto text-white max-w-[700px] h-fit transition-all duration-500 ease-in-out ${!add ? "opacity-100 z-40" : "opacity-0 -z-40"}`}>
                    <X className="mb-3 size-6 hover:cursor-pointer" onClick={() => setOpen(false)} />
                    <p className="font-bold mx-auto text-3xl mb-12 animate-textGlow">Events Editor</p>
                    <div className="flex flex-col gap-8">
                        <div className="flex gap-8 items-center">
                            <p className="text-lg font-bold text-shadow-glow">Select an Event</p>
                            <select disabled={planer.packages.length == 0} defaultValue="" onChange={(e) => setPack(planer.packages.find((item) => item.title === e.target.value))} className="select select-bordered focus:border-none select-sm w-[68%] rounded-full h-[40px] bg-slate-800">
                                <option value="" disabled>{planer.packages.length == 0 ? "no events created yet" : "Select an event"}</option>
                                {planer.packages.map((item, index) => <option key={index}>{item.title}</option>)}
                            </select>
                        </div>
                        <div className="flex gap-12 justify-start px-2 items-center">
                            <p className="text-lg font-bold text-shadow-glow">Event Name</p>
                            <input onChange={(e) => setTitle(e.target.value)} type="text" placeholder={pack === "" ? "Very awesome japan trip" : pack.title} className={`w-[70%] h-[40px] bg-slate-800 p-1 px-3 content-center border-2 border-transparent hover:border-white transition-all ease-linear duration-100 rounded-full focus:border-teal-500 focus:outline-none`} />
                        </div>
                        <div className="flex gap-5 justify-start items-center px-2">
                            <p className="text-lg font-bold text-shadow-glow w-[25%] text-start">Creation Date</p>
                            <input onChange={(e) => setDate(e.target.value)} type="date" value={pack === "" ? "" : (date === "" ? pack.createdAt : date)} className={`w-[70%] h-[40px] bg-slate-800 p-1 px-3 content-center border-2 border-transparent hover:border-white transition-all ease-linear duration-100 rounded-full focus:border-teal-500 focus:outline-none`} />
                        </div>
                        <div className="flex gap-4 justify-center">
                            <button onClick={() => setAdd(true)} className="text-center rounded-full bg-green-500 font-bold text-white h-[40px] w-[20%] hover:text-green-400 hover:bg-white duration-200 transition-all ease-in-out">New Event</button>
                            <button onClick={() => submitEditEvent()} className="text-center rounded-full bg-teal-500 font-bold text-white h-[40px] w-[15%] hover:text-teal-400 hover:bg-white duration-200 transition-all ease-in-out">Submit</button>
                        </div>
                    </div>
                </div>
                <div className={`fixed top-[30%] w-[30%] outline-teal-500 outline-2 outline animate-shadowGlow p-4 bg-slate-950 rounded-lg my-auto text-white max-w-[700px] h-fit transition-all duration-500 ease-in-out ${add ? "opacity-100 z-40" : "opacity-0 -z-40"}`}>
                    <X className="mb-3 size-6 hover:cursor-pointer" onClick={() => setOpen(false)} />
                    <p className="font-bold mx-auto text-3xl mb-12 animate-textGlow">Add New Event</p>
                    <div className="flex flex-col gap-8">
                        <div className="flex gap-12 justify-start px-2">
                            <p className="text-lg font-bold my-auto text-shadow-glow">Event Name</p>
                            <input onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Very awesome japan trip" className={`w-[70%] h-[40px] bg-slate-800 p-1 px-3 content-center border-2 border-transparent hover:border-white transition-all ease-linear duration-100 rounded-full focus:border-teal-500 focus:outline-none`} />
                        </div>
                        <div className="flex gap-5 justify-start items-center px-2">
                            <p className="text-lg font-bold text-shadow-glow w-[25%] text-start">Creation Date</p>
                            <input onChange={(e) => setDate(e.target.value)} type="date" placeholder={pack === "" ? "" : pack.createdAt} className={`w-[70%] h-[40px] bg-slate-800 p-1 px-3 content-center border-2 border-transparent hover:border-white transition-all ease-linear duration-100 rounded-full focus:border-teal-500 focus:outline-none`} />
                        </div>
                        <div className="flex gap-4 justify-center">
                            <button onClick={() => setAdd(false)} className="text-center rounded-full bg-red-500 font-bold text-white h-[40px] w-[15%] hover:text-red-400 hover:bg-white duration-200 transition-all ease-in-out">Back</button>
                            <button onClick={() => submitNewEvent()} className="text-center rounded-full bg-teal-500 font-bold text-white h-[40px] w-[22%] hover:text-teal-400 hover:bg-white duration-200 transition-all ease-in-out">Create Event</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

ModifyEvents.propTypes = {
    setOpen: propTypes.func.isRequired,
    fetch: propTypes.func.isRequired
}