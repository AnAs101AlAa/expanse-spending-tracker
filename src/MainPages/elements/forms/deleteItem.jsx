import { useEffect, useState } from "react";
import { X } from "lucide-react";
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { useNotification } from "../../../globalPopUps/notificationProvider";
import { setPlaner } from "../../../Redux/Slices/planerSlice";
import propTypes from 'prop-types';

export default function DeleteItem({ setOpen, fetch, data }) {
    const [checked, setChecked] = useState(false);
    const [submit, setSubmit] = useState(false);
    const notification = useNotification();
    const username = useSelector((state => state.Account.username));
    const planer = useSelector((state) => state.Planer);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!submit) {
            return;
        }
        const processDelete = async () => {
            try {
                const updatedHistory = planer.history.filter((item) => item.title !== data.title);
                let updatedPackages = [];
                for (const p of planer.packages) {
                    const itfull = [];
                    let sumrow = 0;
                    for (const it of p.items) {
                        if (it.title === data.title) {
                            continue;
                        }
                        itfull.push(it);
                        sumrow += parseFloat(it.amount);
                    }
                    updatedPackages.push({ ...p,sum:sumrow, items: itfull });
                }

                const newBalance = planer.balance - (checked ? parseFloat(data.amount) : 0);

                axios.patch(`http://localhost:3001/profiles/${username}`, { history: updatedHistory, packages: updatedPackages, balance: newBalance });
                dispatch(setPlaner({ history: updatedHistory, packages: updatedPackages, balance: newBalance }));
                notification("item deleted successfully", 's');
                fetch(true);
                setOpen(false);
            }
            catch {
                notification("failed to delete item", 'e');
            }
        }
        processDelete();
    }, [submit]);

    return (
        <>
            <div className="fixed w-full h-full inset-0 z-30 flex justify-center bg-black bg-opacity-50 text-white">
                <div className="w-[60%] border-2 borderOuter animate-shadowGlow p-4 bodyDark rounded-lg my-auto text-white max-w-[700px] h-fit">
                    <X className="mb-3 size-6 hover:cursor-pointer" onClick={() => setOpen(false)} />
                    <p className="font-bold text-center mx-auto text-3xl mb-8 mt-2 animate-textGlow">Do you Want to adjust your balance according to this item?</p>
                    <div className="flex justify-center gap-8">
                        <button onClick={() => { setChecked(true); setSubmit(true); }} className="rounded-full bg-green-500 font-bold text-white h-[40px] w-[15%] hover:text-green-400 hover:bg-white duration-200 transition-all ease-in-out">Yes</button>
                        <button onClick={() => setSubmit(true)} className="rounded-full bg-red-500 font-bold text-white h-[40px] w-[15%] hover:text-red-400 hover:bg-white duration-200 transition-all ease-in-out">No</button>
                    </div>
                </div>
            </div>
        </>
    );
}

DeleteItem.propTypes = {
    setOpen: propTypes.func.isRequired,
    fetch: propTypes.func.isRequired,
    data: propTypes.object.isRequired
}