import { useState } from "react";
import { X } from "lucide-react";
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { useNotification } from "../../../globalPopUps/notificationProvider";
import propTypes from 'prop-types';
import { setBalance } from "../../../Redux/Slices/planerSlice";

export default function EditBalance({setOpen, fetch}) {
    const [newAmount, setNewAmount] = useState(0);
    const username = useSelector((state => state.Account.username));
    const showNotification = useNotification();
    const dispatch = useDispatch();

    const setBorder = () => {
        if (newAmount > 0) {
            return "border-green-600";
        } else if (newAmount < 0) {
            return "border-red-600";
        } else {
            return "border-white";
        }
    };

    function submitBalance() {
        const modifyBalance = async () => {
            if (newAmount === "") {
                showNotification("please enter valid amount", 'e')
                return;
            }
            try {
                await axios.patch(`http://localhost:3001/profiles/${username}`, {
                    balance: newAmount
                });
                dispatch(setBalance(parseFloat(newAmount)));
                showNotification("balance edited successfully", 's');
                fetch(true);
                setOpen(false)
            }
            catch {
                showNotification("failed to edit balance please try again", 'e');
            }
        }

        modifyBalance();
    };

    return (
        <>
            <div className="fixed w-full h-full inset-0 z-30 flex justify-center bg-black bg-opacity-50">
                <div className="w-[50%] outline-teal-500 outline-2 outline animate-shadowGlow p-4 bg-slate-950 rounded-lg my-auto text-white max-w-[500px] h-fit">
                    <X className="mb-1 size-6 hover:cursor-pointer" onClick={() => setOpen(false)} />
                    <p className="font-medium mx-auto text-3xl mb-6 animate-textGlow">Enter New Balance</p>
                    <input onChange={(e) => setNewAmount(e.target.value)} type="number" placeholder="Amount: 0" className={`w-[60%] h-[50px] bg-slate-800 p-1 px-3 content-center border-[3px] mr-6 mb-4 transition-all ease-linear duration-800 rounded-full focus:outline-none ${setBorder()}`} />
                    <button onClick={() => submitBalance()} className="rounded-full font-bold bg-teal-500 text-white h-[50px] w-[20%] hover:text-teal-400 hover:bg-white duration-200 transition-all ease-in-out">Submit</button>
                </div>
            </div>
        </>
    );
}

EditBalance.propTypes = {
    setOpen: propTypes.func.isRequired,
    fetch: propTypes.func.isRequired
}