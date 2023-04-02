import * as flsFunctions from "./modules/functions.js";

flsFunctions.isWebp();

const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (let smoothLink of smoothLinks) {
  smoothLink.addEventListener("click", function (e) {
    e.preventDefault();
    const id = smoothLink.getAttribute("href");
    document.querySelector(id).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

let sliderItem = document.querySelectorAll(".slider__item");
let sliderIndex = 0;
sliderItem[sliderIndex].style.visibility = "visible";

function positionSlider() {
  sliderItem.forEach(
    (item, index) => (item.style.transform = `translateX(${index * 100}%)`)
  );
}
//function positionSlider() {
//  sliderItem.forEach((item, index) => (item.style.opacity = "0"));
//  sliderItem[sliderIndex].style.opacity = "1";
//}
positionSlider();
function sliderNext() {
  if (sliderIndex < sliderItem.length - 1) {
    sliderIndex++;
  } else {
    sliderIndex = 0;
  }
  sliderItem.forEach(
    (item, index) =>
      //(item.style.transform = `translateX(${(index - sliderIndex) * 100}%)`)
      (item.style.cssText = `translateX(${(index - sliderIndex) * 100}%);
    visibility: hidden;`)
  );
  sliderItem[sliderIndex].style.visibility = "visible";
  //if (indexCuurentSlideModel2 != 0) {
  //  indexModel2 = indexCuurentSlideModel2;
  //}
  //for (const item of sliderDotArr) {
  //  item.classList.remove("active");
  //}
  //sliderDotArr[indexModel2].classList.add("active");
  //moveToSlideModel2(indexModel2);
}
setInterval(sliderNext, 7000);

let body = document.querySelector("body");
body.addEventListener("click", function (e) {
  if (e.target.classList.contains("order__call")) {
    e.preventDefault();
    let formaWrapper = document.querySelector(".forma-wrapper");
    let formaCall = document.querySelector(".forma__phone");
    formaWrapper.style.visibility = "visible";
    formaCall.style.transform = "scale(1)";
    document.querySelector(".forma__close").onclick = function () {
      formaWrapper.style.visibility = "hidden";
      formaCall.style.transform = "scale(0)";
    };
    let formaTilte = document.querySelector(".forma__title");
    if (e.target.classList.contains("order")) {
      formaTilte.textContent = " СДЕЛАТЬ ЗАКАЗ";
    } else if (e.target.classList.contains("consultation")) {
      formaTilte.textContent = "Получить консультацию";
    } else if (e.target.classList.contains("master")) {
      formaTilte.textContent = "Заказать мастера";
    } else {
      formaTilte.textContent = " ОБРАТНЫЙ ЗВОНОК";
    }
  }
});

function formValidate(forma) {
  let error = 0;
  const formReq = document.querySelectorAll(".req");
  for (let index = 0; index < formReq.length; index++) {
    const input = formReq[index];
    if (input.classList.contains("phone__check")) {
      if (phoneTest(input)) {
        document.querySelector(
          ".phone__check"
        ).nextElementSibling.style.display = "block";
        error++;
      }
    } else if (
      input.getAttribute("type") == "checkbox" &&
      input.checked == false
    ) {
      document.querySelector(".agree__box").nextElementSibling.style.display =
        "block";
      error++;
    }
  }
  return error;
}

document.addEventListener("DOMContentLoaded", function () {
  const forma = document.getElementById("form__phone");

  forma.addEventListener("submit", formSend);
  async function formSend(e) {
    e.preventDefault();
    let error = formValidate(forma);
    if (error === 0) {
      let data = new FormData(forma);

      let responce = await fetch("ajax_quest.php", {
        method: "POST",
        body: data,
      });
      if (responce.ok) {
        //  formaddError();
        //  document.querySelector(".forma__popup-wrapper").style.visibility =
        //    "hidden";
        //  document.querySelector(".forma__popup-box").style.transform =
        //    "scale(0)";
        //  document.querySelector(".alert__item.success").style.transform =
        //    "scale(1)";
        //  setTimeout(formremoveError, 5000);
        //  forma2.reset();
      } else {
        //  console.log(responce);
        //  formaddError();
        //  document.querySelector(".alert__item.server").style.transform =
        //    "scale(1)";
        //  setTimeout(formremoveError, 5000);
      }
    } else {
      //setTimeout(formremoveError, 7000);
    }
  }
});
function phoneTest(input) {
  return !/^[\d\+][\d\(\)\ -]{4,14}\d$/.test(input.value);
}
let menuMessendger = document.querySelector(".message__main");
let menuMessendgerClose = document.querySelector(".message__close");
let messageBoxHidden = document.querySelector(".message__box-hidden");

menuMessendger.addEventListener("click", function (e) {
  e.preventDefault();
  menuMessendger.classList.add("message__main_noactive");
  messageBoxHidden.classList.add("message__box-hidden-active");

  menuMessendgerClose.onclick = function (mes1) {
    mes1.preventDefault();
    menuMessendger.classList.remove("message__main_noactive");
    messageBoxHidden.classList.remove("message__box-hidden-active");
  };
  document.querySelector(".message__up-box").onclick = function () {
    menuMessendger.classList.remove("message__main_noactive");
    messageBoxHidden.classList.remove("message__box-hidden-active");
  };
});

//-----------------
let tohigh = document.querySelector(".message");
window.addEventListener("scroll", () => {
  if (scrollY > 100) {
    tohigh.classList.add("message-active");
  } else {
    tohigh.classList.remove("message-active");
  }
});
