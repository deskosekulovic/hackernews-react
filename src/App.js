import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, Switch } from 'react-router-dom';
import StyledApp from './styles/App.jsx';
import Navigation from './components/Navigation.jsx';
import Main from './components/Main.jsx';
import User from './components/User.jsx';
import Comments from './components/Comments.jsx';


function stories(basePath, name) {
    return class Routes extends Component{
        render() {
            return <Main {...this.props} basePath={basePath} name={name}/>;
        }
    };
}

const New = stories('newest', 'newstories');
const Top = stories('news', 'topstories');
const Show = stories('show', 'showstories');
const Ask = stories('ask', 'askstories');
const Jobs = stories('jobs', 'jobstories');

const App = () => {
    return(
        <StyledApp>
            <Navigation />
            <Route exact
                path='/:ids'
                render={props=>
                    <Redirect
                        {...props}
                        to={`/${props.match.params.ids}/1`}
                    />}
            />
            <Switch>
                <Route exact path='/' component={Top} />
                <Route path='/news/:ids' component={Top} />
                <Route path='/newest/:ids' component={New} />
                <Route path='/show/:ids' component={Show} />
                <Route path='/ask/:ids' component={Ask} />
                <Route path='/jobs/:ids' component={Jobs} />
                <Route path='/user/:ids' render={props=><User {...props} name={'user'} title={'user'} />} />
                <Route path='/item/:ids' render={props=><Comments {...props} name={'item'} title={'comment'} />} />

                <Route render={() => (<h1>Not found</h1>)}/>
            </Switch>
        </StyledApp>
    );
};

App.propTypes = {
    match: PropTypes.object
};

export default App;
