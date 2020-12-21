import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import ApiContext from '../ApiContext'
import Button from '../Button/Button'
import { countNotesForFolder } from '../notes-helpers'
import './NoteListNav.css'

export default class NoteListNav extends React.Component {
  static contextType = ApiContext;

  render() {
    const { folders=[], notes=[] } = this.context
    return (
      <div className='NoteListNav'>
        <ul className='NoteListNav__list'>
          {folders.map(folder =>
            <li key={folder.id}>
              <NavLink
                className='NoteListNav__folder-link'
                to={`/folder/${folder.id}`}
              >
                <span className='NoteListNav__num-notes'>
                  {countNotesForFolder(notes, folder.id)}
                </span>
                {folder.folder_name}
              </NavLink>
            </li>
          )}
        </ul>
        <div className='NoteListNav__button-wrapper'>
          <Button
            tag={Link}
            to='/add-folder'
            type='button'
            className='NoteListNav__add-folder-button'
          >
            
            Folder
          </Button>
        </div>
      </div>
    )
  }
}