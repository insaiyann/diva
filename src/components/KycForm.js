import React, { useState } from 'react';

const KycForm = () => {
    const [data, setData] = useState({
        name: '',
        aadhar: '',
        gender: ''
    });
    
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleChange = (e)=> {
        let value = e.target.value;
        setData({...data, [e.target.name]: value});
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <br/>
            <input name="name" onChange={handleChange} type="text" value={data.name} placeholder="Enter your Name" />
            <br/>
            <label htmlFor="aadhar">Aadhar</label>
            <br/>
            <input name="aadhar" onChange={handleChange} type="text" value={data.aadhar} placeholder="Enter your Aadhar Number" />
            <br/>
            <label htmlFor="gender">Gender</label>
            <br/>
            <select onChange={handleChange} name="gender" id="gender">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
            <br/>
            <br/>
            <button type="submit">Save Details</button>          
            <br/>
        </form>
    )
}

export default KycForm;