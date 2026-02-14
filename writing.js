/* ============================================
   JASPER PORTFOLIO - Writing Page
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // --- Mood Background (IntersectionObserver) ---
    const paragraphs = document.querySelectorAll('.writing-paragraph');
    const body = document.body;

    const moodObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const mood = entry.target.dataset.mood;
                if (mood) {
                    body.style.backgroundColor = mood;
                }
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '-20% 0px -20% 0px'
    });

    paragraphs.forEach(p => moodObserver.observe(p));

    // --- Sound Console ---
    const soundBtns = document.querySelectorAll('.sound-btn');
    const volumeSlider = document.getElementById('volume-slider');
    let currentAudio = null;
    let currentBtn = null;

    // Web Audio API oscillator-based ambient sounds
    let audioCtx = null;
    let activeNodes = [];

    function getAudioContext() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        return audioCtx;
    }

    function stopCurrentSound() {
        activeNodes.forEach(node => {
            try { node.stop(); } catch(e) { /* already stopped */ }
            try { node.disconnect(); } catch(e) { /* already disconnected */ }
        });
        activeNodes = [];
        if (currentBtn) {
            currentBtn.classList.remove('active');
            currentBtn = null;
        }
    }

    function createNoise(type) {
        const ctx = getAudioContext();
        const volume = volumeSlider.value / 100;

        stopCurrentSound();

        if (type === 'rain') {
            // Brown noise for rain
            const bufferSize = 2 * ctx.sampleRate;
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            let lastOut = 0;
            for (let i = 0; i < bufferSize; i++) {
                const white = Math.random() * 2 - 1;
                data[i] = (lastOut + (0.02 * white)) / 1.02;
                lastOut = data[i];
                data[i] *= 3.5;
            }
            const source = ctx.createBufferSource();
            source.buffer = buffer;
            source.loop = true;

            const gain = ctx.createGain();
            gain.gain.value = volume * 0.3;

            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = 800;

            source.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);
            source.start();
            activeNodes.push(source);
            source._gain = gain;

        } else if (type === 'fire') {
            // Crackling fire: filtered noise with LFO
            const bufferSize = 2 * ctx.sampleRate;
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }
            const source = ctx.createBufferSource();
            source.buffer = buffer;
            source.loop = true;

            const gain = ctx.createGain();
            gain.gain.value = volume * 0.15;

            const filter = ctx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.value = 300;
            filter.Q.value = 0.5;

            // LFO for crackle
            const lfo = ctx.createOscillator();
            const lfoGain = ctx.createGain();
            lfo.frequency.value = 3;
            lfoGain.gain.value = 200;
            lfo.connect(lfoGain);
            lfoGain.connect(filter.frequency);
            lfo.start();

            source.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);
            source.start();
            activeNodes.push(source, lfo);
            source._gain = gain;

        } else if (type === 'ambient') {
            // Soft pad: low oscillators with slow LFO
            const gain = ctx.createGain();
            gain.gain.value = volume * 0.08;
            gain.connect(ctx.destination);

            [110, 165, 220].forEach(freq => {
                const osc = ctx.createOscillator();
                osc.type = 'sine';
                osc.frequency.value = freq;
                osc.connect(gain);
                osc.start();
                activeNodes.push(osc);
            });
            activeNodes[0]._gain = gain;
        }
    }

    soundBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const sound = btn.dataset.sound;
            if (currentBtn === btn) {
                stopCurrentSound();
                return;
            }
            currentBtn = btn;
            btn.classList.add('active');
            soundBtns.forEach(b => { if (b !== btn) b.classList.remove('active'); });
            createNoise(sound);
        });
    });

    volumeSlider.addEventListener('input', () => {
        const volume = volumeSlider.value / 100;
        activeNodes.forEach(node => {
            if (node._gain) {
                node._gain.gain.value = volume * 0.3;
            }
        });
    });
});
