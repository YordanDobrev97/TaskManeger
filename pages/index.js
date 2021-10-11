import { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/authContext'
import { useCookies } from 'react-cookie'

import { BrowserRouter as Router, Route, Switch, useRouteMatch } from 'react-router-dom'
import Home from './home/index'
import CreateTask from './task/create'
import DetailTask from './task/[taskId]'

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/task/create' component={CreateTask} />
        <Route path='/task/:taskId' component={DetailTask}>
        </Route>
      </Switch>
    </Router>
  )
}