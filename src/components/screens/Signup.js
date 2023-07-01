import React ,{useEffect, useState}from "react";
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
const Signup = ()=>{
    const history = useHistory()
    const [name,setname] = useState("")
    const [email,setemail] = useState("")
    const [password,setpassword] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState(undefined)

    useEffect(()=>{
       if(url)
       {
        uploadFiles()
       }
    },[url])
    const uploadPic = () =>{
        const data = new FormData()
       data.append("file",image)
       data.append("upload_preset","insta_clone")
       data.append("cloud_name","doahw1qkf")
       fetch("https://api.cloudinary.com/v1_1/doahw1qkf/image/upload",{
           method:"post",
           body:data
       })
       .then(res=>res.json())
       .then(data=>{
          setUrl(data.url)
       })
       .catch(err=>{
           console.log(err)
       })
    }

    const uploadFiles = ()=>{
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email,
                pic:url
                
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error)
            {
                M.toast({html: data.error,classes:"#d32f2f red darken-2"})
            }
            else{
                M.toast({html: data.message,classes:"#43a047 green darken-1"})
                history.push('/login')
            }
            
        }).catch(err=>{
            console.log(err)
        })
    }
    const PostData =()=>{
       if(image)
       {
        uploadPic()
       }
       else{
        uploadFiles()
       }
    }
    return(
       <div className="mycard">
         <div className="card auth-card .input-field">

        <h2>Instagram</h2>

        <input type="text" 
        placeholder="name" 
        value={name}  
        onChange={(e)=>setname(e.target.value)}
        />

        <input type="text" 
        placeholder="email"
        value={email}  
        onChange={(e)=>setemail(e.target.value)}
         />
        <input type="password"
         placeholder="password" 
         value={password}  
        onChange={(e)=>setpassword(e.target.value)}
         />

          <div className="file-field input-field">
            <div className="btn #64b5f6 blue darken-1">
                <span>Uplaod Image</span>
                <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
            </div>

        <button className="btn waves-effect waves-light #64b5f6 blue lighten-2"   onClick={()=>PostData()}>Submit
         SignUp
        </button>
        <h5>
            <Link to="/login">Alredy have account ?</Link>
        </h5>
       </div>
       </div>
    )
}
export default Signup;