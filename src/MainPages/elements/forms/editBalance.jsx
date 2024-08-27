import { useState } from "react";
import { X } from "lucide-react";
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { useNotification } from "../../../globalPopUps/notificationProvider";
import propTypes from 'prop-types';
import { setBalance } from "../../../Redux/Slices/planerSlice";

export default function EditBalance({ setOpen }) {
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
            <div className="w-full text-white text-start flex-col flex gap-4">
                <X className="mb-2 size-6 hover:cursor-pointer" onClick={() => setOpen(false)} />
                <p className="font-medium text-3xl animate-textGlow mb-4">Enter New Balance</p>
                <div className="flex gap-5 content-center select-none">
                    <input onChange={(e) => setNewAmount(e.target.value)} type="number" placeholder="Amount: 0" className={`w-[30%] h-[40px] bg-slate-800 p-1 px-3 content-center border-[3px] transition-all ease-linear duration-800 rounded-full focus:outline-none ${setBorder()}`} />
                    <button onClick={() => submitBalance()} className="rounded-full font-medium px-3 bodyButtonBlue text-white hover:text-teal-400 hover:bg-white duration-200 transition-all ease-in-out">Submit</button>
                </div>
            </div>
        </>
    );
}

EditBalance.propTypes = {
    setOpen: propTypes.func.isRequired,
}