let bikes = [];

const grid = document.getElementById('bikeGrid');
const emptyState = document.getElementById('emptyState');
const typeFilter = document.getElementById('typeFilter');
const sizeFilter = document.getElementById('sizeFilter');
const statusFilter = document.getElementById('statusFilter');
const searchInput = document.getElementById('searchInput');

function badgeClass(status) {
  if (status === 'Na voljo') return 'status-available';
  if (status === 'Rezervirano') return 'status-reserved';
  return 'status-sold';
}

function bikeCard(bike) {
  const image = bike.image
    ? `<img src="${bike.image}" alt="${bike.brand} ${bike.model}">`
    : `<div class="bike-image-placeholder">Dodaj fotografijo</div>`;

  const serviceItems = (bike.serviced || [])
    .map(item => `<li>${item}</li>`)
    .join('');

  return `
    <article class="bike-card">
      <div class="bike-image">${image}</div>
      <div class="bike-body">
        <div class="bike-topline">
          <div>
            <h3 class="bike-title">${bike.brand} ${bike.model}</h3>
            <p class="bike-sub">${bike.type} • ${bike.year || 'letnik ni naveden'}</p>
          </div>
          <div class="price">${bike.price} €</div>
        </div>
        <div class="badges">
          <span class="badge ${badgeClass(bike.status)}">${bike.status}</span>
          <span class="badge">Velikost ${bike.size}</span>
          ${bike.wheelSize ? `<span class="badge">${bike.wheelSize}"</span>` : ''}
        </div>
        <p class="bike-description">${bike.description}</p>
        ${serviceItems ? `<ul class="service-list">${serviceItems}</ul>` : ''}
      </div>
    </article>
  `;
}

function uniqueValues(key) {
  return [...new Set(bikes.map(b => b[key]).filter(Boolean))].sort();
}

function populateFilters() {
  uniqueValues('type').forEach(value => {
    typeFilter.insertAdjacentHTML('beforeend', `<option value="${value}">${value}</option>`);
  });
  uniqueValues('size').forEach(value => {
    sizeFilter.insertAdjacentHTML('beforeend', `<option value="${value}">${value}</option>`);
  });
}

function render() {
  const query = searchInput.value.trim().toLowerCase();

  const filtered = bikes.filter(bike => {
    const matchesType = !typeFilter.value || bike.type === typeFilter.value;
    const matchesSize = !sizeFilter.value || bike.size === sizeFilter.value;
    const matchesStatus = !statusFilter.value || bike.status === statusFilter.value;
    const matchesSearch = !query || `${bike.brand} ${bike.model}`.toLowerCase().includes(query);
    return matchesType && matchesSize && matchesStatus && matchesSearch;
  });

  grid.innerHTML = filtered.map(bikeCard).join('');
  emptyState.hidden = filtered.length !== 0;

  document.getElementById('availableCount').textContent =
    bikes.filter(b => b.status === 'Na voljo').length;
}

[typeFilter, sizeFilter, statusFilter, searchInput].forEach(el => {
  el.addEventListener('input', render);
});

fetch('bikes.json')
  .then(response => {
    if (!response.ok) throw new Error('Napaka pri nalaganju podatkov.');
    return response.json();
  })
  .then(data => {
    bikes = data;
    populateFilters();
    render();
  })
  .catch(error => {
    grid.innerHTML = `<p>Podatkov o kolesih ni bilo mogoče naložiti.</p>`;
    console.error(error);
  });

document.getElementById('year').textContent = new Date().getFullYear();
