import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import AdMini from './components/Ads/Ad.mini';
import Opins from './components/Opins/Opin.list';
import OpinMini from './components/Opins/Opin.mini';
import OpinDetails from './components/Opins/Opin.details';
import routes from './routes';

import './App.css';
import './index.css';

const App: React.FC<any> = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    {/* <Route exact path={ routes['ad-details'] } component={ AdDetails } /> */}
                    <Route exact path={ routes['ad-mini'] } component={ AdMini } />
                    <Route exact path={ routes.home } component={ Opins } />
                    <Route exact path={ routes.details } component={ OpinDetails } />
                    <Route exact path={ routes.mini } component={ OpinMini } />
                    <Route render={() => '404!'} />
                </Switch>
            </BrowserRouter>
        </div>
    );
};

export default App;
