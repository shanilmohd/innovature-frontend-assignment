
import React, { useState, useEffect } from 'react';
import { getEmployees, addEmployee, updateEmployee, deleteEmployee } from '../api';
import NavBar from './NavBar';
import '/Users/mohamedshanil/Desktop/innovature-frontend-task/crup-app-updated/crud-app/src/EmployeeList.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({ name: '', position: '' });
  const [editingEmployee, setEditingEmployee] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const response = await getEmployees();
    setEmployees(response.data);
  };

  const handleAddEmployee = async () => {
    if (newEmployee.name && newEmployee.position) {
      await addEmployee(newEmployee);
      setNewEmployee({ name: '', position: '' });
      fetchEmployees();
    }
  };

  const handleUpdateEmployee = async () => {
    if (editingEmployee.name && editingEmployee.position) {
      await updateEmployee(editingEmployee.id, editingEmployee);
      setEditingEmployee(null);
      fetchEmployees();
    }
  };

  const handleDeleteEmployee = async (id) => {
    await deleteEmployee(id);
    fetchEmployees();
  };

  return (
    <div className="employee-list">
    <NavBar />
      <h1>Employee Management System</h1>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            {employee.name} - {employee.position}
            <span>
              <button onClick={() => setEditingEmployee(employee)}>Edit</button>
              <button onClick={() => handleDeleteEmployee(employee.id)}>Delete</button>
            </span>
          </li>
        ))}
      </ul>

      <div className="form-container">
        <h2>{editingEmployee ? 'Edit Employee' : 'Add New Employee'}</h2>
        <input
          type="text"
          placeholder="Name"
          value={editingEmployee ? editingEmployee.name : newEmployee.name}
          onChange={(e) => {
            if (editingEmployee) {
              setEditingEmployee({ ...editingEmployee, name: e.target.value });
            } else {
              setNewEmployee({ ...newEmployee, name: e.target.value });
            }
          }}
        />
        <input
          type="text"
          placeholder="Position"
          value={editingEmployee ? editingEmployee.position : newEmployee.position}
          onChange={(e) => {
            if (editingEmployee) {
              setEditingEmployee({ ...editingEmployee, position: e.target.value });
            } else {
              setNewEmployee({ ...newEmployee, position: e.target.value });
            }
          }}
        />
        <button onClick={editingEmployee ? handleUpdateEmployee : handleAddEmployee}>
          {editingEmployee ? 'Update Employee' : 'Add Employee'}
        </button>
        {editingEmployee && <button onClick={() => setEditingEmployee(null)}>Cancel</button>}
      </div>
    </div>
  );
};

export default EmployeeList;
