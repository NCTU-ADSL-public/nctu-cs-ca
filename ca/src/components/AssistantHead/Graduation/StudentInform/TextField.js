import React from 'react';
import TextField from 'material-ui/TextField';

const styles = {
    text1:{
        width: '90%',
        padding: '5px',
    },
    text2:{
        width: '90%',
        padding: '5px',
        fontSize: '12px',
    },
};

const TextFieldExampleSimple = () => (
    <div style={styles.text}>
        <TextField
            defaultValue="【助理通知】你居然還沒送審!!"
            floatingLabelText="信件標題"
            style={styles.text1}
        /><br/>
        <TextField
            hintText="同學快送審!"
            floatingLabelText="信件內文"
            multiLine={true}
            rows={3}
            rowsMax={6}
            style={styles.text2}
        />

    </div>
);

export default TextFieldExampleSimple;