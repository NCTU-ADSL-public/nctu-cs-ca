import React from 'react';
import IndividualProgress from './IndividualProgress'


export default class IndividualCourse extends React.Component {
    render() {
        return (
            <div id="little-title">
                <IndividualProgress grad={this.props.pass/this.props.total * 100}/>
                <div id="little-title-title">
                    <div id="little-title-number"><font size={6} color='#338d68'>{this.props.pass}</font>/{this.props.total}</div>
                    <div id="little-title-text" ><font size={this.props.fontflag?5:6}>{this.props.name}</font></div>
                </div>

            </div>
        );
    }
}