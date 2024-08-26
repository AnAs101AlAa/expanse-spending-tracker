import {Lock, Unlock} from "lucide-react";
import propTypes from 'prop-types';

function TextFormInput(props) {
    return(
    <div className="relative my-3 select-none">
        {props.icon}
        <input value={props.value} onChange={(e) => props.setValue(e.target.value)} type="text" className="rounded-full border transition-colors ease-in-out duration-100 p-3 bg-transparent text-white opacity-100 border-transparent w-full mt-2 focus:border-teal-400 focus:outline-none placeholder:text-gray-300 hover:border-white" placeholder={props.placeholder}/>
    </div>
    );
}

function PasswordFormInput(props) {
    return(
    <div className="relative my-3 select-none">
        <div>{
            props.openPass ? <Lock className="absolute top-5 right-6 text-white" onClick={() => props.setOpenPass(false)}/> : <Unlock className="absolute top-5 right-6 text-white" onClick={() => props.setOpenPass(true)}/>
            }
        </div>
        <input onCopy={(e) => e.preventDefault()} onPaste={(e) => e.preventDefault()}value={props.value} onChange={(e) => props.setValue(e.target.value)} type={props.openPass ? "text" : "password"} className="rounded-full border transition-colors ease-in-out duration-100 p-3 bg-transparent text-white opacity-100 border-transparent w-full mt-2 focus:border-teal-400 focus:outline-none placeholder:text-gray-300 hover:border-white" placeholder={props.placeholder}/>
    </div>
    );
}

TextFormInput.propTypes = {
    icon: propTypes.element.isRequired,
    placeholder: propTypes.string.isRequired,
    value: propTypes.string.isRequired,
    setValue: propTypes.func.isRequired
};

PasswordFormInput.propTypes = {
    openPass: propTypes.bool.isRequired,
    setOpenPass: propTypes.func.isRequired,
    value: propTypes.string.isRequired,
    setValue: propTypes.func.isRequired,
    placeholder: propTypes.string.isRequired
};

export { TextFormInput, PasswordFormInput };