import React from 'react'
import VisibleTodoList from '../containers/VisibleTodoList'
import Button from './Button'


class App extends React.Component{

    state={
        year:0,
        grad1:{
            grad:"grade",
            upSession:"up-session",
            downSession: "down-session"
        },
        grad2:{
            grad:"grade",
            upSession:"up-session",
            downSession: "down-session"
        },
        grad3:{
            grad:"grade",
            upSession:"up-session",
            downSession: "down-session"
        },
        grad4:{
            grad:"grade",
            upSession:"up-session",
            downSession: "down-session"
        }

    }

    componentWillMount(){

        let Today = new Date();
        let month = (Today.getMonth()+1);
        let year  =  Today.getFullYear()-1911;

        if(this.props.studentsGrad==="大一"){
            this.setState({
                year:year
            });
            if(month>7 || month<2){
                this.setState({
                    grad1:{
                        grad:"grade grade-cur",
                        upSession:"up-session session-cur",
                        downSession: "down-session"
                    }
                })
            }
            else{
                this.setState({
                    grad1:{
                        grad:"grade grade-cur",
                        upSession:"up-session",
                        downSession: "down-session session-cur"
                    }
                })
            }
        }
        else if(this.props.studentsGrad==="大二"){
            this.setState({
                year:year-1
            });
            if(month>7 || month<2){
                this.setState({
                    grad2:{
                        grad:"grade grade-cur",
                        upSession:"up-session session-cur",
                        downSession: "down-session"
                    }
                })
            }
            else{
                this.setState({
                    grad2:{
                        grad:"grade grade-cur",
                        upSession:"up-session",
                        downSession: "down-session session-cur"
                    }
                })
            }
        }
        else if(this.props.studentsGrad==="大三"){
            this.setState({
                year:year-2
            });
            if(month>7 || month<2){
                this.setState({
                    grad3:{
                        grad:"grade grade-cur",
                        upSession:"up-session session-cur",
                        downSession: "down-session"
                    }
                })
            }
            else{
                this.setState({
                    grad3:{
                        grad:"grade grade-cur",
                        upSession:"up-session",
                        downSession: "down-session session-cur"
                    }
                })
            }
        }
        else if(this.props.studentsGrad==="大四"){
            this.setState({
                year:year-3
            });
            if(month>7 || month<2){
                this.setState({
                    grad4:{
                        grad:"grade grade-cur",
                        upSession:"up-session session-cur",
                        downSession: "down-session"
                    }
                })
            }
            else{
                this.setState({
                    grad4:{
                        grad:"grade grade-cur",
                        upSession:"up-session",
                        downSession: "down-session session-cur"
                    }
                })
            }
        }

    }

    render(){
            return(
                <div>
                <div className="grades">
                    <div className={this.state.grad1.grad} id="grade-1">
                        <div className="grade-num"><h3>大一({this.state.year})</h3></div>
                        <div className="session">
                            <div  className={this.state.grad1.upSession}>
                                <VisibleTodoList grad="1" sem="1"/>
                            </div>
                            <div className={this.state.grad1.downSession}>
                                <VisibleTodoList grad="1" sem="2"/>
                            </div>
                        </div>
                    </div>


                    <div className={this.state.grad2.grad} id="grade-2">
                        <div className="grade-num"><h3>大二({this.state.year+1})</h3></div>
                        <div className="session">
                            <div className={this.state.grad2.upSession}>
                                <VisibleTodoList grad="2" sem="1"/>

                            </div>
                            <div className={this.state.grad2.downSession}>
                                <VisibleTodoList grad="2" sem="2"/>

                            </div>
                        </div>
                    </div>


                    <div className={this.state.grad3.grad} id="grade-3">
                        <div className="grade-num"><h3>大三({this.state.year+2})</h3></div>
                        <div className="session">
                            <div className={this.state.grad3.upSession}>
                                <VisibleTodoList grad="3" sem="1"/>
                            </div>
                            <div className={this.state.grad3.downSession}>
                                <VisibleTodoList grad="3" sem="2"/>
                            </div>
                        </div>
                    </div>


                    <div className={this.state.grad4.grad} id="grade-4">
                        <div className="grade-num"><h3>大四({this.state.year+3})</h3></div>
                        <div className="session">
                            <div className={this.state.grad4.upSession}>
                                <VisibleTodoList grad="4" sem="1"/>
                            </div>
                            <div className="down-session">
                                <VisibleTodoList grad="4" sem="2"/>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="mods"><Button studentPasdata={this.props.studentPasdata} data={this.props.data}/></div>
            </div>
        )
    }
}
export default App