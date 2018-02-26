// modules
import   React                from 'react'
import { DragDropContext }    from 'react-dnd'
import   HTML5Backend         from 'react-dnd-html5-backend'
import { connect }            from 'react-redux'
import { bindActionCreators } from 'redux'
// components
import Lanes from './Lanes'
// redux
import laneActions   from '../actions/actions-lanes'
import laneSelectors from '../selectors/selectors-lanes'

// class: App
@DragDropContext(HTML5Backend)
@connect(() => mapStateToProps, () => mapDispatchToProps)
export default class App extends React.Component {
    render() {
        const {laneIds, createLane, updateLane, deleteLane } = this.props

        return (
            <div>

                <button
                    className='add-lane'
                    onClick={() => createLane()}
                >+</button>

                <Lanes
                    laneIds={laneIds}
                    onEdit={updateLane}
                    onDelete={deleteLane}
                />

            </div>
        )
    }
}

// smart-component features
const mapStateToProps = (state) => {
    return {
        laneIds: laneSelectors.getLaneIds(state)
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            createLane: laneActions.createLane,
            updateLane: laneActions.updateLane,
            deleteLane: laneActions.deleteLane,
        },
        dispatch,
    )
}
