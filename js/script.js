window.addEventListener("DOMContentLoaded", () => {
  const tabsParent = document.querySelector(".tabheader__items"),
    tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    loader = document.querySelector(".loader");

  // Loader
  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }, 2000);

  // Tabsasasasasasasas
  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });

    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener("click", (event) => {
    const target = event.target;
    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, idx) => {
        if (target == item) {
          hideTabContent();
          showTabContent(idx);
        }
      });
    }
  });

  // Timer

  const deadline = "2024-12-31";

  function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds;
    const timer = Date.parse(endtime) - Date.parse(new Date());

    if (timer <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(timer / (1000 * 60 * 60 * 24));
      hours = Math.floor((timer / (1000 * 60 * 60)) % 24);
      minutes = Math.floor((timer / 1000 / 60) % 60);
      seconds = Math.floor((timer / 1000) % 60);
    }

    return { timer, days, hours, minutes, seconds };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updatClock, 1000);

    updatClock();

    function updatClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.timer <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(".timer", deadline);

  // Modal
  const modalTrigger = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal");

  function closeModal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }

  function openModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    clearInterval(modalTimerId);
  }

  modalTrigger.forEach((item) => {
    item.addEventListener("click", openModal);
  });

  modal.addEventListener("click", (e) => {
    if (e.target == modal || e.target.getAttribute("data-close") == "") {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

  const modalTimerId = setTimeout(openModal, 5000);

  function showModalByScroll() {
    if (
      window.scrollY + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  window.addEventListener("scroll", showModalByScroll);

  // Class
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 12500;
      this.changeToUZS();
    }

    changeToUZS() {
      this.price = this.price * this.transfer;
    }

    render() {
      let classes = this.classes.length ? this.classes.join(" ") : "menu__item";

      const html = `
        <div class="${classes}">
          <img src=${this.src} alt="${this.alt}" />
          <h3 class="menu__item-subtitle">${this.title}</h3>
          <div class="menu__item-descr">${this.descr}</div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
            <div class="menu__item-cost">Price:</div>
            <div class="menu__item-total"><span>${this.price}</span> uzs/month</div>
          </div>
        </div>
      `;

      this.parent.insertAdjacentHTML("beforeend", html);
    }
  }
  axios.get("http://localhost:3000/menu").then((data) =>
    data.data.forEach(({ img, alt, title, descr, price }) => {
      new MenuCard(img, alt, title, descr, price, ".menu .container").render();
    })
  );
  // async function getResource(url) {
  //   const get = await fetch(url);
  //   return await get.json();
  // }
  // getResource("http://localhost:3000/menu").then((data) => {
  //   data.forEach(({ img, alt, title, descr, price }) => {
  //     new MenuCard(img, alt, title, descr, price, ".menu .container").render();
  //   });
  // });
  // Form Submission
  const forms = document.querySelectorAll("form");

  const messages = {
    loading: "img/spinner.svg",
    success: "Process Completed Successfully",
    failure: "Something Went Wrong",
  };
  forms.forEach((form) => {
    bindPostData(form);
  });
  async function postData(url, data) {
    const response = await axios.post(url, data);
    return await response.data;
  }
  console.log(forms);
  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("img");
      statusMessage.src = messages.loading;
      // if (statusMessage.src) return;
      statusMessage.style.cssText = `
      display: block
      margin: 0 auto`;
      form.append(statusMessage);
      // const request = new XMLHttpRequest();
      // request.open("POST", "server.php");
      // setRequestHeader("Content-Type", "application/json");

      const formData = new FormData(form);
      console.log(formData);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));
      postData("http://localhost:3000/request", json)
        .then((data) => {
          console.log(data);
          showThankMsg(messages.success);
          statusMessage.remove();
        })
        .then((data) => {
          statusMessage.textContent = messages.loading;
          // statusMessage.remove();
        })
        .catch(() => {
          showThankMsg(messages.failure);
        })
        .finally(() => form.reset());
      // console.log(obj);
      // const json = JSON.stringify(obj);
      // request.send(json);

      // request.addEventListener("load", () => {
      //   if (request.status === 200) {
      //     // console.log(request.response);
      //     showThankMsg(messages.success);
      //     form.reset();
      //     setTimeout(() => {
      //       statusMessage.remove();
      //     }, 2000);
      //   } else {
      //     showThankMsg(messages.failure);
      //   }
      // });
    });
  }
  function showThankMsg(message) {
    const prevModelDiolog = document.querySelector(".modal__dialog");
    prevModelDiolog.classList.add("hide");
    openModal();
    const thanksModel = document.createElement("div");
    thanksModel.classList.add("modal__dialog");
    thanksModel.innerHTML = ` 
    <div class="modal__content">
      <div data-close class="modal__close">&times;</div>
      <div class="modal__title">${message}
    </div>`;
    document.querySelector(".modal").append(thanksModel);
    setTimeout(() => {
      thanksModel.remove();
      prevModelDiolog.classList.add("show");
      prevModelDiolog.classList.remove("hide");
      closeModal();
    }, 1000);
  }
  const slides = document.querySelectorAll(".offer__slide"),
    prev = document.querySelector(".offer__slider-prev"),
    next = document.querySelector(".offer__slider-next"),
    current = document.querySelector("#current"),
    total = document.querySelector("#total"),
    slidesWrapper = document.querySelector(".offer__slider-wrapper"),
    slidesField = document.querySelector(".offer__slider-wrapper-inner"),
    width = window.getComputedStyle(slidesWrapper).width;

  let currI = 1;
  let offset = 0;
  // ???????????????????????????????????????????????????
  slidesField.style.width = 100 * slides.length + "%";
  slidesField.style.display = "flex";
  slidesWrapper.style.overflow = "hidden";
  slides.forEach((slide) => {
    slide.style.width = width;
  });
  next.addEventListener("click", () => {
    if (offset === +width.slice(0, width.length - 2) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += +width.slice(0, width.length - 2);
    }
  });

  // slides.length < 10
  //   ? (total.textContent = `0${slides.length}`)
  //   : (total.textContent = slides.length);
  // function showSlider(i) {
  //   if (i > slides.length) {
  //     currI = 1;
  //   } else if (i < 1) {
  //     currI = slides.length;
  //   }
  //   slides.forEach((item) => (item.style.display = "none")); // here we made display property equal to none
  //   slides[currI - 1].style.display = "block"; // here we made display property equal to block and from currI(current index)  we are deducting 1 as index starts from 0; but on top we made it equal to 1 as we can not add any value to 0 like (0+1 = 0)
  //   slides.length < 10
  //     ? (current.textContent = `0${currI}`)
  //     : (current.textContent = currI);
  // }
  // function plusMove(n) {
  //   showSlider((currI += n));
  // }
  // next.addEventListener("click", () => {
  //   plusMove(1);
  // });
  // prev.addEventListener("click", () => {
  //   plusMove(-1);
  // });
  // showSlider(currI);
});

// fetch has its own GET eventhough we do not write it
// fetch("http://localhost:3000/menu")
//   .then((data) => data.json())
//   .then((res) => console.log(res))
//   .catch((error) => console.log(error)); // Log the error instead of res

// fetch("https://jsonplaceholder.typicode.com/posts", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({ name: "Alan" }),
// })
//   .then((response) => response.json())
//   .then((json) => console.log(json));

// const arr = ["jake", "sa", "sjas", "ajsdhadjhd"];
// const narr = arr
//   .map((data) => data.toUpperCase())
//   // .filter((data) => data.length > 1)
//   .reduce((sum, curr) => `${sum} ${curr}`);
// console.log(narr);
/// deepCloning using JSON.parse(JSON.stringify)
// const original = {
//   name: "alan",
//   adds: {
//     city: "seoul",
//     postal: 4999,
//   },
// };
// const deepClone = JSON.parse(JSON.stringify(original));
// deepClone.adds.city = "NY";
// console.log(deepClone);
// console.log(original);

// const container = document.querySelector(".container");
// const newELM = document.createElement("p");
// newELM.textContent = " this is the test paragraph ";
// container.insertAdjacentElement("afterbegin", newELM);
