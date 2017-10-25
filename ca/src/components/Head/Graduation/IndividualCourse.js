import React from 'react';
import IndividualProgress from './IndividualProgress'
import CourseList from './CourseList'
import scrollToComponent from 'react-scroll-to-component';

export default class IndividualCourse extends React.Component {
    componentWillUpdate(nextProps, nextState){
        if(nextProps.scroll === this.props.title){
            scrollToComponent(this.refs.my);
        }
    }
    render() {
        if(this.props.title==="通識"){
            return (<div> </div>
            );
        }
        else{
            return (
                <div  id="little-form"  ref="my">
                    <div id="little-title">
                        <IndividualProgress grad={this.props.credit/this.props.total * 100}/>
                        <div id="little-title-title">
                            <div id="little-title-number"><font size={6} color='#338d68'>{this.props.credit}</font>/{this.props.total}</div>
                            <div id="little-title-text" ><font size={this.props.fontflag?5:6}>{this.props.title}</font></div>
                        </div>

                    </div>
                    <CourseList selection={this.props.selection} items={this.props.pass} />
                </div>
            );
        }
    }
}