window.addEventListener('DOMContentLoaded', () => {
    const stage1 = document.getElementById('stage-1');
    const text2Stage1 = document.querySelector('#stage-1 #text2');
    const nextBtnStage1 = document.querySelector('#stage-1 .next-btn');

    setTimeout(() => {
        if (text2Stage1) text2Stage1.classList.add('visible');
        if (nextBtnStage1) nextBtnStage1.classList.add('visible');
    }, 10000);

    if (nextBtnStage1) {
        nextBtnStage1.addEventListener('click', () => {
            if (stage1) stage1.style.display = 'none';
            const stage2 = document.getElementById('stage-2');
            if (stage2) {
                stage2.style.display = 'block';
                startStage2Logic();
            }
        });
    }

    function startStage2Logic() {
        const text2Stage2 = document.querySelector('#stage-2 #text2');
        const nextBtnStage2 = document.querySelector('#stage-2 .next-btn');

        if (text2Stage2) text2Stage2.classList.add('visible');

        setTimeout(() => {
            if (text2Stage2) text2Stage2.classList.remove('visible');
            if (nextBtnStage2) {
                nextBtnStage2.classList.add('visible');

                nextBtnStage2.onclick = () => {
                    document.getElementById('stage-2').style.display = 'none';
                    const stage3 = document.getElementById('stage-3');
                    if (stage3) {
                        stage3.style.display = 'block';
                        startStage3Logic();
                    }
                };
            }
        }, 10000);
    }

    function startStage3Logic() {
        const stage3 = document.getElementById('stage-3');
        const sellTab = document.querySelector('#stage-3 .shop-tabs img[alt="Verkaufen"]');
        const nextBtnStage3 = document.querySelector('#stage-3 .next-btn');

        if (sellTab) {
            sellTab.style.cursor = 'pointer';
            sellTab.onclick = () => {
                if (stage3) stage3.style.display = 'none';
                const stage4 = document.getElementById('stage4');
                if (stage4) {
                    stage4.style.display = 'block';
                    startStage4Logic();
                }
            };
        }

        if (nextBtnStage3) {
            nextBtnStage3.onclick = () => {
                if (stage3) stage3.style.display = 'none';
                const stage6 = document.getElementById('stage6');
                if (stage6) {
                    stage6.style.display = 'block';
                    startStage6Logic();
                }
            };
        }
    }

    function startStage4Logic() {
        const jaBtn = document.getElementById('jaKaufen');
        const neinBtn = document.getElementById('neinKaufen');
        const stage4 = document.getElementById('stage4');
        const stage5 = document.getElementById('stage5');
        const stage3 = document.getElementById('stage-3');

        if (jaBtn) {
            jaBtn.onclick = () => {
                if (stage4) stage4.style.display = 'none';
                if (stage5) {
                    stage5.style.display = 'block';
                    startStage5Logic();
                }
            };
        }

        if (neinBtn) {
            neinBtn.style.cursor = 'pointer';
            neinBtn.onclick = () => {
                if (stage4) stage4.style.display = 'none';
                if (stage3) stage3.style.display = 'block';
            };
        }
    }

    function startStage5Logic() {
        const zurueckBtn = document.getElementById('zrk');
        const stage5 = document.getElementById('stage5');
        const stage3 = document.getElementById('stage-3');

        if (zurueckBtn) {
            zurueckBtn.style.cursor = 'pointer';
            zurueckBtn.onclick = () => {
                if (stage5) stage5.style.display = 'none';
                if (stage3) stage3.style.display = 'block';
            };
        }
    }

    function startStage6Logic() {
        const nextBtnStage6 = document.querySelector('#stage6 .next-btn');

        setTimeout(() => {
            if (nextBtnStage6) {
                nextBtnStage6.classList.add('visible');
            }
        }, 5000);

        if (nextBtnStage6) {
            nextBtnStage6.onclick = () => {
                window.location.href = '../Html/index.html';
            };
        }
    }
});