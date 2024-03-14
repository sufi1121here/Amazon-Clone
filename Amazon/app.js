// For the button
// var btn = document.getElementById("back-to-top");
        
// When the user scrolls down 20px from the top of the document, show the button
// window.onscroll = function() {scrollFunction()};
        
// function scrollFunction() {
//     if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
//         btn.style.display = "block";
//     } else {
//         btn.style.display = "none";
//     }
// }
        
// When the user clicks on the button, scroll to the top of the document
function backToTop() {
    // document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}






function addToCart() {
    alert('Product added to cart!');
    // You can add more functionality here, like updating a shopping cart, etc.
}


// Slider functionality
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const slider = document.querySelector('.product-slider');

let translateValue = 0;

prevBtn.addEventListener('click', function () {
    if (translateValue < 0) {
        translateValue += 100;
        slider.style.transform = `translateX(${translateValue}%)`;
    }
});

nextBtn.addEventListener('click', function () {
    const totalProducts = document.querySelectorAll('.product-item').length;
    const maxTranslate = -100 * (totalProducts - 1);

    if (translateValue > maxTranslate) {
        translateValue -= 100;
        slider.style.transform = `translateX(${translateValue}%)`;
    }
});






// const slides = document.querySelectorAll(".slide");

// // loop through slides and set each slides translateX property to index * 100% 
// slides.forEach((slide, indx) => {
//   slide.style.transform = `translateX(${indx * 100}%)`;
// });



// let curSlide = 0;

// // select next slide button
// const nextSlide = document.querySelector(".btn-next");

// // add event listener and next slide functionality
// nextSlide.addEventListener("click", function () {
//      curSlide++;

//   slides.forEach((slide, indx) => {
//     slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
//   });
// });




// const nextSlide = document.querySelector(".btn-next");

// // current slide counter
// let curSlide = 0;
// // maximum number of slides
// let maxSlide = slides.length - 1;

// // add event listener and navigation functionality
// nextSlide.addEventListener("click", function () {
//   // check if current slide is the last and reset current slide
//   if (curSlide === maxSlide) {
//     curSlide = 0;
//   } else {
//     curSlide++;
//   }

// //   move slide by -100%
//   slides.forEach((slide, indx) => {
//     slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
//   });
// });





// const prevSlide = document.querySelector(".btn-prev");

// // add event listener and navigation functionality
// prevSlide.addEventListener("click", function () {
//   // check if current slide is the first and reset current slide to last
//   if (curSlide === 0) {
//     curSlide = maxSlide;
//   } else {
//     curSlide--;
//   }

//   //   move slide by 100%
//   slides.forEach((slide, indx) => {
//     slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
//   });
// });




// const prevSlide = document.querySelector(".btn-prev");
// let curSlide = 0;
// const slides = document.querySelectorAll('.product');
// const maxSlide = slides.length - 1;

// // add event listener and navigation functionality
// prevSlide.addEventListener("click", function () {
//   // check if current slide is the first and reset current slide to last
//   if (curSlide === 0) {
//     curSlide = maxSlide;
//   } else {
//     curSlide--;
//   }

//   // move slide by 100%
//   slides.forEach((slide, indx) => {
//     slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
//   });
// });








// const initSlider=() =>{
//   const imageList = document.querySelector(".slider-container .product-item")
//   const sliderButton= document.querySelectorAll(".slider-container .slide-button")

//   sliderButton.forEach(button => {
//     button.addEventListener("click",  () => {
//       const direction=button.id === "prev-btn" ? -1 : 1;
//       const scrollAmount= imageList.clientWidth * direction;
//       imageList.scrollBy({ left: scrollAmount, behavior: "smooth"});
//     });
//   });
// }
// window.addEventListener("load", initSlider);




const initSlider=() =>{
  const imageList = document.querySelector(".slider-wrapper .image-item");
  const sliderButton= document.querySelectorAll(".slider-wrapper .slide-button");

  sliderButton.forEach(button => {
    button.addEventListener("click",  () => {
      const direction= button.id === "prev-btn" ? -1 : 1;
      const scrollAmount= imageList.clientWidth * direction;
      imageList.scrollBy({ left: scrollAmount, behavior: "smooth"});
      // console.log(button);
    });
  });
}
window.addEventListener("load", initSlider);


