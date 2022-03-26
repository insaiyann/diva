import React, { useState } from 'react';

import web3 from '../web3';
import univContract from '../eth/helper/univContract';

const UniversityOps = (props) => {
    
    const sanitizeBulkData = (values) => {
        // remove newline characters
        values = values.replace(/(\r\n|\n|\r)/gm, "");
        // split/delimit acc. to commas
        values = values.split(",");
        // remove extra whitespaces from each roll no.
        values = values.map(item => { return item.trim()});
        // remove empty roll nos eg: 3, ,4
        values = values.filter(item => { return item !== "" });
        return values;
    }

    const [data, setData] = useState({
        rollNo: '',
        rollNoCheckStatus: 'none',
        bulkRollNos: '',
        bulkDataProcessingStatus: 'none'
    });
    
    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    }

    const handleBulkAddRollNos = async (e) => {
        e.preventDefault();
        const rollNoList = sanitizeBulkData(data.bulkRollNos);
        setData({...data, bulkDataProcessingStatus: 'processing'});
        const accounts = await web3.eth.getAccounts();
        await univContract.methods.addNewStudents().send({
            from: accounts[0],
            arguments: [rollNoList]
        });
        setData({...data, bulkDataProcessingStatus: 'processed-saved'});
    }
    
    const handleBulkRemoveRollNos = async (e) => {
        e.preventDefault();
        const rollNoList = sanitizeBulkData(data.bulkRollNos);
        
    }

    const handleCheckRollNo = async (e) => {
        e.preventDefault();
        const rollNoToCheck = data.rollNo.trim();

    }

    return (
        <form>
            <br/>
            <label htmlFor="bulkRollNos">Enter list of roll numbers to add/remove:</label>
            <br/><br/>
            <textarea name="bulkRollNos" type="text" value={data.bulkRollNos} onChange={handleChange} placeholder="3072,3073" />
            <br/><br/>
            <button onClick={handleBulkAddRollNos}>Enroll Roll Numbers</button>
            <button onClick={handleBulkRemoveRollNos}>Delist Roll Numbers</button>
            <br/><br/><br/>
            {data.bulkDataProcessingStatus === 'processing' && (<p style={{color: 'lightorange'}}>Loading...</p>)}
            {data.bulkDataProcessingStatus === 'processed-saved' && (<p style={{color: 'green'}}>Saved Roll Nos.</p>)}
            {data.bulkDataProcessingStatus === 'processed-deleted' && (<p style={{color: 'red'}}>Deleted Roll Nos.</p>)}
            <label htmlFor="rollNo">Check if a student is currently enrolled in this college:</label>
            <br/><br/>
            <input name="rollNo" type="text" value={data.rollNo} onChange={handleChange} placeholder="3074" />
            <br/><br/>
            <button onClick={handleCheckRollNo}>Check Enrolment Status</button>
            {data.rollNoCheckStatus === 'processing' && (<p style={{color: 'lightorange'}}>Loading...</p>)}
            {data.rollNoCheckStatus === 'processed-yes' && (<p style={{color: 'green'}}>Student is enrolled</p>)}
            {data.rollNoCheckStatus === 'processed-no' && (<p style={{color: 'red'}}>Student is NOT enrolled</p>)}   
        </form>
    );
}

export default UniversityOps;