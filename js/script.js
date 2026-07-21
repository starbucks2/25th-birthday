const images = [
    'assets/images/0f449cae-045f-46a6-a9a6-d1bc13f04fe2.jpg',
    'assets/images/15383d44-f73a-458d-9fff-7213774fe907.jfif',
    'assets/images/1f4da050-4437-46c9-a3ea-c7f6b4d32fc8.jfif',
    'assets/images/3bdc4b1b-1518-49bc-8fb5-587f45f81485.jfif',
    'assets/images/3dd204be-f90a-4c30-b5a7-783574db8e32.jpg',
    'assets/images/4671a2ea-d443-4a6e-afca-853f7439c1ca.jpg',
    'assets/images/6b735f8d-fbaf-4de6-8015-5ec0b6411922 (1).jpg',
    'assets/images/8034abeb-de80-4809-a3e5-6ca9318999ca.jpg',
    'assets/images/8bf43b66-b484-4382-9004-b6997841794c.jpg',
    'assets/images/8ff58b55-acd7-4dae-9e19-c2ca8f274677.jpg',
    'assets/images/a8f2114f-08ce-47f5-9a2c-af4fdd8f9a08.jpg',
    'assets/images/a968000e-fa30-4d18-99ec-62003625af01.jpg',
    'assets/images/b798b26c-2da2-437e-9676-342f86b9d729.jfif',
    'assets/images/bb530037-5c14-44b2-98dc-ac96699312a8.jpg',
    'assets/images/c6d338db-7416-4e11-92a4-d66e9d1546d3.jfif',
    'assets/images/cae5a709-0dc4-4086-8036-e020001fce44.jfif',
    'assets/images/cc14e741-1b5d-4ed4-86f0-cf90780d7283.jfif',
    'assets/images/f2d28d3c-0ff3-4a8f-9045-bb7aa8615628.jpg'
];

const messages = [
    "Happy 25th Birthday to the most amazing person! ✨",
    "Thank you for always being by my side. 💚",
    "Our friendship is the best gift I've ever received. 🎁",
    "To more adventures and memories together! 🚀",
    "You make my world a lot brighter. 🌈",
    "I'm so lucky to call you my girlbestfriend. 🍵",
    "Here's to 25 beautiful years! 🌿",
    "You're more than a friend, you're family. 🏠",
    "Thank you for the endless laughter! 😂",
    "Always here for you, no matter what. 🤗",
    "You inspire me every single day. 💪",
    "Stay as wonderful as you are! 🌟",
    "Cheers to your 25th birthday! 🍵",
    "Thank you for listening to my infinite rants. 🗣️",
    "Life is better with you in it. 🌻"
];

// Removed old overlay elements
const mainContent = document.getElementById('main-content');
const bgMusic = document.getElementById('bg-music');
const bgContainer = document.getElementById('background-container');
const carouselContainer = document.getElementById('carousel-container');
const endScreen = document.getElementById('end-screen');
const dynamicMessage = document.getElementById('dynamic-message');

let floatingInterval;
let carouselInterval;
let messageInterval;

// Start Action with SweetAlert2
document.addEventListener('DOMContentLoaded', () => {
    Swal.fire({
        title: 'For You, My Girlbestfriend 🍵',
        text: 'Click the button for a special surprise...',
        icon: 'info',
        iconHtml: '💚',
        confirmButtonText: 'Happy 25th Birthday 🍵',
        confirmButtonColor: '#88A973',
        background: '#1f2937',
        color: '#f9fafb',
        customClass: {
            title: 'font-["Dancing_Script"] text-4xl text-[#88A973]',
            confirmButton: 'font-["Quicksand"] font-semibold rounded-full px-8 py-3'
        },
        allowOutsideClick: false,
        allowEscapeKey: false
    }).then((result) => {
        if (result.isConfirmed) {
            mainContent.classList.remove('hidden');
            mainContent.classList.add('show');
            initFloatingHearts();
            initCarousel();
            initRandomMessages();
            bgMusic.play();
        }
    });
});

// Floating Elements (Hearts, Flowers, Chocolate, Bears)
function createFloatingElement(type) {
    const symbols = {
        heart: '💚',
        flower: '🌿',
        cake: '🍵',
        gift: '🎁',
        balloon: '🎈'
    };

    const element = document.createElement('div');
    element.classList.add('floating-heart');
    element.innerHTML = symbols[type] || '💚';

    const size = Math.random() * 20 + 15 + 'px';
    element.style.fontSize = size;
    element.style.left = Math.random() * 100 + 'vw';
    element.style.animationDuration = Math.random() * 3 + 3 + 's';

    bgContainer.appendChild(element);

    setTimeout(() => {
        element.remove();
    }, 5000);
}

function initFloatingHearts() {
    floatingInterval = setInterval(() => {
        const types = ['heart', 'flower', 'cake', 'gift', 'balloon'];
        const type = types[Math.floor(Math.random() * types.length)];
        createFloatingElement(type);
    }, 400);
}

// Random Carousel Logic
function initCarousel() {
    let currentIdx = 0;
    let shuffledImages = [...images].sort(() => Math.random() - 0.5);

    function showNext() {
        if (bgMusic.paused && bgMusic.currentTime > 0) return; // Stop if music finished

        const newImg = document.createElement('img');
        newImg.src = shuffledImages[currentIdx];
        newImg.classList.add('carousel-img');

        const animations = ['zoomIn', 'fadeIn', 'slideIn'];
        const anim = animations[Math.floor(Math.random() * animations.length)];
        newImg.style.animation = `${anim} 1s ease-in-out`;

        const oldImg = carouselContainer.querySelector('.carousel-img');
        if (oldImg) {
            oldImg.style.opacity = '0';
            oldImg.style.transition = 'opacity 0.5s ease-out';
            setTimeout(() => oldImg.remove(), 500);
        }

        carouselContainer.appendChild(newImg);

        currentIdx++;
        if (currentIdx >= shuffledImages.length) {
            currentIdx = 0;
            shuffledImages = [...images].sort(() => Math.random() - 0.5);
        }
    }

    showNext();
    carouselInterval = setInterval(showNext, 1800);
}

// Random Messages Logic
function initRandomMessages() {
    let currentMsgIdx = 0;
    let shuffledMessages = [...messages].sort(() => Math.random() - 0.5);

    function updateMessage() {
        dynamicMessage.style.opacity = '0';
        setTimeout(() => {
            dynamicMessage.textContent = shuffledMessages[currentMsgIdx];
            dynamicMessage.style.opacity = '1';
            currentMsgIdx = (currentMsgIdx + 1) % shuffledMessages.length;
            if (currentMsgIdx === 0) {
                shuffledMessages = [...messages].sort(() => Math.random() - 0.5);
            }
        }, 500);
    }

    updateMessage();
    messageInterval = setInterval(updateMessage, 5000); // Change message every 5 seconds
}

// Music Ended Logic
bgMusic.onended = function () {
    clearInterval(floatingInterval);
    clearInterval(carouselInterval);
    clearInterval(messageInterval);

    mainContent.classList.add('fade-out');
    setTimeout(() => {
        mainContent.style.display = 'none';
        endScreen.classList.remove('hidden');
        endScreen.style.opacity = '1';
    }, 1000);
};
