import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector} from "react-redux";
import { Settings, LogOut, SlidersHorizontal } from "lucide-react";
import ConfirmLogout from "../MainPages/elements/forms/confirmLogout";

export default function MenuDropDown({flipOn}) {
    const [open, setOpen] = useState(false);
    const [logout, setLogout] = useState(false);
    const username = useSelector(state => state.Account.username);
    const navigate = useNavigate();

    return (
        <div className={`${flipOn ? "opacity-0 -z-20" : "opacity-100 z-20"} duration-300 ease-linear transition-all`}>
            {logout && <ConfirmLogout setOpen={setLogout} />}
            <div className="dropdown dropdown-end">
                <Settings onClick={() => setOpen(!open)} tabIndex={0} role="button" className={`z-20 m-1 text-white animate-shadowGlow bodyLight borderOuter size-[40px] border-2 rounded-full p-1 duration-100 ease-linear hover:-rotate-45 ${open ? "-rotate-180" : ""}`} />
                <ul tabIndex={0} className="text-white dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-4 shadow animate-shadowGlow border-2 borderOuter">
                    <li onClick={() => navigate(`/account/${username}`)} className="duration-150 font-semibold ease-in-out text-md borderOuter hover:cursor-pointer hover:animate-textGlow border-b pb-2"><div className="flex justify-between"><SlidersHorizontal /><p>Account Info</p></div></li>
                    <li onClick={() => setLogout(true)} className="duration-150 font-semibold ease-in-out text-md hover:cursor-pointer hover:animate-textGlow pt-2"><div className="flex justify-between"><LogOut /><p>Log Out</p></div></li>
                </ul>
            </div>
        </div>
    )
}