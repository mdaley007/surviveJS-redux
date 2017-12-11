// modules
import AltContainer from 'alt-container'
import React, { Component } from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

// components
import Lanes from './Lanes'

// flux
import LaneActions from '../actions/LaneActions'
import LaneStore from '../stores/LaneStore'

@DragDropContext(HTML5Backend)
export default class App extends Component {
    storeChanged = (state) => {
        // pg85
    }
    render() {
        return (
            <div>
                <button
                    className='add-lane'
                    onClick={this.addLane}
                >+</button>
                <AltContainer
                    stores={[LaneStore]}
                    inject={{ lanes: () => LaneStore.getState().lanes || [] }}
                >
                    <Lanes />
                </AltContainer>
            </div>
        )
    }
    addLane() {
        LaneActions.create({ name: 'New Lane' })
    }
}
