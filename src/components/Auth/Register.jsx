import React,{useState} from 'react';
import { Person, Lock, Email } from "@material-ui/icons";

export default function Register(props) {
    const [warrning, setWrng] = useState("")
    const [data, setData]= useState({
        name : "",
        email : "",
        password : ""
    });

    function handleClick() {
        props.setAcc()
    }
    function handleChange(event){
        let {name, value } = event.target;
       setData((prev)=>{
           return {
               ...prev,
               [name] : value
           }
       });
    }

    function handleSubmit(event) {
        event.preventDefault();
        fetch("https://kepeer.deta.dev/register",
        {
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(data)
        })
        .then((res)=>{return res.json()})
        .then((data)=>{
            if(data.message === "Registred!")
                    props.setAcc()
        });
    }
  return (
    <form>
    <h1 className='loginHeading'>Signup!</h1>
    <div className='inputContainer'>
    <p className='wrngText'>HIII</p>
        <label className='lable' htmlFor="name"><Person /></label>
        <input className="input" onChange={handleChange} type="test" name="name" placeholder='Name' value={data.name}/>
    </div>
    <div className='inputContainer'>
        <label className='lable' htmlFor="email"><Email /></label>
        <input className="input"onChange={handleChange} type="email" name="email" placeholder='Email' value={data.email} />
    </div>
    <div className='inputContainer'>
        <label className='lable' htmlFor="password"><Lock /></label>
        <input className="input" onChange={handleChange} type="password" placeholder='password'value={data.password} name='password' />
    </div>
    <button onClick={handleSubmit} type='submit' className='LoginBtn'>Signup</button>

    <div className='orDiv'>Or</div>
    <p>Allready have account ? <button onClick={handleClick} className='special'> Login here </button></p>
</form>
  )
}
