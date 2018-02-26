// modules
import React from 'react'

// Editable Class
export default class Editable extends React.Component {

    render() {
        const editing = this.props.editing

        return (
            <div>
                {editing
                    ? this.renderEdit()
                    : this.renderValue()
                }
            </div>
        )
    }
    renderEdit = () => {
        const value = this.props.value

        return (
            <input
                type='text'
                ref={ (e) => e
                    ? e.selectionStart = value.length
                    : null
                }
                autoFocus={true}
                defaultValue={value}
                onBlur={this.finishEdit}
                onKeyPress={this.checkEnter}
            />
        )
    }
    renderValue = () => {
        const {value, onDelete, setEditing, styleClass} = this.props

        return (
            <div
                className={styleClass}
                onClick={() => setEditing(true)}
            >
                <span className='value'>{value}</span>
                { onDelete ? this.renderDelete() : null }
            </div>
        )
    }
    renderDelete = () => {
        const onDelete = this.props.onDelete

        return (
            <button
                className='delete'
                onClick={onDelete}
            >x</button>
        )
    }
    checkEnter = (e) => {
        if (e.key === 'Enter') {
            this.finishEdit(e)
        }
    }
    finishEdit = (e) => {
        const { onEdit, setEditing } = this.props
        const value = e.target.value

        if(onEdit && value) {
            onEdit(value)
        }

        setEditing(false)
    }
}
