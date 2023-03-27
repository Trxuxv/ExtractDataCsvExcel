import React, { Component } from 'react';

class TableForm extends Component {
    state = {
        description: '',
        date: '',
        errors: ''
    };

    validateFields = () => {
        let iserror = false
        const errors = []

        if (!this.state.description) {
            iserror = true
            errors.push('description required')
        }
        if (!this.state.date) {
            iserror = true
            errors.push('date required')
        }
        if (iserror) {
            this.setState({ errors })
        }

        return iserror
    }

    handleInputChange = (e) => {
        const name = e.target.name
        this.setState({
            [name]: e.target.value
        })
    }

    createRow = (e) => {
        e.preventDefault();
        const newItem = this.state
        const er = this.validateFields()
        if (!er) {
            this.props.addRow(newItem)
            this.setState({
                description: '',
                date: '',
                errors: ''
            })
            e.currentTarget.reset()

        }
    }



    render() {
        return (
            <div>
                {this.state.errors &&
                    <div className="alert alert-warning" role="alert">
                        {this.state.errors.map(e => <li>{e}</li>)}
                    </div>
                }
                <form onSubmit={this.createRow} >
                    <div className="form-row">
                        <div className="col">
                            <input type="text"
                                onChange={this.handleInputChange}
                                className="form-control"
                                placeholder="description"
                                name="description" />
                        </div>
                        <div className="col">
                            <input type="text"
                                onChange={this.handleInputChange}
                                className="form-control"
                                placeholder="date"
                                name="date" />
                        </div>
                    </div>
                    <button type="submit"
                        className="btn btn-raised btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}




export default TableForm


