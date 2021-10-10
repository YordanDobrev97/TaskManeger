import { useContext, useState } from 'react'
import Layout from '../../components/Layout'
import formStyles from './style.module.css'
import UserContext from '../../context/userContext'

export default function CreateTask() {
    const context = useContext(UserContext)
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [xp, setXp] = useState()

    const createTaskHandler = async () => {
        const taskInfo = {
            name,
            description,
            xp
        }

        const task = await fetch(`http://localhost:1337/tasks`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskInfo)
        })

        const taskResponse = await task.json();
        console.log(taskResponse)
    }

    return (
        <div>
            <Layout>
                <div className={formStyles.container}>
                    <div>
                        <input onChange={(e) => setName(e.target.value)} className={formStyles.input} type="text" placeholder="Name" />
                    </div>

                    <div>
                        <input onChange={(e) => setDescription(e.target.value)} className={formStyles.input} type="textarea" placeholder="Description" />
                    </div>

                    <div>
                        <input onChange={(e) => setXp(e.target.value)} className={formStyles.input} type="number" placeholder="XP" />
                    </div>

                    <div className={formStyles.containerBtn}>
                        <button onClick={createTaskHandler} className={formStyles.formBtn}>Create</button>
                    </div>
                </div>
            </Layout>
        </div>
    )
}