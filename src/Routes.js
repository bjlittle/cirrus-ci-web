import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import CircularProgress from 'material-ui/CircularProgress';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import Header from './scenes/Header/Header';
import Loadable from 'react-loadable';

const LoadingComponent = ({isLoading, error}) => {
  if (isLoading) {
    return <CircularProgress/>;
  }
  else if (error) {
    // todo: make it prettier
    return <div>Sorry, there was a problem loading the page.</div>;
  }
  else {
    return null;
  }
};

const AsyncHome = Loadable({
  loader: () => import('./scenes/Home/Home'),
  loading: LoadingComponent
});

const AsyncBuild = Loadable({
  loader: () => import('./scenes/Build/Build'),
  loading: LoadingComponent
});

const AsyncTask = Loadable({
  loader: () => import('./scenes/Task/Task'),
  loading: LoadingComponent
});

const AsyncGitHub = Loadable({
  loader: () => import('./scenes/GitHub/GitHub'),
  loading: LoadingComponent
});

class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  render() {
    return (
      <BrowserRouter>
        <div>
          <Drawer docked={false}
                  open={this.state.open}
                  onRequestChange={(open) => this.setState({open})}>
            <MenuItem>Menu Item</MenuItem>
          </Drawer>
          <Header onIconButtonTouch={this.handleToggle}/>
          <Switch>
            <Route exact path="/" component={AsyncHome} props={this.props}/>
            <Route exact path="/builds/:buildId" component={AsyncBuild} props={this.props}/>
            <Route exact path="/tasks/:taskId" component={AsyncTask} props={this.props}/>
            <Route exact path="/github" component={AsyncGitHub} props={this.props}/>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default Routes;