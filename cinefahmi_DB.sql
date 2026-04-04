DROP DATABASE IF EXISTS cinema_db;
CREATE DATABASE cinema_db;
USE cinema_db;

-- Table des utilisateurs
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des films
CREATE TABLE movies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image VARCHAR(255),
    rating FLOAT DEFAULT 0
);

-- Table des genres
CREATE TABLE genres (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Table de liaison films <-> genres
CREATE TABLE movie_genres (
    movie_id INT,
    genre_id INT,
    PRIMARY KEY (movie_id, genre_id),
    FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
    FOREIGN KEY (genre_id) REFERENCES genres(id) ON DELETE CASCADE
);

-- Table des cinémas
CREATE TABLE cinemas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    image VARCHAR(255)
);

-- Table des salles
CREATE TABLE rooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cinema_id INT,
    room_number INT,
    capacity INT,
    FOREIGN KEY (cinema_id) REFERENCES cinemas(id) ON DELETE CASCADE
);

-- Table des séances
CREATE TABLE screenings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    movie_id INT,
    cinema_id INT,
    room_id INT,
    date DATE,
    time TIME,
    available_seats INT,
    FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
    FOREIGN KEY (cinema_id) REFERENCES cinemas(id) ON DELETE CASCADE,
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
);

-- Table des réservations
CREATE TABLE reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    screening_id INT,
    seat_number INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (screening_id) REFERENCES screenings(id) ON DELETE CASCADE
);

-- Table watchlist
CREATE TABLE watchlist (
    user_id INT,
    movie_id INT,
    rating INT,
    PRIMARY KEY (user_id, movie_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE
);

-- 2. INSERTION DES GENRES
INSERT INTO genres (id, name) VALUES 
(1, 'Action'), (2, 'Adventure'), (3, 'Animation'), (4, 'Comedy'), 
(5, 'Crime'), (6, 'Drama'), (7, 'Fantasy'), (8, 'Horror'), 
(9, 'Sci-Fi'), (10, 'Thriller'), (11, 'Romance');

-- 3. INSERTION DES FILMS
INSERT INTO movies (id, title, description, image, rating) VALUES 
(1, 'The Drama', 'A couple faces a crisis days before their wedding when secrets emerge.', 'the_drama.jpg', 4.2),
(2, 'Scream 7', 'Ghostface returns to terrorize a new generation in this slasher sequel.', 'scream7.jpg', 3.9),
(3, 'Family Business', 'عائلة فقيرة تتسلل للعمل لدى عائلة ثرية بالتخفي، مما يكشف الفجوة الطبقية الكبيرة.', 'family_business.jpg', 4.6),
(4, 'Jumpers', 'Individuals with the ability to teleport find themselves hunted by a secret organization.', 'jumpers.jpg', 4.0),
(5, 'Project Hail Mary', 'An astronaut wakes up on a spaceship with no memory and must save Earth.', 'hail_mary.jpg', 4.9),
(6, 'Reminders of Him', 'A young mother seeks redemption after serving time in prison.', 'reminders_of_him.jpg', 4.5),
(7, 'Whistle', 'A high-stakes thriller involving a deadly game triggered by a simple whistle.', 'whistle.jpg', 3.7),
(8, 'They Will Kill You', 'A horror-thriller set in a mysterious high-rise.', 'they_kill_you.jpg', 3.8),
(9, 'Marsupilami', 'The adventures of the mythical long-tailed creature in the Palombian jungle.', 'marsupilami.jpg', 3.5);

-- 4. LIAISON FILMS <-> GENRES
INSERT INTO movie_genres (movie_id, genre_id) VALUES 
(1, 6), (1, 11), -- The Drama: Drama, Romance
(2, 8), (2, 10), -- Scream 7: Horror, Thriller
(3, 4), (3, 6),  -- Family Business: Comedy, Drama
(4, 1), (4, 9),  -- Jumpers: Action, Sci-Fi
(5, 9), (5, 2),  -- Project Hail Mary: Sci-Fi, Adventure
(6, 6), (6, 11), -- Reminders of Him: Drama, Romance
(7, 10), (7, 8), -- Whistle: Thriller, Horror
(8, 8), (8, 10), -- They Will Kill You: Horror, Thriller
(9, 3), (9, 2);  -- Marsupilami: Animation, Adventure

-- 5. INSERTION DES CINÉMAS (Tunisie)
INSERT INTO cinemas (id, name, location, image) VALUES 
(1, 'Pathé Tunis City', 'Géant, Tunis', 'pathe_tunis.jpg'),
(2, 'Le Colisée', 'Avenue Habib Bourguiba, Tunis', 'colisee.jpg'),
(3, 'Pathé Mall of Sousse', 'Kalaa Kebira, Sousse', 'pathe_sousse.jpg'),
(4, 'Cinéma Majestic', 'Bizerte', 'majestic_bizerte.jpg');

-- 6. INSERTION DES SALLES
INSERT INTO rooms (id, cinema_id, room_number, capacity) VALUES 
(1, 1, 1, 250), -- Salle 1 à Tunis City
(2, 1, 2, 150), -- Salle 2 à Tunis City
(3, 2, 1, 1700), -- Grande salle du Colisée
(4, 3, 1, 200);  -- Salle 1 à Sousse

-- 7. INSERTION DES SÉANCES (Exemples pour Avril 2026)
INSERT INTO screenings (movie_id, cinema_id, room_id, date, time, available_seats) VALUES 
(5, 1, 1, '2026-04-10', '20:00:00', 250), -- Project Hail Mary
(3, 2, 3, '2026-04-10', '18:30:00', 1700), -- Family Business
(1, 1, 2, '2026-04-11', '21:00:00', 150),  -- The Drama
(9, 3, 4, '2026-04-11', '14:00:00', 200);  -- Marsupilami