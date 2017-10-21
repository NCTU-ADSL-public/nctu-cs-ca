import React from 'react';
import IndividualProgress from './IndividualProgress'
import CourseList from './CourseList'
import GeneralCourseList from './GeneralCourseList'

export default class IndividualCourse extends React.Component {

    render() {
        if(this.props.title==="通識"){
            return (<div> </div>
            );
        }
        else{
            return (
                <div  id="little-form">
                    <div id="little-title">
                        <IndividualProgress grad={this.props.credit/this.props.total * 100}/>
                        <div id="little-title-title">
                            <div id="little-title-number"><font size={6} color='#338d68'>{(this.props.credit>this.props.total)?this.props.total:this.props.credit}</font>/{this.props.total}</div>
                            <div id="little-title-text" ><font size={this.props.fontflag?5:6}>{this.props.title}</font></div>
                        </div>

                    </div>
                    <CourseList items={this.props.pass} />
                </div>
            );
        }
    }
}