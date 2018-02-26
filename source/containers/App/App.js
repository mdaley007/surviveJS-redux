// modules
import   React                from 'react'
import { DragDropContext }    from 'react-dnd'
import   HTML5Backend         from 'react-dnd-html5-backend'
import { connect }            from 'react-redux'
import { bindActionCreators } from 'redux'

// style
import Style from './App.css'

// components
import Lanes from '../../components/Lanes'

// App Class
@DragDropContext(HTML5Backend)
@connect(() => mapStateToProps, () => mapDispatchToProps)
export default class App extends React.Component {
    render() {
        const {laneIds, createLane, updateLane, deleteLane } = this.props

        return (
            <div>

                <button
                    className={Style.addLane}
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
import laneActions   from '../../containers/Lane/lane-actions'
import laneSelectors from '../../containers/Lane/lane-selectors'

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
