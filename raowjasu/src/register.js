import React, { Component } from 'react';
import './style.css';
import headpic from './img/header.jpg';
import userregis from './img/userregis.png';
import {Link} from 'react-router';
import Footer from './footer';

class register extends Component {
    constructor(){
        super();
        this.state = {   
            name:"",
            phone:"",
            username:"",
            password:"",
            otp:"",
        }
      }
      onClickRegis = () =>{

        let afterSetStateSuceed = () => {
            console.log(this.state.otp);
          if(this.state.otp==='123456' && this.state.password===this.state.passwordRetype){
              console.log(this.state);
              console.log(this.state.name);
              console.log(this.state.phone);
              console.log(this.state.username);
              console.log(this.state.password);
              console.log(this.state.passwordRetype);
              console.log(JSON.stringify({names:this.state.name, phones:this.state.phone, usernames:this.state.username, passwords:this.state.password}))
              fetch('/regist', {
                method: 'POST',
                headers: {
                    "Accept":"application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({names:this.state.name, phones:this.state.phone, usernames:this.state.username, passwords:this.state.password})
            })
            .then(
                document.getElementById("r8").value = "",
                document.getElementById("r7").value = "",
                document.getElementById("r6").value = "",
                document.getElementById("r5").value = "",
                document.getElementById("r4").value = "",
                document.getElementById("otp").value = "",
                alert("REGISTER SUCCESS !!")  
            )  
          }else{
                if(this.state.otp!=='123456'){alert("OTP INVALID !!")}
                else if(this.state.password!==this.state.passwordRetype){alert("PASSWORD MISMATCH !!")}
          } 
        }
        this.setState({
            name: document.getElementById('r8').value,
            phone: document.getElementById('r7').value,
            username: document.getElementById('r6').value,
            password: document.getElementById('r5').value,
            passwordRetype: document.getElementById('r4').value,
            otp: document.getElementById('otp').value,
        }, afterSetStateSuceed);

    }

    render() {
        return (
            <body>
            <div><img class="header"  src={headpic} alt=""></img></div>
            <div class="divinbody"> 
                <ul class="topnav">
                    <li><Link to="/myInfo" class="active">My Infomation</Link></li>
                    <li><Link to="/status">Student Status</Link></li>
                    <li><Link to="http://localhost:3000/" >Grade Calculation</Link></li>
                    <li><Link to="/recommend">Course Recommend</Link></li>
                    <li><Link to="/contact">Contact Advisors</Link></li>
                </ul>
                
                <br/><div style={{marginBottom:"15px",padding:"4px 12px",backgroundColor:"#ddffdd",borderLeft:"10px solid #4CAF50"}}><t1>Please Register for admin</t1><br/>
                {/* <form action="login" method="post"> */}
                </div><center><fieldset><legend>Register:</legend>
                <div class="regisLogin">
                    <img src={userregis} alt=""></img><br/><br/>
                    <label id="r1">Your name : </label>
                    <input  id="r8" type="text" name="name" placeholder="name" width="300px;"/><br/>
                    <br/><label >Phone number : </label>
                    <input  id="r7" type="text" name="phone" placeholder="081-2345678" width="300px;"/><br/>
                    <br/><label id="r2">Your username : </label>
                    <input  id="r6" type="text" name="username" placeholder="username" width="300px;"/><br/>
                    <br/><label id="r3">Password : </label>
                    <input  id="r5" type="password" name="password" placeholder="password" width="300px;"/><br/>
                    <br/><label >Retype Password : </label>
                    <input id="r4" type="password" name="password2" placeholder="retype password" width="300px;"/><br/>
                    <br/><label >OTP number : </label>
                    <input id="otp" type="password" name="otp" placeholder="OTP NUMBER" width="300px;"/><br/>
                    <button onClick={this.onClickRegis} type="submit" class="button7">Register</button>
                    <br/>
                    
                    <Link to="/myInfo">Login</Link>
                </div>
                </fieldset></center>
            </div>
            <Footer/> 
            </body>
        );
    }

}
export default register;