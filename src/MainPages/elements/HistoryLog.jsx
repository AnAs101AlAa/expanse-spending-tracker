import HistoryToolBar from "./historyToolBar";
import MoneyItem from "./moneyItem";
import AddItem from './forms/addItem';
import ModifyEvents from './forms/modifyEvents';
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Menu } from "lucide-react";

export default function HistoryLog() {
    const [reload, setReload] = useState(false);
    const [displayMode, setDisplayMode] = useState("all");
    const [newItem, setNewItem] = useState(false);
    const [editEvent, setEditEvent] = useState(false);
    const planer = useSelector((state) => state.Planer);
    const [planerData, setPlanerData] = useState(planer);

    const searchItems = (e) => {
        if (e === '') {
            setPlanerData(planer);
            return;
        }

        const newList = planer.history.filter(item => item.title.toLowerCase().includes(e.toLowerCase()));
        setPlanerData({ ...planerData, history: newList });
    }

    useEffect(() => {
        if (!reload)
            return;
        const refetch = async () => {
            setPlanerData(planer);
            setReload(false);
        }
        refetch();
    }, [reload]);

    return (
        <div className="w-full flex flex-col gap-4 bodyDark borderOuter border-4 animate-shadowGlow mx-auto p-4 max-w-[85%] lg:rounded-xl h-fit mb-10">
            {newItem && <AddItem setOpen={setNewItem} fetch={setReload} />}
            {editEvent && <ModifyEvents setOpen={setEditEvent} fetch={setReload} />}

            <HistoryToolBar setDisplayMode={setDisplayMode} searchItems={searchItems} displayMode={displayMode} setReload={setReload} />
            <div className="text-white w-full text-start flex justify-between p-3 pb-5 borderOuter border-b-2">
                <p className="text-md mt-3 flex-initial w-[20%] font-semibold">Description</p>
                <p className="text-md mt-3 flex-initial w-[20%] font-semibold">Amount</p>
                <p className="text-md mt-3 flex-initial w-[20%] font-semibold">Date</p>
                <p className="text-md mt-3 flex-initial w-[20%] font-semibold">Event</p>
                <div className="w-[20%] flex gap-4 justify-end">
                    <button onClick={() => setNewItem(true)} className="w-[50%] max-w-[140px] bg-green-500 font-bold duration-100 ease-linear transition-all hover:bg-white hover:text-green-600 rounded-lg">Add Item</button>
                    <button onClick={() => setEditEvent(true)} className="w-[50%] max-w-[140px] bodyButtonBlue font-bold duration-100 ease-linear transition-all hover:bg-white hover:text-teal-600 rounded-lg">Manage Events</button>
                </div>
            </div>
            {((planerData.history.length === 0 && displayMode === "all") || (planerData.packages.length == 0 && displayMode !== "all")) ? <p className="text-white text-2xl my-4 text-center animate-textGlow">history is empty</p> : null}
            {displayMode === "all" ? (
                planerData.history.map((item, index) => (
                    <MoneyItem key={index} data={item} fetch={setReload} />
                ))
            ) : (
                <>
                    {planerData.packages.map((item) => (
                        <>
                            <div className="rounded-badge border-2 borderOuter bg-slate-900 p-4">
                                <div className="flex justify-between mb-4 px-4 py-2">
                                    <p className="text-white text-2xl text-start font-medium animate-textGlow">{item.title}</p>
                                    <p className="text-white text-2xl text-start font-medium">Total: {item.sum}</p>
                                    <p className="text-white text-2xl text-start font-medium">Created at: {item.createdAt}</p>
                                </div>
                                {item.items.length == 0 ? <p className="text-white text-2xltext-center animate-textGlow">no items yet</p> :
                                    <div className="flex flex-col gap-3">
                                        {item.items.map((i, idx) => (
                                            <MoneyItem key={idx} data={i} fetch={setReload} />
                                        ))}
                                    </div>
                                }
                            </div>
                            <div className="flex justify-between gap-2 mt-2 items-center select-none">
                                <hr className="border borderOuter w-[48%]" />
                                <Menu className="size-8 text-white" />
                                <hr className="border borderOuter w-[48%]" />
                            </div>
                        </>
                    ))}
                    {planerData.history.filter((i) => i.pack === "").length !== 0 && (
                        <>
                            <div className="rounded-badge border-2 borderOuter bg-slate-900 p-4">
                                <p className="text-white text-2xl mb-4 text-start mx-10 font-medium animate-textGlow">Other</p>
                                {planerData.history.map((item, index) => (
                                    item.pack === "" && <MoneyItem key={index} data={item} fetch={setReload} />
                                ))}
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    )
}