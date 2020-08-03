import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Home from './Home'
import SharedNote from './SharedNote/SharedNote'

class App extends React.Component{


    render(){
        return(
            <React.Fragment>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/:id" component={SharedNote} />
                    </Switch>
                </BrowserRouter>
            </React.Fragment>
        )
    }
}

export default App