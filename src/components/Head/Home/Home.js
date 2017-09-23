import React from 'react';
import index from './index+.png';

const img = index;

class Home extends React.Component{


    render() {
        return (
            <div >
                <img src={img} width="100%" />
            </div>
        );
    }

}


export default Home;