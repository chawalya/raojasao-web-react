import React, { Component } from 'react';
import headpic from './img/header.jpg';
import './style.css';
import {Link} from 'react-router';
import Footer from './footer';
import Validator from 'validator';
import InlineError from './inlineEr';
class App extends Component {
  componentDidMount() {
    // fetch('/cs',{method:"post",body:{code:}})
    // .then(res => res.json())
    // .then(cscourse => {
    //   this.setState({info: cscourse});
    // });
  }
  constructor(){
    super();
    this.state = { 
      error:"",
      error2:"",
      error3:"",
      errorcal : "",
      info: [],
      text: {},
      selectedOption: "radio1",
      gpax:"",
      GP:"",
      codeValue: "",
      CA:"",
      grade:[]
    }
  }
  changeGpax = e =>{
    // this.props.onChange({[e.target.name] : e.target.value});
    this.setState({
      [e.target.name]:e.target.value
    });
    console.log(e.target.value)
    if (!Validator.matches(e.target.value, /\b[0-9]{1}[.][0-9]{2}$/)){
      console.log('Error')
      this.setState({
      error:'   Error!!'
      })
    }else{
      console.log('true')
      this.setState({
        error:''
        })
    }
  };
  changeGP = e =>{
    this.setState({
     GP:e.target.value
    });
    console.log(e.target.value)
    if (!Validator.matches(e.target.value, /\b[1-9]{1}[0-9]{1,2}$|([.][0-9]{1})$/)){
      this.setState({
      error:'   Error!!'
      })
    }else{
      console.log('true')
      this.setState({
        error:''
        })
    }
  };
  changeCA = e =>{
    this.setState({
      CA:e.target.value
    });
    console.log(e.target.value)
    if (!Validator.matches(e.target.value, /\b[0-9]{1,3}$/)){
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
  changeCode = e =>{
    this.setState({
      codeValue: e.target.value
    });
    if (!Validator.matches(e.target.value, /\b[c][s][0-9]{3}$/)){
      this.setState({
        error2:" error..."
      })
    }else{
      this.setState({
        error2:"",
        // codeValue:e.target.value
        })
    }
  };
  onClickremove=()=>{
    if(this.state.grade.length > 0){
      this.onClickCalculate();
    }
    var strify = '';
    fetch('/cs', {
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({codeValue: this.state.codeValue})
    })
    .then(res => res.json()).then(cscourses => {
      strify = JSON.stringify(cscourses);
      this.setState({
        text:cscourses
      });
      //------------check remove from empty table
      if(this.state.info.length === 0){
        console.log('table is empty.');
        return;
      }
      //-------------removing
      var js = JSON.parse(strify)['cscourses']
      for(var i=0; i<this.state.info.length; i++){
        try{
          if(js.code === this.state.info[i].cscourses.code){
            console.log('found.');
            let inf = this.state.info.splice(i,1);
            let diff = this.state.info.filter(x => !inf.includes(x));
            this.setState({
              info:diff
            })
            console.log('success removed.');
            return;
          }else{
            console.log('not found.');
          }
        }catch(e){
          console.log('invalid.');
        }}
    });
  };
  handleChangeRadio=(e)=>{
    this.setState({
      selectedOption: e.target.value
    });
  };
 
  onClickSearchCourse = () => {
    console.log('before send:', this.state.codeValue)
    if(!Validator.matches(this.state.codeValue, /\b[c][s][0-9]{3}$/)){
      console.log('null');
      return;
    } 
    fetch('/cs', {
      method: 'post',
      headers: {
        "Accept":"application/json",
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify({codeValue: this.state.codeValue})
    })
    .then(res => res.json())
    .then(cscourses => {
      // console.log('response from server:', JSON.stringify(cscourses));
      this.setState({ 
        text:cscourses,
      //  info:this.setState.cscourses,
      // info:[JSON.stringify(cscourses)]
      })
      if(this.state.text.cscourses === null){
        // console.log('not found.');
        return;
      }
      for(var i=0; i<this.state.info.length; i++){
        if(this.state.codeValue === this.state.info[i].cscourses.code){
          // console.log('duplicate item.');
          return;
        }
      }
      this.setState(prevState => ({
        info: [
          ...prevState.info,
          prevState.text
        ]
        ,grade:[]
      }))
    });
  };
  onClickCalculate=()=> {
    if(this.state.info === 0){
      console.log('table is empty.');
      return;
    }
    this.setState({
      grade:[]
    });
    var presentCA = this.state.info.length*3;
    var presentGP = 0;
    var myg = [4,3.5,3,2.5];
    var letter ="";
    var output = [];
    var ran = new Array (this.state.info.length);
    for (var i=0;i<this.state.info.length;i++){
      presentGP=presentGP+(4*3)
    }
    var res = (parseFloat(this.state.GP)+parseFloat(presentGP))
    /(parseFloat(this.state.CA)+parseFloat(presentCA));
    console.log('res1 : ',res.toFixed(2));
    if (res.toFixed(2)<2.05){
      this.setState({
        errorcal : "not enough",
        })
      return;
      }else{
        this.setState({
          errorcal:'',
          })
        }  
    do{
      presentGP=0;
    for(i=0;i<this.state.info.length;i++){
        var show = myg[Math.floor(Math.random()*myg.length)];
        ran[i]=show;
    }
    console.log("random grade :",ran);   
    for(i=0;i<this.state.info.length;i++){
        presentGP=presentGP+(ran[i]*3)
    }
    res = (parseFloat(this.state.GP)+parseFloat(presentGP))
    /(parseFloat(this.state.CA)+parseFloat(presentCA));
     console.log('res : ',res.toFixed(2));
    } while (res.toFixed(2)<2.05);
    console.log("ran",ran.length);
    var t="";
    for (i=0;i<this.state.info.length;i++){
      switch (ran[i]){
        case 4 : 
          t = "A"
          break;
        case 3.5 :
          t =  "B+"
          break;
        case 3 :
          t = "B"
          break;
        case 2.5 :
          t = "C+"
          break;
        default :
          break ;
      }
      letter = letter+t;
      output.push(t);
    }
    this.setState({
      grade:output
    })
  };
  display = ()=>{
    return (            <tr>
      <th>Course Code</th>
      <th>Course Title</th>
      <th>Credit</th>

    </tr>);
    // if(this.state.grade.length == 0){
    //   return this.state.info.map(a=>(
    //     <tr>
    //         <td>{a.cscourses.code}</td>
    //           <td>{a.cscourses.coursename}</td>
    //           <td>{a.cscourses.credit}</td>
    //           <td></td>
    //         </tr>
    //   ));
    // }else{
    //   var val = [];
    //   for(var i=0;i<this.state.info.length;i++){
    //     val.push(<tr>
    //       <td>{this.state.info[i].cscourses.code}</td>
    //       <td>{this.state.info[i].cscourses.coursename}</td>
    //       <td>{this.state.info[i].cscourses.credit}</td>
    //       <td>{this.state.grade[i]}</td>
    //     </tr>);
    //   }
    //   return val;
    //   }
  }
  displayCourse = () => {
    if(this.state.grade.length === 0){
      return this.state.info.map(a=>(
            <tr>
              <td>{a.cscourses.code}</td>
              <td>{a.cscourses.coursename}</td>
              <td>{a.cscourses.credit}</td>
              <td></td>
            </tr>
            ));
    }
  };
  displayGrade = () => {
    if(this.state.grade.length !== 0){
        let cnt = 0;
        for(let i=0; i<this.state.info.length; i++){
          if(this.state.info[i].cscourses.credit === 3){
            cnt++;
          }
        }

        let str = "";
        for(let j=0; j<this.state.info.length; j++){
          if(j === this.state.info.length-1){
            str = str+this.state.grade[j];
            break;
          }
          str = str+this.state.grade[j]+",";
        }

        let val = [];
        // let dis = this.display();
        let disC = this.displayCourse();
        console.log('disc ',disC);
        val.push(<table id="myTable">{this.state.info.map(a=>(
              <tr>
                <td>{a.cscourses.code}</td>
                <td>{a.cscourses.coursename}</td>
                <td>{a.cscourses.credit}</td>
              </tr>
            ))}</table>);
        val.push(<br/>);
        val.push(<table id="myTable">
        <tr >
        {/* #4CAF50 */}          
          <th style={{backgroundColor: "#4CAF50",color: "white",textAlign:"center"}}>Expected Grade</th>
        </tr>
        <tr>
          <th>For {cnt} Courses with 3 Credit You should have<br/>
              Grade : 
              <h2  style={{color: "Red", fontSize:"1.4em"}}>{str}</h2>
              <p style={{color:"gray"}}>Hint : You can change expect grade by pressing the calculate button.</p>
          </th>
        </tr>
        </table>);
        return val;
      }
};
  render() {
    return (
      <div>
        <body>
        <div >
          <img class="header" src={headpic} alt=""></img>
        </div>
      <div class="divinbody">
          <ul class="topnav">
            <li><Link to="/myInfo">My Infomation</Link></li>
            <li><Link to="/status">Student Status</Link></li>
            <li><Link to="http://localhost:3000/" class="active ">Grade Calculation</Link></li>
            <li><Link to="/recommend" >Course Recommend</Link></li>
            <li><Link to="/contact">Contact Advisors</Link></li>
          </ul><br/>
          <t1 class = "center"> Choose status </t1>
          <div class="grid-container">
              <div>
                <label class="container">Warning
                <input type="radio" checked={this.state.selectedOption === 'radio1'}
                onChange={this.handleChangeRadio} value="radio1" name="status"/>
                <span class="checkmark"></span></label>
              </div>
            
              <div><label class="container">Warning 1
                <input type="radio" checked={this.state.selectedOption === 'radio2'} 
                onChange={this.handleChangeRadio} value="radio2"name="status"/>
                <span class="checkmark"></span></label></div>
            
              <div><label class="container">Warning 2
                <input type="radio" checked={this.state.selectedOption === 'radio3'} 
                onChange={this.handleChangeRadio} value="radio3"name="status"/>
                <span class="checkmark"></span></label></div>
            
              <div><label class="container">Probation
                <input type="radio" checked={this.state.selectedOption === 'radio4'}
                onChange={this.handleChangeRadio} value="radio4"name="status"/>
                <span class="checkmark"></span></label>
              </div>
          </div><br/>

            {/* <t1 >Fill GPAX</t1>
              <input  onBlur={e =>this.changeGpax(e)} type="text" name="gpax" placeholder="1.25" width="300px;" />
                <span>{this.state.error && <InlineError text={ 'Invalid GPAX'}/>}</span> <div> <br/></div> */}
            <center>
            <t1 >Fill  cumulative CA</t1>
              <input  onBlur={e =>this.changeCA(e)} type="text" name="CA" placeholder="21" width="300px;" />
                <span>{this.state.error3 && <InlineError text={ 'Invalid CA'}/>}</span> <div> <br/></div>

            <t1 >Fill cumulative GP</t1>
              <input  onBlur={e =>this.changeGP(e)} type="text" name="GP" placeholder="61.5" width="300px;" />
                <span>{this.state.error && <InlineError text={ 'Invalid GP'}/>}</span> <div> <br/></div>
              
            <div class="enroll"><t1>Search Course &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</t1>
              <input onBlur={this.changeCode} type="text" name="code" placeholder="cs101" width="300px;" />
              {this.state.error2 && <InlineError text={'Invalid course'}/>} 
              <br/><br/>
              <button onClick={this.onClickSearchCourse}  class="button5">Enroll</button>
              <span><button onClick={this.onClickremove} class="button5">Remove</button></span>
            </div><br/>
            </center>
            <table id="myTable">
                {  this.display()}
                { this.displayCourse() }
            </table>
            {this.displayGrade()}
            <div><br/>
            <span>{this.state.errorcal && <InlineError text={'not enough for grade calculate'}/>}
            <button style={{marginRight:"20%"}}class="button6" onClick={this.onClickCalculate}>Calculate</button></span>
             </div><br/>
             
          </div>
        

        <Footer/>
      </body>
      </div>
    );
  }
}

export default App;