// modules
import   React                from 'react'
import { DropTarget }         from 'react-dnd'
import { connect }            from 'react-redux'
import { bindActionCreators } from 'redux'
// constants
import ItemTypes from '../constants/itemTypes'
// components
import Editable from './Editable'
import Notes    from './Notes'
// actions
import laneActions   from '../actions/actions-lanes'
import noteActions   from '../actions/actions-notes'
import laneSelectors from '../selectors/selectors-lanes'

// note-target-config
const noteTarget = {
    hover(targetProps, monitor) {
        const sourceId = monitor.getItem().id
        const targetId = targetProps.laneId
        const {lane, attachNote} = targetProps

        if(lane.get('notes').count() === 0) {
            attachNote(targetId, sourceId)
        }
    }
}

// Lane Class
@connect(() => mapStateToProps, () => mapDispatchToProps)
@DropTarget(ItemTypes.NOTE, noteTarget, (connect) => ({
    connectDropTarget: connect.dropTarget()
}))
export default class Lane extends React.Component {
    constructor() {
        super()
        this.state = {
            editing: false,
        }
    }
    render() {
        const editing = this.state.editing
        const { connectDropTarget, lane, updateLane, deleteLane, moveNote } = this.props
        const laneId    = lane.get('id')
        const laneName  = lane.get('name')
        const laneNotes = lane.get('notes')

        return connectDropTarget(
            <div className='lane'>

                <div className='lane-header'>
                    <div className='lane-add-note'>
                        <button onClick={this.addNote}>+</button>
                    </div>
                    <Editable
                        styleClass='lane-name'
                        editing={editing}
                        value={laneName}
                        onEdit={updateLane.bind(null, laneId)}
                        setEditing={this.setEditing}
                    />
                    <div className='lane-delete'>
                        <button onClick={() => deleteLane(lane)}>x</button>
                    </div>
                </div>

                <Notes
                    notes={laneNotes}
                    onDelete={this.deleteNote}
                    onMove={moveNote}
                />

            </div>
        )
    }
    addNote = () => {
        const { laneId, createNote, attachNote } = this.props

        const newNote = createNote().payload
        attachNote(laneId, newNote.id)
    }
    deleteNote = (noteId) => {
        const { laneId, deleteNote, detachNote } = this.props

        detachNote(laneId, noteId)
        deleteNote(noteId)
    }
    setEditing = (newState) => {
        this.setState({
            editing: newState
        })
    }
}

// smart-component features
const mapStateToProps = (state, props) => {
    const laneId = props.laneId

    return {
        lane: laneSelectors.getLaneById(state, laneId)
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            createNote: noteActions.createNote,
            deleteNote: noteActions.deleteNote,

            updateLane: laneActions.updateLane,
            deleteLane: laneActions.deleteLane,
            attachNote: laneActions.attachNote,
            detachNote: laneActions.detachNote,
            moveNote:   laneActions.moveNote,
        },
        dispatch,
    )
}
