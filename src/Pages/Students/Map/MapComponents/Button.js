import React from 'react'
import FilterLink from '../containers/FilterLink'
import RaisedButton from 'material-ui/RaisedButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import SugCourseTable from './ButtonExtension/SugCourseTable'


const customContentStyle = {
  maxWidth: 'none',
  maxHeight: 'none',
};

const bodyStyle = {
  fontFamily: 'Noto Sans CJK TC',
};
const titleStyle = {
  fontFamily: 'Noto Sans CJK TC',
  color:'#565656'
};

const fontStyle={
  verticalAlign: "default",
  fontSize: "1em",
  fontWeight: "300",
  letterSpacing: "1px",
  fontFamily: 'Noto Sans CJK TC',
}


class Footer extends React.Component {

  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render () {
    const actions = [
      <FlatButton
        label="Exit"
        primary={true}
        style={{
          fontFamily: 'Noto Sans CJK TC',
          color: '#7B7B7B'
        }}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ];
    return (
      <div>
        <FilterLink filter='SHOW_ALL' studentPasdata={this.props.studentPasdata} data={this.props.data}>
                    全覽
                </FilterLink>
        <br />
        <br />
        <FilterLink filter='SHOW_COMPLETED' studentPasdata={this.props.studentPasdata} data={this.props.data}>
                    已修
                </FilterLink>
        <br />
        <br />
        <FilterLink filter='SHOW_ACTIVE' studentPasdata={this.props.studentPasdata} data={this.props.data}>
                    未修
        </FilterLink>
        <br />
        <br />
        <MuiThemeProvider>
          <RaisedButton label={"建議修課"} backgroundColor='#D3D3D3' labelColor='#778899' labelStyle={{
            fontFamily: 'Noto Sans CJK TC',
            fontWeight: 'bold'
          }} fullWidth
            onTouchTap={e => {
              e.preventDefault()
              this.handleOpen()
            }} />
        </MuiThemeProvider>
        <MuiThemeProvider>
          <Dialog
            title="根據您目前的修課紀錄，我們為您推薦了以下課程。(僅供參考)"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
            contentStyle={customContentStyle}
            bodyStyle={bodyStyle}
            titleStyle={titleStyle}
          >
            <SugCourseTable/>
          </Dialog>
        </MuiThemeProvider>
      </div>

    )
  }
}

export default Footer
