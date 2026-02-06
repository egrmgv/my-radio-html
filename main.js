let today = new Date()
console.log(today)
document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slider-slide');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

  let currentSlide = 0;

  const showSlide = (index) => {
    slides.forEach((slide, i) => {
      if(index === i) {
        slide.classList.add('active')
      } else {
        slide.classList.remove('active')
      }
    })
  }
  const nextSlide = () => {
    currentSlide = (currentSlide += 1) % slides.length;
    showSlide(currentSlide)
  }
  const prevSlide = () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length
    showSlide(currentSlide)
  }

  nextBtn.addEventListener('click', nextSlide)
  prevBtn.addEventListener('click', prevSlide)

  showSlide(currentSlide)
})
