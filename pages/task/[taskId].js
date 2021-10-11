import styles from './style.module.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import DATABASE_URL from '../request'

const Details = () => {
    const router = useRouter()
    const taskId = router.query.taskId;
    const [task, setTask] = useState({})

    const handleTask = async () => {
        const task = await fetch(`${DATABASE_URL}/tasks/${taskId}`, {
            method: "GET",
        })

        const taskResponse = await task.json();
        return taskResponse;
    }
    useEffect(() => {
        handleTask()
            .then(detailTask => {
                setTask(detailTask)
            })
    }, [])

    return (
        <div className={styles.container}>
            <h2 className={styles.titleTask}>{task?.name}</h2>
            <p className={styles.xp}>XP: {task?.xp}</p>
            <p className={styles.taskDescription}>{task?.description}</p>
        </div>
    )
}

export default Details;