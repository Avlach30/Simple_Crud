import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'
import {
    Home,
    About
} from './view/index'
import Crud from './crud/crud'

//function component
export default function Main() {
    return (
        <Router>
            <div>
                <div className="nav">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/crud">Crud App</Link></li>
                        <li><Link to="/about">About</Link></li>
                    </ul>
                </div>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/crud">
                        <Crud />
                    </Route>
                    <Route path="/about">
                        <About />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}