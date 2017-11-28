import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import App from './List'

const customContentStyle = {
    width: '100%',
    maxWidth: 'none',
    maxHeight: 'none',
};

const bodyStyle = {
    fontFamily: 'Noto Sans CJK TC',
    padding:'0'
};
const titleStyle = {
    fontFamily: 'Noto Sans CJK TC',
    color:'#565656'
};
const styles = {
    toggle: {
        marginBottom: 0,
        maxWidth: 200,
        width:'400px',
        float:'left',
        margin:'15px 10px 0 20px',
    },
    button: {
        margin:'9px 10px 0 0px',
        width:'200px',
        float:'left',
        zIndex:'-100'
    },
    buttonDia: {
        margin:'0 10px 0 10px',
        width:'100px'
    },
    buttonEn: {
        margin:'9px 10px 0 0px',
        width:'250px',
        float:'left'
    },
    labelStyle: {
        fontFamily: 'Noto Sans CJK TC',
        color: '#7B7B7B'
    },
    medium:{
        padding:'15px 0 0 5px',
        width: 10,
        height: 10,
        float:'left',
        color: '#7B7B7B'
    },
    pop:{
        width:'auto',
        height: 'auto',
    }
};

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class DialogExampleSimple extends React.Component {
    state = {
        open: false,
        post: false
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleClick = () => {
        this.setState({post: true,open: false});
    };
    /*

    componentWillMount(){

        let  _this = this;
        return axios.get('/students/graduate/reorder').then(response => {
            _this.setState({boardData: response.data})
        }).catch(err => {
            console.log(err);
        });
    }
*/
    render() {
        const actions = [
            <FlatButton
                label="取消"
                labelStyle={styles.labelStyle}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="儲存"
                labelStyle={styles.labelStyle}
                keyboardFocused={true}
                onClick={this.handleClick}
            />,
        ];

        return (
            <div>
                <RaisedButton style={styles.button}
                              labelStyle={styles.labelStyle}
                              label="編輯課程"
                              onClick={this.handleOpen}
                              backgroundColor = "#DDDDDD" />
                <Dialog
                    title="編輯課程"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent
                    contentStyle={customContentStyle}
                    bodyStyle={bodyStyle}
                    titleStyle={titleStyle}
                >
                    <App post = {this.state.post} />
                </Dialog>
            </div>
        );
    }
}