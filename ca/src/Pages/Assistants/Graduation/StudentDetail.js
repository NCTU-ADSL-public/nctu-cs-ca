import React from 'react'
import axios from 'axios'
import StudentGrad from '../../Students/Graduation/GradCreditCheck'

import Loading from '../../../Components/Loading';

import FakeData from '../../../Resources/FakeData'

export default class index extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            activeKey: '1',
            start: 0,
            // for passing student selected by studentList
            studentName: '資料錯誤',
            studentId: '0416030',
            student_profile: {
                student_id: '0316000',
                sname: '陳罐頭',
                program: '網多',
                grade: '四',
                email: '6666666666666@nctu.edu.tw',
                graduate: '0',
                graduate_submit: '0',
                graduationCheckEnglishTest: '0',
                github_id: null,
                fb_id: null,
                gmail: null,
                status: 's'
            },
            GraduationItems: FakeData.GraduationItems,
            revise: FakeData.GraduationItems_Revised,
            initStudents: FakeData.StudentList,
            print_courseCategoryArray: FakeData.PrintData,

            loadingG: true,
            loadingR: true,
            loadingS: true,
            loadingP: true
        }
    }

    componentDidMount () {
        console.log(this.props.match.params.sid)
        this.setState({
            studentId: this.props.match.params.sid
        })

        const self = this
        // for Graduation
        axios.get('/assistants/graduate/original', {
            params: {
                student_id: this.props.match.params.sid
            }
        }).then(studentData => {
            self.setState({
                GraduationItems: studentData.data,
                loadingG: false
            })
        }).catch(err => {
            console.log(err)
        })

        axios.get('/assistants/graduate/revised', {
            params: {
                student_id: this.props.match.params.sid
            }
        }).then(studentData => {
            self.setState({
                revise: studentData.data,
                loadingR: false
            })
        }).catch(err => {
            console.log(err)
        })

        axios.get('/assistants/students', {
            params: {
                student_id: this.props.match.params.sid
            }
        }).then(studentData => {
            self.setState({
                student_profile: studentData.data[0],
                loadingS: false
            })
        }).catch(err => {
            console.log(err)
        })

        axios.get('/assistants/graduate/print', {
            params: {
                student_id: this.props.match.params.sid
            }
        }).then(function (resp) {
            this.setState({
                print_courseCategoryArray: resp.data,
                loadingP: false
            })
        }.bind(this)).catch(err => {
            console.log(err)
        })
    };

    render () {
        if (this.state.loadingG ||
            this.state.loadingR ||
            this.state.loadingS ||
            this.state.loadingP) {
            return (
                <Loading size={100}
                         left={100}
                         top={100}
                         isLoading={true}
                />
            )
        } else {
            return (
                <div id='Head'>
                    <StudentGrad
                        studentProfile={this.state.student_profile}
                        items={this.state.GraduationItems}
                        result={this.state.GraduationItems[11]}
                        revise={this.state.revise}
                        reviseresult={this.state.revise[11]}
                        courseCategoryArray={this.state.print_courseCategoryArray}
                        assistant={1}
                        graduationCheckEnglishTest={this.state.graduationCheckEnglishTest}
                    />
                </div>
            )
        }
    }
}
