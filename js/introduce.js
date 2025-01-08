$(document).ready(function () {
    const $carouselTrack = $('.carousel-track');
    const totalItems = $('.carousel-item').length;
    const visibleItems = 5;
    const itemWidth = $('.carousel-item').outerWidth(true); 
    const totalWidth = totalItems * itemWidth;
    const duplicateCount = 3;
    let currentIndex = duplicateCount; 
    let isDragging = false;
    let startX = 0;
    let currentTranslateX = -currentIndex * itemWidth;
    let prevTranslateX = -currentIndex * itemWidth;
    let autoSlideInterval;

    // 容器寬度
    $carouselTrack.css('width', `${totalWidth}px`);
    $carouselTrack.css('transform', `translateX(${currentTranslateX}px)`);

    // 自動輪播
    function autoSlide() {
        currentIndex++;
        $carouselTrack.css('transition', 'transform 0.5s ease');
        $carouselTrack.css('transform', `translateX(-${currentIndex * itemWidth}px)`);

        // 無縫回到原始圖片
        if (currentIndex >= totalItems - duplicateCount) {
            setTimeout(() => {
                $carouselTrack.css('transition', 'none');
                currentIndex = duplicateCount;
                $carouselTrack.css('transform', `translateX(-${currentIndex * itemWidth}px)`);
            }, 500);
        }
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(autoSlide, 3000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    startAutoSlide();

    // 滑鼠拖動
    $carouselTrack.on('mousedown', function (e) {
        stopAutoSlide();
        isDragging = true;
        startX = e.pageX;
        prevTranslateX = currentTranslateX;
        $carouselTrack.css('transition', 'none');
    });

    $(document).on('mousemove', function (e) {
        if (!isDragging) return;
        const deltaX = e.pageX - startX;
        currentTranslateX = prevTranslateX + deltaX;
        $carouselTrack.css('transform', `translateX(${currentTranslateX}px)`);
    });

    $(document).on('mouseup', function () {
        if (!isDragging) return;
        isDragging = false;

        // 將位置吸附到最近的一個圖片
        const roundedIndex = Math.round(-currentTranslateX / itemWidth);
        currentIndex = Math.max(0, Math.min(roundedIndex, totalItems - visibleItems));
        currentTranslateX = -currentIndex * itemWidth;

        $carouselTrack.css('transition', 'transform 0.5s ease');
        $carouselTrack.css('transform', `translateX(${currentTranslateX}px)`);

        // 無縫切換
        if (currentIndex < duplicateCount) {
            setTimeout(() => {
                $carouselTrack.css('transition', 'none');
                currentIndex = totalItems - duplicateCount * 2;
                $carouselTrack.css('transform', `translateX(-${currentIndex * itemWidth}px)`);
            }, 500);
        } else if (currentIndex >= totalItems - duplicateCount) {
            setTimeout(() => {
                $carouselTrack.css('transition', 'none');
                currentIndex = duplicateCount;
                $carouselTrack.css('transform', `translateX(-${currentIndex * itemWidth}px)`);
            }, 500);
        }

        startAutoSlide();
    });

    $(document).on('mouseleave', function () {
        if (!isDragging) return;
        isDragging = false;
        startAutoSlide();
    });
});
