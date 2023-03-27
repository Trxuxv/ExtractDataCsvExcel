import React, { Component } from 'react';
import TableForm from './TableForm';
import headers from './data/tableData';
import Table from './Table';

class AppTable extends Component {
    state = {
        headers: headers,
        editIdx: -1,
        data: [],
    };

    addRow = (item) => {
        const prevState = this.state.data
        const nextState = [...prevState, item]
        this.setState({
            data: nextState
        })
    }

    handleRemove = (i) => {
        this.setState({
            data: this.state.data.filter((item, j) => {
                return j !== i
            })
        })
    }

    startEditing = (i) => {
        this.setState({ editIdx: i })
    }

    stopEditing = (i) => {
        this.setState({ editIdx: -1 })
    }

    handleChange = (e, name, i) => {
        const { value } = e.target
        this.setState({
            data: this.state.data.map(
                (row, j) => (j === i ? { ...row, [name]: value } : row)
            )
        })
    }

    render() {
        return (
            <div className="container" >
                <TableForm
                    addRow={this.addRow}

                />
                <Table
                    headers={headers}
                    data={this.state.data}
                    handleRemove={this.handleRemove}
                    startEditing={this.startEditing}
                    editIdx={this.state.editIdx}
                    handleChange={this.handleChange}
                    stopEditing={this.stopEditing}
                />
                <li>{JSON.stringify(this.state.data, null, 2)}</li>


            </div >
        )
    }
}

export default AppTable;

