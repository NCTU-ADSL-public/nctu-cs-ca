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
import Dialog from 'material-ui/Dialog';

import scrollToComponent from 'react-scroll-to-component'
import IconButton from 'material-ui/IconButton';
import ActionGrade from 'material-ui/svg-icons/image/assistant';
import axios from 'axios'
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const styles = {
    toggle: {
        marginBottom: 0,
        maxWidth: 200,
        width:'400px',
        float:'left',
        margin:'15px 10px 0 20px',
    },
    button: {
        margin:'9px 10px 0 0px',
        width:'100px',
        float:'left'
    },
    buttonDia: {
        margin:'0 10px 0 10px',
        width:'100px'
    },
    buttonEn: {
        margin:'9px 10px 0 0px',
        width:'250px',
        float:'left'
    },
    labelStyle: {
        fontFamily: 'Noto Sans CJK TC',
        color: '#7B7B7B'
    },
    medium:{
        padding:'15px 0 0 5px',
        width: 10,
        height: 10,
        float:'left',
        color: '#7B7B7B'
    },
    pop:{
        width:'auto',
        height: 'auto',
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
        opendialog: false,
        opendialogEn: false,
        opendialog1: false,
        opendialogprint: false,
        graduationCheck:false,
        graduationCheckEnglishTest:"0",
        Graduationitems:[],
        items:[],
        totalitems:[],
        courseCategoryArray:[],
        Result:[],
        ReviseResult:[],
        print_courseCategoryArray:[],
    };
    componentWillMount(){
        this.setState({
            items:this.props.items,
            Graduationitems:this.props.revise,
            Result:this.props.result,
            ReviseResult:this.props.reviseresult,
            totalitems:this.props.result,
            print_courseCategoryArray:this.props.courseCategoryArray,
        });
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

    //For updating as props changes!!!
    componentDidUpdate(prevProps, prevState){
        if( prevProps.items !== this.props.items ||
            prevProps.revise !== this.props.revise ||
            prevProps.result !== this.props.result ) {
            this.setState({
                items:this.props.items,
                Graduationitems:this.props.revise,
                totalitems:this.props.result
            });
        }
    }

    handleClick(e){
        this.setState({
            scrollQuery:e,
        });
    }
    scrollTotop(){
        scrollToComponent(this.refs.my);
    }
    printGradTable(fileName) {
        let original = document.title;
        if (fileName !== null)
            document.title = fileName;
        window.print();
        document.title = original;
        this.setState({
            scrollQuery:'',opendialogprint: true});
        return true;
    }
    handleToggle(){
        this.setState({
            scrollQuery:'',
            isToggle:!this.state.isToggle
        });
        if(this.state.isToggle){
            this.setState({
                totalitems:this.state.ReviseResult
            });
            ToastStore.info(<div  className="text">已幫您自動排序，欲知排序依據請點選自動排序旁的星號標誌，此為系統自動排序僅以參考為主。</div>, 10000);
        }
        else{
            this.setState({
                totalitems:this.state.Result
            });
        }
    }
    handleClickview(e) {
        this.setState({
            scrollQuery:'',
            open: !this.state.open,
            isToggle:this.state.isToggle
        });
    }


    handleClose(e) {
        this.setState({
            scrollQuery:'',
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
                window.location.replace("/");
                console.log(err)
            });
        this.setState({
            graduationCheck:true,
            opendialog1: false
        });

    }
    sendEnglishTest1(){
        let _this=this;
        axios.post('/students/graduate/english', {
            "check1":{"state":true}, "check2":{"state":true}
        })
            .then(res => {
                _this.setState({
                    graduationCheckEnglishTest : res.data.check.state
                });
                this.EnglishCallBack();
            })
            .catch(err => {
                window.location.replace("/");
                console.log(err)
            });
        _this.setState({
            graduationCheckEnglishTest:"1",
            opendialog: false,
            opendialogEn:false
        });
    }

    sendEnglishTest2(e){
        let _this=this;
        axios.post('/students/graduate/english', {
            "check1":{"state":false}, "check2":{"state":e}
        })
            .then(res => {
                _this.setState({
                    graduationCheckEnglishTest : res.data.check.state
                })
                this.EnglishCallBack();
            })
            .catch(err => {
                window.location.replace("/");
                console.log(err)
            });
        if(e){
            _this.setState({
                graduationCheckEnglishTest:"21",
                opendialog: false,
                opendialogEn:false
            });
        }
        else{
            _this.setState({
                graduationCheckEnglishTest:"22",
                opendialog: false,
                opendialogEn:false
            });
        }
    }

    EnglishCallBack(){
        let Graduationitems=[
            { title: '必修課程',
                credit: '80',
                require: '60',
                selection: true,
                course:
                    [ {"cn":"資料庫系統概論","en":"Introduction to Database Systems","code":"DCP1187","score":-1,"complete":"false","english":false,"grade":"0","year":4,"semester":1,"reason":"CS"},{ cn: '作業系統概論', en: 'Introduction to Operating Systems',"score":60 ,complete:true, grade:'0'},
                        { cn: '基礎程式設計', en: 'Basic Programming',"score":60  ,complete:true, grade:'C'},
                        { cn: '微積分(一)', en: 'Calculus (I)' ,"score":60 ,complete:true, grade:'B',reason:'now'},
                        { cn: '微積分(二)', en: 'Calculus (II)',"score":60  ,complete:true, grade:'A'},
                        { cn: '微處理機系統實驗', en: 'Microprocessor System Lab.',"score":60  ,complete:true, reason:'notCS', grade:'0'},
                        { cn: '數位電路設計', en: 'Digital Circuit Design',"score":60  ,complete:false, reason:'now', realCredit:3},
                        { cn: '機率', en: 'Probability' ,"score":60 ,complete:true, reason:'free1'},
                        { cn: '正規語言概論', en: 'Introduction to Formal Language' ,complete:true,"score":60 , reason:'free2'},
                        { cn: '演算法概論', en: 'Introduction to Algorithms' ,complete:false,"score":60 },
                        { cn: '物化生三合一(一)', en: '' ,complete:true,"score":60 },
                        { cn: '物化生三合一(二)', en: '' ,complete:true,"score":60 },
                        { cn: '線性代數', en: 'Linear Algebra' ,complete:true},
                        { cn: '編譯器設計概論', en: 'Intro. to Compiler Design' ,complete:true},
                        { cn: '計算機概論與程式設計',
                            en: 'Introduction to Computers and Programming' ,complete:true},
                        { cn: '計算機組織', en: 'Computer Organization' ,complete:true},
                        { cn: '計算機網路概論', en: 'Intro. to Computer Networks' ,complete:true},
                        { cn: '資料結構與物件導向程式設計',
                            en: 'Data Structures and Object-oriented Programming' ,complete:true},
                        { cn: '資訊工程專題(一)',
                            en: 'Computer Science and Engineering Projects (I)' ,complete:true},
                        { cn: '資訊工程專題(二)',
                            en: 'Computer Science and Engineering Projects (II)' ,complete:true},
                        { cn: '資訊工程研討', en: 'Computer Science Seminars' ,complete:true},
                        { cn: '離散數學', en: 'Discrete Mathematics' ,complete:true} ],
                notPas: [],
                complete: 'True' },
            { title: '通識',
                credit: 16,
                require: 20,
                course:
                    [ { cn: '心理學概論', en: '', dimension: '群己', complete: true },
                        { cn: '當代世界:環境危機與生態永續', en: '', dimension: '通識', complete: true,"score":60 },
                        { cn: '幾何造形', en: '', dimension: '自然', complete: true,"score":60 },
                        { cn: '經濟學概論', en: '', dimension: '歷史', complete: true ,reason:'now'},
                        { cn: '霸權興衰史:從十五世紀至當代', en: '', dimension: '歷史', complete: true ,"score":60,reason:'free2'},
                        { cn: '紀錄片製作概論', en: '', dimension: '歷史', complete: true ,"score":60},
                        { cn: '台灣史', en: '', dimension: '歷史', complete: true ,"score":60},
                        { cn: '當代中國：全球化下的兩岸關係', en: '', dimension: '歷史', complete: true ,"score":60} ] },
            { title: '副核心課程與他組核心',
                credit: 16,
                require: 20,
                course:
                    [ { cn: '心理學概論', en: '', dimension: '群己', complete: true },
                        { cn: '當代世界:環境危機與生態永續', en: '', dimension: '通識', complete: true },
                        { cn: '幾何造形', en: '', dimension: '自然', complete: true },
                        { cn: '經濟學概論', en: '', dimension: '歷史', complete: true } ] },
            { title: '核心課程',
                credit: 16,
                require: 20,
                course:
                    [ { cn: '心理學概論', en: '', dimension: '群己', complete: true },
                        { cn: '當代世界:環境危機與生態永續', en: '', dimension: '通識', complete: true },
                        { cn: '幾何造形', en: '', dimension: '自然', complete: true },
                        { cn: '經濟學概論', en: '', dimension: '歷史', complete: true } ] },
            { title: '體育',
                credit: 16,
                require: 20,
                course:
                    [ { cn: '心理學概論', en: '', dimension: '群己', complete: true },
                        { cn: '當代世界:環境危機與生態永續', en: '', dimension: '通識', complete: true },
                        { cn: '幾何造形', en: '', dimension: '自然', complete: true },
                        { cn: '經濟學概論', en: '', dimension: '歷史', complete: true } ] },
            { title: '外文',
                credit: '20',
                require: '60',
                course:
                    [ { cn: '作業系統概論', en: 'Introduction to Operating Systems' ,complete:true},
                        { cn: '基礎程式設計', en: 'Basic Programming' ,complete:true},
                        { cn: '微積分(一)', en: 'Calculus (I)' ,complete:true},
                        { cn: '微積分(二)', en: 'Calculus (II)' ,complete:true},
                        { cn: '微處理機系統實驗', en: 'Microprocessor System Lab.' ,complete:true},
                        { cn: '數位電路設計', en: 'Digital Circuit Design' ,complete:true},
                        { cn: '機率', en: 'Probability' },
                        { cn: '正規語言概論', en: 'Introduction to Formal Language' ,complete:true},
                        { cn: '演算法概論', en: 'Introduction to Algorithms' ,complete:true},
                        { cn: '物化生三合一(一)', en: '' ,complete:true},
                        { cn: '物化生三合一(二)', en: '' ,complete:true},
                        { cn: '線性代數', en: 'Linear Algebra' ,complete:true},
                        { cn: '編譯器設計概論', en: 'Intro. to Compiler Design' ,complete:true},
                        { cn: '計算機概論與程式設計',
                            en: 'Introduction to Computers and Programming' ,complete:true},
                        { cn: '計算機組織', en: 'Computer Organization' ,complete:true},
                        { cn: '計算機網路概論', en: 'Intro. to Computer Networks' ,complete:true},
                        { cn: '資料結構與物件導向程式設計',
                            en: 'Data Structures and Object-oriented Programming' ,complete:true},
                        { cn: '資訊工程專題(一)',
                            en: 'Computer Science and Engineering Projects (I)' ,complete:true},
                        { cn: '資訊工程專題(二)',
                            en: 'Computer Science and Engineering Projects (II)' ,complete:true},
                        { cn: '資訊工程研討', en: 'Computer Science Seminars' ,complete:true},
                        { cn: '離散數學', en: 'Discrete Mathematics' ,complete:true} ],
                notPas: [],
                complete: 'True' },{},{},{},{},{"total":113,"total_require":128,"compulsory":55,"compulse_require":58,"core":9,"core_require":"9","vice":9,"vice_require":"9","pro":9,"pro_require":"12","english":0,"english_require":1,"other":0,"other_require":"12","general":20,"general_require":20,"pe":6,"pe_require":6,"language":10,"language_require":8,"service":2,"service_require":2,"art":2,"art_require":2}

        ];
        let _this=this;
        this.setState({
            Graduationitems:Graduationitems,
            ReviseResult:Graduationitems[10],
        });

        if(this.props.assistant){
            axios.get('/assistants/graduate/revised', {
                params: {
                    student_id: this.props.studentProfile.student_id,
                }
            }).then(studentData => {
                _this.setState({
                    Graduationitems: studentData.data,
                    ReviseResult: studentData.data[10],
                })
            }).catch(err => {
                console.log(err);
            });

            axios.get('/assistants/graduate/original', {
                params: {
                    student_id: this.props.studentProfile.student_id,
                }
            }).then(studentData => {
                _this.setState({
                    items: studentData.data,
                    Result: studentData.data[10],
                })
            }).catch(err => {
                console.log(err);
            });
            axios.get('/assistants/graduate/print', {
                params: {
                    student_id: this.props.studentProfile.student_id,
                }
            }).then(function (resp) {
                _this.setState({
                    print_courseCategoryArray: resp.data
                });
            }).catch(err => {
                console.log(err);
            });

        }else {
            axios.get('/students/graduate/revised').then(studentData => {
                _this.setState({
                    Graduationitems: studentData.data,
                    ReviseResult: studentData.data[10],
                })
            }).catch(err => {
                console.log(err);
            });

            axios.get('/students/graduate/original').then(studentData => {
                _this.setState({
                    items: studentData.data,
                    Result: studentData.data[10],
                })
            }).catch(err => {
                console.log(err);
            });
            axios.get('/students/graduate/print').then(function (resp) {
                _this.setState({
                    print_courseCategoryArray: resp.data
                });
            }).catch(err => {
                console.log(err);
            });
        }
        this.props.ReloadGrad();

    }

    handleClosedialog1 = () => {
        this.setState({
            scrollQuery:'',opendialog1: false});
    };

    handleOpen1 = () => {
        this.setState({
            scrollQuery:'',opendialog1: true});
    };

    handleClosedialogprint = () => {
        this.setState({opendialogprint: false});
    };

    handleClosedialogEn = () => {
        this.setState({opendialogEn: false});
    };

    handleOpenEn = () => {
        this.setState({
            scrollQuery:'',opendialogEn: true});
    };

    handleOpenEn2 = () => {
        this.setState({
            scrollQuery:'',opendialog: true});
    };

    handleClosedialogEn2 = () => {
        this.setState({opendialog: false});
    };

    componentDidMount(){
        if(this.state.graduationCheckEnglishTest==="0"){
            ToastStore.warning(<div  className="text">請確認英文狀態。</div>, 5000);
        }
    }
    render(){

        const actions1 = [

            <MuiThemeProvider>
                <RaisedButton style={styles.buttonDia}
                              labelStyle={styles.labelStyle}
                              backgroundColor = "#DDDDDD"
                              label="取消"
                              keyboardFocused={true}
                              onClick={this.handleClosedialog1}/>
            </MuiThemeProvider>,
            <MuiThemeProvider>
                <RaisedButton style={styles.buttonDia}
                              labelStyle={styles.labelStyle}
                              backgroundColor = "#DDDDDD"
                              label="確認"
                              keyboardFocused={true}
                              onClick={() => this.sendReview()}
                />
            </MuiThemeProvider>,
        ];

        const actions2 = [

            <MuiThemeProvider>
                <RaisedButton style={styles.buttonDia}
                              labelStyle={styles.labelStyle}
                              backgroundColor = "#DDDDDD"
                              label="否"
                              keyboardFocused={true}
                              onClick={()=>this.sendEnglishTest2(false)}/>
            </MuiThemeProvider>,
            <MuiThemeProvider>
                <RaisedButton style={styles.buttonDia}
                              labelStyle={styles.labelStyle}
                              backgroundColor = "#DDDDDD"
                              label="是"
                              keyboardFocused={true}
                              onClick={()=>this.sendEnglishTest2(true)}
            />
            </MuiThemeProvider>,
        ];

        const actions21 = [

            <MuiThemeProvider>
                <RaisedButton style={styles.buttonDia}
                              labelStyle={styles.labelStyle}
                              backgroundColor = "#DDDDDD"
                              label="否"
                              keyboardFocused={true}
                              onClick={()=>this.handleOpenEn2()}/>
            </MuiThemeProvider>,
            <MuiThemeProvider>
                <RaisedButton style={styles.buttonDia}
                              labelStyle={styles.labelStyle}
                              backgroundColor = "#DDDDDD"
                              label="是"
                              keyboardFocused={true}
                              onClick={()=>this.sendEnglishTest1(true)}
            />
            </MuiThemeProvider>,
        ];

        const actions3 = [

            <MuiThemeProvider>
                <RaisedButton style={styles.buttonDia}
                              labelStyle={styles.labelStyle}
                              backgroundColor = "#DDDDDD"
                              label="確認"
                              keyboardFocused={true}
                              onClick={this.handleClosedialogprint}/>
            </MuiThemeProvider>
        ];
            return (
                <div>
                    <div className="font_adjust">
                        <ToastContainer store={ToastStore}/>
                        <div className="fixed" onClick={()=>this.scrollTotop()}>
                            <TopButton/>
                        </div>
                        <div className="Grad-title-adjust" ref="my">
                            <div className="Grad-title-text">
                                {this.props.assistant?
                                    <div>
                                        <div id="lessons-little-title-grad">資工系{this.props.studentProfile.program}組 - {this.props.studentProfile.student_id}{this.props.studentProfile.sname}</div>
                                    </div>
                                    :
                                    <div>
                                        <div id="lessons-title">畢業預審</div>
                                        <div id="lessons-little-title-grad">-資工系{this.props.studentProfile.program}組</div>
                                    </div>
                                }

                            </div>

                            <div className="tip">
                                <div className="green"> </div><div className="text">已通過</div>
                                <div className="red"> </div><div  className="text">未通過</div>
                                <div className="gray"> </div><div  className="text">未修課</div>
                                <div className="yellow"> </div><div  className="text">未抵免課程</div>
                                <div className="purple"> </div><div  className="text">免修或抵免課程</div>
                                <div className="blue"> </div><div  className="text">當期課程</div>
                                <div>
                                    <ReactHover options={optionsCursorTrueWithMargin}>
                                        <ReactHover.Trigger type='trigger'>
                                            <MuiThemeProvider>
                                                <RaisedButton
                                                    label={ this.props.assistant ?
                                                        this.state.graduationCheck?"已送審":"未送審"
                                                        :
                                                        this.state.graduationCheck?"已送審":"確認送審"}
                                                    disabled={this.props.assistant ?true : (this.state.graduationCheck || this.state.graduationCheckEnglishTest==="0")}
                                                    style={styles.button}
                                                    labelStyle={styles.labelStyle}
                                                    backgroundColor = "#DDDDDD"
                                                    onClick={this.handleOpen1}
                                                />
                                            </MuiThemeProvider>
                                        </ReactHover.Trigger>
                                        <ReactHover.Hover type='hover'>
                                        </ReactHover.Hover>
                                    </ReactHover>

                                    <MuiThemeProvider>
                                        <Dialog
                                            title="注意"
                                            actions={actions1}
                                            modal={false}
                                            style={styles.labelStyle}
                                            open={this.state.opendialog1}
                                            onRequestClose={this.handleClosedialog1}
                                        >
                                            <div style={styles.labelStyle}>按下確認將畢業預審送交系辦。</div>
                                        </Dialog>
                                    </MuiThemeProvider>
                                    <MuiThemeProvider>
                                        <RaisedButton style={styles.button}
                                                      labelStyle={styles.labelStyle}
                                                      backgroundColor = "#DDDDDD"
                                                      label="列印"
                                                      disabled={this.state.graduationCheckEnglishTest==="0"}
                                                      onClick={() => this.printGradTable('103學年度畢業預審表-'+this.props.studentProfile.student_id)}/>
                                    </MuiThemeProvider>

                                    <MuiThemeProvider>
                                        <Dialog
                                            title="注意"
                                            actions={actions3}
                                            modal={false}
                                            style={styles.labelStyle}
                                            open={this.state.opendialogprint}
                                            onRequestClose={this.handleClosedialogprint}
                                        >
                                            <div style={styles.labelStyle}>列印系統所排之課程預審。<br/>專業選修, 其他選修,外文,的課程請自行填寫調整。</div>
                                        </Dialog>
                                    </MuiThemeProvider>
                                    <div className={this.state.graduationCheckEnglishTest!=="0"?"":"animated swing"}>
                                        <MuiThemeProvider>
                                            <RaisedButton style={styles.buttonEn}
                                                          labelStyle={styles.labelStyle}
                                                          backgroundColor = "#DDDDDD"
                                                          ref="targetEn"
                                                          label={this.state.graduationCheckEnglishTest!=="0"?(this.state.graduationCheckEnglishTest==="21")?"已考過英檢":(this.state.graduationCheckEnglishTest==="22")?"未考過英檢":"英文已抵免或換修":"確認英文狀態?"}
                                                          disabled={this.props.assistant}
                                                          onClick={this.handleOpenEn}/>
                                        </MuiThemeProvider>
                                    </div>
                                    <MuiThemeProvider>
                                        <Dialog
                                            title="注意"
                                            actions={actions21}
                                            modal={false}
                                            style={styles.labelStyle}
                                            open={this.state.opendialogEn}
                                            onRequestClose={this.handleClosedialogEn}
                                        >
                                            <div style={styles.labelStyle}>英文有沒有抵免或換修?</div>
                                        </Dialog>
                                    </MuiThemeProvider>
                                    <MuiThemeProvider>
                                        <Dialog
                                            title="注意"
                                            actions={actions2}
                                            modal={false}
                                            style={styles.labelStyle}
                                            open={this.state.opendialog}
                                            onRequestClose={this.handleClosedialogEn2}
                                        >
                                            <div style={styles.labelStyle}>是否通過英檢?</div>
                                        </Dialog>
                                    </MuiThemeProvider>
                                    <MuiThemeProvider>
                                        <Toggle
                                            label="系統自動排序"
                                            style={styles.toggle}
                                            labelStyle={styles.labelStyle}
                                            onToggle={(toggled)=>this.handleToggle()}
                                        />
                                    </MuiThemeProvider>
                                    <MuiThemeProvider>
                                        <IconButton style={styles.medium}
                                                    tooltip="排序依據"
                                                    tooltipPosition="top-right"
                                                    ref="target"
                                                    onClick={()=>this.handleClickview()}>
                                            <ActionGrade />
                                        </IconButton>
                                    </MuiThemeProvider>
                                    <Popover
                                        placement='bottom'
                                        target={this.refs.target}
                                        show={this.state.open}
                                        onHide={()=>this.handleClose()}>
                                        <div
                                            style={styles.pop}>
                                            -未排的<br/>
                                            物理學分放置規則：於必修項目會算為3學分,多的2學分將優先放至專業選修,若專業選修已滿,則會放至其他選修,物理也會顯示在該項項目中<br/>
                                            -排序過的<br/>
                                            重複修課：將只顯示一次,取成績最高的那次<br/>
                                            必修：若有多修物理,化學或生物,會將多修的課程優先放至專業選修,若專業選修學分已滿,則放至其他選修<br/>
                                            物理學分放置規則：於必修項目會算為3學分,多的2學分將優先放至專業選修,若專業選修已滿,則會放至其他選修,物理也會顯示在該項項目中<br/>
                                            核心課程/副核心及他組合心課程：若該項總學分已達畢業標準,會將多修的課程優先放至專業選修,若專業選修學分已滿,則放至其他選修<br/>
                                            專業選修/外語/通識：若該項總學分已達畢業標準,會將多修的課程放至其他選修<br/>
                                        </div>
                                    </Popover>
                                </div>
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
                        <PrintForm profile={this.props.studentProfile} graduationCheckEnglishTest={this.state.graduationCheckEnglishTest} courseCategoryArray={this.state.print_courseCategoryArray}/>
                    </div>
                </div>
            );


    }
}

export default Grad
