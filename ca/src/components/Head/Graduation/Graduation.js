import React from 'react';

import FileUploadProgress  from 'react-fileupload-progress';

class Graduation extends React.Component{

    render() {
        return (
            <div>
                <h3>Default style</h3>
                <FileUploadProgress key='ex1' url='/students/score'
                                    onProgress={(e, request, progress) => {console.log('progress', e, request, progress);}}
                                    onLoad={ (e, request) => {console.log('load', e, request);}}
                                    onError={ (e, request) => {console.log('error', e, request);}}
                                    onAbort={ (e, request) => {console.log('abort', e, request);}}
                />
            </div>
        );
    }

}


export default Graduation;