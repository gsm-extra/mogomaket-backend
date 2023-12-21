 // 이미지 설정 함수
 function setThumbnail(event) {
    var reader = new FileReader();

    reader.onload = function(event) {
      var img = document.createElement("img");
      img.setAttribute("src", event.target.result);
      document.querySelector("div#image_container").appendChild(img);

      // 이미지 표시된 개수 확인
      var imageCount = document.querySelectorAll("div#image_container img").length;

      // 이미지 개수가 1보다 큰 경우 슬라이더 표시
      if (imageCount > 1) {
        document.querySelector(".slider").style.display = "block";
        document.querySelector(".slider-button").style.display = "block";
      } else {
        document.querySelector(".slider").style.display = "none";
        document.querySelector(".slider-button").style.display = "none";
      }

      // 이미지 추가될 때마다 슬라이더 갱신
      showSlide(currentSlide);
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  // 게시물 제출 함수
  function submitPost() {
    var textValue = document.getElementById("text").value;
    var imageSrc = document.querySelector("div#image_container img").getAttribute("src");

    // 'textValue'와 'imageSrc'를 서버로 전송 가능
    // 텍스트와 이미지 URL을 포함한 알림 표시
    alert("내용: " + textValue + "\n이미지 URL: " + imageSrc);
  }

// 이미지 삭제 함수
function removeImage() {
var imageContainer = document.querySelector("div#image_container");
var images = imageContainer.querySelectorAll("img");

if (images.length > 1) {
  imageContainer.removeChild(images[images.length - 1]);
  // 이미지 삭제 후 슬라이더 갱신
  showSlide(currentSlide);
} else if (images.length === 1){
  // 이미지가 1장일 때 삭제 버튼 클릭 시 슬라이더 및 버튼 숨김
  document.querySelector(".slider").style.display = "none";
  document.querySelector(".slider-button").style.display = "none";

  // 이미지가 2개 미만일 때 사진 지우기(새로고침)
  window.location.href = window.location.href;
}

// 이미지가 2장일 때 삭제 버튼 클릭 시 슬라이더 및 버튼 숨김
if (images.length === 2) {
  document.querySelector(".slider").style.display = "none";
  document.querySelector(".slider-button").style.display = "none";
}
}


  // 슬라이더 갱신 함수
  function showSlide(n) {
      const slides = document.querySelectorAll('.slide');
      slides.forEach(slide => slide.style.display = 'none');
      slides[n].style.display = 'block';
  }

  let currentSlide = 0;
    const slideCount = document.querySelectorAll('.slide').length;

    function showSlide(n) {
        const slides = document.querySelectorAll('.slide');
        slides.forEach(slide => slide.style.display = 'none');
        slides[n].style.display = 'block';
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        showSlide(currentSlide);
    }

    document.addEventListener('DOMContentLoaded', () => {
        showSlide(currentSlide);

        const nextButton = document.getElementById('nextBtn');
        const prevButton = document.getElementById('prevBtn');

        nextButton.addEventListener('click', nextSlide);
        prevButton.addEventListener('click', prevSlide);
    });