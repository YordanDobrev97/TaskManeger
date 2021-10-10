import { useState, useContext } from 'react'
import Router from 'next/router'
import Navbar from '../../components/Navbar'
import formStyles from '../../styles/form.module.css'
import { useCookies } from 'react-cookie'
import AuthContext from '../../context/authContext'

export default function LoginPage() {
    const context = useContext(AuthContext)
    console.log(context)

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [cookies, setCookies] = useCookies(['name'])

    const loginHandler = async () => {
        const loginInfo = {
            identifier: username,
            password
        }

        const login = await fetch(`http://localhost:1337/auth/local`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginInfo)
        })

        const loginResponse = await login.json();
        console.log(loginResponse)

        if (loginResponse?.user) {
            setCookies('jwtToken', loginResponse.jwt)
            context?.setUser({ username, id: loginResponse.user.id })
            Router.push('/')
        }
    }

    return (
        <div>
            <div className={formStyles.container}>
                <div>
                    <input onChange={(e) => setUsername(e.target.value)} className={formStyles.input} type="text" placeholder="Username" />
                </div>

                <div>
                    <input onChange={(e) => setPassword(e.target.value)} className={formStyles.input} type="password" placeholder="Password" />
                </div>

                <div className={formStyles.containerBtn}>
                    <button onClick={loginHandler} className={formStyles.formBtn}>Login</button>
                </div>
            </div>
        </div>
    )
}