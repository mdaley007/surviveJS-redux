// modules
import   AltContainer         from 'alt-container'
import   React, { Component } from 'react'
import { DragDropContext }    from 'react-dnd'
import   HTML5Backend         from 'react-dnd-html5-backend'
import { connect }            from 'react-redux'
import { bindActionCreators } from 'redux'

// import actions
import * as laneActions from '../actions/actions-lanes'

// components
import Lanes from './Lanes'

// flux
import LaneActions from '../actions/LaneActions'
import LaneStore   from '../stores/LaneStore'

@DragDropContext(HTML5Backend)
class App extends Component {

    render() {
        return (
            <div>

                <button
                    className='add-lane'
                    //onClick={this.addLane}
                    onClick={this.props.create}
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
// smart-component features
const mapStateToProps = (state) => {
    return {}
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            create:         laneActions.create,
            update:         laneActions.update,
            deleteLane:     laneActions.deleteLane,
            attachToLane:   laneActions.attachToLane,
            detachFromLane: laneActions.detachFromLane,
            move:           laneActions.move,
        },
        dispatch,
    )
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App)
