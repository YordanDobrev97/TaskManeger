import styles from './style.module.css'

const Details = ({ pid, task }) => {
    return (
        <div className={styles.detailContainer}>
            <h2 className={styles.titleTask}>{task?.name}</h2>
            <p className={styles.xp}>XP: {task?.xp}</p>
            <p className={styles.taskDescription}>{task?.description}</p>
        </div>
    )
}

export async function getStaticPaths() {
    return { paths: [], fallback: true };
}

export async function getStaticProps({ params }) {
    const { pid } = params;

    try {
        const task = await fetch(`http://localhost:1337/tasks/${pid}`, {
            method: "GET",
        })

        const taskResponse = await task.json();
        console.log(taskResponse)
        return {
            props: {
                pid,
                task: {
                    name: taskResponse.name,
                    description: taskResponse.description,
                    xp: taskResponse.xp
                }
            },
            revalidate: 1,
        };
    } catch (error) {
        return {
            props: {
                task: {},
                pid,
            },
            revalidate: 1,
        };
    }
}

export default Details;