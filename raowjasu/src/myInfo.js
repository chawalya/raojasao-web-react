import React, { Component } from 'react';
import './style.css';
import headpic from './img/header.jpg';
import {Link} from 'react-router';
import Footer from './footer';
import userpic from './img/user.png';
import InlineError from './inlineEr';

class myInfo extends Component {
    componentDidMount() {
        fetch('/username').then(res => res.json())   
        .then(user => {
            console.log(user)
          this.setState({
            User: user
          });
        });
      }
    constructor(){
        super();
        this.state = { 
            error:"",
            info:[],
            text:[],
            User: [],
            nameValue:"",
            userValue:"",
            name:"-",
            username:"-",
            phone:"-", 
            user_name:"555",
            pass_word:"666",    
        }
      }
    changeSelect = e =>{
        e = document.getElementById("name");
        var strn = e.options[e.selectedIndex].text;
        // var e = document.getElementById("phone");
        // var strphone = e.options[e.selectedIndex].text;
        e = document.getElementById("username");
        var stru = e.options[e.selectedIndex].text;
        this.setState({
            nameValue: strn,
            userValue: stru
        });
    };
    onClickLogin = () => {
        
      let afterSetStateSuceed = () => {
        console.log('before send:', this.state.user_name)
        fetch('/login', {
          body: JSON.stringify({usernames: this.state.user_name, passwords: this.state.pass_word})
        })
        .then(res => res.json())
        .then(users => {
          console.log(this.state.user_name);
          this.setState({
            text:users
          });
        })
        
      }
      this.setState({
            user_name: document.getElementById('user_n').value,
            pass_word: document.getElementById('pass_w').value,
      }, afterSetStateSuceed);
    };
  onClickSearchUser = () => {
        // console.log(this.state.nameValue)
        // console.log(this.state.userValue)
    fetch('/getuser', {
      method: 'post',
      headers: {
        "Accept":"application/json",
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify({nameValue: this.state.nameValue, userValue: this.state.userValue})
    })
    .then(res => res.json())
    .then(uuser => {
      this.setState({ 
        info:uuser,       
      })
        if(this.state.info.uuser.length===0){
            this.setState({
                error:'   Error',
                text:[]
            })
        }else{
            this.setState({
                error:'',
            })
        this.setState({
            text:this.state.info.uuser
        })
        }
  });
      }
      display = () => {
        return this.state.text.map(a =>(
          <tr>
            <td>{a.name}</td>
            <td>{a.username}</td>
            <td>{a.phone}</td>
          </tr> 
        ))
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
                    <li><Link to="/contact" visible ="false">Contact Advisors</Link></li>
                </ul>
                
                <br/>
                <div style={{marginBottom:"15px",padding:"4px 12px",backgroundColor:"#ddffdd",borderLeft:"10px solid #4CAF50"}}><t1>Please Login for admin</t1><br/>
                </div><form action="login" method="post">
                <center><fieldset><legend> Login </legend>
                    <img src={userpic} alt=""></img><br/>
                    <br/><label for="username">Your username: </label>
                    <input id="user_n" type="text" name="username" placeholder="username" width="300px;"/><br/>
                    <br/><label for="password">Your password: </label>
                    <input id="pass_w" type="password" name="password" placeholder="password" width="300px;"/><br/>
                    <button onClick={this.onClickLogin} class="button7" type="submit" value="Login">Login</button>
                    <br/>
                    
                    <Link to="/register">Register</Link>
                    
                </fieldset></center>
                </form>
                <br/>
                
                <div style={{marginBottom:"15px",padding:"4px 12px",backgroundColor:"#ddffdd",borderLeft:"10px solid #4CAF50"}}>
                <t1>Search for admin contacts</t1></div>
                <center>
                <div id="combobox">    
                    <div>
                    <t2>Select name</t2>            
                    <select id="name" onBlur={this.changeSelect}>  
                        <option></option>
                    {this.state.User.map(a => (
                        <option>{a.name}</option>             
                    ))}
                    </select>
                    </div>
                    <div>
                    <t2>Select username</t2>
                    <select id="username" onBlur={this.changeSelect}>
                        <option></option>
                    {this.state.User.map(a => (
                        <option>{a.username}</option>             
                    ))}
                    </select>
                    </div>
                    <br/>
                    <button onClick={this.onClickSearchUser} class="button5">Search</button>
                    <span>{this.state.error && <InlineError text={ 'Invalid User'}/>}</span>
                    <br/>             
                </div>
                </center>
                <table> 
                    <tr>
                        <td>Name</td>
                        <td>Username</td> 
                        <td>Phone</td>
                    </tr>
                    {this.display()}

                </table> 
            </div>
            <Footer/> 
            </body>
        );
    }

}
export default myInfo;