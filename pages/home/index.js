import { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import AuthContext from '../../context/authContext'
import { useCookies } from 'react-cookie'
import jwtParser from '../../utils/jwtParser'
import { DATABASE_URL } from '../request'

export default function Home() {
    const context = useContext(AuthContext)
    const [cookies, setCookies] = useCookies(['name'])
    const [tasks, setTasks] = useState([])

    const handleUserTasks = async (token) => {
        const task = await fetch(`${DATABASE_URL}/tasks`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        const tasksResponse = await task.json();

        if (tasksResponse) {
            setTasks(tasksResponse)
        }
    }

    useEffect(() => {
        const jwtToken = cookies?.token;
        const userInfo = jwtToken && jwtParser(jwtToken)

        if (userInfo) {
            handleUserTasks(jwtToken);
            context.setUser(userInfo)
        }
    }, [])

    return (
        <div className={styles.container}>
            <main className="main">
                {context?.user ? (
                    <div className={styles.cardContainer}>
                        {tasks && tasks.map((task => {
                            return (
                                <div key={task.id} className={styles.card}>
                                    <h3 className={styles.title}>{task.name}</h3>
                                    <div className={styles.detailsContainer}>
                                        <button className={styles.detailsBtn}>
                                            <Link href={`/task/[taskId]`} as={`/task/${task.id}`}>Details</Link>
                                        </button>
                                    </div>
                                </div>
                            )
                        }))}
                    </div>
                ) : (
                    <div>
                        <h2 className={styles.mainTitle}>Task Manger App</h2>
                        <p className={styles.description}>Sign up and manage your tasks</p>
                    </div>
                )}
            </main>
        </div>
    )
}