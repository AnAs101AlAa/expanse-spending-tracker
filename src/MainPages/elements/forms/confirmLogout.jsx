import { X } from "lucide-react";
import propTypes from 'prop-types';
import { useNavigate } from "react-router-dom";


export default function ConfirmLogout({setOpen}) {
    const navigate = useNavigate();

    return (
        <>
            <div className="select-none fixed w-full h-full inset-0 z-30 flex justify-center bg-black bg-opacity-50 text-white">
                <div className="w-[40%] outline-teal-500 outline-2 outline animate-shadowGlow p-4 bg-slate-950 rounded-lg my-auto text-white max-w-[500px] h-fit">
                    <X className="mb-1 size-6 hover:cursor-pointer" onClick={() => setOpen(false)} />
                    <p className="font-bold mx-auto text-3xl mb-12 animate-textGlow">Confirm Log Out</p>
                    <div className="flex mx-auto justify-center gap-8">
                        <button onClick={() => navigate('/')} className="rounded-full bg-green-500 font-bold text-white h-[40px] w-[15%] hover:text-green-400 hover:bg-white duration-200 transition-all ease-in-out">Yes</button>
                        <button onClick={() => setOpen(false)} className="rounded-full bg-red-500 font-bold text-white h-[40px] w-[15%] hover:text-red-400 hover:bg-white duration-200 transition-all ease-in-out">No</button>
                    </div>
                </div>
            </div>
        </>
    );
}

ConfirmLogout.propTypes = {
    setOpen: propTypes.func.isRequired,
}