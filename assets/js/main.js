// Store all loaded catalogue data globally
let allData = [];
// Load the JSON file from the assets/data folder
fetch('assets/data/katalog.json')
    .then(response => {
        console.log('JSON response:', response);
        if (!response.ok) {
            throw new Error('JSON file could not be loaded');
        }
        return response.json();
    })
    .then(data => {
        console.log('Loaded JSON data:', data);
        allData = data;
        renderKatalog(allData);
    })
    .catch(error => {
        console.error('Error loading JSON:', error);
        document.getElementById('katalog').innerHTML =
            '<div class="loading">Error loading data</div>';
    });
// Render catalogue items into the HTML page
function renderKatalog(items) {
    const katalog = document.getElementById('katalog');
    console.log('Catalogue container:', katalog);
    if (!katalog) {
        console.error('Element with id="katalog" was not found');
        return;
    }
    if (!Array.isArray(items)) {
        console.error('Expected an array, but got:', items);
        return;
    }
    console.log('Number of catalogue items:', items.length);
    let html = '';
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        console.log('Rendering item:', i, item);
        html += `
            <div class="card">
                <div class="card-category">(${item.category || 'Uncategorized'})</div>
                <div class="card-image">
                    <img src="${item['@image']}" alt="${item.title || ''}">
                </div>
                <div class="card-content">
                    <div class="card-title">
                        ${item.title || ''}
                    </div>
                    <div class="card-type">
                        ${item.type || ''}
                    </div>
                    <div class="card-description">
                        ${item.description || ''}
                    </div>
                </div>
            </div>
        `;
    }
    console.log('Generated HTML:', html);
    katalog.innerHTML = html;
}