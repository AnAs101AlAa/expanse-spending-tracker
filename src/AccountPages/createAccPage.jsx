import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAccount } from '../Redux/Slices/accountSlice.jsx';
import { User, Mail, Ampersand, Ampersands, LoaderCircle } from 'lucide-react';
import { TextFormInput, PasswordFormInput } from './inpututils.jsx';
import { useNotification } from '../globalPopUps/notificationProvider.jsx';

function NewAccForm() {
  const [openPass, setOpenPass] = useState(false);
  const [openPass2, setOpenPass2] = useState(false);
  const [Username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const Dispatch = useDispatch();
  const notification = useNotification();

  useEffect(() => {
    const createAcc = async () => {
      if (!submitting)
        return;
      try {
        if (Username.length < 3 || Username.length > 20) {
          notification("Username must be between 3 and 20 characters", 'e');
          return;
        }
        if (Username.includes(' ') || Username.includes('@') || Username.includes('.')) {
          notification("Username cannot contain spaces or special characters", 'e');
          return;
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
        if (!passwordRegex.test(password)) {
          notification("Password must contain at least one uppercase letter, one lowercase letter and one number", 'e');
          return;
        }
        if (password !== confirmPassword) {
          notification("Passwords do not match", 'e');
          return;
        }
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
          notification("Please enter a valid email address", 'e');
          return;
        }
        const nameRegex = /^[^\s][^\d]+$/;
        if (firstName.length === 0 || lastName.length === 0) {
          notification("First and last name cannot be empty", 'e');
          return;
        }

        if (!nameRegex.test(firstName)) {
          notification("First name cannot contain numbers or spaces", 'e');
          return;
        }

        if (!nameRegex.test(lastName)) {
          notification("Last name cannot contain numbers or spaces", 'e');
          return;
        }

        const newUser = {
          username: Username,
          email: email,
          first_name: firstName,
          last_name: lastName,
          password: password
        };

        let fetchedUsers = [];

        await axios.get(`http://localhost:3001/users?username=${Username}`)
          .then((response) => {
            if (!response.statusText === 'OK') {
              fetchedUsers.push(response.data);
            }
          });

        if (fetchedUsers.length > 0) {
          notification("Username already exists", 'e');
          return
        }

        axios.post('http://localhost:3001/users', {
          username: newUser.username,
          email: newUser.email,
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          password: newUser.password
        })
          .then((response) => {
            if (!response.statusText === 'Created') {
              throw new Error('Network response was not ok');
            }
          });

        axios.post('http://localhost:3001/profiles', {
          id: newUser.username,
          balance: 0,
          history: [],
          events: []
        })
          .then((response) => {
            if (!response.statusText === 'Created') {
              throw new Error('Network response was not ok');
            }
          });
        Dispatch(setAccount(newUser));
        notification("Account created successfully", 's');

        setTimeout(() => {
          navigate('/Login');
        }, 2000);
      }
      catch {
        notification("Failed to create account, please try again", 'e');
      }
      finally {
        setSubmitting(false);
      }
    }
    createAcc();
  }, [submitting]);

  return (
    <>
      <div className="w-1/2 max-w-[500px] h-full p-8 content-center animate-shadowGlow backdrop-blur-md rounded-lg">
        <h1 className="text-white font-bold text-center text-3xl mt-5 mb-12 select-none animate-textGlow">Create An Account</h1>

        <TextFormInput icon={<User className="absolute top-5 right-6 text-white" />} placeholder="Username" value={Username} setValue={setUsername} />
        <TextFormInput icon={<Mail className="absolute top-5 right-6 text-white" />} placeholder="Email Address" value={email} setValue={setEmail} />
        <TextFormInput icon={<Ampersand className="absolute top-5 right-6 text-white" />} placeholder="First Name" value={firstName} setValue={setFirstName} />
        <TextFormInput icon={<Ampersands className="absolute top-5 right-6 text-white" />} placeholder="Last Name" value={lastName} setValue={setLastName} />
        <PasswordFormInput openPass={openPass} setOpenPass={setOpenPass} value={password} setValue={setPassword} placeholder="Password" />
        <PasswordFormInput openPass={openPass2} setOpenPass={setOpenPass2} value={confirmPassword} setValue={setConfirmPassword} placeholder="Confirm Password" />

        <button onClick={() => setSubmitting(true)} className="bg-white hover:bg-teal-400 transition-colors ease-in-out duration-200 text-teal-600 hover:text-white font-bold p-4 rounded-full w-full mt-5">{submitting ? <LoaderCircle className="animate-spin mx-auto" /> : "Create Account"}</button>
        <p className="text-center text-white mx-auto mt-6 hover:underline hover:cursor-pointer" onClick={() => navigate('/Login')}>Already have an account? Log in</p>
      </div>
    </>
  );
}

export default NewAccForm;