import React from 'react'

import './Graduation.css'
import GraduationForm from './GraduationForm'
import LinearProgressExampleDeterminate from './OverviewProgress'
import TopButton from './TopButton';
import CircularProgress from './CircularProgress'
import PrintForm from './GradTable/PrintForm'
import Toggle from 'material-ui/Toggle';
import {ToastContainer, ToastStore} from 'react-toasts';

import scrollToComponent from 'react-scroll-to-component'
import axios from 'axios'
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

let totalitems;
let items;
let Graduationitems;
const styles = {
    toggle: {
        padding:'10px 0 0 0',
        marginBottom: 0,
        maxWidth: 200,
    },
    labelStyle: {
        fontFamily: 'Noto Sans CJK TC',
        color: '#7B7B7B'
    },
};


class Grad extends React.Component {
    state={
        scrollQuery:'',
        isToggle:true
    };
    componentWillMount(){
        totalitems=this.props.result;
        items=this.props.items;
        Graduationitems=this.props.revise;
    }
    handleClick(e){
        this.setState({
            scrollQuery:e,
            isToggle:this.state.isToggle
        });
    }
    scrollTotop(){
        scrollToComponent(this.refs.my);
    }
    printGradTable() {
        window.print();

        return true;
    }
    componentWillUpdate(){
        if(this.state.isToggle){
            totalitems=this.props.reviseresult;
        }
        else{
            totalitems=this.props.result;
        }
    }
    handleToggle(){
        this.setState({
            scrollQuery:'',
            isToggle:!this.state.isToggle
        });
        if(this.state.isToggle){
            ToastStore.info(<div  className="text">已幫您自動排序，此為系統自動排序僅以參考為主。</div>);
        }
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
                            <MuiThemeProvider>
                                <Toggle
                                label="系統自動排課"
                                style={styles.toggle}
                                labelStyle={styles.labelStyle}
                                onToggle={(toggled)=>this.handleToggle()}
                                />
                            </MuiThemeProvider>
                        </div>

                        <div id="print-button" style={{
                            height: '40px',
                            width: '65px',
                            padding: '5px 0 0 0',
                            float: 'right',
                            position: 'absolute',
                            right: '50px'
                        }}>
                            <MuiThemeProvider>
                                <RaisedButton style={{
                                    width: '13%',
                                    fontFamily: 'Noto Sans CJK TC',
                                }}  backgroundColor = "#DDDDDD" label="列印" onClick={() => this.printGradTable()}/>
                            </MuiThemeProvider>
                        </div>
                        <div className="schedule-bar">
                            <div className="circle-progress">
                                <div className="circle-in">畢業{totalitems.total}/{totalitems.total_require}</div>
                                <CircularProgress grad={totalitems.total/totalitems.total_require*100}/>
                            </div>
                                <div className="overview">
                                <div className="overview-course" >
                                    <div className="showcourseoverview" onClick={()=>this.handleClick('共同必修')}>共同必修&nbsp;&nbsp;<font size={5} color='#338d68'>{totalitems.compulsory}</font>/{totalitems.compulse_require}&nbsp;學分<br/><LinearProgressExampleDeterminate grad={totalitems.compulsory/totalitems.compulse_require*100}/></div>
                                    <div className="showcourseoverview" onClick={()=>this.handleClick('核心課程')}>核心課程&nbsp;&nbsp;<font size={5} color='#338d68'>{totalitems.core}</font>/{totalitems.core_require}&nbsp;學分<br/><LinearProgressExampleDeterminate grad={totalitems.core/totalitems.core_require*100}/></div>
                                </div>
                                <div className="overview-course" >
                                    <div className="showcourseoverview" onClick={()=>this.handleClick('副核心與他組核心')}>副核心與他組核心&nbsp;<font size={5} color='#338d68'>{totalitems.vice}</font>/{totalitems.vice_require}&nbsp;學分<br/><LinearProgressExampleDeterminate grad={totalitems.vice/totalitems.vice_require*100}/></div>
                                    <div className="showcourseoverview" onClick={()=>this.handleClick('專業選修')}>專業選修&nbsp;&nbsp;<font size={5} color='#338d68'>{totalitems.pro}</font>/{totalitems.pro_require}&nbsp;學分<br/><LinearProgressExampleDeterminate grad={totalitems.pro/totalitems.pro_require*100}/></div>
                                </div>
                                <div className="overview-course" >
                                    <div className="showcourseoverview" onClick={()=>this.handleClick('英文測驗')}>英語修課&nbsp;&nbsp;<font size={5} color='#338d68'>{totalitems.english}</font>/{totalitems.english_require}&nbsp;次<br/><LinearProgressExampleDeterminate grad={totalitems.english/totalitems.english_require*100}/></div>
                                    <div className="showcourseoverview" onClick={()=>this.handleClick('其他選修')}>其他選修&nbsp;&nbsp;<font size={5} color='#338d68'>{totalitems.other}</font>/{totalitems.other_require}&nbsp;學分<br/><LinearProgressExampleDeterminate grad={totalitems.other/totalitems.other_require*100}/></div>
                                </div>
                                <div className="overview-course" >
                                    <div className="showcourseoverview" onClick={()=>this.handleClick('通識')}>通&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;識&nbsp;&nbsp;<font size={5} color='#338d68'>{totalitems.general}</font>/{totalitems.general_require}&nbsp;學分<br/><LinearProgressExampleDeterminate grad={totalitems.general/totalitems.general_require*100}/></div>
                                    <div className="showcourseoverview" onClick={()=>this.handleClick('體育')}>體&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;育&nbsp;&nbsp;<font size={5} color='#338d68'>{totalitems.pe}</font>/{totalitems.pe_require}&nbsp;門<br/><LinearProgressExampleDeterminate grad={totalitems.pe/totalitems.pe_require*100}/></div>
                                </div>
                                <div className="overview-course" >
                                    <div className="showcourseoverview" onClick={()=>this.handleClick('外語')}>外&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;文&nbsp;&nbsp;<font size={5} color='#338d68'>{totalitems.language}</font>/{totalitems.language_require}&nbsp;學分<br/><LinearProgressExampleDeterminate grad={totalitems.language/totalitems.language_require*100}/></div>
                                    <div className="showcourseoverview" onClick={()=>this.handleClick('藝文賞析')}>藝文賞析&nbsp;&nbsp;<font size={5} color='#338d68'>{totalitems.art}</font>/{totalitems.art_require}&nbsp;門<br/><LinearProgressExampleDeterminate grad={totalitems.art/totalitems.art_require*100}/></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="Grad-Row">
                        <GraduationForm isToggle={this.state.isToggle} items={items} graditems={Graduationitems} scroll={this.state.scrollQuery}/>
                    </div>
                    <div id="printArea">
                        <PrintForm/>
                    </div>
                    <div id="graduate-footer"> </div>
                </div>
            </div>
        )
    }
}

export default Grad