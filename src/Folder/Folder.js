import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import './Folder.css';

class Folder extends Component{  
  render(){
    const {id, name} = this.props;
    return (
        <div className="Folder__item">
            <NavLink to={`/folder/${id}`}>
              {name}
            </NavLink>
        </div>
    );
  }
}
Folder.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
}
export default Folder;