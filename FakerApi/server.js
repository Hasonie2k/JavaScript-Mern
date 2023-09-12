const express = require('express');
const { faker } = require('@faker-js/faker');
const app = express();
const port = 3000;



const createUser = () => {
    const person = faker.person;
    return {
        password: faker.internet.password(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.phoneNumber(),
        lastName: person.lastName(),
        firstName: person.firstName(),
        _id: faker.datatype.uuid()
    };
};


const createCompany = () => {
    const location = faker.location;
    return {
        _id: faker.string.uuid(),
        name: faker.company.companyName(),
        address: location.streetAddress(),
        street: location.street(),
        city: location.city(),
        state: location.state(),
        zipCode: location.zipCode(),
        country: location.country()
    };
};



app.get('/api/users/new', (req, res) => {
    const newUser = createUser();
    res.json(newUser);
});

app.get('/api/companies/new', (req, res) => {
    const newCompany = createCompany();
    res.json(newCompany);
});

app.get('/api/user/company', (req, res) => {
    const newUser = createUser();
    const newCompany = createCompany();
    res.json({ user: newUser, company: newCompany });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
