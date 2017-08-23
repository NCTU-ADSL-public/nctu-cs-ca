import React from 'react';
import './Map.css';
import RaiseButtom from './RaiseButtom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import { addCourse } from '../actions';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import todoApp from '../reducers';
import {addTodo} from "../actions/index";
import VisibleTodoList from '../containers/VisibleTodoList';
import App from './App';


let storeOneUp = createStore(todoApp);
let storeOneDo = createStore(todoApp);
let storeTwoUp = createStore(todoApp);
let storeTwodo = createStore(todoApp);
let storeThrUp = createStore(todoApp);
let storeThrDo = createStore(todoApp);
let storeFouUp = createStore(todoApp);
let storeFouDo = createStore(todoApp);

class Map extends React.Component{
    constructor(props) {
        super(props);
        this.SavingCourseData();
    }

    SavingCourseData(){
        for(var i=0;i<this.props.data.length;i++){
            console.log(this.props.data[i]);
            if(this.props.data[i].grade==="1" && this.props.data[i].semester==="1")
                storeOneUp.dispatch(addTodo(this.props.data[i].cos_cname));
            else if(this.props.data[i].grade==="1" && this.props.data[i].semester==="2")
                storeOneDo.dispatch(addTodo(this.props.data[i].cos_cname));
            else if(this.props.data[i].grade==="2" && this.props.data[i].semester==="1")
                storeTwoUp.dispatch(addTodo(this.props.data[i].cos_cname));
            else if(this.props.data[i].grade==="2" && this.props.data[i].semester==="2")
                storeTwodo.dispatch(addTodo(this.props.data[i].cos_cname));
            else if(this.props.data[i].grade==="3" && this.props.data[i].semester==="1")
                storeThrUp.dispatch(addTodo(this.props.data[i].cos_cname));
            else if(this.props.data[i].grade==="3" && this.props.data[i].semester==="2")
                storeThrDo.dispatch(addTodo(this.props.data[i].cos_cname));
            else if(this.props.data[i].grade==="4" && this.props.data[i].semester==="1")
                storeFouUp.dispatch(addTodo(this.props.data[i].cos_cname));
            else if(this.props.data[i].grade==="4" && this.props.data[i].semester==="2")
                storeFouDo.dispatch(addTodo(this.props.data[i].cos_cname));
        }
    }

    render() {
        return (
            <div id="font_adjust">
                <div className="Map-title-text">
                    <div id="lessons-title">課程地圖</div><div id="lessons-little-title"> - 資工組</div>
                </div>

                <div className="Map-Row">
                    <div className="grades">
                        <div className="grade" id="grade-1">
                            <div className="grade-num"><h3>大一(104)</h3></div>
                            <div className="session">
                                <div  className="up-session">
                                    <Provider store={storeOneUp}>
                                        <App />
                                    </Provider>
                                </div>
                                <div className="down-session">
                                    <Provider store={storeOneDo}>
                                        <App />
                                    </Provider>
                                </div>
                            </div>
                        </div>


                        <div className="grade" id="grade-2">
                            <div className="grade-num"><h3>大二(105)</h3></div>
                            <div className="session">
                                <div className="up-session">
                                    <Provider store={storeTwoUp}>
                                        <App />
                                    </Provider>

                                </div>
                                <div className="down-session">
                                    <Provider store={storeTwodo}>
                                        <App />
                                    </Provider>

                                </div>
                            </div>
                        </div>


                        <div className="grade grade-cur" id="grade-3">
                            <div className="grade-num"><h3>大三(106)</h3></div>
                            <div className="session">
                                <div className="up-session session-cur">
                                    <Provider store={storeThrUp}>
                                        <App />
                                    </Provider>
                                </div>
                                <div className="down-session">
                                    <Provider store={storeThrDo}>
                                        <App />
                                    </Provider>
                                </div>
                            </div>
                        </div>


                        <div className="grade" id="grade-4">
                            <div className="grade-num"><h3>大四(107)</h3></div>
                            <div className="session">
                                <div className="up-session">
                                    <Provider store={storeFouUp}>
                                        <App />
                                    </Provider>
                                </div>
                                <div className="down-session">
                                    <Provider store={storeFouDo}>
                                        <App />
                                    </Provider>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="mods">
                        <MuiThemeProvider>
                            <RaiseButtom ref="raiseBtn"/>
                        </MuiThemeProvider>
                    </div>
                </div>
            </div>
        );
    }

}


export default Map;