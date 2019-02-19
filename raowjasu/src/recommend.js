import React, { Component } from 'react';
import './style.css';
import headpic from './img/header.jpg';
import {Link} from 'react-router';
import Footer from './footer';
import InlineError from './inlineEr';
import Validator from 'validator';
class Recommend extends Component {
  componentDidMount() {
    fetch('/com-sci')
    .then(res => res.json())
    .then(course => {
      this.setState({list: course, Comsci: course});
    });
    fetch('/general').then(res => res.json())
    .then(gencourse => {
      this.setState({
        General: gencourse
      });
    });
    fetch('/summer').then(res => res.json())
    .then(sumcourse => {
      this.setState({
        Summer: sumcourse
      });
    });
  } 

  constructor(){
    super();
    this.state = { 
      info:[],
      cnt:"",
      textErr:"",
      list : [],
      Comsci: [],
      General: [],
      Summer: [],
      text: '',
      error1:"",
      error2:"",
      error3:"",
      error4:"",
      error5:"",
      error6:"",
      error7:"",
      code:"",
      name:"",
      credit:"",
      codeU:"",
      nameU:"",
      creditU:"",
      selectedOption2: "radio4",
      selectedOption: "radio1",
      selectedOption3: "radio7"  
        }
  }
  handleChangeRadio2=(e)=>{
    this.setState({
      selectedOption2: e.target.value
    });
  }
  handleChangeRadio=(e)=>{
    this.setState({
      selectedOption: e.target.value
    });
    if(e.target.value === 'radio1'){
        this.setState({
          list:this.state.Comsci
        });
    }else if(e.target.value === 'radio2'){
      this.setState({
        list:this.state.General
      });
    }else if(e.target.value === 'radio3'){
      this.setState({
        list:this.state.Summer
      });
    }
  }
  handleChangeRadio3=(e)=>{
    this.setState({
      selectedOption3: e.target.value
    });}
  changeCode = e =>{
    let c = e.target.name;
    if(c === 'code'){
      this.setState({
        code:e.target.value
      });    
    }else if (c === 'codeU') {
      this.setState({
        codeU:e.target.value
      });
    }   
    // console.log(e.target.value)
    if (!Validator.matches(e.target.value, /\b[a-z]{2}[0-9]{3}$/)){
      this.setState({
      error1:'   Error!!'
      })
    }else{
      // console.log('true')
      this.setState({
        error1:''
        })
    }
  };
   changeName = e =>{
    let c = e.target.name;
    if(c === 'name'){
      this.setState({
        name:e.target.value
      });
    }else if (c === 'nameU') {
      this.setState({
        nameU:e.target.value
      });
    }
    // console.log(e.target.value)
    if (!Validator.matches(e.target.value, /\b[a-zA-Z0-9]+$/)){
      this.setState({
      error2:'   Error!!'
      })
    }else{
      console.log('true')
      this.setState({
        error2:''
        })
    }
   };
  changeCredit = e =>{
    let c = e.target.name;
    if(c === 'credit'){
      this.setState({
        credit:e.target.value
      });
    }else if (c === 'creditU') {
      this.setState({
        creditU:e.target.value
      });
    }
    console.log(e.target.value)
    if (!Validator.matches(e.target.value, /\b[1-3]{1}$/)){
      this.setState({
      error3:'   Error!!'
      })
    }else{
      console.log('true')
      this.setState({
        error3:''
        })
    }
  };
  onClickInsertCourse = ()=>{
    if(!Validator.matches(this.state.code, /\b[a-z]{2}[0-9]{3}$/)){return;} 
    if(!Validator.matches(this.state.name, /\b[a-zA-Z0-9]+$/)){return;}
    if(!Validator.matches(this.state.credit, /\b[1-3]{1}$/)){return;}
    fetch('/insert', {
      method: 'post',
      headers: {
        "Accept":"application/json",
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify({code: this.state.code,name:this.state.name,credit:this.state.credit,selectedOption2:this.state.selectedOption2})
    })
    .then(res => res.json())
    fetch('/com-sci')
    .then(res => res.json())
    .then(course => {
      this.setState({
        Comsci: course
      });
    });
    fetch('/general').then(res => res.json())
    .then(gencourse => {
      this.setState({
        General: gencourse
      });
    });
    fetch('/summer').then(res => res.json())
    .then(sumcourse => {
      this.setState({
        Summer: sumcourse
      });
    })
    .then(
      alert("INSERT COURSE SUCCESS !!"),
      window.location.reload()
    )
  };
  onClickremove = () =>{ 
    if(!Validator.matches(this.state.code, /\b[a-zA-Z]{2}[0-9]{3}$/)){return;} 
    if(!Validator.matches(this.state.name, /\b[a-zA-Z0-9]+$/)){return;}
    if(!Validator.matches(this.state.credit, /\b[1-3]{1}$/)){return;}
    if(this.state.selectedOption2==='radio4'){
      fetch('/getcom', {
        method: 'post',
        headers: {
          "Accept":"application/json",
          "Content-Type": "application/json"
        }, 
        body: JSON.stringify({codeValue:this.state.code, coursenameValue:this.state.name, creditValue:this.state.credit})
      })
      .then(res => res.json())
      .then(tablecs => { 
        this.setState({ 
          info:tablecs,   
        });
        if(this.state.info.tablecs.length===0 ){
          console.log("item not found !!")
          this.clearTextRepage("F"); 
        }
        if(this.state.info.tablecs.length!==0){
          fetch('/remove', {
            method: 'delete',
            headers: {
              "Accept":"application/json",
              "Content-Type": "application/json"
            }, 
            body: JSON.stringify({code:this.state.code, coursename:this.state.name, credit:this.state.credit, selectedOption2:this.state.selectedOption2})
          })
          .then(
          this.clearTextRepage("T")
          )}
      });
    }
    if(this.state.selectedOption2==='radio5'){
      fetch('/getgen', {
        method: 'post',
        headers: {
          "Accept":"application/json",
          "Content-Type": "application/json"
        }, 
        body: JSON.stringify({codeValue:this.state.code, coursenameValue:this.state.name, creditValue:this.state.credit})
      })
      .then(res => res.json())
      .then(tablegen => { 
        this.setState({ 
          info:tablegen,   
        });
        if(this.state.info.tablegen.length===0){
          console.log("item not found !!")
          this.clearTextRepage("F"); 
        }
        if(this.state.info.tablegen.length!==0){
          fetch('/remove', {
            method: 'delete',
            headers: {
              "Accept":"application/json",
              "Content-Type": "application/json"
            }, 
            body: JSON.stringify({code:this.state.code, coursename:this.state.name, credit:this.state.credit, selectedOption2:this.state.selectedOption2})
          })
          .then(
          this.clearTextRepage("T")
          )}
      });
    }
    if(this.state.selectedOption2==='radio6'){
      fetch('/getsummer', {
        method: 'post',
        headers: {
          "Accept":"application/json",
          "Content-Type": "application/json"
        }, 
        body: JSON.stringify({codeValue:this.state.code, coursenameValue:this.state.name, creditValue:this.state.credit})
      })
      .then(res => res.json())
      .then(tablesum => { 
        this.setState({ 
          info:tablesum,   
        })
        if(this.state.info.tablesum.length===0){
          console.log("item not found !!")
          this.clearTextRepage("F");  
        }if(this.state.info.tablesum.length!==0){
          fetch('/remove', {
            method: 'delete',
          headers: {
            "Accept":"application/json",
            "Content-Type": "application/json"
          }, 
          body: JSON.stringify({code:this.state.code, coursename:this.state.name, credit:this.state.credit, selectedOption2:this.state.selectedOption2})
        })
        .then(
        this.clearTextRepage("T")
        )}
      })
    }
};
  
display = () => {
  return this.state.list.map(a => (
    <tr>
      <td>{a.code}</td>
      <td>{a.coursename}</td>
      <td>{a.credit}</td>
    </tr>
  ))};
  clearTextRepage = (TT) =>{
    document.getElementById("input1").value = ""
    document.getElementById("input2").value = ""
    document.getElementById("input3").value = ""
    if(TT==="T"){
      alert("REMOVE COURSE SUCCESS !!")
    }else if(TT==="F"){
      alert("CANNOT REMOVE, COURSE INVALID !!")
    }
    window.location.reload()
  };
  onClickUpdateCourse = () => {
    console.log('in onClickUpdateCourse');
    if(!Validator.matches(this.state.codeU, /\b[a-zA-Z]{2}[0-9]{3}$/)){return;}
    if(!Validator.matches(this.state.nameU, /\b[a-zA-Z0-9]+$/)){return;}
    if(!Validator.matches(this.state.creditU, /\b[1-3]{1}$/)){return;}
    if(this.state.code.length === 0){return;}
    fetch('/update', {
      method: 'post',
      headers: {
        "Accept":"application/json",
        "Content-Type": "application/json"
      },
      // body: JSON.stringify({code: this.state.code,codeU: this.state.codeU,nameU:this.state.nameU,creditU:this.state.creditU,selectedOption2:this.state.selectedOption2})
      body: JSON.stringify({code: this.state.code,codeU: this.state.codeU,nameU:this.state.nameU,creditU:this.state.creditU,selectedOption3:this.state.selectedOption3})
    }).then(res => res.json())
  
    fetch('/insert')
    .then(res => res.json())
    .then(course => {
      this.setState({
        Comsci: course
      });
    });
    fetch('/general').then(res => res.json())
    .then(gencourse => {
      this.setState({
        General: gencourse
      });
    });
    fetch('/summer').then(res => res.json())
    .then(sumcourse => {
      this.setState({
        Summer: sumcourse
      });
    })
  
    .then(
      alert("UPDATE COURSE SUCCESS !!"),
      window.location.reload()
    )
  };
  open
    render() {
        return (
          <body>
            <div >
              <img className="header"  src={headpic} alt=""></img>
            </div>
            <div className="divinbody">
              <ul className="topnav">
                <li><Link to="/myInfo">My Infomation</Link></li>
                <li><Link to="/status">Student Status</Link></li>
                <li><Link to="http://localhost:3000/" >Grade Calculation</Link></li>
                <li><Link to="/recommend" class="active">Course Recommend</Link></li>
                <li><Link to="/contact" >Contact Advisors</Link></li>
              </ul>
              <br/>
              <t1 class = "center"> Choose elective subject </t1>
             <div class="grid-container">
              <div><label class="container">com-sci
                <input type="radio" checked={this.state.selectedOption === 'radio1'}
                onChange={this.handleChangeRadio} value="radio1" name="type"/>
                <span class="checkmark"></span></label></div>
            
              <div><label class="container">General
                <input type="radio" checked={this.state.selectedOption === 'radio2'} 
                onChange={this.handleChangeRadio} value="radio2"name="type"/>
                <span class="checkmark"></span></label></div>
            
              <div><label class="container">summer
                <input type="radio" checked={this.state.selectedOption === 'radio3'} 
                onChange={this.handleChangeRadio} value="radio3"name="type"/>
                <span class="checkmark"></span></label></div>
            </div><br/>

             <t1 class = "center"> Courses Recommend </t1><div><br/></div>        
            <table id="myTable">
            <tr>
              <th>Course Code</th>
              <th>Course Title</th>
              <th>Credit</th>
            </tr>
            {/* {this.state.list.map(a => (
              <tr>
                <td>{a.code}</td>
                <td>{a.coursename}</td> 
                <td>{a.credit}</td>
              </tr>
            ))}  */}
            {  this.display()}
            </table><br/>

            <div style={{marginBottom:"15px",padding:"4px 12px",backgroundColor:"#ddffdd",borderLeft:"10px solid #4CAF50"}}>
            <t1>for System administrator</t1></div>
 
            <div style={{border: "1px solid #d6d6c2"}}>
            <br/><div><t1 >for insert and delete</t1><br/>
            <br/><div><br/><t1 style={{marginLeft: "3%"}}>Course Code</t1>
              <input  id="input1" onBlur={e =>this.changeCode(e)} type="text" name="code" placeholder="cs401" width="300px;" />
                <span>{this.state.error1 && <InlineError text={ 'Invalid Course Code'}/>}</span> <div> <br/></div></div>

            <div><t1 style={{marginLeft: "3%"}}>Course Name</t1>
              <input  id="input2" onBlur={e =>this.changeName(e)} type="text" name="name" placeholder="Special Projects 1" width="300px;" />
                <span>{this.state.error2 && <InlineError text={ 'Invalid Course Name'}/>}</span> <div> <br/></div></div>
                
                <div><t1 style={{marginLeft: "105px"}}>Credit</t1>
              <input id="input3" onBlur={e =>this.changeCredit(e)} type="text" name="credit" placeholder="3" width="300px;"  />
                <span>{this.state.error3 && <InlineError text={ 'Invalid Credit'}/>}</span> <div> <br/><br/></div></div>

                
                <t1 >Choose type subject</t1>
             <div class="grid-container">
              <div ><label class="container">com-sci
                <input type="radio" checked={this.state.selectedOption2 === 'radio4'}
                onChange={this.handleChangeRadio2} value="radio4" name="subj"/>
                <span class="checkmark"></span></label></div>
            
              <div><label class="container">General
                <input type="radio" checked={this.state.selectedOption2 === 'radio5'} 
                onChange={this.handleChangeRadio2} value="radio5"name="subj"/>
                <span class="checkmark"></span></label></div>
            
              <div><label class="container">summer
                <input type="radio" checked={this.state.selectedOption2 === 'radio6'} 
                onChange={this.handleChangeRadio2} value="radio6"name="subj"/>
                <span class="checkmark"></span></label></div>
                </div></div>

                <div style={{marginLeft: "40%"}}>
                <button onClick={this.onClickInsertCourse}  class="button5">Insert</button>
                <span><button  onClick={this.onClickremove} class="button5">Remove</button></span></div>
                </div><br/>
{/* -------------------------------------------------- */}
                <div><t1 >for Update</t1>
                <br/><div><br/><t1 style={{marginLeft: "3.5%"}}>Older Course Code</t1>
                <input  id="input1" onBlur={e =>this.changeCode(e)} type="text" name="code" placeholder="cs401" width="300px;" />
                <span>{this.state.error4 && <InlineError text={ 'Invalid Old Course Code'}/>}</span> <div></div></div>

                <div><br/><t1 style={{marginLeft: "3%"}}>Update Course Code</t1>
                  <input id="input4" onBlur={e =>this.changeCode(e)} type="text" name="codeU" placeholder="cs402" width="300px;" />
                    <span>{this.state.error5 && <InlineError text={ 'Invalid Update Course Code'}/>}</span> <div> <br/></div></div>

                <div><t1 style={{marginLeft: "3%"}}>Update Course Name</t1>
                  <input id="input5" onBlur={e =>this.changeName(e)} type="text" name="nameU" placeholder="Special Projects 1" width="300px;" />
                    <span>{this.state.error6 && <InlineError text={ 'Invalid Course Name'}/>}</span> <div> <br/></div></div>

                    <div><t1 style={{marginLeft: "105px"}}>Update Credit</t1>
                  <input id="input6" onBlur={e =>this.changeCredit(e)} type="text" name="creditU" placeholder="3" width="300px;" />
                    <span>{this.state.error7 && <InlineError text={ 'Invalid Credit'}/>}</span> <div> <br/></div></div>
                    </div>

                     <t1 >Choose type subject</t1>
             <div class="grid-container">
              <div ><label class="container">com-sci
                <input type="radio" checked={this.state.selectedOption3 === 'radio7'}
                onChange={this.handleChangeRadio3} value="radio7" name="subj"/>
                <span class="checkmark"></span></label></div>
            
              <div ><label class="container">General
                <input type="radio" checked={this.state.selectedOption3 === 'radio8'} 
                onChange={this.handleChangeRadio3} value="radio8"name="subj"/>
                <span class="checkmark"></span></label></div>
            
              <div><label class="container">summer
                <input type="radio" checked={this.state.selectedOption3 === 'radio9'} 
                onChange={this.handleChangeRadio3} value="radio9"name="subj"/>
                <span class="checkmark"></span></label></div>
                </div>
                <br/>
                    <div style={{marginLeft: "40%"}}>
                    <button onClick={this.onClickUpdateCourse} class="button5">Update</button>
                    </div>
                    

            </div><br/>
         <Footer></Footer>  
        </body>
              );
    }
}
export default Recommend;