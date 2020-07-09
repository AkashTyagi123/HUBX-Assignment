import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Topbar from './components/Topbar';
import AppNavbar from './components/AppNavbar';
import AllEvents from './components/AllEvents';
import Login from './components/Login';
import Signup from './components/Signup';

import { BrowserRouter, Route } from 'react-router-dom';
import EventListingForm from './components/EventListingForm';
import AuthErr from './components/AuthErr';

class App extends React.Component {

    state = {
        token: null
    };

    handleLogin(token) {
        this.setState({
            token: token
        });
    }

    handleLogout() {
        this.setState({
            token: null
        });
    }

    render() {
        return (
            <BrowserRouter>
                <>
                    <Topbar />
                    <AppNavbar token={this.state.token} handleLogout={this.handleLogout.bind(this)} />
                    {this.state.token === null ?
                        (
                            <>
                                <Route exact path="/" component={AllEvents} />
                                <Route exact path='/login' render={() => (
                                    <Login
                                        handleLogin={this.handleLogin.bind(this)}
                                    />
                                )}
                                />
                                <Route path="/signup" component={Signup} />
                                <Route path="/list-event" component={AuthErr} />
                            </>
                        ) :
                        (
                            <div>
                                <Route path="/list-event" component={EventListingForm} />
                            </div>
                        )
                    }

                </>

            </BrowserRouter>
        );
    }

}

export default App;
