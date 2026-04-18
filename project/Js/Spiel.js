const shopContainer = document.getElementById('shop-container');
const sellTab = document.querySelector('.shop-tabs img[alt="Verkaufen"]');
const sellScreen = document.getElementById('sell-screen');
const soldScreen = document.getElementById('sold-screen');
const neinBtn = document.getElementById('neinKaufen');
const jaBtn = document.getElementById('jaKaufen');
const zrkBtn = document.getElementById('zrk');

// Die Elemente, die verschwinden sollen:
const spielflaeche = document.getElementById('spielflaeche');
const smellbar = document.getElementById('smellbar');
const inventory = document.getElementById('inventory');

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