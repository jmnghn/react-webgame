const React = require('react');
const { Component } = React;

// Class Component -> Hooks
const Try = ({ tryInfo }) => {
    
    return (
        <>
            <li>
                <div>{tryInfo.try}</div>
                <div>{tryInfo.result}</div>
            </li>
        </>
    )
    
}

// Class Component
// class Try extends Component {
//     render() {
//         return (
//             <>
//                 <li>
//                     <div>{this.props.tryInfo.try}</div>
//                     <div>{this.props.tryInfo.result}</div>
//                 </li>
//             </>
//         )
//     }
// }

module.exports = Try;