export default class DeleteButton extends React.Component {
    static contextType = NotefulContext

    deleteNoteRequest = () => {
        fetch(`http://localhost:9090/notes/${this.props.noteId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(res => {
                if (!res.ok) {
                    return res.json()
                    .then(error => {throw error});
                }
                return res.json()
            })
            .then(data => {
                this.context.deleteNote(this.props.noteId);
                this.props.push('/');
            })
            .catch(error => console.error(error));
    }

    render () {
        return (
            <button className="delete_button"
                onClick={this.deleteNoteRequest}>
                Delete Note 
            </button>
        );
    }
}
