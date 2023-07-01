import React,{useEffect,createContext,useReducer,useContext } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter,Route, Switch, useHistory} from 'react-router-dom'

import Home from './components/screens/Home';
import Signup from './components/screens/Signup';
import Login from './components/screens/Login';
import Profile from './components/screens/Profile';
import CreatePost from './components/screens/CreatePost';
import {intialState,reducer} from './reducer/userReducer'
import UserProfile from './components/screens/UserProfile';
import SubscribesPosts from './components/screens/SubscribeUserPosts'
 export const UserContext = createContext()

const Routing =  ()=>{
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user)
    {
      dispatch({type:"USER",payload:user})
      history.push('/')
    }
    else{
      history.push('/login')
    }
  },[])
  return(
   <Switch>
     <Route exact path="/">
         <Home/>
      </Route>
      <Route exact path="/signup">
        <Signup/>
      </Route>
      <Route exact path="/login">
        <Login/>
      </Route>
      <Route exact path="/profile">
        <Profile/>
      </Route>
      <Route path="/profile/:userid">
        <UserProfile/>
      </Route>
      <Route path="/create">
        <CreatePost/>
      </Route>
      <Route path="/myfollowingposts">
        <SubscribesPosts/>
      </Route>
   </Switch>
  )
}
function App() {
  const [state,dispatch] = useReducer(reducer,intialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <Navbar/>
      <Routing/>
      

    </BrowserRouter>

    </UserContext.Provider>
  );
}

export default App;
