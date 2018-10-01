import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { ThemeProvider, injectGlobal } from 'styled-components';
import StyledApp from './styles/App.jsx';
import { theme } from './styles';
import {
  TopStories,
  NewStories,
  ShowStories,
  AskStories,
  JobsStories
} from './StoriesBuilder';
import Navigation from './components/Navigation.jsx';
import User from './components/User.jsx';
import Comments from './components/Comments.jsx';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <StyledApp>
        <Navigation />
        <Switch>
          <Route exact path="/" component={TopStories} />
          <Route path="/news/:ids*" component={TopStories} />
          <Route path="/newest/:ids*" component={NewStories} />
          <Route path="/show/:ids*" component={ShowStories} />
          <Route path="/ask/:ids*" component={AskStories} />
          <Route path="/jobs/:ids*" component={JobsStories} />
          <Route
            path="/user/:ids"
            render={props => <User {...props} name={'user'} title={'user'} />}
          />
          <Route
            path="/item/:ids"
            render={props => (
              <Comments {...props} name={'item'} title={'comment'} />
            )}
          />
          <Route render={() => <h1>Not found</h1>} />
        </Switch>
      </StyledApp>
    </ThemeProvider>
  );
};

App.propTypes = {
  match: PropTypes.object
};

injectGlobal`
  body {
    font-family: 'Roboto', 'sans-serif';
    margin: 0px;
  }
`;

export default App;
