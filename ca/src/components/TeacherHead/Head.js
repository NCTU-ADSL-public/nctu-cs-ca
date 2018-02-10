import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import FadeIn from 'react-fade-in';

import HomeItem from './Home/Home.js';
import CourseItem from './Course/index.js';
import GroupItem from './Group/Group.js';
import FamilyItem from './Family/Family.js';

import './Head.css';
import Navbar from '../Components/Navbar'

class Head extends Component {


    state = {
       selectedIndex: 0,
       styleButton: {
		    fontFamily: 'Noto Sans CJK TC',
		    background: '#EEEEEE',
           	lineHeight: '15px',
           	margin: '5px 0 0',
		   	fontSize: '11px',
		   	width: '10px',
       },
		studentIdcard:{
       		name:'彭文志',
			prog:'教授',
			grad:'',
		},
    };


    componentWillMount(){
    	let _this = this;

        axios.get('/students/profile').then(studentData => {
            _this.setState({
                studentIdcard: {
                    name: studentData.data[0].sname,
                    prog: studentData.data[0].program ,
                    grad: "大" + studentData.data[0].grade,
                }
            })
        }).catch(err => {
            console.log(err);
        });


    }

    componentDidMount(){
    	this.select(1);
	}

  	select(index){
            if(index===0){
                ReactDOM.render(
					<font>
						<FadeIn>
							<HomeItem />
						</FadeIn>
					</font>,
                    document.getElementById('page'));
            }
            else if(index===1){
                ReactDOM.render(
					<div>
						<FadeIn>
							<CourseItem />
						</FadeIn>
					</div>,
                    document.getElementById('page'));
            }
            else if(index===2){
                ReactDOM.render(
					<FadeIn>
						<GroupItem />
					</FadeIn>,
                    document.getElementById('page'));
            }
            else if(index===3){
                ReactDOM.render(
					<a>
						<FadeIn>
							<FamilyItem />
						</FadeIn>
					</a>,
                    document.getElementById('page'));
            }

  		this.setState({selectedIndex: index});
  	}

	render() {
        const onTouchTaps = [
            () => this.select(0),
            () => this.select(1),
            () => this.select(2),
            () => this.select(3),
        ]
        return (
            <div id="Head">
                <Navbar type='teacher'
                        name={this.state.studentIdcard.name}
                        subname={this.state.studentIdcard.prog + this.state.studentIdcard.grad}
                        selectedIndex={this.state.selectedIndex}
                        onTouchTaps={onTouchTaps}
                />
				<div id="topRec">
				</div>

				<div id="page" > </div>
				<footer>Copyright @2017 NCTUCS 交通大學資訊工程學系</footer>
	  		</div>
	    );
	  }
}

export default Head;
