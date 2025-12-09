 let currentSlide = 0;
        const sliderContainer = document.getElementById('sliderContainer');
        const slides = sliderContainer.children;
        const slideWidth = slides[0]?.offsetWidth + 24; // Including gap
        const slidesToShow = 4;

        function moveSlider(direction) {
            if (!slides.length) return;
            const maxSlide = Math.max(0, slides.length - slidesToShow);
            currentSlide = Math.min(Math.max(currentSlide + direction, 0), maxSlide);
            sliderContainer.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
        }

        // Auto-slide every 5 seconds
        let autoSlide = setInterval(() => moveSlider(4), 5000);

        // Pause auto-slide on hover
        sliderContainer.addEventListener('mouseenter', () => clearInterval(autoSlide));
        sliderContainer.addEventListener('mouseleave', () => {
            autoSlide = setInterval(() => moveSlider(4), 5000);
        });

        // Swipe support for mobile
        let touchStartX = 0;
        sliderContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });
        sliderContainer.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            if (touchStartX - touchEndX > 50) moveSlider(4);
            if (touchEndX - touchStartX > 50) moveSlider(-4);
        });

        // Dropdown functionality
        function toggleDropdown(button) {
            const dropdownMenu = button.nextElementSibling;
            const isOpen = dropdownMenu.classList.contains('show');
            document.querySelectorAll('.dropdown-menu').forEach(menu => menu.classList.remove('show'));
            if (!isOpen) dropdownMenu.classList.add('show');
        }

        function selectOption(item, type) {
            const button = item.closest('.custom-dropdown').querySelector('.dropdown-button');
            button.textContent = item.textContent;
            button.appendChild(document.createElement('span')).textContent = ' ';
            item.closest('.dropdown-menu').classList.remove('show');
            // Add logic here to handle filter selection if needed
        }

        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.custom-dropdown')) {
                document.querySelectorAll('.dropdown-menu').forEach(menu => menu.classList.remove('show'));
            }
        });