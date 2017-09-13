import React from 'react'
import axios from 'axios';
import choose from './ChooseButton'
import upload from './UploadButton'
import FileUpload from 'react-fileupload'
import request from 'superagent'

class UP extends React.Component {



    changeFile(e){
        let data = new FormData();
        data.append('file', e.target.files[0]);
        console.log(e.target.files[0])
        request
            .post('http://localhost/students/score')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ username: "username", password: "password" })
            .end(function(err, res){
                // console.log(res.text);
            });
        // ajax().post('/api/users', { slug: 'john', age: 37 })
        // return axios.put('/students/score', '5666' , {
        //     headers: {
        //             'Content-Type': 'file.type',
        //     }
        // }).then(function (response) {
        //         console.log(response);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
    }
    render(){
        return (
            <div>
                <input type="file" onChange={this.changeFile}/>
            </div>
        );
    }
}

export default UP