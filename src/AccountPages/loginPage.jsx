import { User, LoaderCircle } from "lucide-react";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { TextFormInput, PasswordFormInput } from './inpututils';
import { useDispatch } from "react-redux";
import { setAccount } from "../Redux/Slices/accountSlice";
import { useNotification } from "../globalPopUps/notificationProvider";

function LoginForm() {
  const [openPass, setOpenPass] = useState(false);
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const Dispatch = useDispatch();
  const notification = useNotification();

  useEffect(() => {
    const loginHandler = async () => {
      if (!submitting)
        return;
      try {
        if (Username == "" || Password == "") {
          notification("Please fill all fields", 'e');
          return;
        }

        await axios.get(`http://localhost:3001/users?username=${Username}&password=${Password}`)
          .then((response) => {
            if (response.data.length == 0) {
              notification("Invalid username or password", 'e');
              return;
            }
            Dispatch(setAccount(response.data[0]));
            notification("Logged in successfully", 's');

            setTimeout(() => {
              navigate("/home");
            }, 2000);
          });
      }
      catch {
        notification("Failed to login, please try again", 'e');
      }
      finally {
        setSubmitting(false);
      }
    }
    loginHandler();
  }, [submitting]);

  return (
    <>
      <div className="w-1/2 max-w-[500px] h-full p-8 content-center backdrop-blur-md animate-shadowGlow rounded-lg">
        <h1 className="text-white font-bold text-center text-5xl mt-5 mb-12 select-none animate-textGlow">Login</h1>

        <TextFormInput icon={<User className="absolute top-5 right-6 text-white" />} placeholder="Username" value={Username} setValue={setUsername} />
        <PasswordFormInput openPass={openPass} setOpenPass={setOpenPass} value={Password} setValue={setPassword} placeholder="Password" />

        <div className='my-6 flex justify-between mx-2'>
          <label className="text-white">
            <input type="checkbox" className="mr-2" />
            Remember me
          </label>
          <div className="text-center text-white hover:underline">
            <a href="#">Forgot password?</a>
          </div>
        </div>

        <button onClick={() => setSubmitting(true)} className="bg-white hover:bg-teal-400 transition-colors ease-in-out duration-200 text-teal-600 hover:text-white font-bold p-4 rounded-full w-full mt-5">{submitting ? <LoaderCircle className="animate-spin mx-auto" /> : "Log In"}</button>
        <p className="text-center text-white mx-auto mt-6 hover:underline hover:cursor-pointer" onClick={() => navigate('/Register')}>Do not have an account? Create an account</p>
      </div>
    </>
  );
}

export default LoginForm;