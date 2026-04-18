const grid = document.getElementById('grid-overlay');
const shopContainer = document.getElementById('shop-container');
const sellTab = document.querySelector('.shop-tabs img[alt="Verkaufen"]');
const sellScreen = document.getElementById('sell-screen');
const soldScreen = document.getElementById('sold-screen');
const neinBtn = document.getElementById('neinKaufen');
const jaBtn = document.getElementById('jaKaufen');
const zrkBtn = document.getElementById('zrk');

const spielflaeche = document.getElementById('spielflaeche');
const smellbar = document.getElementById('smellbar');
const inventory = document.getElementById('inventory');

if (grid) {
    for (let i = 1; i <= 72; i++) {
        const feld = document.createElement('div');
        feld.classList.add('grid-field');
        
        feld.onclick = function() {
            if (feld.innerHTML === "") {
                const bild = document.createElement('img');
                bild.src = "../Img/item_stufe1.png";
                feld.appendChild(bild);
            }
        };
        grid.appendChild(feld);
    }
}

if (sellTab) {
    sellTab.onclick = () => {
        shopContainer.style.display = 'none';
        spielflaeche.style.display = 'none';
        smellbar.style.display = 'none';
        inventory.style.display = 'none';
        sellScreen.style.display = 'block';
    };
}

if (neinBtn) {
    neinBtn.onclick = () => {
        sellScreen.style.display = 'none';
        shopContainer.style.display = 'flex';
        spielflaeche.style.display = 'block';
        smellbar.style.display = 'block';
        inventory.style.display = 'flex';
    };
}

if (jaBtn) {
    jaBtn.onclick = () => {
        sellScreen.style.display = 'none';
        soldScreen.style.display = 'block';
    };
}

if (zrkBtn) {
    zrkBtn.onclick = () => {
        soldScreen.style.display = 'none';
        shopContainer.style.display = 'flex';
        spielflaeche.style.display = 'block';
        smellbar.style.display = 'block';
        inventory.style.display = 'flex';
    };
}