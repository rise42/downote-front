import React from 'react'
import { Grid } from 'semantic-ui-react'
import { useDrop } from 'react-dnd'
import Types from 'prop-types'

import Note from './Note'

/**
 * A Grid.Column for Notes, also handles Notes drops
 * @param {Object[]} props.notes - notes to be rendered within column
 * @param {function} props.createNoteDragItem - a function to generate drag items for Notes
 * @param {function} props.onColumnDrop - a function called when a Note is dropped on a column
 * @param {function} props.onNoteDrop - a function passed to Notes to handle drop
 */
const NotesColumn = ({ notes, createNoteDragItem, onColumnDrop, onNoteDrop }) => {
  const [{ isOver, isOverCurrent }, drop] = useDrop({
    accept: 'Note',
    // not calling drop on column, if the drag is dropped on child (another note)
    drop: (item) => isOverCurrent ? onColumnDrop(item.id, item.columnIndex) : null,
    // allowing drop if the column is empty or the Note is not the las in this column
    canDrop: (item) => notes.length === 0 || item.id !== notes[notes.length - 1].id,
    collect: monitor => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true })
    })
  })

  return (
    <Grid.Column style={{ padding: 0 }}>
      <div ref={drop} style={{
        height: '100%',
        padding: '30px',
        backgroundColor: isOver ? 'gainsboro' : 'inherit',
        transition: '500ms'
      }}>
        {
          notes.map((note, index) => (
            <Note key={note.id}
              header={note.header}
              text={note.text}
              image={note.image}
              dragItem={createNoteDragItem(note.id)}
              onNoteDrop={(item) => onNoteDrop(item.id, note.id, item.columnIndex)}
              onCanDrop={
                // blocking the drop of the note onto the following note (in the same column)
                index > 0
                  ? (item) => item.id !== note.id && item.id !== notes[index - 1].id
                  : (item) => item.id !== note.id
              }
            />
          ))
        }
      </div>
    </Grid.Column>
  )
}

NotesColumn.propTypes = {
  notes: Types.arrayOf(
    Types.shape({
      id: Types.string.isRequired,
      header: Types.string,
      text: Types.string,
      image: Types.bool,
      order: Types.number.isRequired
    })),
  createNoteDragItem: Types.func.isRequired,
  onColumnDrop: Types.func.isRequired,
  onNoteDrop: Types.func.isRequired
}

export default NotesColumn