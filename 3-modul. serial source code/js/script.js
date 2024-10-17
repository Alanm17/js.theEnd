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

  // Tabs
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

  new MenuCard(
    "img/tabs/1.png",
    "usual plan image",
    'Plan "Usual"',
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit nesciunt facere, sequi exercitationem praesentium ab cupiditatebeatae debitis perspiciatis itaque quaerat id modi corporis delectus ratione nobis harum voluptatum in.",
    10,
    ".menu .container"
  ).render();

  new MenuCard(
    "img/tabs/2.jpg",
    "premium plan image",
    "Plan “Premium”",
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit nesciunt facere, sequi exercitationem praesentium ab cupiditatebeatae debitis perspiciatis itaque quaerat id modi corporis delectus ratione nobis harum voluptatum in.",
    20,
    ".menu .container"
  ).render();

  new MenuCard(
    "img/tabs/3.jpg",
    "vip plan image",
    "Plan VIP",
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit nesciunt facere, sequi exercitationem praesentium ab cupiditatebeatae debitis perspiciatis itaque quaerat id modi corporis delectus ratione nobis harum voluptatum in.",
    30,
    ".menu .container",
    "menu__item"
  ).render();
  // Form Submission
  const forms = document.querySelectorAll("form");

  const messages = {
    loading: "img/spinner.svg",
    success: "Process Completed Successfully",
    failure: "Something Went Wrong",
  };

  forms.forEach((form) => {
    postData(form);
  });
  console.log(forms);
  function postData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("img");
      statusMessage.src = messages.loading;
      // if (statusMessage.src) return;
      // statusMessage.style.cssText = `
      // display: block
      // margin: 0 auto`;
      form.append(statusMessage);
      const request = new XMLHttpRequest();
      request.open("POST", "server.php");
      request.setRequestHeader("Content-Type", "application/json");
      const formData = new FormData(form);
      const obj = {};
      formData.forEach((key, val) => {
        obj[val] = key;
      });
      console.log(obj);
      const json = JSON.stringify(obj);
      request.send(json);

      request.addEventListener("load", () => {
        if (request.status === 200) {
          // console.log(request.response);
          showThankMsg(messages.success);
          form.reset();
          setTimeout(() => {
            statusMessage.remove();
          }, 2000);
        } else {
          showThankMsg(messages.failure);
        }
      });
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
    }, 4000);
  }
});

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
const friendHere = false;
const requestFriendA = new Promise((get, reject) => {
  if (friendHere) {
    const msg = "he came";
    get(msg);
  } else {
    const msg = "Did not come";
    reject(msg);
  }
});
requestFriendA
  .then((msg) => console.log(msg))
  .catch((err) => console.log(err))
  .finally((last) => console.log("last operation has accured"));
