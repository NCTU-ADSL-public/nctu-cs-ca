import React from 'react'
import axios from 'axios'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import scrollToComponent from "react-scroll-to-component";

import CircularProgress from '../../../Components/CircularProgress'
import App from './Trello/List'
import IndividualCourse from './IndividualCourse'
import GeneralCourseList from './GeneralCourseList'
import AnimatedProgress from '../../../Components/AnimatedProgress'

class CreditOverview extends React.Component {
    state = {
        isMod:false,
        isToggle:true,
        open:false,
        opendialog: false,
        opendialogEn: false,
        opendialog1: false,
        opendialogprint: false,
        graduationCheck:false,
        graduationCheckEnglishTest:"2",
        graduationItems:this.props.revise,
        items:this.props.items,
        totalitems:this.props.result,
        Result:this.props.result,
        ReviseResult:this.props.reviseresult
    };

    componentDOM = {}

    componentWillMount(){
        let _this=this;
        console.log(this.props.studentProfile.grade)
        if(this.props.assistant) {
            axios.get('/assistants/graduate/check', {
                params: {
                    student_id: this.props.studentProfile.student_id,
                }
            }).then(studentData => {
                _this.setState({
                    graduationCheck: studentData.data.check.state
                })
            }).catch(err => {
                console.log(err);
            });
            axios.get('/assistants/graduate/english', {
                params: {
                    student_id: this.props.studentProfile.student_id,
                }
            }).then(studentData => {
                _this.setState({
                    graduationCheckEnglishTest: studentData.data.check.state
                })
            }).catch(err => {
                console.log(err);
            });

        }else{
            axios.get('/students/graduate/check').then(studentData => {
                _this.setState({
                    graduationCheck: studentData.data.check.state
                })
            }).catch(err => {
                console.log(err);
            });
            axios.get('/students/graduate/english').then(studentData => {
                _this.setState({
                    graduationCheckEnglishTest: studentData.data.check.state
                })
            }).catch(err => {
                console.log(err);
            });
        }
    }

    //For updating as props changes!!!
    componentDidUpdate(prevProps, prevState){
        if( prevProps.items !== this.props.items ||
            prevProps.revise !== this.props.revise ||
            prevProps.result !== this.props.result ) {
            this.setState({
                items:this.props.items,
                graduationItems:this.props.revise,
                totalitems:this.props.result
            });
        }
    }

    scrollTo(title){
        scrollToComponent(this.componentDOM[title])
    }


    render(){
        const itemsToShow = (this.props.isToggle)? this.state.items: this.state.graduationItems
        const generalCourseType = itemsToShow.filter(t => (t.title==="通識"))[0]
        const otherCourseType = itemsToShow.filter(t => (t.title!=="通識" && ( t.course || t.selection)))
            return (
                <div>
                <div style={{display:this.props.isMod?"none":"inline"}}>
                    <div className="font_adjust">
                        <div className="schedule-bar">
                            <div className="circle-progress">
                                <div className="circle-in">畢業{this.state.totalitems.total}/{this.state.totalitems.total_require}</div>
                                <CircularProgress grad={this.state.totalitems.total/this.state.totalitems.total_require*100}/>
                            </div>
                            <div className="overview">
                                <div className="overview-course" >
                                    <div className="showcourseoverview" onClick={()=>this.scrollTo('共同必修')}>共同必修&nbsp;&nbsp;<font size={5} color='#338d68'>{this.state.totalitems.compulsory}</font>/{this.state.totalitems.compulse_require}&nbsp;學分<br/><AnimatedProgress value={this.state.totalitems.compulsory/this.state.totalitems.compulse_require*100}/></div>
                                    <div className="showcourseoverview" onClick={()=>this.scrollTo('核心課程')}>核心課程&nbsp;&nbsp;<font size={5} color='#338d68'>{this.state.totalitems.core}</font>/{this.state.totalitems.core_require}&nbsp;學分<br/><AnimatedProgress value={this.state.totalitems.core/this.state.totalitems.core_require*100}/></div>
                                    <div className="showcourseoverview" onClick={()=>this.scrollTo('服務學習')}>服務學習&nbsp;&nbsp;<font size={5} color='#338d68'>{this.state.totalitems.service}</font>/{this.state.totalitems.service_require}&nbsp;門<br/><AnimatedProgress value={this.state.totalitems.service/this.state.totalitems.service_require*100}/></div>

                                </div>
                                <div className="overview-course" >
                                    <div className="showcourseoverview" onClick={()=>this.scrollTo('英文授課')}>英文授課&nbsp;&nbsp;<font size={5} color='#338d68'>{this.state.totalitems.english}</font>/{this.state.totalitems.english_require}&nbsp;門<br/><AnimatedProgress value={this.state.totalitems.english/this.state.totalitems.english_require*100}/></div>
                                    <div className="showcourseoverview" onClick={()=>this.scrollTo('藝文賞析')}>藝文賞析&nbsp;&nbsp;<font size={5} color='#338d68'>{this.state.totalitems.art}</font>/{this.state.totalitems.art_require}&nbsp;門<br/><AnimatedProgress value={this.state.totalitems.art/this.state.totalitems.art_require*100}/></div>
                                    <div className="showcourseoverview" onClick={()=>this.scrollTo('其他選修')}>其他選修&nbsp;&nbsp;<font size={5} color='#338d68'>{this.state.totalitems.other}</font>/{this.state.totalitems.other_require}&nbsp;學分<br/><AnimatedProgress value={this.state.totalitems.other/this.state.totalitems.other_require*100}/></div>
                                </div>
                                <div className="overview-course" >
                                    <div className="showcourseoverview" onClick={()=>this.scrollTo('通識')}>通&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;識&nbsp;&nbsp;<font size={5} color='#338d68'>{this.state.totalitems.general}</font>/{this.state.totalitems.general_require}&nbsp;學分<br/><AnimatedProgress value={this.state.totalitems.general/this.state.totalitems.general_require*100}/></div>
                                    <div className="showcourseoverview" onClick={()=>this.scrollTo('體育')}>體&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;育&nbsp;&nbsp;<font size={5} color='#338d68'>{this.state.totalitems.pe}</font>/{this.state.totalitems.pe_require}&nbsp;門<br/><AnimatedProgress value={this.state.totalitems.pe/this.state.totalitems.pe_require*100}/></div>
                                    <div className="showcourseoverview" onClick={()=>this.scrollTo('外語')}>外&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;語&nbsp;&nbsp;<font size={5} color='#338d68'>{this.state.totalitems.language}</font>/{this.state.totalitems.language_require}&nbsp;學分<br/><AnimatedProgress value={this.state.totalitems.language/this.state.totalitems.language_require*100}/></div>
                                </div>
                                <div className="overview-course" >
                                    <div className="showcourseoverview" onClick={()=>this.scrollTo('副核心與他組核心')}>副核心與他組核心&nbsp;<font size={5} color='#338d68'>{this.state.totalitems.vice}</font>/{this.state.totalitems.vice_require}&nbsp;學分<br/><AnimatedProgress value={this.state.totalitems.vice/this.state.totalitems.vice_require*100}/></div>
                                    <div className="showcourseoverview" onClick={()=>this.scrollTo('專業選修')}>專業選修&nbsp;&nbsp;<font size={5} color='#338d68'>{this.state.totalitems.pro}</font>/{this.state.totalitems.pro_require}&nbsp;學分<br/><AnimatedProgress value={this.state.totalitems.pro/this.state.totalitems.pro_require*100}/></div>
                                    <div className="showcourseoverview" onClick={()=>this.scrollTo('抵免研究所課程')}>抵免研究所課程<font size={5} color='#338d68'>&nbsp;{this.state.totalitems.graduate}</font>&nbsp;學分<br/></div>
                                </div>
                            </div>
                        </div>
                        <div className="Grad-Row">
                            <div className="animated fadeIn">
                              {otherCourseType.map((item,key) =>
                                (item.title === "核心課程" || item.title === "副核心與他組核心" ) ?this.props.studentProfile.grade==="大四" ?
                                <IndividualCourse
                                  key={key}
                                  pass={item.course}
                                  title={item.title}
                                  credit={item.credit}
                                  total={item.require}
                                  selection={item.selection}
                                  ref={(DOM) => { this.componentDOM[item.title] = DOM }}
                                />:
                                <div> </div>
                                :
                                <IndividualCourse
                                  key={key}
                                  pass={item.course}
                                  title={item.title}
                                  credit={item.credit}
                                  total={item.require}
                                  selection={item.selection}
                                  ref={(DOM) => { this.componentDOM[item.title] = DOM }}
                                />
                              // <IndividualCourse
                              //   key={key}
                              //   pass={item.course}
                              //   title={item.title}
                              //   credit={item.credit}
                              //   total={item.require}
                              //   selection={item.selection}
                              //   ref={(DOM) => { this.componentDOM[item.title] = DOM }}
                              // />

                            )}

                                <div  className="little-form"
                                      ref={(DOM) => { this.componentDOM[generalCourseType.title] = DOM }}
                                >
                                    <div id="little-title">
                                        <AnimatedProgress
                                            style={{
                                                width: '300px',
                                                float: 'left'
                                            }}
                                            value={generalCourseType.credit/generalCourseType.require * 100}
                                        />
                                        <div className="little-title-title">
                                            <div id="little-title-number"><font size={6} color='#338d68'>{generalCourseType.credit}</font>/{generalCourseType.require}(學分)</div>
                                            <div id="little-title-text" ><font size={generalCourseType.fontflag?5:6}>{generalCourseType.title}</font></div>
                                        </div>

                                    </div>
                                    <GeneralCourseList courses={generalCourseType.course}/>
                                </div>
                            </div>
                        </div>
                        <div id="graduate-footer"> </div>
                    </div>
                </div>
                <div style={{display:this.props.isMod?"inline":"none"}}>
                    <MuiThemeProvider>
                        <App/>
                    </MuiThemeProvider>
                </div>
                </div>
            )
    }
}

export default CreditOverview
