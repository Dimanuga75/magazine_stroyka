function testWebP(callback) {
  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src =
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
  if (support == true) {
    document.querySelector("body").classList.add("webp");
  } else {
    document.querySelector("body").classList.add("no-webp");
  }
});

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
//const vh = window.innerHeight / 100;
//document.documentElement.style.setProperty("--vh", `${vh}px`);

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
let tohigh = document.querySelector(".message");
window.addEventListener("scroll", () => {
  if (scrollY > 100) {
    tohigh.classList.add("message-active");
  } else {
    tohigh.classList.remove("message-active");
  }
});

let projectBuildBox = document.querySelector(".build__project");
projectBuildBox.addEventListener("click", function (e) {
  let sliderMoveIndex = 0;
  let sliderBuildItems = document.querySelectorAll(".build__project-items");
  for (let i = 0; i < sliderBuildItems.length; i++) {
    let sliderItem = sliderBuildItems[i].querySelectorAll(
      ".build__project-item"
    );
    sliderItem.forEach(
      (item, index) =>
        (item.style.cssText = `translateX(${index * 100}%);
      visibility: hidden;`)
    );
  }
  if (
    e.target.classList.contains("project__item") ||
    e.target.classList.contains("img") ||
    e.target.classList.contains("project__title")
  ) {
    let index = e.target.dataset.number;
    let buildProjectItems = document.querySelectorAll(".build__project-items");
    let buildProjectBox = document.querySelector(".build__project-box");
    buildProjectBox.style.visibility = "visible";
    buildProjectItems[index].style.transform = "scale(1)";
    buildProjectItems[index].querySelectorAll(
      ".build__project-item"
    )[0].style.visibility = "visible";

    let currentSlider = sliderBuildItems[index].querySelectorAll(
      ".build__project-item"
    );

    document.querySelector(".build__project-close").onclick = function () {
      buildProjectBox.style.visibility = "hidden";
      buildProjectItems[index].style.transform = "scale(0)";
    };
    //тачскрин
    const sensitivity = 20;
    let touchStart = null; //Точка начала касания
    let touchPosition = null; //Текущая позиция

    function TouchStart(e) {
      //Получаем текущую позицию касания
      touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY,
      };
      touchPosition = { x: touchStart.x, y: touchStart.y };
    }
    function TouchMove(e) {
      touchPosition = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY,
      };
    }
    function TouchEnd(e) {
      CheckAction(); //Определяем, какой жест совершил пользователь
      //Очищаем позиции
      touchStart = null;
      touchPosition = null;
    }
    buildProjectItems[index].addEventListener("touchstart", function (e) {
      TouchStart(e);
    }); //Начало касания
    buildProjectItems[index].addEventListener("touchmove", function (e) {
      TouchMove(e);
    }); //Движение пальцем по экрану
    //Пользователь отпустил экран
    buildProjectItems[index].addEventListener("touchend", function (e) {
      TouchEnd(e);
    });
    function CheckAction() {
      let d =
        //Получаем расстояния от начальной до конечной точек по обеим осям
        {
          x: touchStart.x - touchPosition.x,
          y: touchStart.y - touchPosition.y,
        };

      if (Math.abs(d.x) > sensitivity) {
        //Проверяем, было ли движение достаточно длинным
        if (d.x > 0) {
          if (sliderMoveIndex < currentSlider.length - 1) {
            sliderMoveIndex++;
          } else {
            sliderMoveIndex = 0;
          }
          moveSlide(sliderMoveIndex);
        } //Иначе он двигал им слева направо
        else {
          if (sliderMoveIndex > 0) {
            sliderMoveIndex--;
          } else {
            sliderMoveIndex = currentSlider.length - 1;
          }
          moveSlide(sliderMoveIndex);
        }
      }
    }
    //-------------
    let moveSlide = function (slide) {
      currentSlider.forEach(
        (item, index) =>
          (item.style.cssText = `translateX(${(index - slide) * 100}%);
              visibility: hidden;`)
      );
      currentSlider[slide].style.visibility = "visible";
    };
    buildProjectItems[index].addEventListener("click", function (e) {
      e.preventDefault();

      if (e.target.classList.contains("build-left")) {
        sliderMoveIndex++;
        if (sliderMoveIndex == currentSlider.length) {
          sliderMoveIndex = 0;
        }
        moveSlide(sliderMoveIndex);
      }
      if (e.target.classList.contains("build-right")) {
        sliderMoveIndex--;
        if (sliderMoveIndex < 0) {
          sliderMoveIndex = currentSlider.length - 1;
        }
        moveSlide(sliderMoveIndex);
      }
    });
  }
});
