import { LogOut, Settings } from "lucide-react";
import propTypes from 'prop-types';
export default function CategoryDropDown({setView}) {
    return (
        <>
            <div className="dropdown dropdown-bottom">
                <div tabIndex={0} role="button" className={`m-1 mb-3 w-fit text-white animate-shadowGlow shadow-teal-500 outline-teal-400 size-[50px] rounded-full content-center px-4 bg-slate-800 outline-2 outline  p-2  hover:outline-offset-2 duration-100 ease-linear transition-all`} >View by</div>
                <ul tabIndex={0} className="text-white dropdown-content menu bg-base-100 -mt-2 rounded-box z-[1] w-44 p-4 shadow animate-shadowGlow border-2 border-teal-400">
                    <li onClick={() => setView("all")}className="duration-150 font-semibold ease-in-out text-md border-b-teal-400 hover:cursor-pointer hover:animate-textGlow border-b pb-2"><div className="flex gap-3 justify-center"><Settings /><p>Listed</p></div></li>
                    <li onClick={() => setView("events")} className="duration-150 font-semibold ease-in-out text-md hover:cursor-pointer hover:animate-textGlow pt-2"><div className="flex gap-3 justify-center"><LogOut /><p>By Event</p></div></li>
                </ul>
            </div>
        </>
    )
}

CategoryDropDown.propTypes = {
    setView: propTypes.func
}