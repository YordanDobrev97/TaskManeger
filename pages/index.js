import { useContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Layout from '../components/Layout'
import UserContext from '../context/userContext'
import { useCookies } from 'react-cookie'
import SignUp from './signUp/index'
import Login from './login/index'
import NewTask from './task/create'
import DetailTask from './task/[pid]'
import HomePage from './home/index'

export default function App() {
  const [isLogIn, setLogIn] = useState(false);

  return (
    <UserContext.Provider value={{ isLogIn, setLogIn }}>
      <Router>
        <Layout>
          <Switch>
            <Route path='/task/:pid' component={DetailTask} />
            <Route path="/task/create" component={NewTask} />
            <Route path='/signUp' component={SignUp} />
            <Route path="/login" component={Login} />
            <Route exact={true} path="/" component={HomePage} />
          </Switch>
        </Layout>
      </Router>
    </UserContext.Provider>
  )
}
