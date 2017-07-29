import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {grey50} from 'material-ui/styles/colors';

const LoginButtom = () => (
  <RaisedButton label="Login" 
	backgroundColor = "#00AEAE"
	labelColor = {grey50}
  href="/Head"
  	style={{
    	width: '13%',
    	fontFamily: 'Noto Sans CJK TC',
    }}

  />
);

export default LoginButtom;