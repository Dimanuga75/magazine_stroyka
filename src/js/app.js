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

//let faqBox = document.querySelector(".faq__box");
//faqBox.addEventListener("click", function (e) {
//  if (e.target.classList.contains("faq__item-title")) {
//    e.preventDefault();
//    e.target.classList.toggle("faq__item-title--active");
//  }
//});
let sliderItem = document.querySelectorAll(".slider__item");
let sliderIndex = 0;
console.log(sliderIndex);

function positionSlider() {
  sliderItem.forEach(
    (item, index) => (item.style.transform = `translateX(${index * 100}%)`)
  );
}
positionSlider();
function sliderNext() {
  if (sliderIndex < sliderItem.length - 1) {
    sliderIndex++;
  } else {
    sliderIndex = 0;
  }
  sliderItem.forEach(
    (item, index) =>
      (item.style.transform = `translateX(${(index - sliderIndex) * 100}%)`)
  );
  //if (indexCuurentSlideModel2 != 0) {
  //  indexModel2 = indexCuurentSlideModel2;
  //}
  //for (const item of sliderDotArr) {
  //  item.classList.remove("active");
  //}
  //sliderDotArr[indexModel2].classList.add("active");
  //moveToSlideModel2(indexModel2);
}
setInterval(sliderNext, 3000);
