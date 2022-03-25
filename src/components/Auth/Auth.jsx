import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

export default function Auth() {
    const [account, setaccount] = useState(true);

    function handleClick(){
        setaccount(!account);
    }
  return (
    
     <div className='loginContainer'>
            {account ? 
            <Login setAcc={handleClick}/>
            :
            <Register setAcc={handleClick} />
            }
    </div>
  )
}
