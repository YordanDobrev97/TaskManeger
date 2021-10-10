import { useContext } from 'react'
import getConfig from 'next/config'
import Router from 'next/router'
import { useState } from 'react'
import Navbar from '../../components/Layout'
import formStyles from '../../styles/form.module.css'
import { useCookies } from 'react-cookie'
import UserContext from '../../context/userContext'
import Layout from '../../components/Layout'

const { publicRuntimeConfig } = getConfig()

export default function SignUp() {
    const context = useContext(UserContext)

    const [email, setEmail] = useState()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [message, setMessage] = useState()
    const [cookies, setCookies] = useCookies(['name'])

    const signUpHandler = async () => {
        if (password !== confirmPassword) {
            setMessage('Passwords not match!')
            return;
        }

        const signUpInfo = {
            username: username,
            email: email,
            password: password,

        }

        const signUp = await fetch(`http://localhost:1337/auth/local/register`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signUpInfo)
        })

        const signUpResponse = await signUp.json();
        console.log(signUpResponse)

        if (signUpResponse?.user) {
            setCookies('jwtToken', signUpResponse.jwt)
            context.setLogIn(!context.isLogIn) // set that the user is logged in
            Router.push('/')
        }
    }

    return (
        <div>
            <Layout>
                {message && <p className={formStyles.notification}>{message}</p>}

                <div className={formStyles.container}>
                    <div>
                        <input onChange={(e) => setEmail(e.target.value)} className={formStyles.input} type="text" placeholder="Email" />
                    </div>

                    <div>
                        <input onChange={(e) => setUsername(e.target.value)} className={formStyles.input} type="text" placeholder="Username" />
                    </div>

                    <div>
                        <input onChange={(e) => setPassword(e.target.value)} className={formStyles.input} type="password" placeholder="Password" />
                    </div>

                    <div>
                        <input onChange={(e) => setConfirmPassword(e.target.value)} className={formStyles.input} type="password" placeholder="Confirm Password" />
                    </div>

                    <div className={formStyles.containerBtn}>
                        <button onClick={signUpHandler} className={formStyles.formBtn}>Sign Up</button>
                    </div>
                </div>
            </Layout>
        </div>
    )
}