import React from 'react'
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Popover from 'react-simple-popover';
import 'animate.css'
import './Course.css';


class Course extends React.Component {

    state={
        open: false,
        style:{
            transition: "background .2s linear",
            width:"200px",
            height:'36px',
            paddingRight: 0,
            paddingLeft: 0,
            zIndex:  (this.props.cosCame === "物理(一)" || this.props.cosCame === "物理(二)")?'500':'' ,
        },
        name:''
    };

    componentWillMount(){
        let string = (this.props.cosCame === "物理(一)" || this.props.cosCame === "物理(二)"||this.props.cosCame === "物理(一)榮譽班" || this.props.cosCame === "物理(二)榮譽班")?this.props.realCredit:"";
        let ph = (this.props.cosCame === "物理(一)" || this.props.cosCame === "物理(二)"||this.props.cosCame === "物理(一)榮譽班" || this.props.cosCame === "物理(二)榮譽班")?"學分":"";
        string = "   " + string + ph
        this.setState({
            width:200,
            paddingRight: 0,
            name: this.props.cosCame + string
        })
    }

    handleClick(e) {
        this.setState({
            open: !this.state.open,
            style:{
                transition: "background .2s linear",
                width:"200px",
                paddingRight: 0,
                zIndex: !this.state.open?"1000":"",
            }
        });
    }


    handleClose(e) {
        this.setState({
            open: false,
            style:{
                transition: "background .2s linear",
                width:"200px",
                paddingRight: 0,
                zIndex: "",
            }
        });
    }

    render(){
        return(
            <div className={this.props.completed?"grad":this.props.selection?"grad":"grad animated flash"}
                 ref="target">
                <MuiThemeProvider>
                    <FlatButton
                        className="grad-btn"
                        labelStyle={{
                            padding: "5px",
                            height: "45px",
                            verticalAlign: "default",
                            color: "#fcfcfc",
                            fontSize: "1em",
                            fontWeight: "300",
                            letterSpacing: "1px",
                            fontFamily: 'Noto Sans CJK TC',
                        }}
                        hoverColor={"#80b0d9"}
                        backgroundColor={this.props.completed?(this.props.reason==="notCS")?"#a29951":(this.props.reason==="free1"　|| this.props.reason==="free2"　|| this.props.reason === "english")?"#6A94A2":(this.props.reason==="now" )?"#ab6bd9":"#3cab7d":this.props.selection?(this.props.reason==="now")?"#ab6bd9":"gray":(this.props.reason==="now")?"#ab6bd9":"#d95467"}
                        style={this.state.style}
                        label={this.state.name}
                        onClick={()=>this.handleClick()}>

                    </FlatButton>
                </MuiThemeProvider>
                <Popover
                    placement='top'
                    target={this.refs.target}
                    show={this.state.open}
                    onHide={this.handleClose.bind(this)}
                >
                    <div>{this.props.cosCame}</div>
                    <div>分數:&nbsp;{(this.props.score===-1)?'-':this.props.score}</div>
                    <div>等級:&nbsp;{(this.props.grade==='0')?'-':this.props.grade}</div>
                    <div>英文授課:&nbsp;{(this.props.english)?'是':'否'}</div>
                    <div>實得學分:&nbsp;{this.props.realCredit}</div>
                    <br/>
                    {(this.props.reason==="notCS")?<div>此為外系課程，必須申請過抵免才能算通過。</div>:<div> </div>}
                    {(this.props.reason==="free1")?<div>您已申請過抵免了。</div>:<div> </div>}
                    {(this.props.reason==="free2")?<div>免修課程。</div>:<div> </div>}
                    {(this.props.reason==="english")?<div>此為抵免英文檢定考試的課程。</div>:<div> </div>}
                    {(this.props.reason==="now")?<div>當期課程。</div>:<div> </div>}
                    {(this.props.reason==="now" && this.props.completed)?<div>已修過這堂課，目前正重複修課中。</div>:<div> </div>}
                </Popover>
            </div>

        )
    }
}

export default Course