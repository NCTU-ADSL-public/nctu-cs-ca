import React from 'react'
import axios from 'axios'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import './Graduation.css'

import PrintForm from './GradTable/PrintForm'
import LinearProgressExampleDeterminate from './OverviewProgress'
import CircularProgress from './CircularProgress'
import App from './Trello/List'
import IndividualCourse from './IndividualCourse'
import GeneralCourseList from './GeneralCourseList'
import IndividualProgress from './IndividualProgress'

class Grad extends React.Component {
    state={
        isMod:false,
        scrollQuery:'',
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
        courseCategoryArray:[],
        Result:this.props.result,
        ReviseResult:this.props.reviseresult,
        print_courseCategoryArray:this.props.courseCategoryArray,
    };
    componentWillMount(){
        let _this=this;

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
    componentWillReceiveProps(nextProps){
        this.setState({
            scrollQuery:''
        })
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

    componentDidMount(){

    }

    handleClick(e){
        this.setState({
            scrollQuery:e,
        });
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
                                    <div className="showcourseoverview" onClick={()=>this.handleClick('共同必修')}>共同必修&nbsp;&nbsp;<font size={5} color='#338d68'>{this.state.totalitems.compulsory}</font>/{this.state.totalitems.compulse_require}&nbsp;學分<br/><LinearProgressExampleDeterminate grad={this.state.totalitems.compulsory/this.state.totalitems.compulse_require*100}/></div>
                                    <div className="showcourseoverview" onClick={()=>this.handleClick('核心課程')}>核心課程&nbsp;&nbsp;<font size={5} color='#338d68'>{this.state.totalitems.core}</font>/{this.state.totalitems.core_require}&nbsp;學分<br/><LinearProgressExampleDeterminate grad={this.state.totalitems.core/this.state.totalitems.core_require*100}/></div>
                                    <div className="showcourseoverview" onClick={()=>this.handleClick('服務學習')}>服務學習&nbsp;&nbsp;<font size={5} color='#338d68'>{this.state.totalitems.service}</font>/{this.state.totalitems.service_require}&nbsp;門<br/><LinearProgressExampleDeterminate grad={this.state.totalitems.service/this.state.totalitems.service_require*100}/></div>

                                </div>
                                <div className="overview-course" >
                                    <div className="showcourseoverview" onClick={()=>this.handleClick('英文授課')}>英文授課&nbsp;&nbsp;<font size={5} color='#338d68'>{this.state.totalitems.english}</font>/{this.state.totalitems.english_require}&nbsp;門<br/><LinearProgressExampleDeterminate grad={this.state.totalitems.english/this.state.totalitems.english_require*100}/></div>
                                    <div className="showcourseoverview" onClick={()=>this.handleClick('藝文賞析')}>藝文賞析&nbsp;&nbsp;<font size={5} color='#338d68'>{this.state.totalitems.art}</font>/{this.state.totalitems.art_require}&nbsp;門<br/><LinearProgressExampleDeterminate grad={this.state.totalitems.art/this.state.totalitems.art_require*100}/></div>
                                    <div className="showcourseoverview" onClick={()=>this.handleClick('其他選修')}>其他選修&nbsp;&nbsp;<font size={5} color='#338d68'>{this.state.totalitems.other}</font>/{this.state.totalitems.other_require}&nbsp;學分<br/><LinearProgressExampleDeterminate grad={this.state.totalitems.other/this.state.totalitems.other_require*100}/></div>
                                </div>
                                <div className="overview-course" >
                                    <div className="showcourseoverview" onClick={()=>this.handleClick('通識')}>通&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;識&nbsp;&nbsp;<font size={5} color='#338d68'>{this.state.totalitems.general}</font>/{this.state.totalitems.general_require}&nbsp;學分<br/><LinearProgressExampleDeterminate grad={this.state.totalitems.general/this.state.totalitems.general_require*100}/></div>
                                    <div className="showcourseoverview" onClick={()=>this.handleClick('體育')}>體&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;育&nbsp;&nbsp;<font size={5} color='#338d68'>{this.state.totalitems.pe}</font>/{this.state.totalitems.pe_require}&nbsp;門<br/><LinearProgressExampleDeterminate grad={this.state.totalitems.pe/this.state.totalitems.pe_require*100}/></div>
                                    <div className="showcourseoverview" onClick={()=>this.handleClick('外語')}>外&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;文&nbsp;&nbsp;<font size={5} color='#338d68'>{this.state.totalitems.language}</font>/{this.state.totalitems.language_require}&nbsp;學分<br/><LinearProgressExampleDeterminate grad={this.state.totalitems.language/this.state.totalitems.language_require*100}/></div>
                                </div>
                                <div className="overview-course" >
                                    <div className="showcourseoverview" onClick={()=>this.handleClick('副核心與他組核心')}>副核心與他組核心&nbsp;<font size={5} color='#338d68'>{this.state.totalitems.vice}</font>/{this.state.totalitems.vice_require}&nbsp;學分<br/><LinearProgressExampleDeterminate grad={this.state.totalitems.vice/this.state.totalitems.vice_require*100}/></div>
                                    <div className="showcourseoverview" onClick={()=>this.handleClick('專業選修')}>專業選修&nbsp;&nbsp;<font size={5} color='#338d68'>{this.state.totalitems.pro}</font>/{this.state.totalitems.pro_require}&nbsp;學分<br/><LinearProgressExampleDeterminate grad={this.state.totalitems.pro/this.state.totalitems.pro_require*100}/></div>
                                    <div className="showcourseoverview" onClick={()=>this.handleClick('抵免研究所課程')}>抵免研究所課程<font size={5} color='#338d68'>&nbsp;{this.state.totalitems.graduate}</font>&nbsp;學分<br/></div>
                                </div>
                            </div>
                        </div>
                        <div className="Grad-Row">
                            <div className="animated fadeIn">
                                {otherCourseType.map((item,key) =>
                                    <IndividualCourse
                                        key={key}
                                        pass={item.course}
                                        title={item.title}
                                        credit={item.credit}
                                        total={item.require}
                                        selection={item.selection}
                                        scroll={this.state.scrollQuery}
                                    />
                                )}

                                <div  className="little-form"  ref="my">
                                    <div id="little-title">
                                        <IndividualProgress grad={generalCourseType.credit/generalCourseType.require * 100}/>
                                        <div className="little-title-title">
                                            <div id="little-title-number"><font size={6} color='#338d68'>{generalCourseType.credit}</font>/{generalCourseType.require}(學分)</div>
                                            <div id="little-title-text" ><font size={generalCourseType.fontflag?5:6}>{generalCourseType.title}</font></div>
                                        </div>

                                    </div>
                                    <GeneralCourseList items={generalCourseType.course} scroll={this.state.scrollQuery}/>
                                </div>
                            </div>
                        </div>
                        <div id="graduate-footer"> </div>
                    </div>
                    <div id="printArea">
                        <PrintForm profile={this.props.studentProfile} graduationCheckEnglishTest={this.state.graduationCheckEnglishTest} courseCategoryArray={this.state.print_courseCategoryArray}/>
                    </div>
                </div>
                <div style={{display:this.props.isMod?"inline":"none"}}>
                    <MuiThemeProvider>
                        <App/>
                    </MuiThemeProvider>
                </div>
                </div>
            );


    }
}

export default Grad
