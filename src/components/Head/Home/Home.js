import React from 'react';
import index from './index+.png';
import './Home.css'

const img = index;

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