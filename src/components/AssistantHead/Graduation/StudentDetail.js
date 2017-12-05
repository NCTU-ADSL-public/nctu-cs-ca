import React from 'react';
import axios from 'axios';
import StudentGrad from '../../Head/Graduation/GradationMain';

import LoadingComponent from '../Loading';

export default class index extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            activeKey: '1',
            start: 0,
            //for passing student selected by studentList
            studentName: '流川楓',
            studentId: '0416030',
            student_profile: {
                student_id:"0316000",
                sname:"陳罐頭",
                program:"網多",
                grade:"四",
                email:"6666666666666@nctu.edu.tw",
                graduate:"0",
                graduate_submit:"0",
                graduationCheckEnglishTest:"0",
                github_id:null,
                fb_id:null,
                gmail:null,
                status:"s"
            },
            Graduationitems: [
                { title: '必修課程',
                    credit: '80',
                    require: '60',
                    selection: true,
                    course:
                        [ { cn: '作業系統概論', en: 'Introduction to Operating Systems',"score":60 ,complete:true},
                            { cn: '基礎程式設計', en: 'Basic Programming',"score":60  ,complete:true},
                            { cn: '微積分(一)', en: 'Calculus (I)' ,"score":60 ,complete:true},
                            { cn: '微積分(二)', en: 'Calculus (II)',"score":60  ,complete:true},
                            { cn: '微處理機系統實驗', en: 'Microprocessor System Lab.',"score":60  ,complete:true, reason:'notCS'},
                            { cn: '數位電路設計', en: 'Digital Circuit Design',"score":60  ,complete:true},
                            { cn: '機率', en: 'Probability' ,"score":60 },
                            { cn: '正規語言概論', en: 'Introduction to Formal Language' ,complete:true,"score":60 },
                            { cn: '演算法概論', en: 'Introduction to Algorithms' ,complete:true,"score":60 },
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
                            { cn: '當代世界:環境危機與生態永續', en: '', dimension: '通識', complete: true },
                            { cn: '幾何造形', en: '', dimension: '自然', complete: true },
                            { cn: '經濟學概論', en: '', dimension: '歷史', complete: true },
                            { cn: '霸權興衰史:從十五世紀至當代', en: '', dimension: '歷史', complete: true },
                            { cn: '紀錄片製作概論', en: '', dimension: '歷史', complete: true },
                            { cn: '台灣史', en: '', dimension: '歷史', complete: true },
                            { cn: '當代中國：全球化下的兩岸關係', en: '', dimension: '歷史', complete: true } ] },
                { title: '副核心課程',
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
                { title: '專業選修',
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

            ],
            revise: [
                { title: '必修課程',
                    credit: '80',
                    require: '60',
                    selection: true,
                    course:
                        [ { cn: '作業系統概論', en: 'Introduction to Operating Systems',"score":60 ,complete:true},
                            { cn: '基礎程式設計', en: 'Basic Programming',"score":60  ,complete:true},
                            { cn: '微積分(一)', en: 'Calculus (I)' ,"score":60 ,complete:true},
                            { cn: '微積分(二)', en: 'Calculus (II)',"score":60  ,complete:true},
                            { cn: '微處理機系統實驗', en: 'Microprocessor System Lab.',"score":60  ,complete:true, reason:'notCS'},
                            { cn: '數位電路設計', en: 'Digital Circuit Design',"score":60  ,complete:true},
                            { cn: '機率', en: 'Probability' ,"score":60 },
                            { cn: '正規語言概論', en: 'Introduction to Formal Language' ,complete:true,"score":60 },
                            { cn: '演算法概論', en: 'Introduction to Algorithms' ,complete:true,"score":60 },
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
                            { cn: '當代世界:環境危機與生態永續', en: '', dimension: '通識', complete: true },
                            { cn: '幾何造形', en: '', dimension: '自然', complete: true },
                            { cn: '經濟學概論', en: '', dimension: '歷史', complete: true },
                            { cn: '霸權興衰史:從十五世紀至當代', en: '', dimension: '歷史', complete: true },
                            { cn: '紀錄片製作概論', en: '', dimension: '歷史', complete: true },
                            { cn: '台灣史', en: '', dimension: '歷史', complete: true },
                            { cn: '當代中國：全球化下的兩岸關係', en: '', dimension: '歷史', complete: true } ] },
                { title: '副核心課程',
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
                { title: '專業選修',
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
                    complete: 'True' },{},{},{},{},{"total":115,"total_require":156,"compulsory":55,"compulse_require":58,"core":1,"core_require":"9","vice":9,"vice_require":"9","pro":9,"pro_require":"12","english":0,"english_require":1,"other":0,"other_require":"12","general":20,"general_require":20,"pe":6,"pe_require":6,"language":10,"language_require":8,"service":2,"service_require":2,"art":2,"art_require":2}

            ],
            initStudents: [
                {
                    student_id: '0316000',
                    sname: '流川楓',
                    program: '網多',
                    graduate: "0",
                    graduate_submit: "0",
                },
                {
                    student_id: '0316030',
                    sname: '余治杰',
                    program: '資工B',
                    graduate: "0",
                    graduate_submit: "1",
                },
                {
                    student_id: '0316031',
                    sname: '王冠升',
                    program: '資工B',
                    graduate: "1",
                    graduate_submit: "1",
                },
                {
                    student_id: '0316132',
                    sname: '郭毓梁',
                    program: '資工A',
                    graduate: "0",
                    graduate_submit: "1",
                },
                {
                    student_id: '0316033',
                    sname: '趙賀笙',
                    program: '資工A',
                    graduate: "1",
                    graduate_submit: "2",
                },
                {
                    student_id: '0316034',
                    sname: '王于哲',
                    program: '資工B',
                    graduate: "0",
                    graduate_submit: "2",
                },
                {
                    student_id: '0316235',
                    sname: '陳奕安',
                    program: '資工B',
                    graduate: "0",
                    graduate_submit: "0",
                },
                {
                    student_id: '0316036',
                    sname: '陳冠廷',
                    program: '網多',
                    graduate: "1",
                    graduate_submit: "0",
                },
                {
                    student_id: '0316037',
                    sname: '郭蕎',
                    program: '資電',
                    graduate: "0",
                    graduate_submit: "0",
                },

            ],
            print_courseCategoryArray:[],

            loadingG: true,
            loadingR: true,
            loadingS: true,
            loadingP: true,
        };
    }

    componentDidMount(){
        console.log(this.props.match.params.sid);
        this.setState({
            studentId: this.props.match.params.sid,
        });


        const self = this;
        //for Graduation
        axios.get('/assistants/graduate/original', {
            params: {
                student_id: this.props.match.params.sid,
            }
        }).then(studentData => {
            self.setState({
                Graduationitems: studentData.data,
                loadingG: false,
            });

        }).catch(err => {
            console.log(err);
        });

        axios.get('/assistants/graduate/revised', {
            params: {
                student_id: this.props.match.params.sid,
            }
        }).then(studentData => {
            self.setState({
                revise: studentData.data,
                loadingR: false,
            });
        }).catch(err => {
            console.log(err);
        });

        axios.get('/assistants/students', {
            params: {
                student_id: this.props.match.params.sid,
            }
        }).then(studentData => {
            self.setState({
                student_profile: studentData.data[0],
                loadingS: false,
            });
        }).catch(err => {
            console.log(err);
        });

        axios.get('/assistants/graduate/print', {
            params: {
                student_id: this.props.match.params.sid,
            }
        }).then(function(resp){
            this.setState({
                print_courseCategoryArray: resp.data,
                loadingP: false,
            });
        }.bind(this)).catch(err => {
            console.log(err);
        });
    };

    render() {
        if( this.state.loadingG ||
            this.state.loadingR ||
            this.state.loadingS ||
            this.state.loadingP )
            return (
                <LoadingComponent/>
            );
        else
            return (
                <div>
                    <StudentGrad
                        studentProfile={this.state.student_profile}
                        items={this.state.Graduationitems}
                        result={this.state.Graduationitems[10]}
                        revise={this.state.revise}
                        reviseresult={this.state.revise[10]}
                        courseCategoryArray={this.state.print_courseCategoryArray}
                        assistant={1}
                        graduationCheckEnglishTest={this.state.graduationCheckEnglishTest}
                    />
                </div>
            );
    }
}
