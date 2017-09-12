import React from 'react'
import axios from 'axios';


class FileUpload extends React.Component {


// <input type="file" onChange={()=>this.changeFile}/>

    changeFile(e){
        const data = new FormData();
        data.append('file', e.target.files[0]);
        axios({
            method: 'post',
            url: '/students/score',
            data: data
        });
    }
    render(){
        return (
            <div>
                <form id="uploadForm" enctype="multipart/form-data" method="post">
                    <input type="file" name="userFile" />
                    <input type="submit" value="Upload File" name="submit"/>
                </form>
            </div>
        );
    }
}

export default FileUpload