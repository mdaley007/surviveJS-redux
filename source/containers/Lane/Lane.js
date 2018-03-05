// modules
import   React                from 'react'
import { DropTarget }         from 'react-dnd'
import { connect }            from 'react-redux'
import { bindActionCreators } from 'redux'
// style
import style from './Lane.css'
// constants
import ItemTypes from '../../constants/itemTypes'
// components
import Editable from '../../components/Editable'
import Notes    from '../../components/Notes'

// note-target-config
const noteTarget = {
    hover(targetProps, monitor) {
        const sourceId = monitor.getItem().id
        const targetId = targetProps.laneId
        const {lane, attachNote} = targetProps

        // only empty lanes are targets...
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
            <div className={style.lane}>

                <div className={style.laneHeader}>
                    <div className={style.laneAddNote}>
                        <button onClick={this.addNote}>+</button>
                    </div>
                    <Editable
                        value={laneName}
                        styleValue={style.laneName}
                        onEdit={updateLane.bind(null, laneId)}
                        editing={editing}
                        setEditing={this.setEditing}
                    />
                    <div className={style.laneDelete}>
                        <button onClick={() => deleteLane(lane)}>X</button>
                    </div>
                </div>
                <div className={style.laneNotes}>
                    <Notes
                        notes={laneNotes}
                        onDelete={this.deleteNote}
                        onMove={moveNote}
                    />
                </div>
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
import laneSelectors from './lane-selectors'
import laneActions   from './lane-actions'
import noteActions   from '../Note/note-actions'

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
