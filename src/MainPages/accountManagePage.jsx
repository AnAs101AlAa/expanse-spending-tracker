import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAccount } from '../Redux/Slices/accountSlice.jsx';
import {setId} from '../Redux/Slices/planerSlice.jsx';
import { useNotification } from '../globalPopUps/notificationProvider.jsx';
import { LoaderCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


export default function AccountManagePage() {
    const [Username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const Dispatch = useDispatch();
    const notification = useNotification();
    const accData = useSelector(state => state.Account);
    const planerData = useSelector(state => state.Planer);
    const [edit, setEdit] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        setUsername(accData.username);
        setEmail(accData.email);
        setFirstName(accData.first_name);
        setLastName(accData.last_name);
        setPassword(accData.password);
    }, [accData]);

    const validateInput = (e, i) => {
        const input = e.target.value.trim();
        const userRegex = /^[a-zA-Z0-9_]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const nameRegex = /^[^\s][^\d]+$/;
        switch (i) {
            case 1:
                if (!userRegex.test(input)) {
                    notification("Username can't contain spaces or special characters", "e")
                    return;
                }
                notification("username updated, submit to save changes", "s");
                setUsername(input);
                setEdit(0);
                e.target.value = ""
                break;
            case 2:
                if (!passwordRegex.test(input)) {
                    notification("Password must contain at least one uppercase letter, one lowercase letter and one number", 'e');
                    return;
                }
                notification("password updated, submit to save changes", "s");
                setPassword(input);
                setEdit(0);
                e.target.value = ""
                break;
            case 3:
                if (!emailRegex.test(input)) {
                    notification("Please enter a valid email address", 'e');
                    return;
                }
                notification("email updated, submit to save changes", "s");
                setEmail(input);
                setEdit(0);
                e.target.value = ""
                break;
            case 4:
                if (firstName.length === 0) {
                    notification("Name cannot be empty", 'e');
                    return;
                }
                if (!nameRegex.test(input)) {
                    notification("Name cannot contain numbers or spaces", 'e');
                    return;
                }
                notification("Name updated, submit to save changes", "s");
                setFirstName(input);
                setEdit(0);
                e.target.value = ""
                break;
            case 5:
                if (lastName.length === 0) {
                    notification("Name cannot be empty", 'e');
                    return;
                }
                if (!nameRegex.test(input)) {
                    notification("Name cannot contain numbers or spaces", 'e');
                    return;
                }
                notification("Name updated, submit to save changes", "s");
                setLastName(input);
                e.target.value = ""
                setEdit(0);
        }
    };

    const submitRequest = () => {
        setSubmitting(true);
        try {
            axios.patch(`http://localhost:3001/users/${accData.id}`, {
                username: Username,
                email: email,
                first_name: firstName,
                last_name: lastName,
                password: password
            });
            axios.delete(`http://localhost:3001/profiles/${accData.username}`);
            axios.post(`http://localhost:3001/profiles`, {
                id: Username,
                balance: planerData.balance,
                history: planerData.history,
                packages: planerData.packages
            });
            Dispatch(setAccount({
                username: Username,
                email: email,
                first_name: firstName,
                last_name: lastName,
                password: password
            }));
            Dispatch(setId({id: Username}));
            notification("Account updated successfully", "s");
            setTimeout(() => navigate("/home"), 2000);
        } catch {
            notification("An error occured while updating account", "e");
        }
        setSubmitting(false);
    };


    return (
        <div className='w-full h-full backdrop-blur-lg content-center'>
            <div className="bg-slate-800 mx-auto w-[40%] h-fit max-w-[800px] p-8 content-center animate-shadowGlow justify-center flex flex-col backdrop-blur-xl border-2 border-teal-500 rounded-lg">
                <h1 className="text-white font-bold text-center text-3xl mt-5 mb-12 select-none animate-textGlow">Account Settings</h1>
                <div className='flex gap-4 h-[80px] items-center justify-between px-4'>
                    <p className="text-white font-bold text-md text-shadow-glow">Username</p>
                    <input onBlur={(e) => validateInput(e, 1)} disabled={edit !== 1} className={`bg-slate-950 rounded-full transition-colors ease-in-out duration-100 p-3  w-2/3 text-white border-2 focus:border-teal-400 focus:outline-none placeholder:text-gray-300 ${edit == 1 ? "border-teal-600 animate-shadowGlow" : "border-white"}`} placeholder={Username} />
                    <button onClick={() => setEdit(1)} className='bg-teal-500 hover:bg-white transition-colors ease-in-out duration-200 text-white hover:text-teal-600 font-bold p-2 px-4 rounded-full'>Edit</button>
                </div>
                <div className='flex gap-4 h-[80px] items-center justify-between px-4'>
                    <p className="text-white font-bold text-md text-shadow-glow">Password</p>
                    <input onBlur={(e) => validateInput(e, 2)} disabled={edit !== 2} className={`bg-slate-950 rounded-full transition-colors ease-in-out duration-100 p-3  w-2/3 text-white border-2 focus:border-teal-400 focus:outline-none placeholder:text-gray-300 ${edit == 2 ? "border-teal-600 animate-shadowGlow" : "border-white"}`} placeholder={password} />
                    <button onClick={() => setEdit(2)} className='bg-teal-500 hover:bg-white transition-colors ease-in-out duration-200 text-white hover:text-teal-600 font-bold p-2 px-4 rounded-full'>Edit</button>
                </div>
                <div className='flex gap-4 h-[80px] items-center justify-between px-4'>
                    <p className="text-white font-bold text-md text-shadow-glow">Username</p>
                    <input onBlur={(e) => validateInput(e, 3)} disabled={edit !== 3} className={`bg-slate-950 rounded-full transition-colors ease-in-out duration-100 p-3  w-2/3 text-white border-2 focus:border-teal-400 focus:outline-none placeholder:text-gray-300 ${edit == 3 ? "border-teal-600 animate-shadowGlow" : "border-white"}`} placeholder={email} />
                    <button onClick={() => setEdit(3)} className='bg-teal-500 hover:bg-white transition-colors ease-in-out duration-200 text-white hover:text-teal-600 font-bold p-2 px-4 rounded-full'>Edit</button>
                </div>
                <div className='flex gap-4 h-[80px] items-center justify-between px-4'>
                    <p className="text-white font-bold text-md text-shadow-glow">Username</p>
                    <input onBlur={(e) => validateInput(e, 4)} disabled={edit !== 4} className={`bg-slate-950 rounded-full transition-colors ease-in-out duration-100 p-3 w-2/3 text-white border-2 focus:border-teal-400 focus:outline-none placeholder:text-gray-300 ${edit == 4 ? "border-teal-600 animate-shadowGlow" : "border-white"}`} placeholder={firstName} />
                    <button onClick={() => setEdit(4)} className='bg-teal-500 hover:bg-white transition-colors ease-in-out duration-200 text-white hover:text-teal-600 font-bold p-2 px-4 rounded-full'>Edit</button>
                </div>
                <div className='flex gap-4 h-[80px] items-center justify-between px-4'>
                    <p className="text-white font-bold text-md text-shadow-glow">Username</p>
                    <input onBlur={(e) => validateInput(e, 5)} disabled={edit !== 5} className={`bg-slate-950 rounded-full transition-colors ease-in-out duration-100 p-3  w-2/3 text-white border-2 focus:border-teal-400 focus:outline-none placeholder:text-gray-300 ${edit == 5 ? "border-teal-600 animate-shadowGlow" : "border-white"}`} placeholder={lastName} />
                    <button onClick={() => setEdit(5)} className='bg-teal-500 hover:bg-white transition-colors ease-in-out duration-200 text-white hover:text-teal-600 font-bold p-2 px-4 rounded-full'>Edit</button>
                </div>
                <button onClick={() => submitRequest()} className="bg-white hover:bg-teal-400 transition-colors ease-in-out duration-200 text-teal-600 hover:text-white font-bold p-4 rounded-full w-fit mx-auto mt-5">{submitting ? <LoaderCircle className="animate-spin mx-auto" /> : "Submit Changes"}</button>
            </div>
        </div>
    );
}