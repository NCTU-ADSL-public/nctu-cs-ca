import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {grey50} from 'material-ui/styles/colors';

class LoginButtom extends React.Component{


    render() {
        return (
			<RaisedButton label="Login"
						  backgroundColor = "#00AEAE"
						  labelColor = {grey50}
						  href="/auth/Nctu"
						  style={{
                              width: '20%',
                              fontFamily: 'Noto Sans CJK TC',
                              float: 'left',
                              margin: '2px'
                          }}
                          labelStyle={{
                              fontFamily: 'Noto Sans CJK TC',
                          }}
			>
			</RaisedButton>
        );
	}

}


export default LoginButtom;