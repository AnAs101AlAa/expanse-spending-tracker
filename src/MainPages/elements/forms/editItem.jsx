import { useState } from "react";
import { X, LoaderCircle } from "lucide-react";
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { useNotification } from "../../../globalPopUps/notificationProvider";
import propTypes from 'prop-types';
import { setPlaner } from "../../../Redux/Slices/planerSlice";

export default function EditItem({ setOpen, fetch, data }) {
    const [title, setTitle] = useState('');
    const [titleInput, setTitleInput] = useState(false);
    const [amount, setAmount] = useState(0);
    const [amountInput, setAmountInput] = useState(false);
    const [date, setDate] = useState('');
    const [dateInput, setDateInput] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const notification = useNotification();
    const username = useSelector((state => state.Account.username));
    const planer = useSelector((state) => state.Planer);
    const [pack, setPack] = useState(data.pack);
    const dispatch = useDispatch();

    function submitItem() {
        setSubmitting(true);
        try {

            const newItem = { title, amount, date, pack };

            if( titleInput === false ) newItem.title = data.title;
            if( amountInput === false ) newItem.amount = data.amount;
            if( dateInput === false ) newItem.date = data.date;

            const prevHistory = planer.history;
            const prevPackages = planer.packages;
            const newBalance = planer.balance - (amountInput ?  parseFloat(data.amount) - parseFloat(amount): 0);

            const updatedHistory = prevHistory.map((item) => {
                if (item.title === data.title && item.amount === data.amount && item.date === data.date) {
                    return newItem;
                }
                return item;
            });

            let sourcePack = null;
            let targetPack = null;
            for (const p of prevPackages) {
                if (p.title === data.pack) {
                    sourcePack = p;
                }
                if (p.title === pack) {
                    targetPack = p;
                }
            }

            const updatedSourcePack = { 
                ...sourcePack,
                sum: sourcePack.sum - parseFloat(data.amount), 
                items: sourcePack.items.filter((unit) => unit.title.toLowerCase() !== data.title.toLowerCase())
            };

            const updatedTargetPack = {
                ...targetPack,
                sum: targetPack.sum + parseFloat(amount),
                items: [...targetPack.items, newItem]
            }

            const newPackages = prevPackages.map(p => {
                if (p.title === updatedSourcePack.title) return updatedSourcePack;
                if (p.title === updatedTargetPack.title) return updatedTargetPack;
                return p;
            });

            axios.patch(`http://localhost:3001/profiles/${username}`, {
                history: updatedHistory,
                balance: newBalance,
                packages: newPackages
            });

            dispatch(setPlaner({ balance: newBalance, history: updatedHistory, packages: newPackages }));
            notification('item edited successfully', 's');
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
                <div className="w-[60%] outline-teal-500 outline-2 outline animate-shadowGlow p-4 bg-slate-950 rounded-lg my-auto text-white max-w-[700px] h-fit">
                    <X className="mb-3 size-6 hover:cursor-pointer" onClick={() => setOpen(false)} />
                    <p className="font-bold mx-auto text-3xl mb-2 text-center animate-textGlow">Edit Expense</p>
                    <p className="font-bold mx-auto text-xl mb-12 text-center animate-textGlow">Unedited Items Remain Unchanged</p>
                    <div className="flex flex-col gap-8">
                        <div className="flex gap-3 justify-between px-4 items-center">
                            <p className="text-md font-bolf text-shadow-glow">Description</p>
                            <input onChange={(e) => { setTitleInput(true); setTitle(e.target.value) }} type="text" placeholder={data.title} className={`w-[70%] h-[40px] bg-slate-800 p-1 px-3 content-center border-2 border-transparent hover:border-white transition-all ease-linear duration-100 rounded-full focus:border-teal-500 focus:outline-none`} />
                        </div>
                        <div className="flex gap-3 justify-between px-4 items-center">
                            <p className="text-md font-boldtext-shadow-glow">Amount</p>
                            <input onChange={(e) => { setAmountInput(true); setAmount(e.target.value) }} type="number" placeholder={data.amount} className={`w-[70%] h-[40px] bg-slate-800 p-1 px-3 content-center border-2 border-transparent hover:border-white transition-all ease-linear duration-100 rounded-full focus:outline-none`} />
                        </div>
                        <div className="flex gap-3 justify-between px-4 items-center">
                            <p className="text-md font-bold text-shadow-glow">Date</p>
                            <input onChange={(e) => { setDateInput(true); setDate(e.target.value) }} type="date" className={`w-[70%] h-[40px] bg-slate-800 p-1 px-3 content-center border-2 border-transparent hover:border-white transition-all ease-linear duration-100 rounded-full focus:border-teal-500 focus:outline-none`} />
                        </div>
                        <div className="flex gap-3 mb-3 justify-between px-4 items-center">
                            <p className="text-md font-bold text-shadow-glow">Related Event</p>
                            <select defaultValue={data.pack} onChange={(e) => setPack(e.target.value)} className="focus:border-none select-sm w-[70%] rounded-full h-[40px] bg-slate-800">
                                <option value={data.pack}>{data.pack}</option>
                                {planer.packages.map((item, index) => <option key={index}>{item.title}</option>)}
                            </select>
                        </div>
                        <button onClick={() => submitItem()} className="rounded-full bg-teal-500 font-bold text-white h-[40px] w-[15%] mx-auto hover:text-teal-400 hover:bg-white duration-200 transition-all ease-in-out">
                            {submitting ? <LoaderCircle className="size-6 mx-auto animate-spin" /> : 'Submit'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

EditItem.propTypes = {
    setOpen: propTypes.func.isRequired,
    fetch: propTypes.func.isRequired,
    data: propTypes.object.isRequired
}