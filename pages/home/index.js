import { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import UserContext from '../../context/userContext'
import { useCookies } from 'react-cookie'
import jwtParser from '../../utils/jwtParser'

export default function Home() {
    const context = useContext(UserContext)
    console.log('Home Context: ', context)
    const [cookies, setCookies] = useCookies(['name'])
    const [tasks, setTasks] = useState([])
    const [isLogIn, setLogIn] = useState(false)

    const handleUserTasks = async (token) => {
        const task = await fetch(`http://localhost:1337/tasks`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        const tasksResponse = await task.json();

        if (tasksResponse) {
            setTasks(tasksResponse)
            setLogIn(true)
            context.setLogIn(true)
        }
    }

    useEffect(() => {
        const jwtToken = cookies?.jwtToken;
        const userInfo = jwtToken && jwtParser(jwtToken)
        console.log(userInfo)

        if (userInfo) {
            handleUserTasks(jwtToken);
        }
        console.log(tasks)
    }, [])



    return (
        <div className={styles.container}>
            <main className="main">
                {context.isLogIn ? (
                    <div className={styles.cardContainer}>
                        {tasks && tasks.map((task => {
                            console.log(task)
                            return (
                                <div key={task.id} className={styles.card}>
                                    <h3 className={styles.title}>{task.name}</h3>
                                    <div className={styles.detailsContainer}>
                                        <button className={styles.detailsBtn}>
                                            <Link href={`/task/${task.id}`}>Details</Link>
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