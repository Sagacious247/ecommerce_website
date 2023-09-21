import React, { useState } from 'react';
import styles from './auth.module.scss'
import resetImg from '../../assets/forgot.png'
import { Link } from 'react-router-dom';
import { Card } from '../../components';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';

function Reset() {
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const resetPassword = async(e) => {
        e.preventDefault()

        setIsLoading(true)

        try{
            await sendPasswordResetEmail(auth, email)
            toast.success("Check your email for a reset link")
            setIsLoading(false)
        }catch(error){
            toast.error(error.message)
            setIsLoading(false)
        }
        
    }

    return (
        <>
        {isLoading && <Loader/>}
        <section className={`container ${styles.auth}`}>
            <div className={styles.img}>
             <img src={resetImg} alt='login' width="400px"/>
            </div>
            <div className={styles.form}>
                <Card>
                 <h2>Login</h2>
                <form onSubmit={resetPassword}>
                    <input 
                    type='text' 
                    placeholder='Email' 
                    id='email'
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    <button 
                    type='submit'
                    className='--btn --btn-primary --btn-block'
                    >Reset Passsword
                    </button>
                    <div className={styles.links}>
                        <p> <Link to="/login">- Login</Link></p>
                        <p> <Link to="/register">- Register</Link></p>
                    </div>
                   
                </form>
               
                    </Card>
            </div>
        </section>
    </>
    );
}

export default Reset;