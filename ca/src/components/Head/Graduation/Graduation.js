import React from 'react';

import ChooseButton from './ChooseButton';
import UploadButton from './UploadButton';
import FileUpload from 'react-fileupload';

class Graduation extends React.Component{

    render() {
        /* set properties */
        const options = {
            baseUrl: '/students/score',
        }
        /* Use ReactUploadFile with options */
        /* Custom your buttons */
        return (
            <FileUpload options={options}>
                <ChooseButton ref="chooseBtn"></ChooseButton>
                <UploadButton ref="uploadBtn"></UploadButton>
            </FileUpload>
        );
    }

}


export default Graduation;