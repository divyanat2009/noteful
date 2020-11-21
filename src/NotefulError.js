import React, {Component} from 'react';

class NotefulError extends Component{
  constructor(props){
      super(props)
      this.state = {
          hasError : false
      }
  }
  static getDerivedStateFromError(error){
      return {hasError: true}
  }
  
  render(){
    if(this.state.hasError){
        return <h2>{'Could not display content'}</h2>
    }
    return this.props.children;
  }
}
NotefulError.propTypes = {
  content: PropTypes.string.isRequired
}
export default NotefulError;