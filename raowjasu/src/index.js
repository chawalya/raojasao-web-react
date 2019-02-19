import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Router, Route, browserHistory} from 'react-router';
import Contact from './contact'; 
import Status from './status'; 
import Recommend from './recommend';
import Myinfo from './myInfo';
import Myinfologout from './myInfologout';
import Regis from './register';
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
//<App />, document.getElementById('root')
<Router history = {browserHistory}>
    <Route path="/" component={App}/>
    <Route path="/contact" component={Contact}/>
    <Route path="/status" component={Status}/>
    <Route path="/recommend" component={Recommend}/>
    <Route path="/myInfo" component={Myinfo}/>
    <Route path="/myInfologout" component={Myinfologout}/>
    <Route path="/register" component={Regis}/>
</Router>, document.getElementById('root')
);

