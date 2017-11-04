import React from 'react'
import axios from 'axios'


class UP extends React.Component {
    componentWillUpdate(){

        axios.get('/students/head/hh').then(studentData => {
            console.log(studentData.data);
        }).catch(err => {
            console.log(err);
        });
    }
    render(){
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