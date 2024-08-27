import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { setPlaner } from "../Redux/Slices/planerSlice";
import { useNotification } from "../globalPopUps/notificationProvider";
import { DollarSign } from "lucide-react";
import InfoCard from "./elements/InfoCard";
import HistoryLog from "./elements/HistoryLog";


export default function PlanerPage() {
    const [fetching, setFetching] = useState(true);
    const username = useSelector((state) => state.Account.username);
    const dispatch = useDispatch();
    const notification = useNotification();
    const [openPage, setOpenPage] = useState(false);
    const [openLock, setOpenLock] = useState(false);

    useEffect(() => {
        const fetchUserDate = async () => {
            setFetching(true);
            try {
                const res = await axios.get(`http://localhost:3001/profiles?id=${username}`);
                dispatch(setPlaner(res.data[0]));
                setFetching(false);

                setTimeout(() => {
                    setOpenLock(true);
                    setTimeout(() => {
                        setOpenPage(true);
                    }, 200);
                }, 100);

            } catch {
                notification("can't reload page. please try again", "e");
            }
        };

        fetchUserDate();
    }, [username]);

    return (
        <>
            <div className={`w-1/2 h-full fixed top-0 left-0 bodyDark borderOuter border-r-2 duration-500 ease-in-out transition-all ${openPage ? "-translate-x-full -z-10" : "translate-x-0 z-50"}`}></div>
            <div className={`w-1/2 h-full fixed top-0 left-1/2 content-center bodyDark borderOuter border-l-2 duration-500 ease-in-out transition-all ${openPage ? "translate-x-full -z-10" : "translate-x-0 z-50"}`}>
                <DollarSign className={`size-[120px] -translate-x-1/2 text-white rounded-full bg-slate-800 border-4 p-2 border-teal-500 z-50 animate-shadowGlow duration-200 ease-in-out ${openLock ? "rotate-90" : "rotate-0"}`} />
            </div>


            <div className="bg-transparent text-white backdrop-blur-lg w-full h-fit z-10 min-h-full py-10">
                {!fetching && <>
                    <InfoCard />
                    <HistoryLog />
                </>
                }
            </div>
        </>
    );
}