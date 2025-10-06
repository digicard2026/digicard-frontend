import * as Yup from 'yup';

export const signUpFields = [
    {
        name: 'first_name',
        type: 'string',
        validation: [
            { type: 'min', value: 2, message: 'Name must be at least 2 characters' },
            { type: 'required', message: 'Name is required' },
        ],
    },
    {
        name: 'email',
        type: 'string',
        validation: [
            { type: 'email', message: 'Invalid email address' },
            { 
                type: 'matches', 
                regex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
                message: 'email must be a valid email address' 
            },
            { type: 'required', message: 'Email is required' },
        ],
    },
    {
        name: 'company_name',
        type: 'string',
        validation: [
            { type:'company name', message: 'Invalid company name' },
            { type: 'required', message: 'Company name is required' },
        ],
    },
    {
        name: 'address',
        type: 'string',
        validation: [
            { type:'address', message: 'Invalid address' },
            { type: 'required', message: 'Address is required' },
        ],
    },
    {
        name: 'phone_number',
        type: 'string',
        validation: [
            { type: 'matches', regex: /^[0-9]{10}$/, message: 'Mobile number must be 10 digits' },
            { type: 'required', message: 'Mobile number is required' },
        ],
    },
    {
        name: 'password',
        type: 'string',
        validation: [
            { type: 'min', value: 8, message: 'Password must be at least 8 characters' },
            { 
                type: 'matches', 
                regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/, 
                message: 'Password must include uppercase, lowercase, number, and special character (@$!%*?&#)' 
            },
            { type: 'required', message: 'Password is required' },    

        ],
    },
    {
        name: 'confirm_password',
        type: 'string',
        validation: [
            { type: 'oneOf', values: [Yup.ref('password'), null], message: 'Passwords must match' },
            { type: 'required', message: 'Confirm Password is required' },
        ],
    },
];
