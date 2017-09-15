import React from 'react';
import axios from 'axios';

class Credit extends React.Component{
    componentWillMount(){
            return axios.get('/students/score').then(studentData => {
                //studentData.status  HTTP response code (e.g., 200, 401)
                //studentData.data  object parsed from HTTP response body
                //studentData.headers  HTTP presonse headers


                console.log(studentData.data)
            }).catch(err => {
                console.log(err);
            });

    }

    render() {
        return (
            <div >
                OK
            </div>
        );
    }

}


export default Credit;