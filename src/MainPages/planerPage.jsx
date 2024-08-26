import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import EditBalance from "./elements/forms/editBalance";
import MoneyItem from "./elements/moneyItem";
import AddItem from './elements/forms/addItem';
import ModifyEvents from './elements/forms/modifyEvents';
import { setPlaner } from "../Redux/Slices/planerSlice";
import MenuDropDown from "../globalElements/menuDropDown";
import SortDropDown from "../globalElements/sortDropDown";
import CategoryDropDown from "../globalElements/categoryDropMenu";
import { useNotification } from "../globalPopUps/notificationProvider";
import { ChevronsRight, DollarSign } from "lucide-react";

export default function PlanerPage() {
    const [fetching, setFetching] = useState(true);
    const [editBalance, setEditBalance] = useState(false);
    const [newItem, setNewItem] = useState(false);
    const [editEvent, setEditEvent] = useState(false);
    const username = useSelector((state) => state.Account.username);
    const accData = useSelector((state) => state.Account);
    const planer = useSelector((state) => state.Planer);
    const dispatch = useDispatch();
    const notification = useNotification();
    const [reload, setReload] = useState(false);
    const [displayMode, setDisplayMode] = useState("all");
    const [planerData, setPlanerData] = useState(null);
    const glowColor = planerData?.balance < 0 ? 'rgba(255, 0, 0, 0.8)' : 'rgba(0, 255, 0, 0.8)';

    const [openPage, setOpenPage] = useState(false);
    const [openLock, setOpenLock] = useState(false);
    useEffect(() => {
        const fetchUserDate = async () => {
            setFetching(true);
            try {
                const res = await axios.get(`http://localhost:3001/profiles?id=${username}`);
                setPlanerData(res.data[0]);
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

    useEffect(() => {
        if (!reload)
            return;
        const refetch = async () => {
            setPlanerData(planer);
            setReload(false);
        }
        refetch();
    }, [reload]);

    const searchItems = (e) => {
        if (e === '') {
            setPlanerData(planer);
            return;
        }

        const newList = planer.history.filter(item => item.title.toLowerCase().includes(e.toLowerCase()));
        setPlanerData({ ...planerData, history: newList });
    }

    const getDaysLeftInMonth = () => {
        const today = new Date();
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        return Math.ceil((lastDayOfMonth - today) / (1000 * 60 * 60 * 24));
    }

    let dateColor;
    if (getDaysLeftInMonth() < 10)
        dateColor = 'rgba(0, 255, 0, 0.8)';
    else if (getDaysLeftInMonth() < 20)
        dateColor = 'rgba(0, 0, 0, 0.8)'
    else
        dateColor = 'rgba(255, 0, 0, 0.8)';

    return (
        <>
            <div className={`w-1/2 h-full fixed top-0 left-0 bg-slate-950  border-r-teal-500 border-r-2 duration-500 ease-in-out transition-all ${openPage ? "-translate-x-full -z-10" : "translate-x-0 z-50"}`}></div>
            <div className={`w-1/2 h-full fixed top-0 left-1/2 content-center bg-slate-950 border-l-teal-500 border-l-2 duration-500 ease-in-out transition-all ${openPage ? "translate-x-full -z-10" : "translate-x-0 z-50"}`}>
                <DollarSign className={`size-[120px] -translate-x-1/2 text-white rounded-full bg-slate-800 border-4 p-2 border-teal-500 z-50 animate-shadowGlow duration-200 ease-in-out ${openLock ? "rotate-90" : "rotate-0"}`}/>
            </div>


            <div className="bg-transparent text-white backdrop-blur-lg p-4 w-full h-fit text-center z-10 min-h-full">
                {editBalance && <EditBalance setOpen={setEditBalance} fetch={setReload} />}
                {newItem && <AddItem setOpen={setNewItem} fetch={setReload} />}
                {editEvent && <ModifyEvents setOpen={setEditEvent} fetch={setReload} />}
                {!fetching && <>
                    <div className="flex gap-10 mt-10 px-36 justify-between items-center">
                        <div className="p-8 bg-slate-950 rounded-xl w-fit h-[70%] mb-10 flex outline outline-4 outline-teal-500 shadow-lg shadow-teal-600 items-center">
                            <p className="text-2xl font-semibold select-none text-shadow-glow">{"Days left this month"}</p>
                            <ChevronsRight className="size-10 animate-moveLeftRight mt-1 ml-1 text-shadow-glow" />
                            <p className="text-4xl font-semibold animate-textGlow ml-2" style={{ '--glow-size': '15px', '--glow-color': dateColor }}>{getDaysLeftInMonth()}</p>
                        </div>
                        <div className="p-5 items-center h-[94%] bg-slate-950 rounded-xl w-[30%] flex justify-between mb-10 outline outline-4 outline-teal-500 shadow-lg shadow-teal-600">
                            <DollarSign className="size-[50px] animate-shadowGlow rounded-full p-2 border border-teal-500 bg-slate-800" />
                            <div>
                                <p className="text-4xl font-semibold select-none text-shadow-glow">Welcome</p>
                                <p className="text-4xl font-semibold animate-textGlow" style={{ '--glow-size': '15px' }}>{accData.first_name + " " + accData.last_name}</p>
                            </div>
                            <MenuDropDown />
                        </div>
                        <div className="p-8 bg-slate-950 rounded-xl w-fit h-[70%] mb-10 flex gap-4 justify-center outline outline-4 outline-teal-500 shadow-lg shadow-teal-600">
                            <p className="text-2xl font-semibold select-none text-shadow-glow">Current Balance:</p>
                            <p className="text-2xl font-semibold animate-textGlow" style={{ '--glow-size': '15px', '--glow-color': glowColor }}>{planerData.balance}</p>
                            <button onClick={() => setEditBalance(true)} className="bg-teal-500 hover:bg-white hover:text-teal-500 duration-200 ease-in-out transition-colors font-bold py-2 px-4 text-sm rounded-xl">Edit Balance</button>
                        </div>
                    </div>

                    <div className="w-[85%] flex flex-col gap-4 shadow-xl shadow-teal-400 mx-auto p-4 outline outline-4 outline-teal-500 bg-slate-950 rounded-xl h-fit mb-10">
                        <div className="flex bg-slate-800 border-teal-500 border py-4 rounded-xl m-2 items-center">
                            <p className="text-2xl px-5 py-1 text-start animate-textGlow w-[28%] text-white">Expense History</p>
                            <input onChange={(e) => searchItems(e.target.value)} type="text" placeholder="Search" className={`w-[40%] h-[50px] bg-slate-950 p-1 px-3 content-center transition-color ease-in-out duration-100 rounded-full border-2 animate-shadowGlow border-transparent border-teal-700 focus:border-teal-500 focus:outline-none placeholder:text-gray-300`} />
                            <div className="w-[30%] flex gap-3 justify-end">
                                <CategoryDropDown setView={setDisplayMode} />
                                <SortDropDown fetch={setReload} />
                            </div>
                        </div>
                        <div className="text-white w-full text-start flex justify-between p-3 border-b-teal-500 border-b-2">
                            <p className="text-md mt-3 flex-initial w-[20%] font-semibold text-shadow-glow">Description</p>
                            <p className="text-md mt-3 flex-initial w-[20%] font-semibold text-shadow-glow">Amount</p>
                            <p className="text-md mt-3 flex-initial w-[20%] font-semibold text-shadow-glow">Date</p>
                            <p className="text-md mt-3 flex-initial w-[20%] font-semibold text-shadow-glow">Event</p>
                            <div className="w-[20%] flex gap-4 justify-end">
                                <button onClick={() => setNewItem(true)} className="w-[50%] max-w-[140px] bg-green-500 font-bold duration-100 ease-linear transition-all hover:bg-white hover:text-green-600 rounded-lg">Add Item</button>
                                <button onClick={() => setEditEvent(true)} className="w-[50%] max-w-[140px] bg-teal-500 font-bold duration-100 ease-linear transition-all hover:bg-white hover:text-teal-600 rounded-lg">Manage Events</button>
                            </div>
                        </div>
                        {(planerData.history.length === 0 && planerData.packages.length == 0) ? <p className="text-white text-2xl my-4 text-center animate-textGlow">history is empty</p> : null}
                        {displayMode === "all" ? (
                            planerData.history.map((item, index) => (
                                <MoneyItem key={index} data={item} fetch={setReload} />
                            ))
                        ) : (
                            <>
                                {planerData.packages.map((item) => (
                                    <>
                                        <div className="flex justify-between my-2 px-4 py-2 rounded-xl border-2 border-teal-500 bg-slate-800">
                                            <p className="text-white text-2xl text-start animate-textGlow">{item.title}</p>
                                            <p className="text-white text-2xl text-start animate-textGlow">Total: {item.sum}</p>
                                            <p className="text-white text-2xl text-start animate-textGlow">Created at: {item.createdAt}</p>
                                        </div>
                                        {item.items.length == 0 ? <p className="text-white text-2xl text-center animate-textGlow">no items yet</p> :
                                            item.items.map((i, idx) => (
                                                <MoneyItem key={idx} data={i} fetch={setReload} />
                                            ))}
                                    </>
                                ))}
                                {planerData.history.filter((i) => i.pack === "").length !== 0 && (
                                    <>
                                        <p className="text-white text-2xl my-2 text-start mx-10 animate-textGlow">Other</p>
                                        {planerData.history.map((item, index) => (
                                            item.pack === "" && <MoneyItem key={index} data={item} fetch={setReload} />
                                        ))}
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </>
                }
            </div>
        </>
    );
}