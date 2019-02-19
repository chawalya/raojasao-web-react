import React, { Component } from 'react';
import './style.css';
import headpic from './img/header.jpg';
import teacher1 from './img/1.jpg';
import teacher2 from './img/2.jpg';
import teacher3 from './img/3.jpg';
import teacher4 from './img/4.jpg';
import teacher5 from './img/5.jpg';
import teacher6 from './img/6.jpg';
import teacher7 from './img/7.jpg';
import teacher8 from './img/8.jpg';
import teacher9 from './img/9.jpg';
import {Link} from 'react-router';
import Footer from './footer';
class contact extends Component {
  
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
              <li><Link to="/recommend">Course Recommend</Link></li>
              <li><Link to="/contact" class="active">Contact Advisors</Link></li>
            </ul>
            <br/>
            <div className="contact-container">
            <div className="piccontact">
                <img width={'170px'} src={teacher1} alt=""/><br/>
                <t1>ดร.วสิศ ลิ้มประเสริฐ </t1>
                <p>โทรศัพท์ : 0-2986-9156 ext. 224<br/>อีเมล : wasit@cs.tu.ac.th</p>
            </div>
            <div className="piccontact">
                <img width={'170px'} src={teacher2} alt=""/><br/>
                <t1>ดร.วนิดา พฤทธิวิทยา </t1>
                <p>โทรศัพท์ : 0-2986-9156 ext. 226<br/>อีเมล : wanidap@cs.tu.ac.th</p>
            </div>
            <div className="piccontact">
                <img width={'170px'} src={teacher3} alt=""/><br/>
                <t1>ดร.รัชต พีชวนิชย์ </t1>
                <p>โทรศัพท์ :0-2986-9156 ext. 201<br/>อีเมล : rp@cs.tu.ac.th</p>
            </div>
            <div className="piccontact">
                <img width={'170px'} src={teacher4} alt=""/><br/>
                <t1>รศ.ดร.เยาวดี เต็มธนาภัทร์ </t1>
                <p>โทรศัพท์ : 0-2986-9156 ext. 205<br/>อีเมล : yao@cs.tu.ac.th</p>
            </div>
            <div className="piccontact">
                <img width={'170px'} src={teacher5} alt=""/><br/>
                <t1>ดร.มรวรรัตน์ ผ่องไพบูลย์ </t1>
                <p>โทรศัพท์ :  0-2986-9156 ext. 219<br/>อีเมล : phongpai@cs.tu.ac.th</p>
            </div>
            <div className="piccontact">
                <img width={'170px'} src={teacher6} alt=""/><br/>
                <t1>ดร.ประภาพร รัตนธำรง </t1>
                <p>โทรศัพท์ : 0-2986-9156 ext. 225<br/>อีเมล : rattanat@cs.tu.ac.th</p>
            </div>
            <div className="piccontact">
                <img width={'170px'} src={teacher7} alt=""/><br/>
                <t1>ดร.ปกป้อง ส่องเมือง </t1>
                <p>โทรศัพท์ : 0-2986-9156 ext.  213<br/>อีเมล : pokpong@cs.tu.ac.th</p>
            </div>
            <div className="piccontact">
                <img width={'170px'} src={teacher8} alt=""/><br/>
                <t1>ผศ.ดร.ทรงศักดิ์ รองวิริยะพานิช </t1>
                <p>โทรศัพท์ : 0-2986-9156 ext. 204<br/>อีเมล : rongviri@cs.tu.ac.th</p>
            </div>
            <div className="piccontact">
                <img width={'170px'} src={teacher9} alt=""/><br/>
                <t1> ผศ.ดร.ณัฐธนนท์ หงส์วริทธิ์ธร </t1>
                <p>โทรศัพท์ : 0-2986-9156 ext. 229<br/>อีเมล : nth@cs.tu.ac.th</p>
            </div>
          </div>
            
          </div>
         <Footer></Footer>  
        </body>
          );
  }
}
export default contact;