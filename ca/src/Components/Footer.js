import React from 'react'

const style = {
    position: 'fixed',
    bottom: 0,
    width: '100vw'
}

class Footer extends React.Component {

    render() {
        return (
            <footer style={style}>Copyright @2018 NCTUCS 交通大學資訊工程學系</footer>
        )
    }
}

export default Footer
