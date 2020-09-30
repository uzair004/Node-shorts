// create buffer using from(array, buffer etc)
const buf = Buffer.from('Hey');

//create buffer and every index allocated with zeroes
const buf2 = Buffer.alloc(1024);

//buffer data accessed through index

// console.log(buf[0]);
// console.log(buf[1]);
// console.log(buf[2]);

//convert data in buffer to string
// console.log(buf.toString())

//length of data in buffer, buf2 will have all indexes with zeroes by default
// console.log(buf.length)
// console.log(buf2.length)

//iterate over buffer
// for (const item of buf) {
//     console.log(item)
// }

// for (const eachItem of buf2) {
//     console.log(eachItem) // bcz created with alloc() default value will be zeros
// }

//write string into buffer and display
// buf2.write('hello world');
// console.log(buf2.toString());

//write into specific index
// buf[2] = 111 //o
// console.log(buf.toString());


// copy buffer
let bufcopy = Buffer.alloc(4);
buf.copy(bufcopy);