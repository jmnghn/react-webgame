const React = require('react');
const { PureComponent } = React;

class PureComponentPractice extends PureComponent {

    state = {
        counter: 0,
        string: 'hello',
        number: 1,
        boolean: true,
        object: {},
        array: [],
    }

    onClick = () => {
        this.setState({
            array: [...this.state.array, 1],
        });
    }

    render() {
        console.log('rendering...');
        return (
            <>
                <div>Render Test</div>
                <button onClick={this.onClick}>클릭</button>
            </>
        )
    }
}

module.exports = PureComponentPractice;