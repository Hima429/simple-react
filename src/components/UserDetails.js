import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Card, Grid } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const UserDetails = () => {

    const [open, setOpen] = useState(false);
    const AddModelhandleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');

    const [editUser, setEditUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const generateUniqueId = () => {
        // Generate a random unique ID using a suitable algorithm
        return Math.random().toString(36).substring(2) + Date.now().toString(36);
      };

    const handleAddorEditUser = () => {
        const newUser = { id: generateUniqueId(), name, age, number, email };
        if (editUser) {
          // If an edit is in progress, update the existing user
          const updatedUsers = users.map((user) =>
            user.id === editUser.id ? newUser : user
          );
          setUsers(updatedUsers);
          setEditUser(null);
        } else {
          // Add the new user to the list
          setUsers([...users, newUser]);
        }
        setName('');
        setAge('');
        setNumber('');
        setEmail('');
        handleClose(); // Close the modal after submitting the form
    };

    const handleEditUser = (user) => {
        setName(user.name);
        setAge(user.age);
        setNumber(user.number);
        setEmail(user.email);
        setEditUser(user);
        AddModelhandleOpen(); // Open the modal for editing the user
    };

    const handleDeleteUser = (user) => {
        const updatedUsers = users.filter((u) => u.id !== user.id);
        setUsers(updatedUsers);
        setEditUser(null);
        console.log("user.id",user.id)
    };
    const renderUserDetails = (ageGroup) => {
        const filteredUsers = users.filter((user) => {
            if (ageGroup === '1-18') {
                return user.age >= 1 && user.age <= 18;
            } else if (ageGroup === '19-25') {
                return user.age >= 19 && user.age <= 25;
            } else if (ageGroup === '26-45') {
                return user.age >= 26 && user.age <= 45;
            } else {
                return user.age > 45;
            }
        }).filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()));

        const sortedUsers = filteredUsers.sort((a, b) =>
            a.name.localeCompare(b.name)
        );

        return (
            <div>
                <h3>{ageGroup}</h3>
                <ul>
                    {sortedUsers.map((user) => (
                        <div key={user.id}
                        >
                            <Card style={{marginBottom:'5px'}} >
                                <p>Name: {user.name}</p>
                                <p>Age: {user.age}</p>
                                <p>Number: {user.number}</p>
                                <p>Email: {user.email}</p>
                                <Button onClick={() => handleEditUser(user)}>Edit</Button>
                                <Button onClick={() => handleDeleteUser(user)}>Delete</Button>
                            </Card>
                        </div>
                    ))}
                </ul>
            </div>
        );
    };

    return (
        <div>
            <div>
                <TextField
                    id="outlined-basic"
                    label="Search by name"
                    variant="outlined"
                    autoComplete="off"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                {/* <SearchIcon /> */}
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
            <Button onClick={AddModelhandleOpen}>Add User</Button>
            <Grid container spacing={3}>
                <Grid item lg={3} xs={3} >{renderUserDetails('1-18')}</Grid>
                <Grid item lg={3} xs={3} >  {renderUserDetails('19-25')}</Grid>
                <Grid item lg={3} xs={3} > {renderUserDetails('26-45')}</Grid>
                <Grid item lg={3} xs={3} > {renderUserDetails('45+')}</Grid>
            </Grid>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <TextField id="outlined-basic" label="Name" variant="outlined" type="text"   autoComplete="off"
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                    <TextField id="outlined-number" label="Age" variant="outlined" type="number"   autoComplete="off"
                        value={age}
                        onChange={(e) => setAge(e.target.value)} />
                    <TextField id="outlined-number" label="Number" variant="outlined" type="text"   autoComplete="off"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)} />
                    <TextField id="outlined-basic" label="Email" variant="outlined" type="email"   autoComplete="off"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    <Button onClick={handleAddorEditUser}>{editUser !== -1 ? 'Submit' : 'Update'}</Button>
                </Box>
            </Modal>
        </div>
    );
};

export default UserDetails;
