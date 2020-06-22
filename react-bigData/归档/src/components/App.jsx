import React,{Component,Fragment} from 'react';
import { Layout, Menu, Icon, Button, Avatar, Badge, Dropdown,Affix,Tooltip,message } from 'antd';
import '../dist/css/App.css'
import axios from 'axios'
import qs from 'querystring'
import store from '../redux/store'
import { userInfoAction } from '../redux/actionCreators'
import { Route, NavLink, Switch,Redirect,Link} from 'react-router-dom'
import Home from './pages/Home'
import ConnectSearch from './pages/ConnectSearch'
import ConnectManage from './pages/ConnectManage'
import WarningSearch from './pages/WarningSearch'
import WarningDeal from './pages/WarningDeal'
import WarningPropelling from './pages/WarningPropelling'
import AddUser from './pages/AddUser'
import SolutionSearch from './pages/SolutionSearch'
import Video from './pages/Video'
import Setting from './pages/Setting';
import PersonalPage from './pages/PersonalPage'
import aImg from '../dist/images/a.jpg'
import bImg from '../dist/images/b.jpg'
import cImg from '../dist/images/c.jpg'
import dImg from '../dist/images/d.jpg'
import eImg from '../dist/images/e.jpg'
import fImg from '../dist/images/f.jpg'
import gImg from '../dist/images/g.jpg'
import hImg from '../dist/images/h.jpg'
import iImg from '../dist/images/i.jpg'
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu
class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      collapsed: false,
      changeColor:false,
      defaultColor:aImg,
      userInfo: {},
      colorList:[
        { id: 1, img: aImg ,title: '海老茶' }, { id: 2, img: bImg,title:'紫绀' }, { id: 3, img: cImg,title:'路考茶' }, { id: 4, img: dImg,title:'浅苏芳' }, { id: 5, img: eImg,title:'新桥色' }, { id: 6, img: fImg,title:'牡丹色' }, { id: 7, img: gImg,title:'江湖紫' }, { id: 8, img: hImg ,title:'萱草色'}, { id: 9, img: iImg,title:'红绯' },
      ]
    }
    store.subscribe(() => {
      this.setState(store.getState())
    })
    
  }
  // 退出
  logout = () => {
    sessionStorage.removeItem('userKey')     //清除标志
    this.props.history.push('/login')
  }
  // 获取用户信息
  getUserMsg = () => {
    axios.post(window.base_url + '/Login/getUserMsgAPI', qs.stringify({
      username: sessionStorage.getItem('userKey')
    })).then(res => {
      const action = userInfoAction(res.data)
      store.dispatch(action)
      this.setState({
        userInfo: res.data
      })
    }).catch(err => {
      message.error('后台崩溃')
    })
  }
  //导航栏展开收缩
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }
  
  // 更改主题选择框
  changeColorBox = () => {
    if(this.refs.changeBox.style.top !== '0px'){
      this.refs.changeBox.style.top = 0
    }else{
      this.refs.changeBox.style.top = '-90px'
    } 
  }
  // 更改主题
  changeColor = (color) => {
    this.setState({
      defaultColor:color
    })
    this.changeColorBox()
  }
  componentDidMount() {
    this.getUserMsg()
  }
  componentWillMount() {
    // 判断用户是否登陆
    if (sessionStorage.getItem('userKey') === null) {
      this.props.history.push('/login')
    }
  }
  componentWillUnmount() {
    this.setState = () => {
      return
    }
  }
  
  render() {
    const { collapsed,colorList,defaultColor,userInfo} = this.state
    let content1,content2
    if(this.state.userInfo.permission === '2'){
      content1 = 
      <SubMenu key="system" title={<Fragment><Icon type="setting" /><span>系统设置</span></Fragment>}>
             <Menu.Item key="/system/setting">
      <NavLink to="/system/setting">权限管理</NavLink>
    </Menu.Item>
    <Menu.Item key="/system/adduser">
      <NavLink to="/system/adduser">添加用户</NavLink>
    </Menu.Item>
    <Menu.Item key="/system/personal">
      <NavLink to="/system/personal">个人信息</NavLink>
    </Menu.Item>
      </SubMenu>
      content2 = <SubMenu key="warning" title={<Fragment><Icon type="bell" /> <span>告警检测</span></Fragment>}>
      <Menu.Item key="/warning/search">
        <NavLink to="/warning/search">告警查询</NavLink>
      </Menu.Item>
      <Menu.Item key="/warning/deal">
        <NavLink to="/warning/deal">告警处理</NavLink>
      </Menu.Item>
      <Menu.Item key="/warning/propelling">
        <NavLink to="/warning/propelling">告警推送</NavLink>
      </Menu.Item>
    </SubMenu>
    }else {
      content1 = 
      <SubMenu key="system" title={<Fragment><Icon type="setting" /><span>系统设置</span></Fragment>}>
    <Menu.Item key="/system/personal">
      <NavLink to="/system/personal">个人信息</NavLink>
    </Menu.Item>
      </SubMenu>
      content2 = <SubMenu key="warning" title={<Fragment><Icon type="bell" /> <span>告警检测</span></Fragment>}>
      <Menu.Item key="/warning/search">
        <NavLink to="/warning/search">告警查询</NavLink>
      </Menu.Item>
      <Menu.Item key="/warning/deal">
        <NavLink to="/warning/deal">告警处理</NavLink>
      </Menu.Item>
    </SubMenu>
    }
    return (
      <Layout ref="layout" style={{ height: '100%', background: `url(${defaultColor}) 0% 0% / cover`}}>
        <div className="changeColorBox" ref="changeBox">
            <ul>
              {colorList.map(item=>{
                return (
                  <li key={item.id}>
                    <Tooltip placement="bottom" title={<span>{item.title}</span>}>
                    <img src={item.img} alt="" onClick={this.changeColor.bind(this,item.img)} />
                    </Tooltip>
                  </li>
                )
              })
            }
            </ul>  
        </div>
        <Affix style={{position: 'fixed', top: '100px', right: '30px'}} onClick={this.changeColorBox} >
          <Tooltip placement="left" title={<span>更换主题</span>}>
            <div className="changeColor" >
              <Icon type="appstore" style={{ color: '#fff', fontSize: '30px' }}  />
            </div>
          </Tooltip>
        </Affix>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" >智能大数据监控系统</div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={[window.location.pathname]} defaultOpenKeys={[window.location.pathname.split('/')[1]]}>
            <Menu.Item key="/home">
              <NavLink to="/home">
              <Icon type="home" />
              <span>主页</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="/video">
              <NavLink to="/video">
              <Icon type="video-camera" />
              <span>设备监控</span>
              </NavLink>
            </Menu.Item>
            {content2}
            <Menu.Item key="/solutionSearch">
              <NavLink to="/solutionSearch">
              <Icon type="solution" />
              <span>事件查询</span>
              </NavLink>
            </Menu.Item>
            <SubMenu key="connect" title={<Fragment><Icon type="link" /><span>事件记录</span></Fragment>}>
              <Menu.Item key="/connect/search">
                <NavLink to="/connect/search">联动查询</NavLink>
              </Menu.Item>
              <Menu.Item key="/connect/manage">
                <NavLink to="/connect/manage">联动管理</NavLink>
              </Menu.Item>
            </SubMenu>

              {content1}

          </Menu>
        </Sider>
        <Layout style={{ background: `url(${defaultColor}) 0% 0% / cover`}}>
          <Header style={{ padding: 0,borderBottom:'1px solid rgba(255,255,255,0.2)' }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <Button type="primary">
                <Link to="/">
                    <Icon type="left" />
                进入前台监控区
                </Link>
            </Button>
            <div className="user">
              <span style={{ marginRight: 8 }}>
                <Badge count={1}><Avatar src={userInfo.photo} /></Badge>
              </span>
              <Dropdown overlay={
                <Menu>
                  <Menu.Item key="1">
                    <Link to="/system/personal">个人信息</Link>
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item key="2" onClick={this.logout}>退出</Menu.Item>
                </Menu>
              } trigger={['click']}>
                <span className="ant-dropdown-link myDrop">
                  {userInfo.username} <Icon type="down" />
                </span>
              </Dropdown>
            </div>
          </Header>
          <Content
            style={{
              margin: '5px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
              <Switch>
                <Route path="/home" component={Home} />
                <Route path="/video" component={Video} />
                <Route path="/connect/search" component={ConnectSearch} />
                <Route path="/connect/manage" component={ConnectManage} />
                <Route path="/warning/search" component={WarningSearch} />
                <Route path="/warning/deal" component={WarningDeal} />
                <Route path="/warning/propelling" component={WarningPropelling} />
                <Route path="/solutionSearch" component={SolutionSearch} />
                <Route path="/system/setting" component={Setting} />
                <Route path="/system/personal" component={PersonalPage} />
                <Route path="/system/adduser" component={AddUser} />
                <Redirect to="/home" />
              </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default App;
