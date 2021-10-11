import { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import AuthContext from '../context/authContext'
import { useCookies } from 'react-cookie'
import jwtParser from '../utils/jwtParser'
import { DATABASE_URL } from './request'
import { BrowserRouter as Router, Route, Switch, useRouteMatch } from 'react-router-dom'
import Home from './home/index'
import CreateTask from './task/create'
import DetailTask from './task/[taskId]'

export default function App() {
  const context = useContext(AuthContext)
  //const match = useRouteMatch()
  const [cookies, setCookies] = useCookies(['name'])

  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/task/create' component={CreateTask} />
        <Route path='/task/:taskId' component={(props) => {
          return <DetailTask id={props.match.params.id} />
        }}>
        </Route>
      </Switch>
    </Router>
  )
}

// export async function getServerSideProps(context) {
//   const task = await fetch(`${DATABASE_URL}/tasks`, {
//     method: "GET",
//   })

//   const tasksResponse = await task.json();

//   return {
//     props: {
//       tasks: tasksResponse
//     },
//   }
// }