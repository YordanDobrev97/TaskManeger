import { useState, useContext, useEffect } from 'react'
import Link from 'next/link'
import styles from './style.module.css'
import AuthContext from '../../context/authContext'
import { useCookies } from 'react-cookie'

export default function Navbar() {
    const context = useContext(AuthContext)
    console.log(context)

    const [cookies, _, removeCookie] = useCookies(['name'])

    useEffect(() => {
        const jtw = cookies?.jwtToken;

        if (jtw) {
            //context?.setLogIn(true)
        }
    }, [])

    const logout = () => {
        removeCookie('jwtToken');
        //context.setLogIn(false)
    }

    return (

        <header className={styles.header}>
            <h1 className={styles.headerTitle}>
                <Link href='/'>Task Manager</Link>
            </h1>

            {context?.user ? (
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
    )
}