import React from 'react'
import ReactDOM from 'react-dom'

import 'antd/dist/antd.css'
import './dist/css/font.css'   //字体图标
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'
// 
import App from './components/App'
import Index from './components/pages/Index'
import Login from './components/pages/Login'
import './utils/Gobal'      //全局变量
ReactDOM.render(
    <Router>
      <Switch>
        <Route exact path="/" component={Index} />
        <Route path="/login" component={Login} />
        <Route path="/" component={App} />
      </Switch>
    </Router>
    , document.getElementById('root'));

