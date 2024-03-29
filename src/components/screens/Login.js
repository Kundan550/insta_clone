import React,{useState,useContext} from "react";
import {UserContext} from '../../App'
import { useHistory,Link } from "react-router-dom";
import M from 'materialize-css'
const Login = ()=>{

    const {state,dispatch} = useContext(UserContext)
  const history = useHistory()
    
    const [email,setemail] = useState("")
    const [password,setpassword] = useState("")

    const PostData =()=>{
        fetch("/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                
                password,
                email,
                
            })
        })
        .then(data=>{
            console.log(data)
            if(data.error)
            {
                M.toast({html: data.error,classes:"#d32f2f red darken-2"})
            }
            else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                M.toast({html:"signedin success",classes:"#43a047 green darken-1"})
                history.push('/')
            }
            
        }).catch(err=>{
            console.log(err)
        })
    }

    return(
       <div className="mycard">
         <div className="card auth-card .input-field">
        <h2>Instagram</h2>
        <input type="text" placeholder="email" 
        value={email}
        onChange={(e)=>setemail(e.target.value)}
        />
        <input type="password" placeholder="password"
        value={password}
        onChange={(e)=>setpassword(e.target.value)}
        />

        <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={()=>PostData()}>
         Login
        </button>
        <h5>
            <Link to="/signup">Dont have an account ?</Link>
        </h5>
       </div>
       </div>
    )
}
export default Login;
