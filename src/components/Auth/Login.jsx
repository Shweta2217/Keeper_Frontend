import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Email, Lock } from "@material-ui/icons";

export default function Login(props) {
    const [warrning, setWrng] = useState()
    const History = useHistory();
    const dispatch = useDispatch();
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    function handleClick(params) {
        props.setAcc();
    }
    function handleChange(event) {
        let { name, value } = event.target;
        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        });
        setWrng("")
    }
    function handleSubmit(event) {
        event.preventDefault();
        fetch("https://kepeer.deta.dev/login",
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then((res) => { return res.json() })
            .then((data) => {
                if (data) {
                    if (data.token) {
                        window.localStorage.setItem("Token", data.token);
                        dispatch({ type: 'LoggedIn' });
                        History.replace('/keep');
                    }
                    else {
                        setWrng(data.message);
                        console.log(data.message);
                    }
                }

            });
    }
    return (
        <form>
            <h1 className='loginHeading'>Login!</h1>
            <p className='wrngText'>{warrning ? warrning : ""}</p>
            <div className='inputContainer'>
                <label className='lable' htmlFor="email"><Email /></label>
                <input onChange={handleChange} value={data.email} placeholder="Email" className="input" type="email" name="email" />
            </div>
            <div className='inputContainer'>
                <label className='lable' htmlFor="password"><Lock /></label>
                <input onChange={handleChange} value={data.password} placeholder="Password" className="input" type="password" name='password' />
            </div>
            <button type='submit' onClick={handleSubmit} className='LoginBtn'>Login</button>

            <div className='orDiv'>Or</div>
            <p>Don't have account ? <button onClick={handleClick} className='special'>Signup here</button></p>
        </form>
    )
}
