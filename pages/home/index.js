import { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import AuthContext from '../../context/authContext'
import { useCookies } from 'react-cookie'
import jwtParser from '../../utils/jwtParser'
import DATABASE_URL from '../../utils/request'
import { faEye, faTrashAlt, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Home() {
    const itemsPerPage = 3;
    const context = useContext(AuthContext)
    const [cookies, setCookies] = useCookies(['name'])
    const [tasks, setTasks] = useState([])
    const [notification, setNotification] = useState('')
    const [currentCount, setCurrentCount] = useState(0)
    const [maxCount, setMaxCount] = useState(itemsPerPage)

    const handleUserTasks = async (token, id) => {
        const task = await fetch(`${DATABASE_URL}/tasks?_where[user]=${id}`, {
            headers: {
                "Authorization": `Bearer ` + token,
            },
        })

        const tasksResponse = await task.json();
        if (tasksResponse) {
            setTasks(tasksResponse)
        }
    }

    const deleteTask = async (e) => {
        const id = Number(e.target.value);
        if (id) {
            const task = await fetch(`${DATABASE_URL}/tasks/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ` + cookies?.token,
                },
            })

            await task.json();

            const tempTask = [...tasks]
            const resultArr = tempTask.filter(x => {
                return x.id !== id
            })

            setTasks(resultArr)
            setNotification('Тask has been removed')
            setTimeout(() => {
                setNotification('')
            }, 4000)
        }
    }

    useEffect(() => {
        const jwtToken = cookies?.token;
        const userInfo = jwtToken && jwtParser(jwtToken)

        if (userInfo) {
            handleUserTasks(jwtToken, userInfo.id);
            context.setUser(userInfo)
        }
    }, [])

    const prevHandler = (e) => {
        if (!(currentCount === 0 && maxCount === itemsPerPage)) {
            setCurrentCount(currentCount - itemsPerPage)
            setMaxCount(maxCount - itemsPerPage)
        }
    }

    const nextHandler = () => {
        if (maxCount < tasks.length) {
            setCurrentCount(maxCount)
            setMaxCount(maxCount + itemsPerPage)
        }
    }

    const currentItems = tasks.slice(currentCount, maxCount)

    return (
        <div className={styles.container}>
            <main className="main">
                {notification && <p className={styles.notification}>{notification}</p>}
                {context?.user ? (
                    tasks.length > 0 ? (
                        <div className={styles.cardContainer}>
                            {currentItems && currentItems.map((task => {
                                return (
                                    <div key={task.id} className={styles.card}>
                                        <h3 className={styles.title}>{task.name}</h3>
                                        <div className={styles.detailsContainer}>
                                            <button className={styles.taskBtn}>
                                                <Link href={`/task/[taskId]`} as={`/task/${task.id}`}>
                                                    <FontAwesomeIcon icon={faEye} />
                                                </Link>
                                            </button>

                                            <button value={task.id} onClick={deleteTask} className={styles.deleteBtn}>
                                                <FontAwesomeIcon icon={faTrashAlt} />
                                            </button>
                                        </div>
                                    </div>
                                )
                            }))}
                            <div className={styles.page}>
                                <button onClick={prevHandler} className={styles.prevBtn}>
                                    <FontAwesomeIcon icon={faArrowLeft} />
                                </button>
                                <button onClick={nextHandler} className={styles.nextBtn}>
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.message}>You currently have no tasks created</div>
                    )
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