/* ============================================
   JASPER PORTFOLIO - Acting Page
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    const scenes = [
        {
            id: 'scene-1',
            title: 'Act I, Scene 3',
            marker: 'The Arrival',
            character: 'MINJUN',
            dialogue: '"I didn\'t come back for the company. I came back because this city still sounds like my mother\'s voice — distant, warm, impossible to ignore."',
            analysis: 'Minjun\'s return to Seoul after a decade in Silicon Valley. The line reveals his internal conflict: the pull of cultural roots versus the identity he built abroad. I chose to deliver this with controlled stillness — the emotion lives in the pauses, not the volume.',
            timestamp: '0:00'
        },
        {
            id: 'scene-2',
            title: 'Act I, Scene 7',
            marker: 'The Pitch',
            character: 'MINJUN',
            dialogue: '"You want me to sell my soul in a PowerPoint? Fine. But understand — every slide is a piece of someone\'s dream I\'m packaging for your approval."',
            analysis: 'The tension between artistic integrity and commercial reality. As someone who lived this exact conflict as an IT entrepreneur, I bring personal truth to this moment. The bitterness is real, but underneath it lies resignation that this is how the world works.',
            timestamp: '3:24'
        },
        {
            id: 'scene-3',
            title: 'Act II, Scene 2',
            marker: 'The Breakdown',
            character: 'MINJUN',
            dialogue: '"(quietly) I built systems that connected millions of people... and I have never felt more alone than when all the screens went dark."',
            analysis: 'The climactic vulnerability. After maintaining composure for the entire first act, Minjun fractures. I play this almost as a whisper — the audience should lean in. The parenthetical "(quietly)" is the playwright\'s gift: permission to be small in a big moment.',
            timestamp: '12:45'
        },
        {
            id: 'scene-4',
            title: 'Act II, Scene 5',
            marker: 'The Gallery',
            character: 'MINJUN',
            dialogue: '"Look at this painting. No — really look. See how the red bleeds into the gold? That\'s not an accident. That\'s someone saying \'I exist\' in a language words can\'t reach."',
            analysis: 'Minjun discovers art as a new form of expression. This is the turning point. The instruction to the scene partner ("Look at this painting") becomes an instruction to the audience. I slow the tempo here — each sentence is a revelation.',
            timestamp: '18:30'
        },
        {
            id: 'scene-5',
            title: 'Act III, Scene 1',
            marker: 'The Choice',
            character: 'MINJUN',
            dialogue: '"They offered me the CEO position again. Corner office, stock options, the whole mythology of success. I said no. (beat) I said I\'d rather paint."',
            analysis: 'The resolution. What sounds like a simple choice carries the weight of societal expectation, family pressure, and financial security. The "(beat)" before "I said I\'d rather paint" is everything — it\'s where the old life ends and the new one begins.',
            timestamp: '24:10'
        },
        {
            id: 'scene-6',
            title: 'Act III, Scene 4',
            marker: 'The Curtain',
            character: 'MINJUN',
            dialogue: '"This is my last startup. (gestures at canvas) Except this time, the only investor I need to convince... is myself."',
            analysis: 'The final monologue. Minjun reframes his entire journey — entrepreneurship as art, art as entrepreneurship. The gesture toward the canvas should feel both intimate and grand. I end with a half-smile: not triumph, but quiet peace.',
            timestamp: '28:55'
        }
    ];

    const scriptPanel = document.getElementById('script-panel');
    const timelineMarkers = document.getElementById('timeline-markers');
    const videoMain = document.getElementById('video-main');

    // Build script blocks
    scenes.forEach((scene, i) => {
        const block = document.createElement('div');
        block.className = 'script-block reveal';
        block.dataset.scene = scene.id;
        block.style.transitionDelay = `${i * 0.1}s`;
        block.innerHTML = `
            <div class="script-character">${scene.character}</div>
            <div class="script-dialogue">${scene.dialogue}</div>
            <div class="script-analysis">${scene.analysis}</div>
        `;
        block.addEventListener('click', () => activateScene(scene.id));
        scriptPanel.appendChild(block);
    });

    // Build timeline markers
    scenes.forEach((scene) => {
        const marker = document.createElement('button');
        marker.className = 'timeline-marker';
        marker.dataset.scene = scene.id;
        marker.textContent = scene.marker;
        marker.addEventListener('click', () => activateScene(scene.id));
        timelineMarkers.appendChild(marker);
    });

    function activateScene(sceneId) {
        // Update active states
        document.querySelectorAll('.script-block').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.timeline-marker').forEach(m => m.classList.remove('active'));

        const activeBlock = document.querySelector(`.script-block[data-scene="${sceneId}"]`);
        const activeMarker = document.querySelector(`.timeline-marker[data-scene="${sceneId}"]`);
        const scene = scenes.find(s => s.id === sceneId);

        if (activeBlock) {
            activeBlock.classList.add('active');
            activeBlock.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        if (activeMarker) activeMarker.classList.add('active');

        // Update video area with scene info
        videoMain.innerHTML = `
            <div class="video-placeholder" style="flex-direction: column; gap: 1rem; padding: 2rem; text-align: center;">
                <div style="font-family: var(--font-headline); font-size: 1.5rem; color: var(--accent-terracotta);">${scene.title}</div>
                <div style="font-size: 1rem; color: var(--text-muted);">"${scene.marker}"</div>
                <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 1rem;">Performance video coming soon</div>
                <div style="font-size: 0.8rem; color: rgba(255,255,255,0.3);">Timestamp: ${scene.timestamp}</div>
            </div>
        `;
    }
});
