import React from 'react'
import axios from 'axios';
import FormData from 'form-data'


class FileUpload extends React.Component {



    changeFile(e){
        let data = new FormData();
        data.append('file', e.target.files[0]);
        console.log(e.target.files[0])

        axios.post('/students/score', e.target.files[0] , {
            headers: {
                    'Content-Type': 'multipart/form-data; boundary=${data._boundary}',
            }
        }).then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render(){
        return (
            <div>
                <input type="file" onChange={this.changeFile}/>
            </div>
        );
    }
}

export default FileUpload