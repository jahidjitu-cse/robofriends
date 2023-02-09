import React, { Component } from 'react';
import CardList from '../component/CardList';
import SearchBox from '../component/SearchBox';
import Scroll from '../component/Scroll';
import ErrorBoundry from '../component/ErrorBoundry';


class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
    }
    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(Response => {
                return Response.json();
            })
            .then(users => {
                this.setState({ robots: users })
            });

    }
    OnsearchChange = (event) => {
        this.setState({ searchfield: event.target.value })
    }
    render() {
        const Filtered = this.state.robots.filter((robot) => {
            return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
        })
        if (this.state.robots.length === 0) {
            return <h1 className='tc gradient-text'>Loading Files....</h1>
        }
        else {
            return (
                <div className='tc'>

                    <h1 className="gradient-text">RoboFriends</h1>
                    <SearchBox Onsearch={this.OnsearchChange} />
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={Filtered} />
                        </ErrorBoundry>
                    </Scroll>
                </div>

            );
        }


    }

}
export default App;