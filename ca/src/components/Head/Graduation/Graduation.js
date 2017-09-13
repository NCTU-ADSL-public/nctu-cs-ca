import React from 'react'
import axios from 'axios';
import choose from './ChooseButton'
import upload from './UploadButton'
import FileUpload from 'react-fileupload'
import request from 'superagent'
// import 'whatwg-fetch'
// import FormData from 'form-data'

class UP extends React.Component {



    changeFile(e){
        let data = new FormData();
        console.log(e.target.files[0])
        data.append('file', e.target.files[0]);



        // fetch('http://localhost/avatars', {
        //     method: 'POST',
        //     headers: {
        //     "Content-Type": "text/plain"
        // },
        //     body: data
        // })
        // request
        //     .post('http://localhost/students/score')
        //     .set('Content-Type', 'application/x-www-form-urlencoded')
        //     .send({ data:e.target.files[0] })
        //     .end(function(err, res){
        //         // console.log(res.text);
        //     });
        // ajax().post('/api/users', { slug: 'john', age: 37 })
        // return axios.post('/students/score', '5666' , {
        //     headers: {
        //             'Content-Type': "text/plain",
        //     }
        // }).then(function (response) {
        //         console.log(response);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        // {/*<input type="file" onChange={this.changeFile}/>*/}
        //     });
    }
    render(){
        /*set properties*/
        const options={
            baseUrl:'http://localhost/students/score',
            param:{
                fid:0
            }
        }
        /*Use FileUpload with options*/
        /*Set two dom with ref*/
        return (
            <FileUpload options={options}>
                <button ref="chooseBtn">choose</button>
                <button ref="uploadBtn">upload</button>
            </FileUpload>
        )
    }
}

export default UP