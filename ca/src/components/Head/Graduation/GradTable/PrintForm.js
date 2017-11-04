import React from 'react'
import './GradTable.css'

import GradCategory from './GradCategory'

const data = [{"title":"核心","credit":9,"require":9,"selection":true,"course":[{"cn":"影像處理概論","en":"Introduction to Image Processing","score":60,"complete":true,"reason":"CS","year":105,"semester":2},{"cn":"網路程式設計概論","en":"Intro. to Network Programming","score":0,"complete":false,"reason":"CS","year":"","semester":""},{"cn":"網路通訊原理","en":"Principles of communications networks","score":60,"complete":true,"reason":"CS","year":104,"semester":2},{"cn":"計算機圖學概論","en":"Introduction to Computer Graphics","score":60,"complete":true,"reason":"CS","year":105,"semester":1}]},{"title":"副核心與他組核心","credit":9,"require":9,"selection":true,"course":[{"cn":"人工智慧概論","en":"Intro. to Artificial Intelligence","score":60,"complete":true,"reason":"CS","year":105,"semester":2},{"cn":"編譯器設計概論","en":"Intro. to Compiler Design","score":0,"complete":false,"reason":"CS","year":"","semester":""},{"cn":"資料庫系統概論","en":"Introduction to Database Systems","score":60,"complete":true,"reason":"CS","year":104,"semester":2},{"cn":"軟硬體協同設計概論與實作","en":"Introduction to Hardware-Software Codesign and Imp","score":0,"complete":false,"reason":"CS","year":"","semester":""},{"cn":"電路與電子學(一)","en":"Electrical Circuits and Electronics (I)","score":0,"complete":false,"reason":"CS","year":"","semester":""},{"cn":"電路與電子學(二)","en":"Electrical Circuits and Electronics (II)","score":0,"complete":false,"reason":"CS","year":"","semester":""},{"cn":"微分方程","en":"Differential Equation","score":0,"complete":false,"reason":"CS","year":"","semester":""},{"cn":"數值方法","en":"Numerical Methods","score":0,"complete":false,"reason":"CS","year":"","semester":""},{"cn":"無線網路","en":"Wireless Networks","score":60,"complete":true,"reason":"CS","year":104,"semester":2},{"cn":"訊號與系統","en":"Signals and Systems","score":0,"complete":false,"reason":"CS","year":"","semester":""},{"cn":"電腦安全概論","en":"Introduction to Computer Security","score":0,"complete":false,"reason":"CS","year":"","semester":""}]},{"title":"專業選修","credit":9,"require":12,"course":[{"cn":"教學實務","en":"","score":60,"reason":"CS","complete":true,"year":104,"semester":1},{"cn":"教學實務","en":"","score":60,"reason":"CS","complete":true,"year":104,"semester":2},{"cn":"創業實務(英文授課)","en":"","score":60,"reason":"CS","complete":true,"year":105,"semester":1},{"cn":"教學實務","en":"","score":60,"reason":"CS","complete":true,"year":105,"semester":1},{"cn":"密碼學概論","en":"","score":60,"reason":"CS","complete":true,"year":105,"semester":2},{"cn":"無線網路概論","en":"","score":60,"reason":"CS","complete":true,"year":105,"semester":2},{"cn":"教學實務","en":"","score":60,"reason":"CS","complete":true,"year":105,"semester":2}]},{"title":"其他選修","credit":0,"require":12,"course":[]},{"title":"外語","credit":10,"require":8,"course":[{"cn":"進階英文聽力與討論","en":"","score":60,"reason":"NotCS","complete":false,"year":103,"semester":1},{"cn":"進階英文閱讀與討論","en":"","score":60,"reason":"NotCS","complete":false,"year":103,"semester":2},{"cn":"英文演說:撰寫與發表","en":"","score":60,"reason":"NotCS","complete":false,"year":104,"semester":2},{"cn":"韓文(一)","en":"","score":60,"reason":"NotCS","complete":false,"year":105,"semester":1},{"cn":"韓文(二)","en":"","score":60,"reason":"NotCS","complete":false,"year":105,"semester":2}]},{"title":"通識","credit":20,"require":20,"course":[{"cn":"當代世界:認同與文化","en":"","score":60,"reason":"NotCS","complete":false,"year":103,"semester":1,"dimension":"通識"},{"cn":"心理學概論","en":"","score":60,"reason":"NotCS","complete":false,"year":103,"semester":1,"dimension":"群己"},{"cn":"西洋歌劇史","en":"","score":60,"reason":"NotCS","complete":false,"year":103,"semester":2,"dimension":"文化"},{"cn":"台灣史","en":"","score":60,"reason":"NotCS","complete":false,"year":103,"semester":2,"dimension":"歷史"},{"cn":"海洋環境與生態保育-MOOCs","en":"","score":60,"reason":"NotCS","complete":false,"year":104,"semester":1,"dimension":"自然"},{"cn":"性別與社會","en":"","score":60,"reason":"NotCS","complete":false,"year":104,"semester":2,"dimension":"群己"},{"cn":"文學經典:小說名著選","en":"","score":60,"reason":"NotCS","complete":false,"year":104,"semester":2,"dimension":"文化"},{"cn":"管理學概論","en":"","score":60,"reason":"NotCS","complete":false,"year":105,"semester":1,"dimension":"公民"},{"cn":"國際政治經濟學","en":"","score":60,"reason":"NotCS","complete":false,"year":105,"semester":1,"dimension":"公民"},{"cn":"文藝鑑賞:探索生命","en":"","score":60,"reason":"NotCS","complete":false,"year":105,"semester":1,"dimension":"文化"}]},{"title":"體育","credit":0,"require":0,"course":[{"cn":"大一體育","en":"","score":60,"reason":"NotCS","complete":false,"year":103,"semester":1},{"cn":"大一體育","en":"","score":60,"reason":"NotCS","complete":false,"year":103,"semester":2},{"cn":"體育－網球甲Ａ","en":"","score":60,"reason":"NotCS","complete":false,"year":104,"semester":1},{"cn":"體育－羽球甲A","en":"","score":60,"reason":"NotCS","complete":false,"year":104,"semester":2},{"cn":"體育－健康體適能","en":"","score":60,"reason":"NotCS","complete":false,"year":105,"semester":1},{"cn":"體育－健康體適能","en":"","score":60,"reason":"NotCS","complete":false,"year":105,"semester":2}]},{"title":"服務學習","credit":1,"require":0,"course":[{"cn":"服務學習(一)","en":"","score":60,"reason":"CS","complete":true,"year":103,"semester":2},{"cn":"動物與我-服務學習二","en":"","score":60,"reason":"NotCS","complete":false,"year":104,"semester":1}]},{"title":"藝文賞析","credit":0,"require":0,"course":[{"cn":"藝文賞析教育","en":"","score":60,"reason":"NotCS","complete":false,"year":103,"semester":1},{"cn":"藝文賞析教育","en":"","score":60,"reason":"NotCS","complete":false,"year":103,"semester":2}]}];

class PrintForm extends React.Component {
    state = {
        categories: data
    }

    render() {
        return (
            <table style={{ borderSpacing:'0' }}>
                <colgroup>
                    <col className="col0"/>
                    <col className="col1"/>
                    <col className="col2"/>
                    <col className="col3"/>
                    <col className="col4"/>
                    <col className="col5"/>
                    <col className="col6"/>
                    <col className="col7"/>
                    <col className="col8"/>
                    <col className="col9"/>
                    <col className="col10"/>
                    <col className="col11"/>
                    <col className="col12"/>
                </colgroup>
                <tr>
                    <td className='cell-text' colSpan='2' style={{fontSize:'10pt', fontWeight:'bold'}}>科目名稱</td>
                    <td className='cell-text' style={{fontSize: '8pt', fontWeight:'bold'}}>1上</td>
                    <td className='cell-text' style={{fontSize: '8pt', fontWeight:'bold'}}>1下</td>
                    <td className='cell-text' style={{fontSize: '8pt', fontWeight:'bold'}}>2上</td>
                    <td className='cell-text' style={{fontSize: '8pt', fontWeight:'bold'}}>2下</td>
                    <td className='cell-text' style={{fontSize: '8pt', fontWeight:'bold'}}>3上</td>
                    <td className='cell-text' style={{fontSize: '8pt', fontWeight:'bold'}}>3下</td>
                    <td className='cell-text' style={{fontSize: '8pt', fontWeight:'bold'}}>4上</td>
                    <td className='cell-text' style={{fontSize: '8pt', fontWeight:'bold'}}>4下</td>
                    <td className='cell-text' style={{fontSize: '8pt', fontWeight:'bold'}}>應修<br/>學分</td>
                    <td className='cell-text' style={{fontSize: '8pt', fontWeight:'bold'}}>實得<br/>學分</td>
                    <td className='cell-text' style={{fontSize: '12pt', fontWeight:'bold'}}>備註</td>
                </tr>

                {this.state.categories.map(category =>
                    <GradCategory
                        subjects={category.course}
                        name={category.title}
                    />
                )}
            </table>
        );
    }
}


export default PrintForm;