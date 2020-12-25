import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import ApiContext from '../ApiContext';
import AddFolder from '../AddFolder/AddFolder';
import AddNote from '../AddNote/AddNote';
import config from '../config';
import './App.css';
import ErrorBoundary from '../ErrorBoundary'

class App extends Component {
	state = {
			notes: [],
			folders: []
	};

	formatDate = (notes)=>{

		let updatedNotes = notes.map(note=>note={
		  ...note, 
		  date_modified:(note.date_modified).slice(0,10)
		})
		return updatedNotes
	  }
	  
	componentDidMount() {
	this.setState({ error: null })
  //getting the folders
  
    fetch(`${config.API_ENDPOINT}api/folders/`,{
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${config.API_KEY}`
    },
  })
    .then(res => {
      if(!res.ok) {
        throw new Error('Something went wrong, please try again later.');
      }
      return res;
    })
    .then(res => res.json())
    .then(data => {
      this.setState({
        folders:data,
       });
    })
    .catch(err => {
      this.setState({
       error: err.message
       });
    });

    //getting the notes
    
    fetch(`${config.API_ENDPOINT}api/notes/`,{
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${config.API_KEY}`
    },
  })
    .then(res => {
      if(!res.ok) {
        throw new Error('Something went wrong, please try again later.');
      }
      return res;
    })
    .then(res => res.json())
    .then(data => {
      //format all the dates 
      const updatedNotes = this.formatDate(data);
      this.setState({
        notes:updatedNotes,
       });
    })
    .catch(err => {
       this.setState({
        error: err.message
        });
    });
}


	handleDeleteNote = noteId => {
			this.setState({
					notes: this.state.notes.filter(note => note.id !== noteId)
			});
	};

	handleAddFolder = (folder) => {
	this.setState({
		folders: [...this.state.folders, folder]
	});
	}
    
	handleAddNote = (note) => {
			this.setState({
					notes: [...this.state.notes, note]
			})
	}

	renderNavRoutes() {
		return (
			<>
				{['/', '/folder/:folderId'].map(path => (
					<Route
							exact
							key={path}
							path={path}
							component={NoteListNav}
					/>
				))}
				<Route path="/note/:noteId" component={NotePageNav} />
				<Route path="/add-folder" component={AddFolder} />
				<Route path="/add-note" component={AddNote} />
			</>
		);
	}

	renderMainRoutes() {
		return (
			<>
				{['/', '/folder/:folderId'].map(path => (
					<Route
						exact
						key={path}
						path={path}
						component={NoteListMain}
					/>
				))}
				<Route path="/note/:noteId" component={NotePageMain} />
			</>
		);
	}

	render() {
		const value = {
				notes: this.state.notes,
				folders: this.state.folders,
				deleteNote: this.handleDeleteNote,
				addFolder: this.handleAddFolder,
				addNote: this.handleAddNote
		};
		return (
			<ErrorBoundary>
				<ApiContext.Provider value={value}>
					<div className="App">
						<nav className="App__nav">{this.renderNavRoutes()}</nav>
						<header className="App__header">
							<h1>
									<Link to="/">Noteful</Link>{' '}
									
							</h1>
						</header>
						<main className="App__main">{this.renderMainRoutes()}</main>
					</div>
				</ApiContext.Provider>
			</ErrorBoundary>
		);
	}
}

export default App;