import { useContext, useState } from 'react'
import formStyles from './style.module.css'
import AuthContext from '../../context/authContext'
import { useCookies } from 'react-cookie'

export default function CreateTask() {
    const context = useContext(AuthContext)
    const [cookies, _] = useCookies(['name'])
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [xp, setXp] = useState()

    console.log(context?.user.username)

    const createTaskHandler = async () => {
        const jwt = cookies?.jwtToken;

        const taskInfo = {
            name,
            description,
            xp,
            user: { username: context?.user.username }
        }

        const task = await fetch(`http://localhost:1337/tasks`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`
            },
            body: JSON.stringify(taskInfo)
        })

        const taskResponse = await task.json();
        console.log(taskResponse)
    }

    return (
        <div>
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
        </div>
    )
}