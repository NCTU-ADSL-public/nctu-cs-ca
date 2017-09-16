import React from 'react'
// import axios from 'axios';
// import choose from './ChooseButton'
// import upload from './UploadButton'
// import FileUpload from 'react-fileupload'
// import DropzoneComponent from 'react-dropzone-component';
// import 'whatwg-fetch'
// import FormData from 'form-data'
const componentConfig = {
    iconFiletypes: ['.txt'],
    showFiletypeIcon: true,
    postUrl: 'http://localhost/uploadHandler'
};
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
            baseUrl:'/students/score',
            param:{
                fid:0
            }
        }
        /*Use FileUpload with options*/
        /*Set two dom with ref*/
        return (
            <div>
            <form action="/students/score" method="post" encType="multipart/form-data">
                <h1>Register Account.</h1>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                        <div className="form-group">
                            <label htmlFor="exampleInputFile">File input</label>
                            <input type="file" name="pdf"/>
                        </div>
                </div>
                <button type="submit" id="duck" className="btn btn-primary">Submit</button>
            </form>
            </div>
        )
    }
}

export default UP