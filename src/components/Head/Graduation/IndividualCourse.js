import React from 'react';
import IndividualProgress from './IndividualProgress'
import CourseList from './CourseList'
import scrollToComponent from 'react-scroll-to-component';
import './Graduation.css'

export default class IndividualCourse extends React.Component {
    componentWillUpdate(nextProps, nextState){
        if(nextProps.scroll === this.props.title){
            scrollToComponent(this.refs.my);
        }
    }
    render() {
            return (
                <div  className="little-form"  ref="my">
                    <div id="little-title">
                        <IndividualProgress grad={(this.props.title==="體育"||this.props.title==='服務學習'||this.props.title==='藝文賞析')?this.props.pass.length/this.props.total * 100:this.props.credit/this.props.total * 100}/>
                        <div className="little-title-title">
                            <div id="little-title-number"><font size={6} color='#338d68'>{(this.props.title==="體育"||this.props.title==='服務學習'||this.props.title==='藝文賞析')?this.props.pass.length:this.props.credit}</font>/{this.props.total}{(this.props.title==="體育"||this.props.title==='服務學習'||this.props.title==='藝文賞析')?'(門)':'(學分)'}</div>
                            <div id="little-title-text" ><font size={this.props.fontflag?5:6}>{this.props.title}</font></div>
                        </div>

                    </div>
                    <CourseList items={this.props.pass} selection={this.props.selection}/>
                </div>
            );
    }
}