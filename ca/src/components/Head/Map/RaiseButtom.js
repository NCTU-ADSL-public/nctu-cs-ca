import React from 'react';
import FlatButton from 'material-ui/FlatButton';

const style = {
    fontFamily: 'Noto Sans CJK TC',
    fontWeight: 'bold',
    color: '#778899',
    background: '#D3D3D3',
};

const FlatButtonExampleSimple = () => (
    <div>
        <FlatButton label="全覽" style={style} fullWidth={true}  />
        <br />
        <br />
        <FlatButton label="必修" style={style} fullWidth={true}  />
        <br />
        <br />
        <FlatButton label="必選修" style={style} fullWidth={true}  />
        <br />
        <br />
        <FlatButton label="建議修課" style={style} fullWidth={true}  />
    </div>
);

export default FlatButtonExampleSimple;