import React from 'react'
import axios from 'axios';


class FileUpload extends React.Component {



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
                <input type="file" onChange={()=>this.changeFile}/>
            </div>
        );
    }
}

export default FileUpload