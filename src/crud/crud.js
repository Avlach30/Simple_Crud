import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    getEmployee,
    addEmployee,
    editEmployee,
    deleteEmployee
} from '../redux/action'
import { connect } from 'react-redux'

//class component
class Crud extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            employeeName: "",
            employeeDepartment: ""
        };
    }

    static propTypes = {
        employees: PropTypes.array.isRequired,
        getEmployee: PropTypes.func.isRequired,
        addEmployee: PropTypes.func.isRequired,
        editEmployee: PropTypes.func.isRequired,
        deleteEmployee: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.getEmployee();
    }

    submitData = () => {
        if (this.state.employeeName && this.state.employeeDepartment && !this.state.id) {
            const newEmployee = {
                id: Math.floor(Math.random() * (999 - 100 + 1) + 100),
                employeeName: this.state.employeeName,
                employeeDepartment: this.state.employeeDepartment,
            };

            this.props.addEmployee(newEmployee);
        } else if (this.state.employeeName && this.state.employeeDepartment && this.state.id) {
            const updatedDetails = {
                id: this.state.id,
                employeeName: this.state.employeeName,
                employeeDepartment: this.state.employeeDepartment,
            };

            this.props.editEmployee(updatedDetails);
        } else {
            alert('Maaf, pengisian harus lengkap');
        }

        this.clearData();
    }

    editDetails = (data) => {
        this.setState({
            id: data.id,
            employeeName: data.employeeName,
            employeeDepartment: data.employeeDepartment
        })
    }

    deleteEmployee = (id) => {
        this.clearData();
        if (window.confirm("Apakah anda yakin?")) {
            this.props.deleteEmployee(id);
        }
    }

    handleNameChange = (e) => {
        this.setState({
            employeeName: e.target.value
        });
    }

    handleDepartmentChange = (e) => {
        this.setState({
            employeeDepartment: e.target.value
        });
    }

    clearData = () => {
        this.setState({
            id: 0,
            employeeName: "",
            employeeDepartment: ""
        });
    }

    render() {
        return (
            <div className="content">
                <header>
                    <h1>Simple Crud</h1>
                </header>
                <div>
                    <div>
                        Nama Karyawan: <br/> <input onChange={this.handleNameChange} value={this.state.employeeName} type="text" placeholder="Nama Karyawan" /> <br />
                        Bagian: <br/>  <input onChange={this.handleDepartmentChange} value={this.state.employeeDepartment} type="text" placeholder="Bagian Karyawan" /><br />
                        {this.state.id ? <button onClick={this.submitData}>Update</button> : <button onClick={this.submitData}>Tambah</button>}   <button onClick={this.clearData}>Batal</button>
                    </div> <br/>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Nomor</th>
                                    <th>Nama</th>
                                    <th>Bagian</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.employees && this.props.employees.map((data, index) => {
                                    return <tr key={(index + 1)}>
                                        <td>{(index + 1)}</td>
                                        <td>{data.employeeName}</td>
                                        <td>{data.employeeDepartment}</td>
                                        <td><button onClick={() => this.editDetails(data)}>Edit</button> <button onClick={() => this.deleteEmployee(data.id)}>Hapus</button> </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    employees: state.employees
});

export default connect(mapStateToProps, { getEmployee, addEmployee, editEmployee, deleteEmployee })(Crud); 