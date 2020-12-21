import React from 'react'
import ApiContext from '../ApiContext'
import Button from '../Button/Button'
import { findNote, findFolder } from '../notes-helpers'
import './NotePageNav.css'
import PropTypes from 'prop-types'

export default class NotePageNav extends React.Component {
  static defaultProps = {
    history: {
      goBack: () => { }
    },
    match: {
      params: {}
    }
  }
  static contextType = ApiContext;

  render() {
    const { notes, folders, } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || {}
    const folder = findFolder(folders, note.folder_id)
    return (
      <div className='NotePageNav'>
        <Button
          tag='button'
          role='link'
          onClick={() => this.props.history.goBack()}
          className='NotePageNav__back-button'
        >
          
          Back
        </Button>
        {folder && (
          <h3 className='NotePageNav__folder-name'>
            {folder.name}
          </h3>
        )}
      </div>
    )
  }
}

NotePageNav.propTypes = {
	notes: PropTypes.array,
  folders: PropTypes.array,
  noteId: PropTypes.string,
	}