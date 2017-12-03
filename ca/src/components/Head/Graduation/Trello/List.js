import React, {Component} from 'react'
import './App.css'
import {Board} from 'react-trello'
import Snackbar from 'material-ui/Snackbar';
import axios from 'axios';

const CustomCard = props => {
    return (
        <div>
            <header
                style={{borderBottom: '1px solid #eee', paddingBottom: 6, marginBottom: 10,
                    display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
                    color: props.cardColor
                }}
            >
                <div style={{ fontSize: 14, fontWeight: 'bold' }}>{props.title}</div>
                <div style={{ fontSize: 11 }}>{props.dueOn}</div>
            </header>
            <div style={{ fontSize: 12, color: '#BD3B36' }}>
                <div style={{ color: '#4C4C4C', fontWeight: 'bold' }}>學分: {props.label}</div>
                <div style={{ padding: '5px 0px', fontWeight: 'bold'  }}><i>分數: {props.description}</i></div>
            </div>
        </div>
    )
}


const data = require('./data.json')

class App extends Component {
    state = {
        boardData: {lanes: []},
        beforeError:{},
        postData:{},
        open: false,
        msgstring:'',
        post:this.props.post,
        postArray:[],
        searchData:[]
    };

    setEventBus = eventBus => {
        this.setState({eventBus})
    };
    componentWillReceiveProps(){
        if(this.props.post  ){

            let POST = this.state.postArray;
            axios.post('/students/graduate/orderResult', {
                POST
            })
                .then(res => {
                })
                .catch(err => {
                    window.location.replace("/logout ");
                    console.log(err)
                });
            //console.log(this.state.postArray);
        }
    }
    async componentWillMount() {
        //const response = await this.getBoard();
        //this.setState({boardData: response})
        await this.getOrder();
    }

    getBoard() {
        return new Promise(resolve => {
            resolve(data)
        })
    }

    getOrder(){
       let  _this = this;
        axios.get('/students/graduate/reorder').then(response => {
            _this.setState({boardData: response.data})
        }).catch(err => {
            console.log(err);
        });
        axios.get('/students/graduate/orderInfo').then(response => {
            _this.setState({searchData: response.data})
        }).catch(err => {
            console.log(err);
        });
    }

    HandleLaneClick = (laneId) => {
            let sum=0;
            let total;
            //alert(total-sum);
        if(laneId==="體育" || laneId==="藝文賞析" || laneId==="服務學習"){
            for(let i=0;i<this.state.boardData.lanes.length;i++){
                if(this.state.boardData.lanes[i].id === laneId){
                    total = this.state.boardData.lanes[i].total;
                    sum=this.state.boardData.lanes[i].cards.length;
                }
            }
            let ans = total-sum;
            if(ans<0)
                ans=0;
            // console.log(sum);
            // console.log(total);
            this.setState({
                open:true,
                msgstring:"尚須 "+ ans +" 門"
            });
        }
        else {
            for(let i=0;i<this.state.boardData.lanes.length;i++){
                if(this.state.boardData.lanes[i].id === laneId){
                    total = this.state.boardData.lanes[i].total;
                    for(let j=0;j<this.state.boardData.lanes[i].cards.length;j++){
                        for(let k=0;k<this.state.searchData.length;k++){
                            if(this.state.boardData.lanes[i].cards[j].id===this.state.searchData[k].id){
                                if(this.state.searchData[k].complete)sum+=this.state.boardData.lanes[i].cards[j].label;
                            }
                        }

                    }
                }
            }

            let ans = total-sum;
            if(ans<0)
                ans=0;
            this.setState({
                open:true,
                msgstring:"尚須 "+ans+" 學分"
            });

        }
    }


    handleDragStart = (cardId, laneId) => {
        // console.log('drag started')
        // console.log(`cardId: ${cardId}`)
        // console.log(`laneId: ${laneId}`)
        // console.log(this.state.boardData)
        this.setState({
            beforeError:this.state.postData
        })
    };

    handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
        // console.log('drag ended')
        // console.log(`cardId: ${cardId}`)
        // console.log(`sourceLaneId: ${sourceLaneId}`)
        // console.log(`targetLaneId: ${targetLaneId}`)
        let _this=this;
        // let string = "";
        // _this.setState({
        //     //postData:this.state.beforeError,
        //     boardData:this.state.beforeError,
        //     open:true,
        //     msgstring:cardId+"只能被加進"+ string
        // });
        // console.log(_this.state.postArray.length)
        // for(let i=0;i<_this.state.postArray.length;i++){
        //     if(_this.state.postArray[i].cosname===cardId){
        //         flag = 0;
        //         let clone = Object.assign({}, _this.state.postArray);
        //         clone[i].next = targetLaneId;
        //         _this.setState({
        //             postArray:clone
        //         })
        //     }
        // }
        // if(flag){
        //     let array=[..._this.state.postArray,{cosname:cardId,pre:sourceLaneId, next:targetLaneId}]
        //     _this.setState({
        //         postArray:array
        //     })
        // }
        //console.log(_this.state.postArray);
        let id;
        let type;
        let complete;
        //console.log(_this.state.searchData);
        for(let j=0;j<_this.state.searchData.length;j++){
            if(cardId===_this.state.searchData[j].code){
                id = _this.state.searchData[j].id;
                type = _this.state.searchData[j].type;
                complete = _this.state.searchData[j].complete;
            }
        }
        if(!complete){
            _this.setState({
                //postData:this.state.beforeError,
                boardData:this.state.beforeError,
                open:true,
                msgstring:"您不能移動尚未修課過或當期課程!"
            });
        }
        else{

            axios.post('/students/graduate/change', {
                check:{cosname:{id}, pre:{sourceLaneId}, next:{targetLaneId}, code:{cardId}, type:{type}, complete:{complete}}
            })
                .then(res => {
                    if(!res.data.check.flag){
                        _this.setState({
                            //postData:this.state.beforeError,
                            boardData:this.state.beforeError,
                            open:true,
                            msgstring:id+"不能被加進" + targetLaneId
                        });
                        //ToastStore.error(<div  className="text">{cardId}只能被加進{res.data.check.reason.map(res=><div>{res}</div>)}</div>, 5000);
                    }
                    else{
                        let flag = 1;
                        for(let i=0;i<_this.state.postArray.length;i++){
                            if(_this.state.postArray[i].id===cardId){
                                flag = 0;
                                let clone = Object.assign({}, _this.state.postArray);
                                clone[i].next = targetLaneId;
                                _this.setState({
                                    postArray:clone
                                })
                            }
                        }
                        if(flag){
                            let array=[..._this.state.postArray,{id:id,pre:sourceLaneId, next:targetLaneId}]
                            _this.setState({
                                postArray:array
                            })
                        }
                    }
                })
                .catch(err => {
                    window.location.replace("/logout ");
                    console.log(err)
                });
            //console.log(_this.state.boardData);
        }
        /*let st ={ check:{cosname:{cardId}, pre:{sourceLaneId}, next:{targetLaneId}, code:{code}, type:type, complete:{complete}}}
        console.log(st);*/
    };

    shouldReceiveNewData = nextData => {
        // console.log('New card has been added')
        // console.log(this.state.boardData)
        // console.log(nextData)
        this.setState({
            postData:nextData
        })
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };


    render() {
        return (
            <div className="App">

                {/*<FlatButton*/}
                    {/*backgroundColor={'#c9745f'}*/}
                    {/*labelStyle={{*/}
                        {/*padding: "5px",*/}
                        {/*height: "45px",*/}
                        {/*verticalAlign: "default",*/}
                        {/*color: "#fcfcfc",*/}
                        {/*fontSize: "1em",*/}
                        {/*fontWeight: "300",*/}
                        {/*letterSpacing: "1px",*/}
                        {/*fontFamily: 'Noto Sans CJK TC',*/}
                    {/*}} label="Complete Buy Milk" onClick={this.completeCard} style={{margin: 5}}/>*/}
                <div className="App-Intro">
                    <Board
                        data={this.state.boardData}
                        style={{backgroundColor:'#00a0a0',
                            height:'65vh',}}
                        draggable
                        onDataChange={this.shouldReceiveNewData}
                        eventBusHandle={this.setEventBus}
                        handleDragStart={this.handleDragStart}
                        handleDragEnd={this.handleDragEnd}
                        onLaneClick={this.HandleLaneClick}
                        customCardLayout
                    >
                        <CustomCard/>
                    </Board>
                </div>
                <Snackbar
                    open={this.state.open}
                    message={this.state.msgstring}
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                    contentStyle={{fontFamily:'Noto Sans CJK TC'}}
                />
            </div>
        )
    }
}
export default App

//
// </FlatButton>
// <FlatButton
//     backgroundColor={'#c9745f'}
//     labelStyle={{
//         padding: "5px",
//         height: "45px",
//         verticalAlign: "default",
//         color: "#fcfcfc",
//         fontSize: "1em",
//         fontWeight: "300",
//         letterSpacing: "1px",
//         fontFamily: 'Noto Sans CJK TC',
//     }}
//     label="取消"
//     onClick={this.props.HandleClose}
//     style={{margin: 5}}>
//
// </FlatButton>
// <FlatButton
// backgroundColor={'#c9745f'}
// labelStyle={{
//     padding: "5px",
//         height: "45px",
//         verticalAlign: "default",
//         color: "#fcfcfc",
//         fontSize: "1em",
//         fontWeight: "300",
//         letterSpacing: "1px",
//         fontFamily: 'Noto Sans CJK TC',
// }} label="Add Blocked"
// onClick={this.addCard}
// style={{margin: 5}}>
// </FlatButton>