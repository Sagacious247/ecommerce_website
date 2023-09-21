import React, { useState } from 'react';
import styles from './auth.module.scss'
import loginImg from '../../assets/login.png'
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import { Card } from '../../components';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';
import { useSelector } from 'react-redux';
import { selectPreviousURL } from '../../redux/slice/cartSlice';

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const previousURL = useSelector(selectPreviousURL)

    const redirectUser = () => {
        if(previousURL.includes("cart")) {
            return navigate("/cart")
        } else {
            navigate("/")
        }
    }

    const loginUser = async(e) => {
        e.preventDefault()

        setIsLoading(true)
        try{
          const userCredential = await signInWithEmailAndPassword(auth, email, password)
          const user = userCredential.user
          setIsLoading(false)
          toast.success("Welcome to Dubbeez_Ventures_Limited.")
          redirectUser()

        }catch(error) {
          toast.error(error.message)
          setIsLoading(false)
        }
    }

    const provider = new GoogleAuthProvider()
    const signInWithGoogle = async() => {
       
        try{
            const result = await signInWithPopup(auth, provider)
            const user = result.user
            toast.success("Welcome to Dubbeez_Ventures_Limited.")
            redirectUser()
        }catch(error) {
           toast.error(error.message)
        }
      
    }

    return (
        <>
        {isLoading && <Loader/>}
        <section className={`container ${styles.auth}`}>
            <div className={styles.img}>
             <img src={loginImg} alt='login' width="400px"/>
            </div>
            <div className={styles.form}>
                <Card>
                 <h2>Login</h2>
                <form onSubmit={loginUser}>
                    <input
                     type='text' 
                     placeholder='Email' 
                     required 
                     id='email'
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
                    <button
                    type='submit'
                     className='--btn --btn-primary --btn-block'>
                        Login
                    </button>
                    <div className={styles.links}>
                        <Link to="/reset">Reset Password</Link>
                    </div>
                    <p>-- or --</p>
                </form>
                <button 
                className='--btn --btn-danger --btn-block'
                 onClick={signInWithGoogle}
                >
                    <FaGoogle color='#fff'/> Login With Google
                    </button>
                    <span className={styles.register}>
                        <p>Don't have an account? <Link to="/register">Register</Link></p>
                    </span>
                    </Card>
            </div>
        </section>
    </>
    );
}

export default Login;