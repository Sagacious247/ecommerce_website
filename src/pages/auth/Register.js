import React, { useState } from 'react';
import styles from './auth.module.scss'
import registerImg from '../../assets/register.png'
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../../components';
import Loader from '../../components/loader/Loader';
import { toast } from 'react-toastify';
import { auth } from '../../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';

function Register() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cPassword, setCPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const registerUser = async(e) => {
        e.preventDefault()

        if(password !== cPassword) {
            toast.error("Password do not match")
        }
       setIsLoading(true)

    try{
       const userCredential = await createUserWithEmailAndPassword(auth, email, password)
           
            const user = userCredential.user;
           toast.success("Registration successful...")
           setIsLoading(false)
           navigate("/login")

    }catch(error) {
        toast.error(error.message)
        setIsLoading(false)
       };
    }
    return (
        <>
          {isLoading && <Loader/>}
        <section className={`container ${styles.auth}`}>
            <div className={styles.form}>
                <Card>
                 <h2>Register</h2>
                <form onSubmit={registerUser}>
                <input 
                    type='email' 
                    id='email'
                    placeholder='Email'
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                    type='password' 
                    placeholder='Password' 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    <input 
                    type='password' 
                    placeholder='Confirm Password' 
                    required
                    value={cPassword}
                    onChange={(e) => setCPassword(e.target.value)} />
                    <button 
                    type='submit' 
                    className='--btn --btn-primary --btn-block'>
                        Register
                   </button>
                   
                </form>
               
                    <span className={styles.register}>
                        <p>Already have an account? <Link to="/login">Login</Link></p>
                    </span>
                    </Card>
            </div>
            <div className={styles.img}>
             <img src={registerImg} alt='login' width="400px"/>
            </div>
        </section>
                    </>
    );
}

export default Register;