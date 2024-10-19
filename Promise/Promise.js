"use strict";

// const m = {
//   car: "BNW",
//   speed: 120,
//   extra: {
//     owner: "Alan",
//     helper: "Jake",
//   },
// };

// const { ...b } = m; // destructing // shallow copying
// console.log(b);
// b.extra.helper = "Michael";
// console.log(m);
// const a = JSON.parse(JSON.stringify(m)); // deep cloning
// a.extra.helper = "jakejan";
// console.log(m);
// console.log(a);
// const n = m;
// console.log(n);
// const friendHere = false;
// const requestFriendA = new Promise((get, reject) => {
//   if (friendHere) {
//     const msg = "he came";
//     get(msg);
//   } else {
//     const msg = "Did not come";
//     reject(msg);
//   }
// });
// requestFriendA
//   .then((msg) => console.log(msg))
//   .catch((err) => console.log(err))
//   .finally((last) => console.log("last operation has accured"));
const req = new Promise((resolve, reject) => {
  console.log("Request data...");
  const product = {
    name: "car",
    color: "black",
  };
  resolve(product);
});
req.then((data) => console.log(data)).finally(console.log("Fetching end."));
