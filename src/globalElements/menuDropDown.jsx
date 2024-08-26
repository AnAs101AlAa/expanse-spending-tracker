import { useState } from "react";
import { Ellipsis, LogOut, Settings } from "lucide-react";
import ConfirmLogout from "../MainPages/elements/forms/confirmLogout";

export default function MenuDropDown() {
    const [open, setOpen] = useState(false);
    const [logout, setLogout] = useState(false);
    return (
        <>
            {logout && <ConfirmLogout setOpen={setLogout} />}
            <div className="dropdown dropdown-bottom">
                <Ellipsis onClick={() => setOpen(!open)} tabIndex={0} role="button" className={`m-1 text-white animate-shadowGlow shadow-teal-500 border-teal-400 size-[50px] border-2 rounded-full p-2 bg-slate-800 duration-100 ease-linear hover:-rotate-45 ${open ? "-rotate-180" : ""}`} />
                <ul tabIndex={0} className="text-white dropdown-content menu bg-base-100 -mt-2 rounded-box z-[1] w-44 p-4 shadow animate-shadowGlow border-2 border-teal-400">
                    <li className="duration-150 font-semibold ease-in-out text-md border-b-teal-400 hover:cursor-pointer hover:animate-textGlow border-b pb-2"><div className="flex gap-3 justify-center"><Settings /><p>Settings</p></div></li>
                    <li onClick={() => setLogout(true)} className="duration-150 font-semibold ease-in-out text-md hover:cursor-pointer hover:animate-textGlow pt-2"><div className="flex gap-3 justify-center"><LogOut /><p>Log Out</p></div></li>
                </ul>
            </div>
        </>
    )
}