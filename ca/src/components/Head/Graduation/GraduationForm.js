import React from 'react'
import IndividualCourse from './IndividualCourse'
import GeneralCourseList from './GeneralCourseList'
import IndividualProgress from './IndividualProgress'
import scrollToComponent from 'react-scroll-to-component';
import 'animate.css'
import './Graduation.css'
import FadeIn from 'react-fade-in';




class GraduationForm extends React.Component{
    state={
        items:[

        ],
        GeneralItems:[

        ],
        graditems:[

        ],
        gradGeneralItems:[

        ],
    };


    componentWillUpdate(nextProps, nextState){
        if( nextProps.scroll === this.state.GeneralItems[0].title){
            scrollToComponent(this.refs.my);
        }
    }
    componentWillMount(){
        this.setState({
            items:this.props.items.filter(t => (t.title!=="通識" && ( t.course || t.selection))),
            GeneralItems:this.props.items.filter(t => (t.title==="通識")),
            graditems:this.props.graditems.filter(t => (t.title!=="通識" && ( t.course || t.selection))),
            gradGeneralItems:this.props.graditems.filter(t => (t.title==="通識")),
        })
    }
    //For updating as props changes!!!
    componentDidUpdate(prevProps, prevState){
        if( prevProps.items !== this.props.items ||
            prevProps.graditems !== this.props.revise ) {
            this.setState({
                items:this.props.items.filter(t => (t.title!=="通識" && ( t.course || t.selection))),
                GeneralItems:this.props.items.filter(t => (t.title==="通識")),
                graditems:this.props.graditems.filter(t => (t.title!=="通識" && ( t.course || t.selection))),
                gradGeneralItems:this.props.graditems.filter(t => (t.title==="通識")),
            })
        }
    }

    render(){
        if(this.props.isToggle){
            let id=0;
            return(
                <div className="animated fadeIn">
                    {this.state.items.map(item =>
                        <IndividualCourse
                            key={id++}
                            pass={item.course}
                            title={item.title}
                            credit={item.credit}
                            total={item.require}
                            selection={item.selection}
                            scroll={this.props.scroll}
                        />
                    )}

                    <div  className="little-form"  ref="my">
                        <div id="little-title">
                            <IndividualProgress grad={this.state.GeneralItems[0].credit/this.state.GeneralItems[0].require * 100}/>
                            <div className="little-title-title">
                                <div id="little-title-number"><font size={6} color='#338d68'>{this.state.GeneralItems[0].credit}</font>/{this.state.GeneralItems[0].require}(學分)</div>
                                <div id="little-title-text" ><font size={this.state.GeneralItems[0].fontflag?5:6}>{this.state.GeneralItems[0].title}</font></div>
                            </div>

                        </div>
                        <GeneralCourseList items={this.state.GeneralItems[0].course} scroll={this.props.scroll}/>
                    </div>
                </div>
            );
        }
        else{
            let id=0;
            return(
                <FadeIn>
                    {this.state.graditems.map(item =>
                        <IndividualCourse
                            key={id++}
                            pass={item.course}
                            title={item.title}
                            credit={item.credit}
                            total={item.require}
                            selection={item.selection}
                            scroll={this.props.scroll}
                        />
                    )}

                    <div  className="little-form"  ref="my">
                        <div id="little-title">
                            <IndividualProgress grad={this.state.gradGeneralItems[0].credit/this.state.gradGeneralItems[0].require * 100}/>
                            <div className="little-title-title">
                                <div id="little-title-number"><font size={6} color='#338d68'>{this.state.gradGeneralItems[0].credit}</font>/{this.state.gradGeneralItems[0].require}(學分)</div>
                                <div id="little-title-text" ><font size={this.state.gradGeneralItems[0].fontflag?5:6}>{this.state.gradGeneralItems[0].title}</font></div>
                            </div>

                        </div>
                        <GeneralCourseList items={this.state.gradGeneralItems[0].course} scroll={this.props.scroll}/>
                    </div>
                </FadeIn>
            );
        }
    }
}


export default GraduationForm;