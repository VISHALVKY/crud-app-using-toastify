import './App.css';
import React, { useState } from 'react';
import 'react-responsive-modal/styles.css';
import { PlusCircle, Edit, Trash2, Eye } from 'react-feather';
import { Modal } from 'react-responsive-modal';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function App() {

  const blankuser = {
    name: "",
    email: "",
    address: ""
  }

  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [action, setAction] = useState('Add');
  const [userdata, setUserdata] = useState([]);
  const [user, setUser] = useState(blankuser);
  const [viewUser, setViewUser] = useState(blankuser);
  const [editIndex, setEditIndex] = useState(null);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setOpen(false);
    setAction('Add');
    setUser(blankuser);
  }

  const onOpenViewModal = () => setViewOpen(true);
  const onCloseViewModal = () => setViewOpen(false);

  const validateUser = (user) => {
    if (!user.name) {
      toast.error("Name is required!");
      return false;
    }
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!user.email) {
      toast.error("Email is required!");
      return false;
    } else if (!emailPattern.test(user.email)) {
      toast.error("Email must be a valid @gmail.com address!");
      return false;
    }
    if (!user.address) {
      toast.error("Address is required!");
      return false;
    }
    return true;
  }

  const addUser = () => {
    if (!validateUser(user)) return;

    setUserdata([...userdata, user]);
    setUser(blankuser);
    onCloseModal();
    toast.success("User added successfully!");
  }

  const editUser = (index) => {
    setAction('Edit');
    const selectedUser = userdata.find((x, i) => i === index);
    setUser(selectedUser);
    setEditIndex(index);
    onOpenModal();
  }

  const updateUser = () => {
    if (!validateUser(user)) return;

    const newusers = userdata.map((x, i) => {
      if (i === editIndex) {
        x = user;
      }
      return x;
    });
    setUserdata(newusers);
    setUser(blankuser);
    setEditIndex(null);
    onCloseModal();
    toast.success("User updated successfully!");
  }

  const deleteUser = (index) => {
    const newusers = userdata.filter((x, i) => i !== index);
    setUserdata(newusers);
    toast.success("User deleted successfully!");
  }

  const viewUserDetails = (index) => {
    const selectedUser = userdata.find((x, i) => i === index);
    setViewUser(selectedUser);
    onOpenViewModal();
  }

  return (
    <div className="container">
      <ToastContainer />
      <div className="d-flex">
        <h1>CRUD APP</h1>
      </div>
      <div className="toolbar">
        <button className='btn btn-p' onClick={onOpenModal}>
          <PlusCircle size={16}></PlusCircle><span>Add</span>
        </button>
      </div>
      <hr />
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userdata.length > 0 && userdata.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>
                <button className='btn ml2' onClick={() => viewUserDetails(index)}>
                  <Eye size={16}></Eye><span>View</span>
                </button>
                <button className='btn ml2' onClick={() => editUser(index)}>
                  <Edit size={16}></Edit><span>Edit</span>
                </button>
                <button className='btn ml2' onClick={() => deleteUser(index)}>
                  <Trash2 size={16}></Trash2><span>Delete</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal open={open} onClose={onCloseModal} center>
        <h2>{action} User</h2>
        <div className='form'>
          <label htmlFor="">Name</label>
          <input type="text" value={user.name} onChange={(e) => setUser({ ...user, "name": e.target.value })} />
          <label htmlFor="">Email</label>
          <input type="text" value={user.email} onChange={(e) => setUser({ ...user, "email": e.target.value })} />
          <label htmlFor="">Address</label>
          <textarea name="" id="" value={user.address} cols="30" rows="5" onChange={(e) => setUser({ ...user, "address": e.target.value })}></textarea>
          {action === 'Add' && <button className='btn' onClick={addUser}>Submit</button>}
          {action === 'Edit' && <button className='btn' onClick={updateUser}>Update</button>}
        </div>
      </Modal>

      <Modal open={viewOpen} onClose={onCloseViewModal} center>
        <h2>View User</h2>
        <div className='form'>
          <label htmlFor="">Name</label>
          <input type="text" value={viewUser.name} disabled />
          <label htmlFor="">Email</label>
          <input type="text" value={viewUser.email} disabled />
          <label htmlFor="">Address</label>
          <textarea name="" id="" value={viewUser.address} cols="30" rows="5" disabled></textarea>
        </div>
      </Modal>
    </div>
  );
}

export default App;
