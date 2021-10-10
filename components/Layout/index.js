import { useState, useContext, useEffect } from 'react'
import Link from 'next/link'
import styles from './style.module.css'
import UserContext from '../../context/userContext'
import { useCookies } from 'react-cookie'

export default function Layout({ children }) {
    const context = useContext(UserContext)
    console.log(context)
    const [isLogIn, setLogIn] = useState(false)

    const [cookies, setCookies, removeCookie] = useCookies(['name'])

    useEffect(() => {
        const jtw = cookies?.jwtToken;

        if (jtw) {
            setLogIn(true)
        }
    }, [])

    const logout = () => {
        removeCookie('jwtToken');
        context.setLogIn(false)
    }

    return (
        <div>
            <header className={styles.header}>
                <h1 className={styles.headerTitle}>
                    <Link href='/'>Task Manager</Link>
                </h1>

                {context?.isLogIn ? (
                    <div>
                        <button className={styles.taskBtn}>
                            <Link href='/task/create'>Add Task</Link>
                        </button>

                        <button onClick={logout} className={styles.logout}>Logout</button>
                    </div>
                ) : (
                    <ul className={styles.nav}>
                        <li className={styles.navItem}>
                            <Link href='/login'>Login</Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link href='/signUp'>Sign up</Link>
                        </li>
                    </ul>
                )}

            </header>

            {children}
        </div>
    )
}