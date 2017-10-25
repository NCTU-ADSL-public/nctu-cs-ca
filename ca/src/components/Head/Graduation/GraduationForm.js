import React from 'react'
import IndividualCourse from './IndividualCourse'
import GeneralCourseList from './GeneralCourseList'
import IndividualProgress from './IndividualProgress'
import scrollToComponent from 'react-scroll-to-component';


class GraduationForm extends React.Component{
    state={
        items:[

        ],
        GeneralItems:[

        ],
    };


    componentWillUpdate(nextProps, nextState){
        if( nextProps.scroll === this.state.GeneralItems[0].title){
            scrollToComponent(this.refs.my);
        }
    }
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
                        key={item.id}
                        pass={item.course}
                        title={item.title}
                        credit={item.credit}
                        total={item.require}
                        selection={item.selection}
                        scroll={this.props.scroll}
                    />
                )}

                <div  id="little-form"  ref="my">
                    <div id="little-title">
                        <IndividualProgress grad={this.state.GeneralItems[0].credit/this.state.GeneralItems[0].require * 100}/>
                        <div id="little-title-title">
                            <div id="little-title-number"><font size={6} color='#338d68'>{this.state.GeneralItems[0].credit}</font>/{this.state.GeneralItems[0].require}</div>
                            <div id="little-title-text" ><font size={this.state.GeneralItems[0].fontflag?5:6}>{this.state.GeneralItems[0].title}</font></div>
                        </div>

                    </div>
                    <GeneralCourseList items={this.state.GeneralItems[0].course} scroll={this.props.scroll}/>
                </div>
            </div>
        );
    }
}


export default GraduationForm;