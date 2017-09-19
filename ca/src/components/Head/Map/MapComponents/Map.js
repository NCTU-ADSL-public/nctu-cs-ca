import React from 'react';
import './Map.css';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import todoApp from '../reducers';
import {addTodo} from "../actions/index";
import App from './App';

let store = createStore(todoApp);

let flag = 1;

class Map extends React.Component{
    constructor(props) {
        super(props);
        console.log(this.props.data);
        this.SavingCourseData();
    }

    SavingCourseData(){
        if(flag === 1){
            flag = 0;

            for(let i=0;i<this.props.data.length;i++){
                if(i!==0){
                    if(this.props.data[i-1].cos_cname !== this.props.data[i].cos_cname){
                        store.dispatch(addTodo(this.props.data[i].cos_cname,this.props.data[i].grade,this.props.data[i].semester,this.props.data[i].suggest,this.props.data[i].pre));
                    }
                }
                else{
                    store.dispatch(addTodo(this.props.data[i].cos_cname,this.props.data[i].grade,this.props.data[i].semester,this.props.data[i].suggest,this.props.data[i].pre));
                }
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
                        <App studentPasdata={this.props.studentPasdata} data={this.props.data}/>
                    </Provider>
                </div>
            </div>
        );
    }

}


export default Map;