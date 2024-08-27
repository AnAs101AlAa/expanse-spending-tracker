import { ArrowDownNarrowWide, Calendar, DollarSign, ArrowUp, ArrowDown } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { setPlaner } from "../Redux/Slices/planerSlice";
import { useEffect, useState } from "react";
import propTypes from 'prop-types';

export default function SortDropDown({fetch, disp}) {
    const [sort, setSort] = useState(0);
    const planer = useSelector((state) => state.Planer);
    const dispatch = useDispatch();

    useEffect(() => {
        if(sort === 0) return; 

    const modSort = async () => {
        const sortedHistory = [...planer.history];
        if(disp === "all") {
        switch (sort) {
            case 1:
                sortedHistory.sort((a, b) => a.amount - b.amount);
                break;
            case 2:
                sortedHistory.sort((a, b) => new Date(a.date) - new Date(b.date));
                break;
            case 3:
                sortedHistory.sort((a, b) => b.amount - a.amount);
                break;
            case 4:
                sortedHistory.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            default:
                return;
        }
        dispatch(setPlaner({ ...planer, history: sortedHistory }));
        fetch(true);
    }
    else {
        const sortedPacks = [...planer.packages];
        switch (sort) {
            case 1:
                sortedPacks.sort((a, b) => a.sum - b.sum);
                break;
            case 2:
                sortedPacks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;
            case 3:
                sortedPacks.sort((a, b) => b.sum - a.sum);
                break;
            case 4:
                sortedPacks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            default:
                return;
        }
        dispatch(setPlaner({ ...planer, packages: sortedPacks }));
        fetch(true);
    }
    };

    modSort();
},[sort]);

    return (
        <div className="dropdown dropdown-end">
            <ArrowDownNarrowWide tabIndex={0} role="button" className={`text-white size-[42px] borderInner border-2 rounded-full p-1 bodyLight hover:border-teal-500 duration-100 ease-linear transition-all`} />
            <ul tabIndex={0} className="text-white dropdown-content menu bg-base-100 mt-1 rounded-box z-[1] w-64 p-4 shadow animate-shadowGlow border-2 borderOuter">
                <li onClick={() => setSort(1)} className="duration-150 font-semibold ease-in-out text-md borderOuter hover:cursor-pointer hover:animate-textGlow border-b pb-2">
                    <div className="flex justify-between">
                        <div className="flex gap-0">
                            <DollarSign />
                            <ArrowUp className="w-[16px] h-[25px]" />
                        </div>
                        <p>Amount (Ascending)</p>
                    </div>
                </li>
                <li onClick={() => setSort(2)} className="duration-150 font-semibold ease-in-out text-md borderOuter hover:cursor-pointer hover:animate-textGlow border-b py-2">
                    <div className="flex justify-between">
                        <div className="flex gap-0">
                            <Calendar />
                            <ArrowUp className="w-[16px] h-[25px]" />
                        </div>
                        <p>Date (Ascending)</p>
                    </div>
                </li>
                <li onClick={() => setSort(3)} className="duration-150 font-semibold ease-in-out text-md borderOuter hover:cursor-pointer hover:animate-textGlow border-b py-2">
                    <div className="flex justify-between">
                        <div className="flex gap-0">
                            <DollarSign />
                            <ArrowDown className="w-[16px] h-[25px]" />
                        </div>
                        <p>Amount (Descending)</p>
                    </div>
                </li>
                <li onClick={() => setSort(4)} className="duration-150 font-semibold ease-in-out text-md hover:cursor-pointer hover:animate-textGlow pt-2">
                    <div className="flex gap-3 justify-between">
                        <div className="flex gap-0">
                            <Calendar />
                            <ArrowDown className="w-[16px] h-[25px]" />
                        </div>
                        <p>Date (Descending)</p>
                    </div>
                </li>
            </ul>
        </div>
    );
} 

SortDropDown.propTypes = {
    fetch: propTypes.func.isRequired,
    disp: propTypes.string.isRequired
}