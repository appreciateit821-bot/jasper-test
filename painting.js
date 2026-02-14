/* ============================================
   JASPER PORTFOLIO - Painting Page
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    const paintings = [
        { title: 'Crimson Dusk', medium: 'Oil on Canvas', img: 'images/paintings/crimson-dusk.jpg', note: 'This piece explores the boundary between day and night, where warm terracotta meets the cool shadows of twilight.' },
        { title: 'Silent Harbor', medium: 'Oil on Canvas', img: 'images/paintings/silent-harbor.jpg', note: 'Inspired by a quiet morning at Tongyeong harbor, the stillness of water reflecting scattered light.' },
        { title: 'Urban Pulse', medium: 'Mixed Media', img: 'images/paintings/urban-pulse.jpg', note: 'The heartbeat of Seoul at midnight — layers of neon and shadow converging into rhythm.' },
    ];

    const roomBackgrounds = [
        'images/rooms/gallery.jpg',
        'images/rooms/living-room.jpg',
        'images/rooms/bedroom.jpg',
    ];

    const grid = document.getElementById('gallery-grid');
    const roomOverlay = document.getElementById('room-overlay');
    const roomClose = document.getElementById('room-close');
    const roomView = document.getElementById('room-view');
    const roomPainting = document.getElementById('room-painting');
    const artistNote = document.getElementById('artist-note');
    const artistNoteText = document.getElementById('artist-note-text');

    // Build gallery
    paintings.forEach((p, i) => {
        const item = document.createElement('div');
        item.className = 'gallery-item reveal';
        item.style.transitionDelay = `${(i % 8) * 0.08}s`;
        item.innerHTML = `
            <img src="${p.img}" alt="${p.title}" loading="lazy">
            <div class="gallery-item-overlay">
                <div class="gallery-item-title">${p.title}</div>
                <div class="gallery-item-medium">${p.medium}</div>
            </div>
        `;
        item.addEventListener('click', () => openRoomView(i));
        grid.appendChild(item);
    });

    // Room View
    function openRoomView(index) {
        const p = paintings[index];
        const bg = roomBackgrounds[index % roomBackgrounds.length];
        roomView.style.backgroundImage = `url(${bg})`;
        roomPainting.src = p.img;
        roomPainting.alt = p.title;
        roomOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        startTyping(p.note);
    }

    function closeRoomView() {
        roomOverlay.classList.remove('active');
        document.body.style.overflow = '';
        artistNote.classList.remove('visible');
        artistNoteText.textContent = '';
    }

    roomClose.addEventListener('click', closeRoomView);
    roomOverlay.addEventListener('click', (e) => {
        if (e.target === roomOverlay) closeRoomView();
    });

    // Typing animation
    let typingTimer;
    function startTyping(text) {
        clearTimeout(typingTimer);
        artistNoteText.innerHTML = '<span class="typing-cursor"></span>';
        artistNote.classList.add('visible');

        let i = 0;
        function typeChar() {
            if (i < text.length) {
                artistNoteText.innerHTML = text.slice(0, i + 1) + '<span class="typing-cursor"></span>';
                i++;
                typingTimer = setTimeout(typeChar, 30);
            } else {
                artistNoteText.textContent = text;
            }
        }
        setTimeout(typeChar, 500);
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && roomOverlay.classList.contains('active')) {
            closeRoomView();
        }
    });
});
