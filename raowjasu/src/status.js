import React, { Component } from 'react';
import './style.css';
import headpic from './img/header.jpg';
import {Link} from 'react-router';
import Footer from './footer';
// import state1 from './img/st1.png';
// import state2 from './img/st2.png';
// import state3 from './img/st3.png';
// import state4 from './img/st4.png';
// import state5 from './img/st5.png';
// import state6 from './img/st6.png';
import rela1 from './img/rela1.jpg';
import rela2 from './img/rela2.jpg';
class status extends Component {
  
    render() {
        return (
          <body>
            <div>
                <img class="header"  src={headpic} alt=""></img>
            </div>
            <div class="divinbody"> 
                <ul class="topnav">
                    <li><Link to="/myInfo">My Infomation</Link></li>
                    <li><Link to="/status" class="active">Student Status</Link></li>
                    <li><Link to="http://localhost:3000/" >Grade Calculation</Link></li>
                    <li><Link to="/recommend">Course Recommend</Link></li>
                    <li><Link to="/contact">Contact Advisors</Link></li>
                </ul>

                <div class="framerela">
                    <img class="relation" src={rela1} alt=""></img>
                    <div class="overlayrela">
                    <img class="relation" src={rela2} alt=""></img>
                    </div>
                </div>
                
       
            {/* <div class="divframecontent">
                <div class="picframe">
                     <img width="200px" src={state1}></img>
                     <p>นักศึกษาที่มีคะแนนเฉลี่ยสะสม 2.00 ขึ้นไปมีสถานภาพทางวิชาการปกติ</p>
                </div>
                <div class="picframe">
                    <img width="200px" src={state2}></img>
                    <p>นักศึกษาที่มีคะแนนเฉลี่ยสะสมต่ำกว่า 2.00 และเป็นภาคการศึกษาแรกที่เข้าศึกษา มีสถานภาพทางวิชาการเตือนพิเศษ</p>
                </div>
                <div class="picframe">
                    <img width="200px" src={state3}></img>
                    <p>นักศึกษาที่มีคะแนนเฉลี่ยสะสมต่ำกว่า 2.00 มีสถานภาพทางวิชาการเตือนครั้งที่ 1</p>
                </div>
                <div class="picframe">
                    <img width="200px" src={state4}></img>
                    <p>นักศึกษาซึ่งอยู่ในสถานภาพทางวิชาการเตือนพิเศษ หรือเตือนครั้งที่ 1 ในภาคการศึกษาที่ผ่านมา และมีคะแนนเฉลี่ยสะสมต่ำกว่า 2.00 ในภาคการศึกษาถัดมา ให้มีสถานภาพทางวิชาการเตือนครั้งที่ 2</p>
                </div>
                <div class="picframe">
                    <img width="200px" src={state5}></img>
                    <p>นักศึกษาซึ่งอยู่ในสถานภาพทางวิชาการเตือนครั้งที่ 2 ในภาคการศึกษาที่ผ่านมา และมีคะแนนเฉลี่ยสะสมต่ำกว่า 2.00 ในภาคการศึกษาถัดมา ให้มีสถานภาพทางวิชาการภาวะรอพินิจ </p>
                </div>
                <div class="picframe">
                    <img width="200px" src={state6}></img>
                    <p>นักศึกษาซึ่งอยู่ในสถานภาพทางวิชาการเตือนพิเศษในภาคการศึกษาแรกที่เข้าศึกษา และมีคะแนนเฉลี่ยสะสมต่ำกว่า 1.50 ในภาคการศึกษาถัดมา หรือ</p>
                    <p>นักศึกษาซึ่งอยู่ในสถานภาพทางวิชาการภาวะรอพินิจ ในภาคการศึกษาที่ผ่านมา และมีคะแนนเฉลี่ยสะสมต่ำกว่า 2.00 ในภาคการศึกษาถัดมา ต้องถูกถอนชื่อออกจากทะเบียนนักศึกษา </p>
                </div>
             </div> */}


             </div>
             
             <Footer/>  
          </body>
          );
        }
    }
export default status;