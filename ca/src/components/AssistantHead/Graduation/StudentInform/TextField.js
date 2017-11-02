import React from 'react';
import TextField from 'material-ui/TextField';

const TextFieldExampleSimple = () => (
    <div>
        <TextField
            defaultValue="【助理通知】你居還沒送審!!"
            floatingLabelText="信件標題"
        /><br/>
        <TextField
            hintText="同學快送審!"
            floatingLabelText="信件內文"
            multiLine={true}
            rows={6}
        />

    </div>
);

export default TextFieldExampleSimple;