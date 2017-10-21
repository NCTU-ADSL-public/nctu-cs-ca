import React from 'react'
import IndividualCourse from './IndividualCourse'
import GeneralCourseList from './GeneralCourseList'
import IndividualProgress from './IndividualProgress'

class GraduationForm extends React.Component{
    state={
        items:[

        ],
        GeneralItems:[

        ],
    };
    componentWillMount(){
        this.setState({
            items:this.props.items.filter(t => (t.title!=="通識")),
            GeneralItems:this.props.items.filter(t => (t.title==="通識")),
        })
    }
    render(){
        return(
            <div>
                {this.state.items.map(item =>
                    <IndividualCourse
                        key={item.title}
                        pass={item.course}
                        title={item.title}
                        credit={item.credit}
                        total={item.require}
                    />
                )}

                <div  id="little-form">
                    <div id="little-title">
                        <IndividualProgress grad={this.state.GeneralItems[0].credit/this.state.GeneralItems[0].require * 100}/>
                        <div id="little-title-title">
                            <div id="little-title-number"><font size={6} color='#338d68'>{(this.state.GeneralItems[0].credit>this.state.GeneralItems[0].require)?this.state.GeneralItems[0].total:this.state.GeneralItems[0].credit}</font>/{this.state.GeneralItems[0].require}</div>
                            <div id="little-title-text" ><font size={this.state.GeneralItems[0].fontflag?5:6}>{this.state.GeneralItems[0].title}</font></div>
                        </div>

                    </div>
                    <GeneralCourseList items={this.state.GeneralItems[0].pass} />
                </div>
            </div>
        );
    }
}


export default GraduationForm;