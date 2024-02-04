import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Forms = () => {
const [formSubmit, setFormSubmit] = useState(false);
const [formErr, setFormErr] = useState({});
const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
});

const handleInputChange = (e) => {
    let { name, value } = e.target;
    setFormData({
    ...formData,
    [name]: value,
    });
};

const formSubmitHandler = (e) => {
    e.preventDefault();
    console.log(formData);

    let errors = validate(formData);
    setFormErr(errors);

    let errKeyArray = Object.keys(errors);

    if (errKeyArray.length === 0) {
        toast("Form Submitted Sucessfully");
        setFormSubmit(true);
    } else {
        toast("Form not Submitted");
        setFormSubmit(false);
    }
};

const validate = (data) => {
    let error = {};

    if (data.firstName.trim() === "") {
    error.firstName = "Please enter your first name";
    toast("Enter the First Name");
    }
    if (data.lastName.trim() === "") {
    error.lastName = "Please enter your last name";
    toast("Enter the Last Name");
    }
    if (data.email.trim() === "") {
    error.email = "Please enter your email";
    toast("Enter Valid Email");
    }

    if (data.phone.trim() === "") {
    error.phone = "Please enter your phone number";
    toast("Enter Your Phone Number");
    } else if (data.phone.trim().length !== 10) {
    error.phone = "Please enter a 10-digit phone number";
    toast("Enter Valid Phone Number");
    }

    console.log("error:", error);

    return error; 
};

return (
    <div style={{marginTop:"100px"}} className='form-container'>
    <fieldset id='legend'>
        <legend>Fill this form</legend>
        <form style={{padding:"50px"}} onSubmit={formSubmitHandler}>
        {formSubmit && (
            <div className='success'>
            <p id="successMsg">Registration Successful</p>
            </div>
        )}

        <ToastContainer />

        <label> First Name:</label>
        <input type="text" name='firstName' placeholder='First Name' onChange={handleInputChange} />
        {formErr.firstName && <p className='err'>{formErr.firstName}</p>}

        <label> Last Name:</label>
        <input type="text" name='lastName' placeholder='Last Name' onChange={handleInputChange} />
        {formErr.lastName && <p className='err'>{formErr.lastName}</p>}

        <label> Email:</label>
        <input type="email" name='email' placeholder='email' onChange={handleInputChange} />
        {formErr.email && <p className='err'>{formErr.email}</p>}

        <label> Phone number:</label>
        <input type="number" name='phone' placeholder='phone number' onChange={handleInputChange} />
        {formErr.phone && <p className='err'>{formErr.phone}</p>}

        <input style={{marginTop:"50px"}}  type="submit" value={"Register"} />
        </form>
    </fieldset>
    
    </div>
);
};

export default Forms;