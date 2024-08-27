import EditBalance from "./forms/editBalance";
import { ChevronsRight } from "lucide-react";
import { useSelector } from "react-redux";
import { useState } from "react";
import MenuDropDown from "../../globalElements/menuDropDown";

export default function InfoCard() {

    const planer = useSelector((state) => state.Planer);
    const glowColor = planer?.balance < 0 ? 'rgba(255, 0, 0, 0.8)' : 'rgba(0, 255, 0, 0.8)';
    const [flip, setFlip] = useState(false);
    const accData = useSelector((state) => state.Account);

    const getDaysLeftInMonth = () => {
        const today = new Date();
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        return Math.ceil((lastDayOfMonth - today) / (1000 * 60 * 60 * 24));
    }

    const getTimeOfDay = () => {
        const hour = new Date().getHours();
        if (hour < 12) {
            return "Morning";
        } else if (hour < 18) {
            return "Afternoon";
        } else {
            return "Evening";
        }
    }

    let dateColor;
    if (getDaysLeftInMonth() < 10)
        dateColor = 'rgba(0, 255, 0, 0.8)';
    else if (getDaysLeftInMonth() < 20)
        dateColor = 'rgba(0, 0, 0, 0.8)'
    else
        dateColor = 'rgba(255, 0, 0, 0.8)';


    return (
        <div className="w-[50%] mx-auto relative flex items-center justify-center rounded-badge border-4 borderOuter bodyDark p-4 mb-6 animate-shadowGlow">
            <div className={`absolute bottom-2.5 right-2 flex p-4 items-center justify-center overflow-hidden borderOuter bg-opacity-50 border bodyLight backdrop-blur-lg transition-all duration-[400ms] ease-in-out ${flip ? "h-[16em] w-[58em] max-w-[99%] max-h-[98%] rounded-[1.5em]" : "hover:h-[4em] hover:w-[9em] h-[3em] w-[8em] rounded-badge"}`}>
                <button onClick={() => setFlip(true)} className={`font-bold text-sm rounded-xl duration-150 ease-in-out transition-all ${flip ? "opacity-0 z-50" : "opacity-100 -z-10"}`}>Edit Balance</button>
                <div className={`items-left transition-all ease-linear duration-[300ms] absolute left-0 top-0 flex h-full w-full p-[1.5em] ${flip ? "translate-x-0" : "translate-x-[100%]"}`}>
                    <EditBalance setOpen={setFlip} />
                </div>
            </div>
            <div className="w-full mx-auto flex flex-col gap-2 text-start">
                <div className="flex content-center justify-between">
                    <div className="flex gap-3 items-center">
                        <p className="text-xl font-semibold select-none">Good {getTimeOfDay()}:</p>
                        <p className="text-2xl font-semibold text-shadow-glow" style={{ '--glow-size': '15px' }}>{accData.first_name + " " + accData.last_name}</p>
                    </div>
                    <MenuDropDown flipOn={flip} />
                </div>
                <p className="text-2xl font-semibold select-none">Current Balance:</p>
                <p className="text-[60px] font-semibold animate-textGlow" style={{ '--glow-size': '15px', '--glow-color': glowColor }}>$ {planer.balance}</p>
                <div className="gap-3 content-center flex">
                    <p className="text-2xl mt-2 font-semibold select-none">{"Days left this month"}</p>
                    <ChevronsRight className={`size-10 ${flip ? "" : "animate-moveLeftRight"} mt-1 ml-1 text-shadow-glow`} />
                    <p className="text-4xl font-semibold animate-textGlow ml-2" style={{ '--glow-size': '15px', '--glow-color': dateColor }}>{getDaysLeftInMonth()}</p>
                </div>
            </div>
        </div>
    )
}