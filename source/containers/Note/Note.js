// modules
import   React                from 'react'
import { DragSource,
         DropTarget }         from 'react-dnd'
import { bindActionCreators } from 'redux'
import { connect }            from 'react-redux'
// style
import style from './Note.css'
// constants
import ItemTypes from '../../constants/itemTypes'
// components
import Editable from '../../components/Editable'

// dnd-configs
const noteSource = {
    beginDrag(props) {
        return {
            id: props.noteId
        }
    },
    isDragging(props, monitor) {
        return props.noteId === monitor.getItem().id
    }
}
const noteTarget = {
    hover(targetProps, monitor) {
        const sourceId = monitor.getItem().id
        const targetId = targetProps.noteId

        if(sourceId !== targetId) {
            targetProps.onMove(sourceId, targetId)
        }
    }
}

// Note Class
@connect(() => mapStateToProps, () => mapDispatchToProps)
@DragSource(ItemTypes.NOTE, noteSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}))
@DropTarget(ItemTypes.NOTE, noteTarget, (connect) => ({
    connectDropTarget: connect.dropTarget(),
}))
export default class Note extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editing: false,
        }
    }
    render() {
        const   editing = this.state.editing
        const { connectDragSource, connectDropTarget, isDragging, note, onDelete, onMove, updateNote } = this.props
        const noteId = note.get('id')
        const noteTask = note.get('task')
        const dragSource = editing ? a => a : connectDragSource

        return dragSource(connectDropTarget(
            <li style={{
                opacity: isDragging ? 0 : 1
            }}>
                <Editable
                    editing={editing}
                    setEditing={this.setEditing}
                    value={noteTask}
                    styleValue={style.note}
                    styleDelete={style.delete}
                    onDelete={onDelete}
                    onEdit={updateNote.bind(null, noteId)}
                />
            </li>
        ))
    }
    setEditing = (newState) => {
        this.setState({
            editing: newState
        })
    }
}

// smart-component features
import noteActions   from './note-actions'
import noteSelectors from './note-selectors'

const mapStateToProps = (state, props) => {
    const noteId = props.noteId

    return {
        note: noteSelectors.getNoteById(state, noteId),
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            updateNote: noteActions.updateNote,
        },
        dispatch,
    )
}
