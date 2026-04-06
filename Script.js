/* ═══════════════════════════════════════════════════════════════
   Ciné Fahmi — script.js
   All interactivity, data, and state management
═══════════════════════════════════════════════════════════════ */

/* ══════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════ */

const POSTER_COLORS = [
  ['#1a2a3a','#2a4a5a'],['#2a1a3a','#4a2a5a'],['#1a3a2a','#2a5a3a'],
  ['#3a2a1a','#5a4a2a'],['#1a1a3a','#2a2a5a'],['#3a1a1a','#5a2a2a'],
  ['#1a3a3a','#2a5a5a'],['#3a3a1a','#5a5a2a'],['#2a1a1a','#4a2a2a'],
  ['#1a2a1a','#2a4a2a'],
];

let MOVIES = [
  {
    id: 0,
    title: "Dune: Part Two",
    year: 2024, duration: "2h 46m",
    genres: ["Sci-Fi", "Adventure", "Drama"],
    rating: 8.5,
    desc: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson"],
    posterGrad: POSTER_COLORS[0],
    heroImage: "https://picsum.photos/seed/dune2024/1600/900",
  },
  {
    id: 1,
    title: "Oppenheimer",
    year: 2023, duration: "3h 0m",
    genres: ["Biography", "Drama", "History"],
    rating: 8.9,
    desc: "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II.",
    director: "Christopher Nolan",
    cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon"],
    posterGrad: POSTER_COLORS[1],
    heroImage: "https://picsum.photos/seed/oppen2023/1600/900",
  },
  {
    id: 2,
    title: "The Batman",
    year: 2022, duration: "2h 56m",
    genres: ["Action", "Crime", "Drama"],
    rating: 7.8,
    desc: "Batman ventures into Gotham City's criminal underworld when a sadistic killer leaves behind a trail of cryptic clues.",
    director: "Matt Reeves",
    cast: ["Robert Pattinson", "Zoë Kravitz", "Paul Dano"],
    posterGrad: POSTER_COLORS[2],
    heroImage: "https://picsum.photos/seed/batman2022/1600/900",
  },
  {
    id: 3,
    title: "Interstellar",
    year: 2014, duration: "2h 49m",
    genres: ["Sci-Fi", "Adventure"],
    rating: 8.7,
    desc: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    posterGrad: POSTER_COLORS[3],
    heroImage: "https://picsum.photos/seed/interstellar/1600/900",
  },
  {
    id: 4,
    title: "Inception",
    year: 2010, duration: "2h 28m",
    genres: ["Sci-Fi", "Thriller", "Action"],
    rating: 8.8,
    desc: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.",
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
    posterGrad: POSTER_COLORS[4],
    heroImage: "https://picsum.photos/seed/inception2010/1600/900",
  },
  {
    id: 5,
    title: "Avatar: The Way of Water",
    year: 2022, duration: "3h 12m",
    genres: ["Sci-Fi", "Adventure", "Action"],
    rating: 7.6,
    desc: "Jake Sully lives with his newfound family formed on the planet of Pandora. Once a familiar threat returns to finish what was previously started.",
    director: "James Cameron",
    cast: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"],
    posterGrad: POSTER_COLORS[5],
    heroImage: "https://picsum.photos/seed/avatar2/1600/900",
  },
  {
    id: 6,
    title: "Spider-Man: No Way Home",
    year: 2021, duration: "2h 28m",
    genres: ["Action", "Adventure", "Sci-Fi"],
    rating: 8.2,
    desc: "Peter Parker seeks Doctor Strange's help to make the world forget he is Spider-Man, but when the spell goes wrong, villains from other worlds appear.",
    director: "Jon Watts",
    cast: ["Tom Holland", "Zendaya", "Benedict Cumberbatch"],
    posterGrad: POSTER_COLORS[6],
    heroImage: "https://picsum.photos/seed/spiderman3/1600/900",
  },
  {
    id: 7,
    title: "The Dark Knight",
    year: 2008, duration: "2h 32m",
    genres: ["Action", "Crime", "Drama"],
    rating: 9.0,
    desc: "Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice when the Joker emerges.",
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    posterGrad: POSTER_COLORS[7],
    heroImage: "https://picsum.photos/seed/darkknight/1600/900",
  },
  {
    id: 8,
    title: "Parasite",
    year: 2019, duration: "2h 12m",
    genres: ["Drama", "Thriller", "Comedy"],
    rating: 8.6,
    desc: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    director: "Bong Joon-ho",
    cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"],
    posterGrad: POSTER_COLORS[8],
    heroImage: "https://picsum.photos/seed/parasite2019/1600/900",
  },
  {
    id: 9,
    title: "Everything Everywhere",
    year: 2022, duration: "2h 19m",
    genres: ["Sci-Fi", "Comedy", "Drama"],
    rating: 7.8,
    desc: "A middle-aged Chinese immigrant is swept up in an insane adventure where she alone can save the world by exploring other universes.",
    director: "Daniels",
    cast: ["Michelle Yeoh", "Ke Huy Quan", "Jamie Lee Curtis"],
    posterGrad: POSTER_COLORS[9],
    heroImage: "https://picsum.photos/seed/everywhere2022/1600/900",
  },
];

let CINEMAS = [
  {
    id: 0,
    name: "Pathé Tunis City",
    city: "Tunis",
    address: "Tunis City Mall, La Marsa",
    halls: 8,
    imgUrl: "https://picsum.photos/seed/cinema-pathe/400/250",
    movieIds: [0,1,2,4,7],
  },
  {
    id: 1,
    name: "ABC Cinéma",
    city: "La Marsa",
    address: "Centre Commercial ABC, La Marsa",
    halls: 6,
    imgUrl: "https://picsum.photos/seed/cinema-abc/400/250",
    movieIds: [0,3,5,6,9],
  },
  {
    id: 2,
    name: "Le Colisée",
    city: "Tunis Centre",
    address: "Avenue de Paris, Tunis",
    halls: 3,
    imgUrl: "https://picsum.photos/seed/cinema-colisee/400/250",
    movieIds: [1,2,7,8],
  },
  {
    id: 3,
    name: "Cinéma Capitole",
    city: "Tunis",
    address: "Avenue Habib Bourguiba, Tunis",
    halls: 4,
    imgUrl: "https://picsum.photos/seed/cinema-capitole/400/250",
    movieIds: [0,3,4,5],
  },
  {
    id: 4,
    name: "Cinestar Sfax",
    city: "Sfax",
    address: "Borj Chakir Mall, Sfax",
    halls: 5,
    imgUrl: "https://picsum.photos/seed/cinema-sfax/400/250",
    movieIds: [1,6,8,9],
  },
  {
    id: 5,
    name: "Ciné Majestic",
    city: "Sousse",
    address: "Centre Ville, Sousse",
    halls: 3,
    imgUrl: "https://picsum.photos/seed/cinema-sousse/400/250",
    movieIds: [2,4,7,5],
  },
  {
    id: 6,
    name: "Multiplex Hammamet",
    city: "Hammamet",
    address: "Yasmine Hammamet, Nabeul",
    halls: 4,
    imgUrl: "https://picsum.photos/seed/cinema-hammamet/400/250",
    movieIds: [0,6,9,3],
  },
];

const SHOWTIMES = ["10:00","12:30","15:00","17:45","20:15","22:30"];
const HALLS = ["Salle 1","Salle 2","Salle 3","Grand Écran","VIP","IMAX"];

const UPCOMING = [
  { title: "Gladiator II", genres: "Action · Drama", day: "15", month: "JUL" },
  { title: "Inside Out 3", genres: "Animation · Comedy", day: "06", month: "JUN" },
  { title: "Mission: Impossible 8", genres: "Action · Thriller", day: "23", month: "MAY" },
  { title: "Venom: The Last Dance", genres: "Action · Sci-Fi", day: "01", month: "AUG" },
];

const API_BASE = 'api';

/* ══════════════════════════════════════════════════════════
   APP STATE
══════════════════════════════════════════════════════════ */
let state = {
  currentUser: null,
  watchlist: [],           // array of movie ids
  userRatings: {},         // movieId -> rating (1-5)
  selectedSeats: [],
  currentBooking: null,    // { movieId, cinemaId, showtime, hall }
};

/* ══════════════════════════════════════════════════════════
   INIT
══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  loadStateFromStorage();
  loadCatalogData();
  renderUpcoming();
  setupCarouselAutoScroll();
});

async function loadCatalogData() {
  try {
    const [moviesResponse, cinemasResponse] = await Promise.all([
      fetch(`${API_BASE}/movies.php`),
      fetch(`${API_BASE}/cinemas.php`),
    ]);

    const moviesData = await moviesResponse.json();
    const cinemasData = await cinemasResponse.json();

    if (moviesData.success && Array.isArray(moviesData.movies)) {
      MOVIES = moviesData.movies.map((movie, index) => normalizeMovie(movie, index));
    }

    if (cinemasData.success && Array.isArray(cinemasData.cinemas)) {
      CINEMAS = cinemasData.cinemas.map(normalizeCinema);
    }

    renderHero();
    renderCinemasCarousel();
    renderMoviesCarousel();
    buildFilterChips();
    renderAllMoviesGrid(MOVIES);
    syncWatchlistTitles();
  } catch (error) {
    console.error('Unable to load catalog data', error);
    renderHero();
    renderCinemasCarousel();
    renderMoviesCarousel();
    buildFilterChips();
    renderAllMoviesGrid(MOVIES);
  }
}

function syncWatchlistTitles() {
  const validIds = new Set(MOVIES.map(movie => Number(movie.id)));
  const filteredWatchlist = state.watchlist.filter(movieId => validIds.has(Number(movieId)));

  if (filteredWatchlist.length !== state.watchlist.length) {
    state.watchlist = filteredWatchlist;
    saveState();
  }
}

function getMovieById(movieId) {
  return MOVIES.find(movie => Number(movie.id) === Number(movieId)) || null;
}

function getCinemaById(cinemaId) {
  return CINEMAS.find(cinema => Number(cinema.id) === Number(cinemaId)) || null;
}

function normalizeMovie(movie, index) {
  const genres = Array.isArray(movie.genres)
    ? movie.genres.map(g => g.name).filter(Boolean)
    : [];
  return {
    id: Number(movie.id ?? index),
    title: movie.title || 'Untitled',
    year: movie.year || inferYear(movie.title),
    duration: movie.duration || '—',
    genres: genres.length ? genres : ['Drama'],
    rating: Number(movie.rating ?? 0),
    desc: movie.description || '',
    director: movie.director || 'Unknown',
    cast: Array.isArray(movie.cast) ? movie.cast : [],
    posterGrad: POSTER_COLORS[index % POSTER_COLORS.length],
    heroImage: movie.image ? movie.image : `https://picsum.photos/seed/movie-${movie.id || index}/1600/900`,
    screenings: Array.isArray(movie.screenings) ? movie.screenings : [],
  };
}

function normalizeCinema(cinema, index) {
  const movies = Array.isArray(cinema.movies) ? cinema.movies : [];
  return {
    id: Number(cinema.id ?? index),
    name: cinema.name || 'Cinema',
    city: cinema.location || '',
    address: cinema.location || '',
    halls: movies.length || 0,
    imgUrl: cinema.image ? cinema.image : `https://picsum.photos/seed/cinema-${cinema.id || index}/400/250`,
    movieIds: movies.map(movie => Number(movie.id)),
  };
}

function inferYear(title) {
  const match = String(title || '').match(/(19|20)\d{2}/);
  return match ? Number(match[0]) : new Date().getFullYear();
}

/* ══════════════════════════════════════════════════════════
   STORAGE HELPERS
══════════════════════════════════════════════════════════ */
function loadStateFromStorage() {
  try {
    const saved = localStorage.getItem('cinefahmi_state');
    if (saved) {
      const parsed = JSON.parse(saved);
      state.currentUser = parsed.currentUser || null;
      state.watchlist   = parsed.watchlist   || [];
      state.userRatings = parsed.userRatings  || {};
      updateAuthUI();
    }
  } catch(e) {}
}
function saveState() {
  localStorage.setItem('cinefahmi_state', JSON.stringify({
    currentUser: state.currentUser,
    watchlist:   state.watchlist,
    userRatings: state.userRatings,
  }));
}

/* ══════════════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════════════ */
function renderHero() {
  const movie = MOVIES[0];
  const heroBg = document.getElementById('hero-bg');
  const heroTitle = document.getElementById('hero-title');
  const heroMeta = document.getElementById('hero-meta');
  const heroDesc = document.getElementById('hero-desc');
  const heroActionBook = document.querySelector('#hero .btn-primary');
  const heroActionWatchlist = document.querySelector('#hero .btn-ghost');

  if (!movie) {
    if (heroBg) heroBg.style.backgroundImage = '';
    if (heroTitle) heroTitle.textContent = 'Loading movies...';
    if (heroMeta) heroMeta.innerHTML = '<span class="hero-rating">Loading</span>';
    if (heroDesc) heroDesc.textContent = 'Fetching movies from the database.';
    if (heroActionBook) heroActionBook.removeAttribute('onclick');
    if (heroActionWatchlist) heroActionWatchlist.removeAttribute('onclick');
    return;
  }

  if (heroBg) heroBg.style.backgroundImage = `url('${movie.heroImage}')`;
  if (heroTitle) heroTitle.textContent = movie.title;
  if (heroMeta) heroMeta.innerHTML = `
    <span class="hero-rating">★ ${movie.rating}</span>
    <span class="hero-dot">·</span>
    <span>${movie.duration}</span>
    <span class="hero-dot">·</span>
    <span>${movie.genres.join(' · ')}</span>`;
  if (heroDesc) heroDesc.textContent = movie.desc;
  if (heroActionBook) heroActionBook.setAttribute('onclick', `openMovieModal(${movie.id})`);
  if (heroActionWatchlist) heroActionWatchlist.setAttribute('onclick', `addToWatchlist(${movie.id})`);
}

/* ══════════════════════════════════════════════════════════
   POSTER PLACEHOLDER
══════════════════════════════════════════════════════════ */
function posterPlaceholderHTML(movie, classes = '') {
  const [c1, c2] = movie.posterGrad;
  return `<div class="movie-card-poster-placeholder ${classes}" style="background:linear-gradient(135deg,${c1},${c2})">
    <span>${movie.title}</span>
  </div>`;
}
function posterWatchlistHTML(movie) {
  const [c1, c2] = movie.posterGrad;
  return `<div class="watchlist-poster-ph" style="background:linear-gradient(135deg,${c1},${c2})">${movie.title}</div>`;
}
function posterFilmListHTML(movie) {
  const [c1, c2] = movie.posterGrad;
  return `<div class="film-list-poster-placeholder" style="background:linear-gradient(135deg,${c1},${c2})">${movie.title}</div>`;
}

/* ══════════════════════════════════════════════════════════
   CINEMAS CAROUSEL
══════════════════════════════════════════════════════════ */
function renderCinemasCarousel() {
  const track = document.getElementById('cinemas-track');
  if (!track) return;
  if (!CINEMAS.length) {
    track.innerHTML = '<div class="loading-state">Loading cinemas from database...</div>';
    return;
  }
  track.innerHTML = CINEMAS.map(c => `
    <div class="cinema-card" onclick="openCinemaModal(${c.id})">
      <img class="cinema-card-img" src="${c.imgUrl}" alt="${c.name}" loading="lazy"
           onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"/>
      <div class="cinema-card-img" style="display:none;background:linear-gradient(135deg,#0a2236,#0d2f47);height:170px;align-items:center;justify-content:center;color:var(--teal);font-family:var(--ff-display);font-size:1.1rem;font-weight:600;padding:14px;text-align:center">${c.name}</div>
      <div class="cinema-card-body">
        <div class="cinema-card-city">${c.city}</div>
        <div class="cinema-card-name">${c.name}</div>
        <div class="cinema-card-info">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/><path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0z"/></svg>
          ${c.address}
        </div>
      </div>
    </div>
  `).join('');
}

/* ══════════════════════════════════════════════════════════
   MOVIES CAROUSEL
══════════════════════════════════════════════════════════ */
function renderMoviesCarousel() {
  const track = document.getElementById('movies-track');
  if (!track) return;
  if (!MOVIES.length) {
    track.innerHTML = '<div class="loading-state">Loading movies from database...</div>';
    return;
  }
  track.innerHTML = MOVIES.map(m => movieCardHTML(m)).join('');
}

function movieCardHTML(m) {
  const stars = '★'.repeat(Math.round(m.rating/2));
  return `<div class="movie-card" onclick="openMovieModal(${m.id})">
    ${posterPlaceholderHTML(m)}
    <div class="movie-card-overlay">
      <div class="movie-card-rating">★ ${m.rating}</div>
      <div class="movie-card-title">${m.title}</div>
      <div class="movie-card-genres">${m.genres.join(' · ')}</div>
    </div>
  </div>`;
}

/* ══════════════════════════════════════════════════════════
   ALL MOVIES GRID
══════════════════════════════════════════════════════════ */
function buildFilterChips() {
  const bar = document.getElementById('filter-bar');
  if (!bar) return;
  if (!MOVIES.length) {
    bar.innerHTML = '<button class="filter-chip active" data-genre="all">All</button>';
    return;
  }
  const allGenres = [...new Set(MOVIES.flatMap(m => m.genres))].sort();
  bar.innerHTML = '<button class="filter-chip active" data-genre="all" onclick="filterMovies(\'all\')">All</button>';
  allGenres.forEach(g => {
    const btn = document.createElement('button');
    btn.className = 'filter-chip';
    btn.dataset.genre = g;
    btn.textContent = g;
    btn.onclick = () => filterMovies(g);
    bar.appendChild(btn);
  });
}

function filterMovies(genre) {
  document.querySelectorAll('.filter-chip').forEach(c => {
    c.classList.toggle('active', c.dataset.genre === genre);
  });
  const filtered = genre === 'all' ? MOVIES : MOVIES.filter(m => m.genres.includes(genre));
  renderAllMoviesGrid(filtered);
}

function renderAllMoviesGrid(movies) {
  const grid = document.getElementById('all-movies-grid');
  if (!grid) return;
  if (!movies.length) {
    grid.innerHTML = '<div class="loading-state">No movies loaded yet.</div>';
    return;
  }
  grid.innerHTML = movies.map(m => movieCardHTML(m)).join('');
}

/* ══════════════════════════════════════════════════════════
   UPCOMING
══════════════════════════════════════════════════════════ */
function renderUpcoming() {
  const grid = document.getElementById('upcoming-grid');
  grid.innerHTML = UPCOMING.map(u => `
    <div class="upcoming-card">
      <div class="upcoming-date-block">
        <div class="upcoming-day">${u.day}</div>
        <div class="upcoming-month">${u.month}</div>
      </div>
      <div class="upcoming-info">
        <div class="upcoming-title">${u.title}</div>
        <div class="upcoming-genres">${u.genres}</div>
        <span class="upcoming-badge">Coming Soon</span>
      </div>
    </div>
  `).join('');
}

/* ══════════════════════════════════════════════════════════
   CAROUSEL CONTROLS
══════════════════════════════════════════════════════════ */
function slideCarousel(trackId, dir) {
  const track = document.getElementById(trackId);
  const card = track.querySelector('.cinema-card, .movie-card');
  const cardW = card ? card.offsetWidth + 22 : 220;
  track.scrollBy({ left: dir * cardW * 2, behavior: 'smooth' });
}

function setupCarouselAutoScroll() {
  autoScrollTrack('cinemas-track', 1);
  autoScrollTrack('movies-track', 1.4);
}

function autoScrollTrack(id, speed) {
  const track = document.getElementById(id);
  if (!track) return;
  let paused = false;
  let direction = 1;
  track.addEventListener('mouseenter', () => paused = true);
  track.addEventListener('mouseleave', () => paused = false);
  track.addEventListener('touchstart', () => paused = true, { passive: true });
  track.addEventListener('touchend', () => setTimeout(() => paused = false, 2000));

  setInterval(() => {
    if (paused) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (track.scrollLeft >= maxScroll - 4) direction = -1;
    if (track.scrollLeft <= 1) direction = 1;
    track.scrollLeft += direction * speed;
  }, 25);
}

/* ══════════════════════════════════════════════════════════
   PAGE NAVIGATION
══════════════════════════════════════════════════════════ */
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const page = document.getElementById(`page-${name}`);
  if (page) {
    page.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.dataset.page === name);
  });
  if (name === 'watchlist') renderWatchlistPage();
  if (name === 'all-movies') renderAllMoviesGrid(MOVIES);
}

function scrollToSection(id) {
  showPage('home');
  setTimeout(() => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

/* ══════════════════════════════════════════════════════════
   CINEMA MODAL
══════════════════════════════════════════════════════════ */
function openCinemaModal(cinemaId) {
  const cinema = getCinemaById(cinemaId);
  if (!cinema) return;
  const movies = cinema.movieIds.map(id => getMovieById(id)).filter(Boolean);

  const filmItems = movies.map(m => {
    const dates = getRandomDates(3);
    return `<div class="film-list-item">
      ${posterFilmListHTML(m)}
      <div class="film-list-info">
        <div class="film-list-title">${m.title}</div>
        <div class="film-list-dates">Projections: <span>${dates}</span></div>
        <button class="film-list-btn" onclick="openMovieModalFromCinema(${m.id},${cinemaId});closeModal('cinema-modal')">Réserver →</button>
      </div>
    </div>`;
  }).join('');

  document.getElementById('cinema-modal-content').innerHTML = `
    <div class="modal-hero">
      <img class="modal-hero-img" src="${cinema.imgUrl}" alt="${cinema.name}"
           onerror="this.style.display='none'"/>
      <div class="modal-hero-overlay"></div>
    </div>
    <div class="modal-body">
      <div class="modal-subtitle">${cinema.city}</div>
      <h2 class="modal-title">${cinema.name}</h2>
      <div class="modal-meta-row">
        <div class="modal-meta-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/><path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0z"/></svg>
          <span class="modal-meta-value">${cinema.address}</span>
        </div>
        <div class="modal-meta-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7z"/><path d="M2 10h20"/></svg>
          <span class="modal-meta-value">${cinema.halls} salles</span>
        </div>
      </div>
      <div class="modal-section-label">Films disponibles</div>
      ${filmItems}
    </div>`;

  openModal('cinema-modal');
}

function getRandomDates(n) {
  const months = ['Jan','Fév','Mar','Avr','Mai','Jun','Jul'];
  const out = [];
  for (let i = 0; i < n; i++) {
    const d = Math.floor(Math.random() * 28) + 1;
    const m = months[Math.floor(Math.random() * months.length)];
    out.push(`${d} ${m}`);
  }
  return out.join(' · ');
}

/* ══════════════════════════════════════════════════════════
   MOVIE MODAL
══════════════════════════════════════════════════════════ */
function openMovieModal(movieId, preselectedCinemaId = null) {
  const movie = getMovieById(movieId);
  if (!movie) return;
  const availCinemas = CINEMAS.filter(c => c.movieIds.map(Number).includes(Number(movie.id)));

  const cinemaItems = availCinemas.map(c => `
    <div class="cinema-list-item" onclick="openShowtimeModal(${movieId},${c.id})">
      <div>
        <div class="cinema-list-name">${c.name}</div>
        <div class="cinema-list-city">${c.city} · ${c.halls} salles</div>
      </div>
      <div class="cinema-list-arrow">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
      </div>
    </div>`).join('');

  document.getElementById('movie-modal-content').innerHTML = `
    <div class="modal-hero">
      <div class="modal-hero-placeholder" style="background:linear-gradient(135deg,${movie.posterGrad[0]},${movie.posterGrad[1]})">
        <span style="font-family:var(--ff-display);font-size:2rem;font-weight:700;color:var(--gold);text-align:center;padding:20px">${movie.title}</span>
      </div>
      <div class="modal-hero-overlay"></div>
    </div>
    <div class="modal-body">
      <div class="modal-subtitle">${movie.genres.join(' · ')}</div>
      <h2 class="modal-title">${movie.title}</h2>
      <div class="modal-meta-row">
        <div class="modal-meta-item">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          <span class="modal-meta-value">${movie.rating}/10</span>
        </div>
        <div class="modal-meta-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
          <span class="modal-meta-value">${movie.duration}</span>
        </div>
        <div class="modal-meta-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
          <span class="modal-meta-value">${movie.year}</span>
        </div>
      </div>
      <p class="modal-desc">${movie.desc}</p>
      <div class="modal-meta-row" style="margin-bottom:24px">
        <div class="modal-meta-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m19.2 7.2-3-3L4 16.4V20h3.6L19.2 7.2z"/></svg>
          <span>Réalisateur: </span><span class="modal-meta-value">${movie.director}</span>
        </div>
      </div>
      <div style="display:flex;gap:12px;margin-bottom:28px;flex-wrap:wrap">
        <button class="btn-primary" style="padding:10px 22px;font-size:.8rem" onclick="requireAuth(()=>addToWatchlist(${movieId}))">
          + Ma Watchlist
        </button>
        <button class="btn-ghost" style="padding:10px 22px;font-size:.8rem" onclick="requireAuth(()=>openRateModal(${movieId}))">
          ★ Noter
        </button>
      </div>
      <div class="modal-section-label">Cinémas disponibles</div>
      <div class="cinema-list">${cinemaItems || '<p style="color:var(--muted);font-size:.9rem">Aucun cinéma disponible pour ce film actuellement.</p>'}</div>
    </div>`;

  openModal('movie-modal');
}

function openMovieModalFromCinema(movieId, cinemaId) {
  openMovieModal(movieId, cinemaId);
}

/* ══════════════════════════════════════════════════════════
   SHOWTIME MODAL
══════════════════════════════════════════════════════════ */
function openShowtimeModal(movieId, cinemaId) {
  requireAuth(() => _openShowtimeModal(movieId, cinemaId));
}

function _openShowtimeModal(movieId, cinemaId) {
  const movie  = getMovieById(movieId);
  const cinema = getCinemaById(cinemaId);
  if (!movie || !cinema) return;

  const slots = SHOWTIMES.map((t, i) => {
    const hall  = HALLS[i % HALLS.length];
    const seats = Math.floor(Math.random() * 80) + 5;
    const lowClass = seats < 15 ? 'low' : '';
    return `<div class="showtime-slot" onclick="selectShowtime(this,${movieId},${cinemaId},'${t}','${hall}')">
      <div class="showtime-time">${t}</div>
      <div class="showtime-hall">${hall}</div>
      <div class="showtime-seats ${lowClass}">${seats} places</div>
    </div>`;
  }).join('');

  document.getElementById('showtime-modal-content').innerHTML = `
    <div class="modal-body" style="padding-top:36px">
      <div class="modal-subtitle">${cinema.name} · ${cinema.city}</div>
      <h2 class="modal-title">${movie.title}</h2>
      <p style="font-size:.85rem;color:var(--muted);margin-bottom:24px">${movie.duration} · ${movie.genres.join(', ')}</p>
      <div class="modal-section-label">Choisissez une séance</div>
      <div class="showtime-grid" style="margin-bottom:24px">${slots}</div>
      <button class="btn-primary" style="width:100%;justify-content:center" id="btn-go-seats" onclick="goToSeats(${movieId},${cinemaId})" disabled style="opacity:.5;cursor:not-allowed">
        Choisir mes places →
      </button>
    </div>`;

  openModal('showtime-modal');
}

function selectShowtime(el, movieId, cinemaId, time, hall) {
  el.closest('.showtime-grid').querySelectorAll('.showtime-slot').forEach(s => s.classList.remove('selected'));
  el.classList.add('selected');
  state.currentBooking = { movieId, cinemaId, showtime: time, hall };
  const btn = document.getElementById('btn-go-seats');
  if (btn) { btn.disabled = false; btn.style.opacity = '1'; btn.style.cursor = 'pointer'; }
}

function goToSeats(movieId, cinemaId) {
  if (!state.currentBooking) return;
  closeModal('showtime-modal');
  setTimeout(() => openSeatModal(), 320);
}

/* ══════════════════════════════════════════════════════════
   SEAT MODAL
══════════════════════════════════════════════════════════ */
function openSeatModal() {
  const { movieId, showtime, hall } = state.currentBooking;
  const movie = getMovieById(movieId);
  if (!movie) return;
  state.selectedSeats = [];

  // Generate seat map: 8 rows (A-H), 9 seats each
  const rows = ['A','B','C','D','E','F','G','H'];
  const seatsPerRow = 9;
  const takenSeats = new Set();
  // Randomly mark ~35% taken
  rows.forEach(r => {
    for (let s = 1; s <= seatsPerRow; s++) {
      if (Math.random() < .35) takenSeats.add(`${r}${s}`);
    }
  });

  const seatRows = rows.map(r => {
    const seats = Array.from({length: seatsPerRow}, (_, i) => {
      const id = `${r}${i+1}`;
      const taken = takenSeats.has(id) ? 'seat-taken' : '';
      const label = i + 1;
      return `<div class="seat ${taken}" id="seat-${id}" data-id="${id}" onclick="toggleSeat(this,'${id}',${takenSeats.has(id)})">${label}</div>`;
    }).join('');
    return `<div class="seat-row"><span class="seat-row-label">${r}</span>${seats}</div>`;
  }).join('');

  document.getElementById('seat-modal-content').innerHTML = `
    <div class="modal-body" style="padding-top:36px">
      <div class="modal-subtitle">${movie.title} · ${showtime} · ${hall}</div>
      <h2 class="modal-title" style="font-size:1.5rem;margin-bottom:24px">Choisissez vos places</h2>
      <div class="seat-screen">ÉCRAN</div>
      <div class="seat-grid">${seatRows}</div>
      <div class="seat-legend">
        <div class="seat-legend-item"><div class="legend-dot legend-available"></div> Libre</div>
        <div class="seat-legend-item"><div class="legend-dot legend-selected"></div> Sélectionné</div>
        <div class="seat-legend-item"><div class="legend-dot legend-taken"></div> Occupé</div>
      </div>
      <div class="seat-summary" id="seat-summary">
        <div class="seat-summary-row">
          <span>Places sélectionnées</span><span id="summary-seats">—</span>
        </div>
        <div class="seat-summary-row">
          <span>Prix unitaire</span><span>15 TND</span>
        </div>
        <div class="seat-summary-row total">
          <span>Total</span><span id="summary-total">0 TND</span>
        </div>
      </div>
      <button class="btn-primary" style="width:100%;justify-content:center" id="btn-pay" onclick="openPaymentModal()" disabled>
        Procéder au paiement →
      </button>
    </div>`;

  openModal('seat-modal');
}

function toggleSeat(el, id, isTaken) {
  if (isTaken) return;
  if (el.classList.contains('seat-selected')) {
    el.classList.remove('seat-selected');
    state.selectedSeats = state.selectedSeats.filter(s => s !== id);
  } else {
    el.classList.add('seat-selected');
    state.selectedSeats.push(id);
  }
  updateSeatSummary();
}

function updateSeatSummary() {
  const count = state.selectedSeats.length;
  const total = count * 15;
  const el = document.getElementById('summary-seats');
  const elTotal = document.getElementById('summary-total');
  const btn = document.getElementById('btn-pay');
  if (el) el.textContent = count ? state.selectedSeats.join(', ') : '—';
  if (elTotal) elTotal.textContent = `${total} TND`;
  if (btn) { btn.disabled = count === 0; btn.style.opacity = count ? '1' : '.5'; }
}

/* ══════════════════════════════════════════════════════════
   PAYMENT MODAL
══════════════════════════════════════════════════════════ */
function openPaymentModal() {
  closeModal('seat-modal');
  const { movieId, showtime, hall } = state.currentBooking;
  const movie = getMovieById(movieId);
  if (!movie) return;
  const total = state.selectedSeats.length * 15;

  setTimeout(() => {
    document.getElementById('payment-modal-content').innerHTML = `
      <div class="modal-body" style="padding-top:40px">
        <h2 class="modal-title">Paiement</h2>
        <p style="font-size:.85rem;color:var(--muted);margin-bottom:24px">${movie.title} · ${showtime} · Places: ${state.selectedSeats.join(', ')}</p>

        <div class="payment-form" id="payment-form">
          <div class="form-group">
            <label class="form-label">Nom sur la carte</label>
            <input type="text" class="form-input" id="card-name" placeholder="FAHMI BEN ALI" />
          </div>
          <div class="form-group">
            <label class="form-label">Numéro de carte</label>
            <input type="text" class="form-input" id="card-num" placeholder="•••• •••• •••• ••••" maxlength="19"
                   oninput="formatCardNumber(this)"/>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Expiration</label>
              <input type="text" class="form-input" id="card-exp" placeholder="MM/YY" maxlength="5"/>
            </div>
            <div class="form-group">
              <label class="form-label">CVV</label>
              <input type="text" class="form-input" id="card-cvv" placeholder="•••" maxlength="3"/>
            </div>
          </div>
        </div>

        <p class="payment-note">⚠ Paiement simulé — Aucune transaction réelle n'est effectuée. Projet académique.</p>

        <div class="seat-summary" style="margin-bottom:20px">
          <div class="seat-summary-row total">
            <span>Total à payer</span><span>${total} TND</span>
          </div>
        </div>

        <button class="btn-primary" style="width:100%;justify-content:center" onclick="confirmPayment()">
          Confirmer le paiement
        </button>
      </div>`;
    openModal('payment-modal');
  }, 320);
}

function formatCardNumber(input) {
  let v = input.value.replace(/\D/g, '').substring(0, 16);
  input.value = v.replace(/(.{4})/g, '$1 ').trim();
}

function confirmPayment() {
  const name = document.getElementById('card-name')?.value.trim();
  const num  = document.getElementById('card-num')?.value.replace(/\s/g,'');
  const exp  = document.getElementById('card-exp')?.value.trim();
  const cvv  = document.getElementById('card-cvv')?.value.trim();

  if (!name || num.length < 16 || exp.length < 5 || cvv.length < 3) {
    showToast('Veuillez remplir tous les champs correctement.');
    return;
  }

  const ref = 'CF' + Math.random().toString(36).substring(2,8).toUpperCase();
  const { movieId, showtime } = state.currentBooking;
  const movie = getMovieById(movieId);
  if (!movie) return;

  document.getElementById('payment-modal-content').innerHTML = `
    <div class="modal-body">
      <div class="payment-success">
        <div class="payment-success-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg>
        </div>
        <h3>Réservation confirmée !</h3>
        <p>Votre billet pour <strong style="color:var(--gold)">${movie.title}</strong> à ${showtime} a été réservé avec succès.</p>
        <div class="booking-ref">${ref}</div>
        <p style="font-size:.78rem;margin-top:4px">Conservez cette référence de réservation.</p>
        <button class="btn-primary" style="margin-top:24px" onclick="closeModal('payment-modal')">Retour à l'accueil</button>
      </div>
    </div>`;

  showToast(`🎬 Billet réservé ! Réf: ${ref}`);
}

/* ══════════════════════════════════════════════════════════
   WATCHLIST
══════════════════════════════════════════════════════════ */
function addToWatchlist(movieId) {
  const movie = getMovieById(movieId);
  if (!movie) return;
  if (!state.currentUser) { requireAuth(() => addToWatchlist(movieId)); return; }
  if (state.watchlist.includes(movieId)) {
    showToast(`"${movie.title}" est déjà dans votre Watchlist.`);
    return;
  }
  state.watchlist.push(movieId);
  saveState();
  showToast(`✓ "${movie.title}" ajouté à la Watchlist`);
}

function removeFromWatchlist(movieId) {
  state.watchlist = state.watchlist.filter(id => id !== movieId);
  saveState();
  renderWatchlistPage();
}

function renderWatchlistPage() {
  const content = document.getElementById('watchlist-content');
  if (!content) return;
  if (!state.currentUser) {
    content.innerHTML = `<div class="watchlist-empty">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
      <h3>Connectez-vous</h3>
      <p>Connectez-vous pour accéder à votre Watchlist.</p>
      <button class="btn-primary" style="margin-top:20px" onclick="openAuth('login')">Se connecter</button>
    </div>`;
    return;
  }
  if (state.watchlist.length === 0) {
    content.innerHTML = `<div class="watchlist-empty">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
      <h3>Votre Watchlist est vide</h3>
      <p>Parcourez nos films et ajoutez-en à votre liste.</p>
    </div>`;
    return;
  }

  const items = state.watchlist.map(id => {
    const m = getMovieById(id);
    if (!m) return '';
    const rating = state.userRatings[id] || 0;
    const stars = [1,2,3,4,5].map(n =>
      `<span class="star ${n <= rating ? 'filled' : ''}" onclick="rateWatchlistMovie(${id},${n})">★</span>`
    ).join('');
    return `<div class="watchlist-item">
      ${posterWatchlistHTML(m)}
      <div class="watchlist-info">
        <div class="watchlist-title">${m.title}</div>
        <div class="watchlist-genres">${m.genres.join(' · ')} · ${m.year}</div>
        <div class="watchlist-rating-label">Ma note</div>
        <div class="star-rating">${stars}</div>
      </div>
      <button class="watchlist-remove" onclick="removeFromWatchlist(${id})" title="Retirer">✕</button>
    </div>`;
  }).join('');

  content.innerHTML = `<div class="watchlist-grid">${items}</div>`;
}

function rateWatchlistMovie(movieId, rating) {
  const movie = getMovieById(movieId);
  if (!movie) return;
  state.userRatings[movieId] = rating;
  saveState();
  renderWatchlistPage();
  showToast(`★ Note ${rating}/5 enregistrée pour "${movie.title}"`);
}

/* ══════════════════════════════════════════════════════════
   SEARCH
══════════════════════════════════════════════════════════ */
function toggleSearch() {
  const overlay = document.getElementById('search-overlay');
  overlay.classList.toggle('hidden');
  if (!overlay.classList.contains('hidden')) {
    document.body.classList.add('overlay-active');
    document.getElementById('search-input').focus();
    document.getElementById('search-results').innerHTML = '';
    document.getElementById('search-input').value = '';
  } else {
    document.body.classList.remove('overlay-active');
  }
}

function runSearch(query) {
  const q = query.toLowerCase().trim();
  const results = document.getElementById('search-results');
  if (!q) { results.innerHTML = ''; return; }

  const movieHits = MOVIES.filter(m =>
    m.title.toLowerCase().includes(q) ||
    m.genres.some(g => g.toLowerCase().includes(q)) ||
    m.director.toLowerCase().includes(q)
  );
  const cinemaHits = CINEMAS.filter(c =>
    c.name.toLowerCase().includes(q) ||
    c.city.toLowerCase().includes(q)
  );

  if (!movieHits.length && !cinemaHits.length) {
    results.innerHTML = `<p class="search-no-results">Aucun résultat pour "<em>${query}</em>"</p>`;
    return;
  }

  const html = [
    ...cinemaHits.map(c => `
      <div class="search-result-item" onclick="toggleSearch();openCinemaModal(${c.id})">
        <span class="search-result-type">Cinéma</span>
        <div>
          <div class="search-result-name">${c.name}</div>
          <div class="search-result-sub">${c.city}</div>
        </div>
      </div>`),
    ...movieHits.map(m => `
      <div class="search-result-item" onclick="toggleSearch();openMovieModal(${m.id})">
        <span class="search-result-type">Film</span>
        <div>
          <div class="search-result-name">${m.title}</div>
          <div class="search-result-sub">${m.genres.join(' · ')} · ${m.year}</div>
        </div>
      </div>`),
  ].join('');

  results.innerHTML = html;
}

/* ══════════════════════════════════════════════════════════
   AUTH
══════════════════════════════════════════════════════════ */
function openAuth(tab = 'login') {
  renderAuthModal(tab);
  openModal('auth-modal');
}

function renderAuthModal(activeTab) {
  const isLogin = activeTab === 'login';
  document.getElementById('auth-modal-content').innerHTML = `
    <div class="auth-tabs">
      <button class="auth-tab ${isLogin ? 'active' : ''}" onclick="renderAuthModal('login');document.getElementById('auth-modal').querySelector('.modal').innerHTML=renderAuthHTML('login')">Connexion</button>
      <button class="auth-tab ${!isLogin ? 'active' : ''}" onclick="renderAuthModal('signup');document.getElementById('auth-modal').querySelector('.modal').innerHTML=renderAuthHTML('signup')">Créer un compte</button>
    </div>
    ${renderAuthHTML(activeTab)}`;
}

function renderAuthHTML(tab) {
  if (tab === 'login') {
    return `<div class="auth-form">
      <h2 class="auth-title">Bon retour !</h2>
      <p class="auth-sub">Connectez-vous pour accéder à toutes les fonctionnalités.</p>
      <div class="auth-form-fields">
        <div class="form-group">
          <label class="form-label">Email</label>
          <input type="email" class="form-input" id="auth-email" placeholder="vous@exemple.com"/>
        </div>
        <div class="form-group">
          <label class="form-label">Mot de passe</label>
          <input type="password" class="form-input" id="auth-pass" placeholder="••••••••"/>
        </div>
      </div>
      <button class="btn-primary" style="width:100%;justify-content:center;margin-bottom:16px" onclick="performLogin()">Se connecter</button>
      <p class="auth-footer">Pas encore de compte ? <a onclick="openAuth('signup')">Créer un compte</a></p>
    </div>`;
  } else {
    return `<div class="auth-form">
      <h2 class="auth-title">Créer un compte</h2>
      <p class="auth-sub">Rejoignez Ciné Fahmi pour profiter de toutes les fonctionnalités.</p>
      <div class="auth-form-fields">
        <div class="form-group">
          <label class="form-label">Nom complet</label>
          <input type="text" class="form-input" id="auth-name" placeholder="Fahmi Ben Ali"/>
        </div>
        <div class="form-group">
          <label class="form-label">Email</label>
          <input type="email" class="form-input" id="auth-email" placeholder="vous@exemple.com"/>
        </div>
        <div class="form-group">
          <label class="form-label">Mot de passe</label>
          <input type="password" class="form-input" id="auth-pass" placeholder="••••••••"/>
        </div>
      </div>
      <button class="btn-primary" style="width:100%;justify-content:center;margin-bottom:16px" onclick="performSignup()">Créer mon compte</button>
      <p class="auth-footer">Déjà un compte ? <a onclick="openAuth('login')">Se connecter</a></p>
    </div>`;
  }
}

async function performLogin() {
  const email = document.getElementById('auth-email')?.value.trim();
  const pass  = document.getElementById('auth-pass')?.value.trim();
  if (!email || !pass) { showToast('Veuillez remplir tous les champs.'); return; }

  try {
    const response = await fetch(`${API_BASE}/auth/login.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({ email, password: pass }),
    });

    const data = await response.json();

    if (!data.success) {
      showToast(data.message || 'Login failed.');
      return;
    }

    state.currentUser = {
      name: data.user?.email?.split('@')[0] || email.split('@')[0],
      email: data.user?.email || email,
      id: data.user?.id || null,
    };
    saveState();
    updateAuthUI();
    closeModal('auth-modal');
    showToast(`✓ Bienvenue, ${state.currentUser.name} !`);
    if (state._pendingAction) { state._pendingAction(); state._pendingAction = null; }
  } catch (error) {
    showToast('Unable to login right now.');
  }
}

async function performSignup() {
  const name  = document.getElementById('auth-name')?.value.trim();
  const email = document.getElementById('auth-email')?.value.trim();
  const pass  = document.getElementById('auth-pass')?.value.trim();
  if (!name || !email || !pass) { showToast('Veuillez remplir tous les champs.'); return; }

  try {
    const response = await fetch(`${API_BASE}/auth/signup.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({ email, password: pass, name }),
    });

    const data = await response.json();

    if (!data.success) {
      showToast(data.message || 'Signup failed.');
      return;
    }

    state.currentUser = {
      name,
      email: data.user?.email || email,
      id: data.user?.id || null,
    };
    saveState();
    updateAuthUI();
    closeModal('auth-modal');
    showToast(`🎬 Compte créé ! Bienvenue, ${name} !`);
    if (state._pendingAction) { state._pendingAction(); state._pendingAction = null; }
  } catch (error) {
    showToast('Unable to create account right now.');
  }
}

async function logout() {
  try {
    await fetch(`${API_BASE}/auth/logout.php`, {
      method: 'POST',
      credentials: 'same-origin',
    });
  } catch (error) {
    // Clear local UI state even if the network request fails.
  }

  state.currentUser = null;
  state.watchlist = [];
  state.userRatings = {};
  saveState();
  updateAuthUI();
  showToast('À bientôt !');
}

function updateAuthUI() {
  const loggedIn = !!state.currentUser;
  document.getElementById('btn-login').classList.toggle('hidden', loggedIn);
  document.getElementById('btn-signup').classList.toggle('hidden', loggedIn);
  document.getElementById('btn-logout').classList.toggle('hidden', !loggedIn);
  const greet = document.getElementById('user-greeting');
  greet.classList.toggle('hidden', !loggedIn);
  if (loggedIn) greet.textContent = `Bonjour, ${state.currentUser.name}`;
}

function requireAuth(action) {
  if (state.currentUser) { action(); return; }
  state._pendingAction = action;
  openAuth('login');
}

/* ══════════════════════════════════════════════════════════
   MODAL HELPERS
══════════════════════════════════════════════════════════ */
function openModal(id) {
  const el = document.getElementById(id);
  el.classList.remove('hidden');
  document.body.classList.add('overlay-active');
}

function closeModal(id) {
  document.getElementById(id).classList.add('hidden');
  // Only remove overlay-active if no other modals are open
  const anyOpen = document.querySelectorAll('.modal-overlay:not(.hidden)').length > 0;
  if (!anyOpen) document.body.classList.remove('overlay-active');
}

function closeModalOutside(e, id) {
  if (e.target === document.getElementById(id)) closeModal(id);
}

// Close modals on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay:not(.hidden)').forEach(m => m.classList.add('hidden'));
    const searchOverlay = document.getElementById('search-overlay');
    if (!searchOverlay.classList.contains('hidden')) toggleSearch();
    document.body.classList.remove('overlay-active');
  }
});

/* ══════════════════════════════════════════════════════════
   TOAST
══════════════════════════════════════════════════════════ */
let _toastTimer = null;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.remove('hidden');
  if (_toastTimer) clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => t.classList.add('hidden'), 3200);
}

/* ══════════════════════════════════════════════════════════
   NAVBAR SCROLL EFFECT
══════════════════════════════════════════════════════════ */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 60) {
    nav.style.background = 'rgba(5,22,34,.99)';
    nav.style.boxShadow  = '0 2px 24px rgba(0,0,0,.4)';
  } else {
    nav.style.background = '';
    nav.style.boxShadow  = '';
  }
}, { passive: true });