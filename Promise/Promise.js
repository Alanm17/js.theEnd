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
  setTimeout(() => {
    const product = {
      name: "car",
      color: "black",
    };
    resolve(product);
    console.log("Processing Data...");
  }, 2000);
});
req
  .then(
    (data) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          data.satatus = "Ordered";
          console.log("Get Data...");
          resolve(data);
        }, 2000);
      })
  )
  .then((result) => console.log(result))
  .catch((data) => console.log("Something Went Wrong!"))
  .finally(() => console.log("Fetching end"));

const requestt = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

// // requestt.then((2000)=> console.log())
// requestt(5000).then((data) => console.log("Data took 1s"));
// requestt(5000).then((data) => console.log("Data took 2s"));
// requestt(5000).then((data) => console.log("Data took 3s"));
// //   .finally(() => console.log("Fetching End."));
// Promise.all([requestt(5000), requestt(5000), requestt(5000)]).then((data) =>
//   console.log("All")
// );
// Promise.race([requestt(5000), requestt(5000), requestt(5000)]).then((data) =>
//   console.log("Race first")
);
