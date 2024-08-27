import { LayoutList, List } from "lucide-react";
import propTypes from 'prop-types';
export default function CategoryDropDown({setView}) {
    return (
        <>
            <div className="dropdown dropdown-bottom">
                <div tabIndex={0} role="button" className={`select-none w-fit mb-3 h-fit text-white shadow-teal-500 size-[40px] rounded-full bg-slate-800 border-2 borderInner p-2 hover:border-teal-500 duration-100 ease-linear transition-all text-center content-center items-center`} >View by</div>
                <ul tabIndex={0} className="text-white dropdown-content menu bg-base-100 -mt-2 rounded-box z-[1] w-44 p-4 shadow animate-shadowGlow border-2 borderOuter">
                    <li onClick={() => setView("all")}className="duration-150 font-semibold ease-in-out text-md borderOuter hover:cursor-pointer hover:animate-textGlow border-b pb-2"><div className="flex gap-3 justify-between"><List /><p>By Item</p></div></li>
                    <li onClick={() => setView("events")} className="duration-150 font-semibold ease-in-out text-md hover:cursor-pointer hover:animate-textGlow pt-2"><div className="flex gap-3 justify-between"><LayoutList /><p>By Event</p></div></li>
                </ul>
            </div>
        </>
    )
}

CategoryDropDown.propTypes = {
    setView: propTypes.func
}