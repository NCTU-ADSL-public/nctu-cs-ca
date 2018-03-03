import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import './Login.css'

const style={
    backgroundImage: 'radial-gradient(circle, #3c3b52 0%, #252233 80%',
    height: '100%',
    textAlign: 'center',
    font: "1.33em 'Roboto Condensed', arial",
    overflowY: 'scroll'
};

export default class TabsExampleControlled extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 'a',
        };
    }

    handleChange = (value) => {
        this.setState({
            value: value,
        });
    };

    render() {
        return (
            <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                style={style}
            >
                <Tab label="已修正項目" value="a"
                     style = {{backgroundColor: "#ae5164", fontFamily: 'Noto Sans CJK TC',}}>
                    <ul className="live type2">
                        <li>增加放置抵免研究所課程功能</li>
                        <li>物理拆為3+1形式。</li>
                        <li>抵免及通過課程不重複顯示。</li>
                        <li>新增編輯課程功能</li>
                        <li>因交通大學單一入口帳密驗證問題，點選登出不能切換帳號。欲切換帳號可以到交大oauth網頁切換。</li>
                        <li>修正 http 無法導向到 https 問題。</li>
                        <li>抵免課程算一次</li>
                        <li>物理抵免多的一學分放至專業選修</li>
                        <li>普通生物學放至必修</li>
                        <li>畢業預審表加印當期課程</li>
                        <li>抵免課程將服學及藝文賞析移至服學及藝文賞析項目</li>
                        <li>通識及其他選修學分計算錯誤更正</li>
                        <li>圖書館學概論也可算至服務學習</li>
                        <li>可當通識之其他選修課程的向度補上</li>
                    </ul>
                </Tab>
                <Tab label="修正中" value="b"
                     style = {{backgroundColor: "#ae5164", fontFamily: 'Noto Sans CJK TC',}}>
                    <div style={{}}>
                        <ul className="live type2">
                            <li>霹靂優課程尚無法處理</li>
                            <li>尚無製作手機版</li>
                            <li>其他選修課程轉為通識尚無法處理</li>
                            <li>微學分課程尚無法處理</li>
                        </ul>
                    </div>
                </Tab>
            </Tabs>
        );
    }
}