import React from 'react';
import './Map.css';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import todoApp from '../reducers';
import {addTodo} from "../actions/index";
import {setPascos} from "../actions/index";
import App from './App';


let store = createStore(todoApp);

let flag = 1;
class Map extends React.Component{
    constructor(props) {
        super(props);
        console.log(this.props.studentPasdata);
        this.SavingCourseData();
    }

    SavingCourseData(){
        if(flag === 1){
            flag = 0;

            for(var i=0;i<this.props.data.length;i++){
                store.dispatch(addTodo(this.props.data[i].cos_cname,this.props.data[i].grade,this.props.data[i].semester,this.props.data[i].suggest,this.props.data[i].pre));
            }

            for(var j=0;j<this.props.studentPasdata.length;j++){
                store.dispatch(setPascos(this.props.studentPasdata[j].cos_cname));
            }
        }
    }

    render() {
        return (
            <div id="font_adjust">
                <div className="Map-title-text">
                    <div id="lessons-title">課程地圖</div><div id="lessons-little-title">-{this.props.studentId}</div>
                </div>

                <div className="Map-Row">
                    <Provider store={store}>
                        <App/>
                    </Provider>
                </div>
            </div>
        );
    }

}


export default Map;