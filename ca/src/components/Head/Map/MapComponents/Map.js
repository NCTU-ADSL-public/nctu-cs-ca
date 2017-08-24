import React from 'react';
import './Map.css';
import Footer from './Footer';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import todoApp from '../reducers';
import {addTodo} from "../actions/index";
import VisibleTodoList from '../containers/VisibleTodoList';
import App from './App';


let store = createStore(todoApp);
let storeOneUp = createStore(todoApp);
let storeOneDo = createStore(todoApp);
let storeTwoUp = createStore(todoApp);
let storeTwodo = createStore(todoApp);
let storeThrUp = createStore(todoApp);
let storeThrDo = createStore(todoApp);
let storeFouUp = createStore(todoApp);
let storeFouDo = createStore(todoApp);

let flag = 1;
class Map extends React.Component{
    constructor(props) {
        super(props);
        this.SavingCourseData();
    }

    SavingCourseData(){
        if(flag === 1){
            flag = 0;
            for(var i=0;i<this.props.data.length;i++){
                store.dispatch(addTodo(this.props.data[i].cos_cname,this.props.data[i].grade,this.props.data[i].semester,this.props.data[i].suggest,this.props.data[i].pre));

                if(this.props.data[i].grade==="1" && this.props.data[i].semester==="1")
                    storeOneUp.dispatch(addTodo(this.props.data[i].cos_cname,this.props.data[i].grade,this.props.data[i].semester,this.props.data[i].suggest,this.props.data[i].pre));
                else if(this.props.data[i].grade==="1" && this.props.data[i].semester==="2")
                    storeOneDo.dispatch(addTodo(this.props.data[i].cos_cname,this.props.data[i].grade,this.props.data[i].semester,this.props.data[i].suggest,this.props.data[i].pre));
                else if(this.props.data[i].grade==="2" && this.props.data[i].semester==="1")
                    storeTwoUp.dispatch(addTodo(this.props.data[i].cos_cname,this.props.data[i].grade,this.props.data[i].semester,this.props.data[i].suggest,this.props.data[i].pre));
                else if(this.props.data[i].grade==="2" && this.props.data[i].semester==="2")
                    storeTwodo.dispatch(addTodo(this.props.data[i].cos_cname,this.props.data[i].grade,this.props.data[i].semester,this.props.data[i].suggest,this.props.data[i].pre));
                else if(this.props.data[i].grade==="3" && this.props.data[i].semester==="1")
                    storeThrUp.dispatch(addTodo(this.props.data[i].cos_cname,this.props.data[i].grade,this.props.data[i].semester,this.props.data[i].suggest,this.props.data[i].pre));
                else if(this.props.data[i].grade==="3" && this.props.data[i].semester==="2")
                    storeThrDo.dispatch(addTodo(this.props.data[i].cos_cname,this.props.data[i].grade,this.props.data[i].semester,this.props.data[i].suggest,this.props.data[i].pre));
                else if(this.props.data[i].grade==="4" && this.props.data[i].semester==="1")
                    storeFouUp.dispatch(addTodo(this.props.data[i].cos_cname,this.props.data[i].grade,this.props.data[i].semester,this.props.data[i].suggest,this.props.data[i].pre));
                else if(this.props.data[i].grade==="4" && this.props.data[i].semester==="2")
                    storeFouDo.dispatch(addTodo(this.props.data[i].cos_cname,this.props.data[i].grade,this.props.data[i].semester,this.props.data[i].suggest,this.props.data[i].pre));
            }
        }
    }

    render() {
        return (
            <div id="font_adjust">
                <div className="Map-title-text">
                    <div id="lessons-title">課程地圖</div><div id="lessons-little-title">{this.props.stdentId}</div>
                </div>

                <div className="Map-Row">
                    <Provider store={store}>
                    <div className="grades">
                        <div className="grade" id="grade-1">
                            <div className="grade-num"><h3>大一(104)</h3></div>
                            <div className="session">
                                <div  className="up-session">
                                        <App grad="1" sem="1"/>
                                </div>
                                <div className="down-session">
                                        <App grad="1" sem="2"/>
                                </div>
                            </div>
                        </div>


                        <div className="grade" id="grade-2">
                            <div className="grade-num"><h3>大二(105)</h3></div>
                            <div className="session">
                                <div className="up-session">
                                        <App grad="2" sem="1"/>

                                </div>
                                <div className="down-session">
                                        <App grad="2" sem="2"/>

                                </div>
                            </div>
                        </div>


                        <div className="grade grade-cur" id="grade-3">
                            <div className="grade-num"><h3>大三(106)</h3></div>
                            <div className="session">
                                <div className="up-session session-cur">
                                        <App grad="3" sem="1"/>
                                </div>
                                <div className="down-session">
                                        <App grad="3" sem="2"/>
                                </div>
                            </div>
                        </div>


                        <div className="grade" id="grade-4">
                            <div className="grade-num"><h3>大四(107)</h3></div>
                            <div className="session">
                                <div className="up-session">
                                        <App grad="4" sem="1"/>
                                </div>
                                <div className="down-session">
                                        <App grad="4" sem="2"/>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="mods">
                    </div>
                    </Provider>
                </div>
            </div>
        );
    }

}


export default Map;