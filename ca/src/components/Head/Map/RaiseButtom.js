import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
    fontFamily: 'Noto Sans CJK TC',
    fontWeight: 'bold',
};

const RaisedButtonEx = () => (
    <div>
        <RaisedButton label="全覽" backgroundColor = "#D3D3D3" labelColor = '#778899' labelStyle={style} fullWidth={true}  />
        <br />
        <br />
        <RaisedButton label="必修" backgroundColor = "#D3D3D3" labelColor = '#778899' labelStyle={style} fullWidth={true}  />
        <br />
        <br />
        <RaisedButton label="必選修" backgroundColor = "#D3D3D3" labelColor = '#778899' labelStyle={style} fullWidth={true}  />
        <br />
        <br />
        <RaisedButton label="建議修課" backgroundColor = "#D3D3D3" labelColor = '#778899' labelStyle={style} fullWidth={true}  />
    </div>
);

export default RaisedButtonEx;