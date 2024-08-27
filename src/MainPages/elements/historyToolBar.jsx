import SortDropDown from "../../globalElements/sortDropDown";
import CategoryDropDown from "../../globalElements/categoryDropMenu";
import propTypes from 'prop-types';
export default function HistoryToolBar({setReload, setDisplayMode, displayMode, searchItems}) {

    return(
        <div className="flex justify-between bg-slate-900 borderInner border-[1px] rounded-badge m-2 p-5">
        <p className="text-2xl text-white w-[28%] h-fit self-center font-semibold">Expense History</p>
        <input onChange={(e) => searchItems(e.target.value)} type="text" placeholder="Search" className={`w-[40%] h-[50px] mt-1 bg-slate-950 p-1 px-3 content-center transition-color ease-in-out duration-100 rounded-full border-2 focus:animate-shadowGlow border-transparent border-teal-700 focus:borderInner hover:borderOuter focus:outline-none placeholder:text-gray-300`} />
        <span className="w-[30%] flex gap-5 justify-end mt-2">
            <CategoryDropDown setView={setDisplayMode} />
            <SortDropDown fetch={setReload} disp={displayMode} />
        </span>
    </div>
    )
}

HistoryToolBar.propTypes = {
    setReload: propTypes.func.isRequired,
    setDisplayMode: propTypes.func.isRequired,
    displayMode: propTypes.string.isRequired,
    searchItems: propTypes.func.isRequired
}