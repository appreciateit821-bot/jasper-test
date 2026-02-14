      document.addEventListener('DOMContentLoaded', () => {
          const particleContainer = document.getElementById('particle-container');
          const orbitContainer = document.querySelector('.orbit-container');
          const satellites = document.querySelectorAll('.satellite');
          const core = document.getElementById('jasper-core');
          
          const previewContainer = document.getElementById('preview-container');
          const closePreviewBtn = document.getElementById('close-preview');
          const galleries = {
              painting: document.getElementById('painting-preview'),
              acting: document.getElementById('acting-preview'),
              writing: document.getElementById('writing-preview')
          };

          // --- Mock Data ---
          const previewData = {
              painting: [
                  'https://images.unsplash.com/photo-1531241136452-e565613c7c64?q=80&w=1964&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1569792998835-c907c3a723e7?q=80&w=1974&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1525909002-15104b216a3e?q=80&w=2070&auto=format&fit=crop'
              ],
              acting: [], // Add URLs for acting thumbnails/videos
              writing: [] // Add snippets for writing
          };

          // --- 1. Particle Effect ---
          function createParticles() {
              for (let i = 0; i < 50; i++) {
                  const particle = document.createElement('div');
                  particle.classList.add('particle');
                  const size = Math.random() * 3 + 1;
                  particle.style.width = `${size}px`;
                  particle.style.height = `${size}px`;
                  particle.style.left = `${Math.random() * 100}%`;
                  particle.style.top = `${Math.random() * 100}%`;
                  particle.style.animationDelay = `${Math.random() * 3}s`;
                  particleContainer.appendChild(particle);
              }
          }

          // --- 2. Satellite Orbit Calculation ---
          function updateSatellitePositions() {
              const time = Date.now() * 0.0001;
              satellites.forEach((satellite, index) => {
                  const angle = time + (index * (2 * Math.PI / satellites.length));
                  const x = Math.cos(angle) * 300;
                  const z = Math.sin(angle) * 300;
                  satellite.style.transform = `translateX(${x}px) translateZ(${z}px) rotateY(${-angle}rad)`;
              });
              requestAnimationFrame(updateSatellitePositions);
          }

          // --- 3. Interactive Animations ---
          satellites.forEach(satellite => {
              satellite.addEventListener('click', () => {
                  const category = satellite.dataset.category;
                  openPreview(satellite, category);
              });
          });

          function openPreview(selectedSatellite, category) {
              // Animate satellites
              anime.timeline({ easing: 'easeInOutExpo' })
                  .add({
                      targets: satellites,
                      opacity: [1, 0],
                      scale: [1, 0.5],
                      duration: 400,
                      delay: anime.stagger(100, { from: 'center' }),
                      begin: () => orbitContainer.style.animationPlayState = 'paused'
                  })
                  .add({
                      targets: core,
                      opacity: [1, 0],
                      scale: [1, 0.8],
                      duration: 300,
                  }, '-=400');

              // Show preview container
              previewContainer.classList.remove('hidden');
              anime({
                  targets: previewContainer,
                  opacity: [0, 1],
                  duration: 600
              });

              // Activate correct gallery
              Object.values(galleries).forEach(g => g.classList.remove('active'));
              const activeGallery = galleries[category];
              activeGallery.classList.add('active');
              
              // --- 4. Populate Preview Gallery ---
              populateGallery(activeGallery, category);
          }

          closePreviewBtn.addEventListener('click', () => {
              // Hide preview container
              anime({
                  targets: previewContainer,
                  opacity: [1, 0],
                  duration: 600,
                  complete: () => previewContainer.classList.add('hidden')
              });

              // Animate back
              anime.timeline({ easing: 'easeInOutExpo' })
                  .add({
                      targets: core,
                      opacity: [0, 1],
                      scale: [0.8, 1],
                      duration: 400,
                  })
                  .add({
                      targets: satellites,
                      opacity: [0, 1],
                      scale: [0.5, 1],
                      duration: 500,
                      delay: anime.stagger(100, { from: 'center' }),
                      complete: () => orbitContainer.style.animationPlayState = 'running'
                  }, '-=200');
          });

          function populateGallery(galleryElement, category) {
            galleryElement.innerHTML = ''; // Clear previous items
            if (previewData[category] && previewData[category].length > 0) {
                previewData[category].forEach(itemUrl => {
                    const thumb = document.createElement('div');
                    thumb.className = 'thumbnail';
                    thumb.style.backgroundImage = `url(${itemUrl})`;
                    galleryElement.appendChild(thumb);
                });
            } else {
                galleryElement.innerHTML = `<p style="font-size: 1rem; color: #aaa;">Works coming soon.</p>`;
            }
        }

          // --- Initializations ---
          createParticles();
          // Disabling JS-based animation to use CSS animation for the main orbit rotation
          // updateSatellitePositions(); 
      });
