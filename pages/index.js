import { useContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AuthContext from '../context/authContext'
import { useCookies } from 'react-cookie'
import SignUp from './signUp/index'
import Login from './login/index'
import NewTask from './task/create'
import DetailTask from './task/[pid]'
import HomePage from './home/index'
import Navbar from '../components/Navbar'

export default function App() {
  return (
    <Router>
      <Switch>
        {/* <Route path='/signUp' component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path='/task/:pid' component={DetailTask} />
        <Route path="/task/create" component={NewTask} /> */}
        <Route exact={true} path="/" component={HomePage} />
      </Switch>
    </Router>
  )
}
