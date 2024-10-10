"use strict";

const usd = document.querySelector("#usd"),
  uzs = document.querySelector("#uzs");
uzs.addEventListener("input", (e) => {
  const request = new XMLHttpRequest();
  request.open("GET", "json.json");
  request.setRequestHeader("content-type", "application/json; charset=utf-8");
  request.send();

  request.addEventListener("readystatechange", (e) => {
    e.preventDefault();
    if (request.readyState == 4 && request.status == 200) {
      const data = JSON.parse(request.response);
      usd.value = (+uzs.value / data.current.usd).toFixed(2);
    } else usd.value = "something went wrong";
  });
});
