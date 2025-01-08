$(document).ready(function() {
    const slides = $('.slide'); // 獲取所有圖片
    let currentIndex = 0; // 當前圖片索引

    
    setInterval(function() {
        currentIndex = (currentIndex + 1) % slides.length;
        switchImage(currentIndex);
    }, 6000); 

    // 點擊圖片切換
    $('.slide').on('click', function() {
        currentIndex = (currentIndex + 1) % slides.length; 
        switchImage(currentIndex);
    });


    function switchImage(index) {
        // 隱藏當前圖片
        $(slides).removeClass('active');
        $(slides[index]).addClass('active');
    }
});
