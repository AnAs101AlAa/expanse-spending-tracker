import { useEffect, useState } from "react"
import { CirclePlus, DoorOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MainMenuPage() {
    const [signUp, setSignUp] = useState(false);
    const [titleSlide, setTitleSlide] = useState("-translate-x-40 opacity-0");
    const [slide, setSlide] = useState("translate-x-32");
    const [drop, setDrop] = useState("opacity-0");
    const [login, setLogin] = useState(false);
    const Navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            setTitleSlide("translate-x-0 opacity-100")
        }, 100)
        setTimeout(() => {
            setSlide("translate-x-0")
            setDrop("opacity-100")
        }, 200);
    }, []);

    return (
        <div className="select-none absolute p-20 z-10 w-full h-full">
            <div className={`w-full ${titleSlide} duration-[880ms] ease-linear transition-all`}>
                <p className="text-white text-center mx-auto text-[65px] font-bold mb-3 select-none animate-textGlow">Welcome To Expanse™</p>
                <p className="text-white text-center mx-auto text-[35px] font-bold mb-24 select-none animate-textGlow mr-2">we will find you before the IRS</p>
            </div>

            <div className={`flex w-[60%] mx-auto gap-10 justify-center transition-transform duration-1000 ease--linear ${slide}`}>
                <div className={`w-[48%] max-w-[360px] h-[400px] shadow-lg shadow-teal-400 content-center backdrop duration-1000 ease-linear backdrop-blur-[20px] transition-all ${drop} rounded-lg`} onMouseEnter={() => setSignUp(true)} onMouseLeave={() => setSignUp(false)}>
                    <div className={`text-center text-3xl font-bold ${signUp ? 'translate-y-52 text-transparent' : 'text-shadow-glow translate-y-0 text-white'} transition-all ease-in-out duration-150`}>
                        <CirclePlus className="mx-auto mb-3 text-shadow-glow" size={40} />
                        <p>New User</p>
                    </div>
                    <p onClick={() => Navigate('/Register')} className={`hover:text-4xl w-fit mx-auto hover:cursor-pointer text-center relative -top-16 text-3xl font-bold ${!signUp ? '-translate-y-52 text-transparent' : 'text-shadow-glow translate-y-0 text-white'} transition-all ease-in-out duration-150`}>Sign Up</p>
                </div>
                <div className={`w-[48%] max-w-[360px] h-[400px] shadow-lg shadow-teal-400 content-center duration-1000 ease-linear backdrop-blur-[20px] transition-all ${drop} rounded-lg`} onMouseEnter={() => setLogin(true)} onMouseLeave={() => setLogin(false)}>
                    <div className={`text-center text-3xl font-bold ${login ? 'translate-y-52 text-transparent' : 'text-shadow-glow translate-y-0 text-white'} transition-all ease-in-out duration-150`}>
                        <DoorOpen className="mx-auto mb-3" size={40} />
                        <p>Exiting User</p>
                    </div>
                    <p onClick={() => Navigate('/Login')} className={`hover:text-4xl w-fit mx-auto hover:cursor-pointer text-center relative -top-16 text-3xl font-bold ${!login ? '-translate-y-52 text-transparent' : 'text-shadow-glow translate-y-0 text-white'} transition-all ease-in-out duration-150`}>Log In</p>
                </div>
            </div>
        </div>
    )
}