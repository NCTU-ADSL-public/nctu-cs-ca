import React from 'react'

import './Graduation.css'
import GraduationForm from './GraduationForm'
import LinearProgressExampleDeterminate from './OverviewProgress'
import TopButton from './TopButton';
import CircularProgress from './CircularProgress'
import PrintForm from './GradTable/PrintForm'
import Toggle from 'material-ui/Toggle';
import {ToastContainer, ToastStore} from 'react-toasts';
import Popover from 'react-simple-popover';
import ReactHover from 'react-hover';

import scrollToComponent from 'react-scroll-to-component'
import IconButton from 'material-ui/IconButton';
import ActionGrade from 'material-ui/svg-icons/image/assistant';
import axios from 'axios'
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

let test={"check":{"state":false}}

const styles = {
    toggle: {
        marginBottom: 0,
        maxWidth: 200,
        width:'500px',
        float:'left',
        margin:'10px 10px 0 20px',
    },
    button: {
        margin:'5px 10px 0 0px',
        width:'100px',
        float:'left'
    },
    labelStyle: {
        fontFamily: 'Noto Sans CJK TC',
        color: '#7B7B7B'
    },
    medium:{
        padding:'10px 0 0 5px',
        width: 10,
        height: 10,
        float:'left',
        color: '#7B7B7B'
    }
};


const optionsCursorTrueWithMargin = {
    followCursor: true,
    shiftX: 10,
    shiftY: -30
};

class Grad extends React.Component {
    state={
        scrollQuery:'',
        isToggle:true,
        open:false,
        graduationCheck:false,
        Graduationitems:[],
        items:[],
        totalitems:[],
        courseCategoryArray:[],
    };
    componentWillMount(){
        this.setState({
            items:this.props.items,
            Graduationitems:this.props.revise,
            totalitems:this.props.result
        });
        let _this=this;
        axios.get('/students/graduate/check').then(studentData => {
            _this.setState({
                graduationCheck : studentData.data.check.state
            })
        }).catch(err => {
            console.log(err);
        });
    }
    handleClick(e){
        this.setState({
            scrollQuery:e,
        });
    }
    scrollTotop(){
        scrollToComponent(this.refs.my);
    }
    printGradTable() {
        window.print();

        return true;
    }
    handleToggle(){
        this.setState({
            scrollQuery:'',
            isToggle:!this.state.isToggle
        });
        if(this.state.isToggle){
            this.setState({
                totalitems:this.props.reviseresult
            });
            ToastStore.info(<div  className="text">已幫您自動排序，此為系統自動排序僅以參考為主。</div>);
        }
        else{
            this.setState({
                totalitems:this.props.result
            });
        }
    }
    handleClickview(e) {
        this.setState({
            open: !this.state.open,
            isToggle:this.state.isToggle
        });
    }


    handleClose(e) {
        this.setState({
            open: false
        });
    }
    sendReview(){
        axios.post('/students/graduate/check', {
            check:{state:true}
        })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
        this.setState({
            graduationCheck:true,
        })

    }
    render(){
        return (
            <div>
                <div id="font_adjust">
                    <ToastContainer store={ToastStore}/>
                    <div className="fixed" onClick={()=>this.scrollTotop()}>
                        <TopButton/>
                    </div>
                    <div className="Grad-title-adjust" ref="my">
                        <div className="Grad-title-text">
                            <div id="lessons-title">畢業預審</div><div id="lessons-little-title-grad">-資工系{this.props.studentId}</div>
                        </div>

                        <div className="tip">
                            <div className="green"> </div><div className="text">已通過</div>
                            <div className="red"> </div><div  className="text">未通過</div>
                            <div className="gray"> </div><div  className="text">未修課</div>
                            <div className="yellow"> </div><div  className="text">抵免課程</div>
                            <ReactHover
                                options={optionsCursorTrueWithMargin}>
                                <ReactHover.Trigger>
                                    <MuiThemeProvider>
                                        <RaisedButton
                                            label="確認送審"
                                            style={styles.button}
                                            labelStyle={styles.labelStyle}
                                            backgroundColor = "#DDDDDD"
                                            onClick={() => this.sendReview()}
                                        />
                                    </MuiThemeProvider>
                                </ReactHover.Trigger>
                                <ReactHover.Hover>
                                    <div className="grad-hover-info">{this.state.graduationCheck?"已送審":"尚未送審"}</div>
                                </ReactHover.Hover>
                            </ReactHover>
                            <MuiThemeProvider>
                                <RaisedButton style={styles.button}
                                              labelStyle={styles.labelStyle}
                                              backgroundColor = "#DDDDDD"
                                              label="列印"
                                              onClick={() => this.printGradTable()}/>
                            </MuiThemeProvider>
                            <MuiThemeProvider>
                                <Toggle
                                label="系統自動排課"
                                style={styles.toggle}
                                labelStyle={styles.labelStyle}
                                onToggle={(toggled)=>this.handleToggle()}
                                />
                            </MuiThemeProvider>
                            <MuiThemeProvider>
                                <IconButton style={styles.medium} tooltip="排序依據"  tooltipPosition="top-right"  ref="target" onClick={()=>this.handleClickview()}>
                                    <ActionGrade />
                                </IconButton>
                            </MuiThemeProvider>
                            <Popover
                                placement='left'
                                target={this.refs.target}
                                show={this.state.open}
                                onHide={this.handleClose.bind(this)}
                            > 排序依據:
                                - 共同必修（多的應該只會有物化生）
                                - 依 Priority 物理 -> 化學 -> 生物 往 專業選修搬 (物理要記得+2)
                                - 如果共同必修沒滿 -> Return 不能畢業
                                - 多的課程再搬到專業選修之前,先看專業選修有沒有滿,若有,則搬到其他選修
                                - 核心課程
                                - 如果核心課程沒滿 -> Return 不能畢業
                                - 多的課程在搬到專業選修之前,先看專業選修有沒有滿,若有,則搬到其他選修
                                - 副核心課程
                                - 多的學分全部塞到專業
                                - 如果副核心沒滿 -> Return 不能畢業
                                - 多的課程再搬到專業選修之前,先看專業選修有沒有滿,若有,則搬到其他選修
                                - 專業選修
                                - 多的學分全部塞到其他必修
                                - 如果專業選修沒滿 -> Return 不能畢業
                            </Popover>
                        </div>
                        <div className="schedule-bar">
                            <div className="circle-progress">
                                <div className="circle-in">畢業{this.state.totalitems.total}/{this.state.totalitems.total_require}</div>
                                <CircularProgress grad={this.state.totalitems.total/this.state.totalitems.total_require*100}/>
                            </div>
                                <div className="overview">
                                <div className="overview-course" >
                                    <div className="showcourseoverview" onClick={()=>this.handleClick('共同必修')}>共同必修&nbsp;&nbsp;<font size={5} color='#338d68'>{this.state.totalitems.compulsory}</font>/{this.state.totalitems.compulse_require}&nbsp;學分<br/><LinearProgressExampleDeterminate grad={this.state.totalitems.compulsory/this.state.totalitems.compulse_require*100}/></div>
                                    <div className="showcourseoverview" onClick={()=>this.handleClick('核心課程')}>核心課程&nbsp;&nbsp;<font size={5} color='#338d68'>{this.state.totalitems.core}</font>/{this.state.totalitems.core_require}&nbsp;學分<br/><LinearProgressExampleDeterminate grad={this.state.totalitems.core/this.state.totalitems.core_require*100}/></div>
                                </div>
                                <div className="overview-course" >
                                    <div className="showcourseoverview" onClick={()=>this.handleClick('副核心與他組核心')}>副核心與他組核心&nbsp;<font size={5} color='#338d68'>{this.state.totalitems.vice}</font>/{this.state.totalitems.vice_require}&nbsp;學分<br/><LinearProgressExampleDeterminate grad={this.state.totalitems.vice/this.state.totalitems.vice_require*100}/></div>
                                    <div className="showcourseoverview" onClick={()=>this.handleClick('專業選修')}>專業選修&nbsp;&nbsp;<font size={5} color='#338d68'>{this.state.totalitems.pro}</font>/{this.state.totalitems.pro_require}&nbsp;學分<br/><LinearProgressExampleDeterminate grad={this.state.totalitems.pro/this.state.totalitems.pro_require*100}/></div>
                                </div>
                                <div className="overview-course" >
                                    <div className="showcourseoverview" onClick={()=>this.handleClick('英文授課')}>英文授課&nbsp;&nbsp;<font size={5} color='#338d68'>{this.state.totalitems.english}</font>/{this.state.totalitems.english_require}&nbsp;門<br/><LinearProgressExampleDeterminate grad={this.state.totalitems.english/this.state.totalitems.english_require*100}/></div>
                                    <div className="showcourseoverview" onClick={()=>this.handleClick('其他選修')}>其他選修&nbsp;&nbsp;<font size={5} color='#338d68'>{this.state.totalitems.other}</font>/{this.state.totalitems.other_require}&nbsp;學分<br/><LinearProgressExampleDeterminate grad={this.state.totalitems.other/this.state.totalitems.other_require*100}/></div>
                                </div>
                                <div className="overview-course" >
                                    <div className="showcourseoverview" onClick={()=>this.handleClick('通識')}>通&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;識&nbsp;&nbsp;<font size={5} color='#338d68'>{this.state.totalitems.general}</font>/{this.state.totalitems.general_require}&nbsp;學分<br/><LinearProgressExampleDeterminate grad={this.state.totalitems.general/this.state.totalitems.general_require*100}/></div>
                                    <div className="showcourseoverview" onClick={()=>this.handleClick('體育')}>體&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;育&nbsp;&nbsp;<font size={5} color='#338d68'>{this.state.totalitems.pe}</font>/{this.state.totalitems.pe_require}&nbsp;門<br/><LinearProgressExampleDeterminate grad={this.state.totalitems.pe/this.state.totalitems.pe_require*100}/></div>
                                </div>
                                <div className="overview-course" >
                                    <div className="showcourseoverview" onClick={()=>this.handleClick('外語')}>外&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;文&nbsp;&nbsp;<font size={5} color='#338d68'>{this.state.totalitems.language}</font>/{this.state.totalitems.language_require}&nbsp;學分<br/><LinearProgressExampleDeterminate grad={this.state.totalitems.language/this.state.totalitems.language_require*100}/></div>
                                    <div className="showcourseoverview" onClick={()=>this.handleClick('藝文賞析')}>藝文賞析&nbsp;&nbsp;<font size={5} color='#338d68'>{this.state.totalitems.art}</font>/{this.state.totalitems.art_require}&nbsp;門<br/><LinearProgressExampleDeterminate grad={this.state.totalitems.art/this.state.totalitems.art_require*100}/></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="Grad-Row">
                        <GraduationForm isToggle={this.state.isToggle} items={this.state.items} graditems={this.state.Graduationitems} scroll={this.state.scrollQuery}/>
                    </div>
                    <div id="graduate-footer"> </div>
                </div>
                <div id="printArea">
                    <PrintForm program={this.props.studentId} courseCategoryArray={this.props.courseCategoryArray}/>
                </div>
            </div>
        )
    }
}

export default Grad