import { useState } from "react";
import { X, LoaderCircle } from "lucide-react";
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { useNotification } from "../../../globalPopUps/notificationProvider";
import propTypes from 'prop-types';
import { setPlaner } from "../../../Redux/Slices/planerSlice";

export default function AddItem({ setOpen, fetch }) {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState('');
    const [pack, setPack] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const notification = useNotification();
    const username = useSelector((state => state.Account.username));
    const planer = useSelector((state) => state.Planer);
    const dispatch = useDispatch();

    function submitItem() {
        try {
            setSubmitting(true);
            if (title === '' || amount === 0 || date === '') {
                notification('please fill in all fields', 'e');
                return;
            }

            const dateGot = new Date(date);
            const today = new Date();
            const currentYear = today.getFullYear();
            const nextYear = currentYear + 1;
    
            if (dateGot.getFullYear() < currentYear || dateGot.getFullYear() > nextYear) {
                notification("date must be within this year or the next year", 'e');
                return;
            }
            
            const prevHistory = planer.history;
            const newBalance = (parseFloat(planer.balance) + parseFloat(amount));
            const newItem = {
                "title": title,
                "amount": amount,
                "date": date,
                "pack": pack
            }

            const newPackages = planer.packages.map(item => {
                if (item.title === pack) {
                    return {
                        ...item,
                        sum: item.sum + parseFloat(amount),
                        items: [...item.items, newItem]
                    };
                }
                return item;
            });

            axios.patch(`http://localhost:3001/profiles/${username}`, {
                balance: newBalance,
                history: [...prevHistory, newItem],
                packages: newPackages
            });

            console.log(newPackages);
            dispatch(setPlaner({ balance: newBalance, history: [...prevHistory, newItem], packages: newPackages }));

            notification('item added successfully', 's');
            fetch(true);
            setOpen(false);
        }
        catch {
            notification('failed to add item please try again', 'e');
        }
        finally {
            setSubmitting(false);
        }
    }

    return (
        <>
            <div className="fixed w-full h-full inset-0 z-30 flex justify-center bg-black bg-opacity-50 text-white">
                <div className="w-[60%] borderInner border-2 bodyDark animate-shadowGlow p-4 rounded-lg my-auto text-white max-w-[700px] h-fit">
                    <X className="mb-3 size-6 hover:cursor-pointer" onClick={() => setOpen(false)} />
                    <p className="font-bold text-3xl mb-12 text-shadow-glow text-center">Add New Expense</p>
                    <div className="flex flex-col gap-8">
                        <div className="flex gap-3 justify-between px-4 items-center">
                            <p className="text-md font-bold">Description</p>
                            <input onChange={(e) => setTitle(e.target.value)} type="text" placeholder="food" className={`w-[70%] h-[40px] bg-slate-800 p-1 px-3 content-center border-2 border-transparent hover:border-white transition-all ease-linear duration-100 rounded-full focus:border-teal-500 focus:outline-none`} />
                        </div>
                        <div className="flex gap-3 justify-between px-4 items-center">
                            <p className="text-md font-bold">Amount</p>
                            <input onChange={(e) => setAmount(e.target.value)} type="number" placeholder="3000" className={`w-[70%] h-[40px] bg-slate-800 p-1 px-3 content-center border-2 border-transparent hover:border-white transition-all ease-linear duration-100 rounded-full focus:border-teal-500 focus:outline-none`} />
                        </div>
                        <div className="flex gap-3 justify-between px-4 items-center">
                            <p className="text-md font-bold">Date</p>
                            <input onChange={(e) => setDate(e.target.value)} type="date" placeholder="10-12-2023" className={`w-[70%] h-[40px] bg-slate-800 p-1 px-3 content-center border-2 border-transparent hover:border-white transition-all ease-linear duration-100 rounded-full focus:border-teal-500 focus:outline-none`} />
                        </div>
                        <div className="flex gap-3 mb-3 justify-between px-4 items-center">
                            <p className="text-md font-bold">Related Event</p>
                            <select disabled={planer.packages.length == 0} defaultValue="" onChange={(e) => setPack(e.target.value)} className="select select-bordered focus:border-none select-sm w-[70%] rounded-full h-[40px] bg-slate-800">
                                <option value="" disabled>{planer.packages.length == 0 ? "no events created yet" : "Select an event"}</option>
                                {planer.packages.map((item, index) => <option key={index}>{item.title}</option>)}
                            </select>
                        </div>
                        <button onClick={() => submitItem()} className="rounded-full bodyButtonBlue font-bold text-white h-[40px] w-[15%] mx-auto hover:text-teal-400 hover:bg-white duration-200 transition-all ease-in-out">
                            {submitting ? <LoaderCircle className="size-6 mx-auto animate-spin" /> : 'Submit'}</button>
                    </div>
                </div>
            </div>
        </>
    );
}

AddItem.propTypes = {
    setOpen: propTypes.func.isRequired,
    fetch: propTypes.func.isRequired
}