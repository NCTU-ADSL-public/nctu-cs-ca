import React from 'react';
import index from './index+.png';
import './Home.css'

const img = index;
const data=["丹尼", "丹尼丹尼", "丹尼丹尼丹尼"];
class Home extends React.Component{

    render() {
        return (
            <div >
                <img src={img} className="image" alt=""/>
            </div>
        );
    }

}


export default Home;