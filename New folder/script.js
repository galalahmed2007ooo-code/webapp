document.addEventListener('DOMContentLoaded', () => {

    // 0. Verification Lock Screen Logic
    const lockForm = document.getElementById('lockForm');
    const lockOverlay = document.getElementById('lockOverlay');
    const lockError = document.getElementById('lockError');

    if (lockForm && lockOverlay) {
        lockForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('ansName').value.trim().toLowerCase();
            const year = document.getElementById('ansYear').value.trim().toLowerCase();
            const hour = document.getElementById('ansHour').value.trim().toLowerCase();
            const seem = document.getElementById('ansSeem').value.trim().toLowerCase();

            // الإجابات الصحيحة:
            // 1. Name: Hager, hager, هاجر
            const isNameValid = ['hager', 'هاجر','Batety','بطتي'].includes(name);

            // 2. Year/Date: 10/10/2009, 11/10/2009, 2009
            const isYearValid = year.includes('2009') || year.includes('10/10') || year.includes('11/10');

            // 3. Hour: 11, 12, ١١, ١٢
            const isHourValid = ['11', '12', '١١', '١٢'].some(h => hour.includes(h));

            // 4. Seem: عجل, عجله, عجلة
            const isSeemValid = ['عجل', 'عجله', 'عجلة'].includes(seem);

            if (isNameValid && isYearValid && isHourValid && isSeemValid) {
                // إجابات صحيحة 100%
                lockError.classList.add('hidden');
                
                // احتفال فرقعة الـ Confetti
                confetti({
                    particleCount: 150,
                    spread: 100,
                    origin: { y: 0.5 }
                });

                // تشغيل الأغنية تلقائياً
                if (bgMusic) {
                    bgMusic.play().then(() => {
                        if (playIcon) playIcon.className = 'fas fa-pause';
                    }).catch(err => console.log('Autoplay handled:', err));
                }

                // إخفاء صفحة القفل بسلاسة
                lockOverlay.classList.add('opacity-0', 'pointer-events-none');
                setTimeout(() => {
                    lockOverlay.classList.add('hidden');
                }, 700);

            } else {
                // إجابة واحدة أو أكثر غلط
                lockError.classList.remove('hidden');
                let wrongFields = [];
                if (!isNameValid) wrongFields.push("الاسم");
                if (!isYearValid) wrongFields.push("التاريخ/السنة");
                if (!isHourValid) wrongFields.push("الساعة");
                if (!isSeemValid) wrongFields.push("الـ Seem");
                
                lockError.innerText = `ركزي يا هجورتي! فيه غلط في: (${wrongFields.join(" - ")}) 😜`;
            }
        });
    }

    // 1. Audio Player Logic with Seek Bar Control
    const playBtn = document.getElementById('playBtn');
    const playIcon = document.getElementById('playIcon');
    const bgMusic = document.getElementById('bgMusic');
    const audioSeek = document.getElementById('audioSeek');
    const currentTimeText = document.getElementById('currentTime');
    const durationTimeText = document.getElementById('durationTime');

    function formatTime(seconds) {
        if (isNaN(seconds)) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    if (bgMusic) {
        bgMusic.addEventListener('loadedmetadata', () => {
            if (durationTimeText) durationTimeText.innerText = formatTime(bgMusic.duration);
        });

        bgMusic.addEventListener('timeupdate', () => {
            if (bgMusic.duration && audioSeek) {
                const progress = (bgMusic.currentTime / bgMusic.duration) * 100;
                audioSeek.value = progress;
                if (currentTimeText) currentTimeText.innerText = formatTime(bgMusic.currentTime);
                if (durationTimeText && !isNaN(bgMusic.duration)) {
                    durationTimeText.innerText = formatTime(bgMusic.duration);
                }
            }
        });

        if (audioSeek) {
            audioSeek.addEventListener('input', () => {
                if (bgMusic.duration) {
                    bgMusic.currentTime = (audioSeek.value / 100) * bgMusic.duration;
                }
            });
        }

        if (playBtn) {
            playBtn.addEventListener('click', () => {
                if (bgMusic.paused) {
                    bgMusic.play();
                    playIcon.className = 'fas fa-pause';
                } else {
                    bgMusic.pause();
                    playIcon.className = 'fas fa-play';
                }
            });
        }
    }

    // 2. Counter Logic (Starts exactly from 21 March 2026)
    const startDate = new Date(2026, 2, 21, 0, 0, 0); // Month 2 = March

    function updateCounter() {
        const now = new Date();
        const diff = now - startDate;

        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / 1000 / 60) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            if (document.getElementById('days')) {
                document.getElementById('days').innerText = days;
                document.getElementById('hours').innerText = hours;
                document.getElementById('minutes').innerText = minutes;
                document.getElementById('seconds').innerText = seconds;
            }
        } else {
            if (document.getElementById('days')) {
                document.getElementById('days').innerText = 0;
                document.getElementById('hours').innerText = 0;
                document.getElementById('minutes').innerText = 0;
                document.getElementById('seconds').innerText = 0;
            }
        }
    }
    setInterval(updateCounter, 1000);
    updateCounter();

    // 3. Image Lightbox Modal
    const imageModal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const timelineImages = document.querySelectorAll('.timeline-img');

    timelineImages.forEach(img => {
        img.addEventListener('click', () => {
            modalImg.src = img.src;
            imageModal.classList.remove('hidden');
        });
    });

    if (imageModal) {
        imageModal.addEventListener('click', () => {
            imageModal.classList.add('hidden');
        });
    }

    // 4. Interactive Gallery Slider Logic (All 28 Photos)
    const photos = [
        "photos/FIRSTPhoto.jpeg",
        "photos/last photo.jpeg",
        "photos/FIRST CALL.jpeg",
        "photos/LONGEST.jpeg",
        "photos/SAHELCALL.jpeg",
        "photos/1HOURCALL.jpeg",
        "photos/CALLS.jpeg",
        "photos/CALSS.jpeg",
        "photos/اول وانت من اهلي.jpeg",
        "photos/first bhbk.jpeg",
        "photos/fisrtlovenote.jpeg",
        "photos/together.jpeg",
        "photos/MISSU.jpeg",
        "photos/FIGHT.jpeg",
        "photos/MY SAFE PLACE - Copy.jpeg",
        "photos/kiss.jpeg",
        "photos/kissing photo.jpeg",
        "photos/INSTA matching.jpeg",
        "photos/STREAK.jpeg",
        "photos/streakpls.jpeg",
        "photos/SNAP.jpeg",
        "photos/SNAPP.jpeg",
        "photos/WhatsApp Image 2026-10-10 at 1.15.58 AM.jpeg",
        "photos/WhatsApp Image 2026-10-10 at 1.15.58 AM (1).jpeg",
        "photos/WhatsApp Image 2026-10-10 at 1.15.58 AM (2).jpeg",
        "photos/WhatsApp Image 2026-10-10 at 1.15.58 AM (3).jpeg",
        "photos/WhatsApp Image 2026-10-10 at 1.15.58 AM (4).jpeg",
        "photos/WhatsApp Image 2026-10-10 at 1.15.58 AM (5).jpeg"
    ];

    let currentSlide = 0;
    const sliderImage = document.getElementById('sliderImage');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const slideIndex = document.getElementById('slideIndex');
    const slideTotal = document.getElementById('slideTotal');

    if (sliderImage && prevBtn && nextBtn) {
        slideTotal.innerText = photos.length;

        function updateSlider() {
            sliderImage.src = photos[currentSlide];
            slideIndex.innerText = currentSlide + 1;
        }

        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide === 0) ? photos.length - 1 : currentSlide - 1;
            updateSlider();
        });

        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide === photos.length - 1) ? 0 : currentSlide + 1;
            updateSlider();
        });

        sliderImage.addEventListener('click', () => {
            modalImg.src = photos[currentSlide];
            imageModal.classList.remove('hidden');
        });
    }

    // 5. Quiz Logic (Custom Multi-Step Reactions)
    const quizCorrectBtn = document.getElementById('quizCorrectBtn');
    const quizWrongBtn = document.getElementById('quizWrongBtn');
    const quizResult = document.getElementById('quizResult');

    let hasClickedWrong = false;

    if (quizCorrectBtn && quizWrongBtn && quizResult) {
        // الخيار الخاطئ: حد تاني (خاينه)
        quizWrongBtn.addEventListener('click', () => {
            hasClickedWrong = true;
            quizResult.classList.remove('hidden');
            quizResult.className = "mt-6 p-4 rounded-xl font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 text-center";
            quizResult.innerHTML = "كنت عارف انك عجله هيييح دوسي التانيه 😜";
        });

        // الخيار الصحيح: جلولتك
        quizCorrectBtn.addEventListener('click', () => {
            quizResult.classList.remove('hidden');
            
            if (!hasClickedWrong) {
                // لو اختارته من أول مرة
                quizResult.className = "mt-6 p-4 rounded-xl font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 text-center";
                quizResult.innerHTML = "تحفهههه كنت عارف بموت فيكي ❤️🥳";
            } else {
                // لو اختارته بعد ما داست على الخيار الخاطئ الأول
                quizResult.className = "mt-6 p-4 rounded-xl font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 text-center";
                quizResult.innerHTML = "ششش بعد ايه كل حاجه بانت خلاصصص   ";
            }

            // احتفال الـ Confetti
            confetti({
                particleCount: 120,
                spread: 80,
                origin: { y: 0.6 }
            });
        });
    }

});