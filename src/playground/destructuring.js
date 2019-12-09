// Object Destructuring


// const person = {
//     age: 20,
//     location: {
//         city: 'Stouffville',
//         temperature: -10
//     }
// };

// const { name: firstName = 'John Doe', age } = person;
// console.log(`${firstName} is ${age}`);

// const { city, temperature: temp } = person.location;
// if (city  && temp) {
//     console.log(`It's ${temp} in ${city}`);
// }

// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday',
//     publisher: {
//         name: 'Penguin'
//     }
// };

// const { name: publisherName = 'Self-Published' } = book.publisher;
// console.log(publisherName)





// Array Destructuring

const address = [ '12 Alderbury Drive', 'Markham', 'Ontario', 'L3S2V2' ];
const [, , province] = address;
console.log(`You are in ${province}`);

const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];
const [itemName, , mediumPrice] = item;
console.log(`A medium ${itemName} costs ${mediumPrice}`);