import { faker } from '@faker-js/faker';

export const generateUser = () => ({
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  birthdate: { day: `16`, month: `February`, year: `1986` },
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  company: faker.company.name(),
  address: faker.location.streetAddress(),
  address2: faker.location.streetAddress(),
  country: 'New Zealand',
  state: faker.location.state(),
  city: faker.location.city(),
  zipcode: faker.location.zipCode(),
  mobileNumber: faker.phone.number({ style: 'national' }),
});
