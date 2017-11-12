import React from 'react';
import TextField from 'material-ui/TextField';

const TextFieldExampleSimple = () => (
    <div>
        <TextField
            defaultValue="【助理通知】你居還沒送審!!"
            floatingLabelText="信件標題"
            style={{
                width: '90%',
                padding: '5px',
            }}
        /><br/>
        <TextField
            hintText="同學快送審!"
            floatingLabelText="信件內文"
            multiLine={true}
            rows={6}
            style={{
                width: '90%',
                padding: '5px',
            }}
        />

    </div>
);

export default TextFieldExampleSimple;