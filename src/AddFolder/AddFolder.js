import React from 'react';
import config from '../config';
import ApiContext from '../ApiContext';
import ValidationError from '../ValidationError';
import PropTypes from 'prop-types';

class AddFolder extends React.Component {
	constructor(props) {
    super(props);
		this.state = {
			name: {
				value: '',
			  touched: false
			}
		};
	}

	static contextType = ApiContext;
	
  handleFolderFormSubmit = (event) => {
		event.preventDefault();

		const newFolder = JSON.stringify({
			folder_name: this.state.name.value
		})

		fetch(`${config.API_ENDPOINT}api/folders`,
		{
			method: 'POST',
			body: newFolder,
			headers: { 'content-type': 'application/json',
			'Authorization': `Bearer ${config.API_KEY}`
		 },			
		})
		.then(res => {
			//console.log(res)
			if (!res.ok){
			return res.json().then(error => {
				throw error
			})
		  }
		  return res.json()
		})
		.then(response => this.context.addFolder(response))
		.then(
			this.props.history.push('/')
		)
		
		.catch(error => alert(error.message))
	}
	
	updateFolderName = (name) => {
		this.setState({
			name: {
				value: name,
				touched: true
			}
		})
	}

  validateFolderName() {
		const name = this.state.name.value.trim();
		  if (name.length === 0) {
				return 'Name is required'
			}
	}

	render() {
		return (
			<form onSubmit={this.handleFolderFormSubmit}>
				<label htmlFor="folder-name">Folder name</label>
				<input 
				id="folder-name" 
				type="text" 
				name="folder-name"
				onChange = {e => this.updateFolderName(e.target.value)}
				></input>
				{this.state.name.touched && (<ValidationError message = {this.validateFolderName()}/>)}
				<button type="submit" disabled={this.validateFolderName()}>Save</button>
			</form>
		)
	}
}
export default AddFolder;

AddFolder.propTypes = {
	addFolder: PropTypes.func
}