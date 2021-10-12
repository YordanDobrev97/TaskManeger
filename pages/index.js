import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './home/index'
import CreateTask from './task/create'
import DetailTask from './task/[taskId]'
import Login from './login/index'
import SignUp from './signUp/index'

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signUp' component={SignUp} />
        <Route path='/task/create' component={CreateTask} />
        <Route path='/task/:taskId' component={DetailTask}>
        </Route>
      </Switch>
    </Router>
  )
}