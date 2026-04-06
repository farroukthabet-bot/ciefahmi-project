<?php

require_once __DIR__ . '/db.php';

function fetchMovieGenres(PDO $pdo, int $movieId): array
{
	$statement = $pdo->prepare(
		'SELECT g.id, g.name
		 FROM genres g
		 INNER JOIN movie_genres mg ON mg.genre_id = g.id
		 WHERE mg.movie_id = ?
		 ORDER BY g.name'
	);
	$statement->execute([$movieId]);

	return $statement->fetchAll();
}

function fetchMovieScreenings(PDO $pdo, int $movieId): array
{
	$statement = $pdo->prepare(
		'SELECT s.id, s.cinema_id, s.room_id, s.date, s.time, s.available_seats,
				c.name AS cinema_name, c.location AS cinema_location,
				r.room_number, r.capacity
		 FROM screenings s
		 INNER JOIN cinemas c ON c.id = s.cinema_id
		 INNER JOIN rooms r ON r.id = s.room_id
		 WHERE s.movie_id = ?
		 ORDER BY s.date, s.time'
	);
	$statement->execute([$movieId]);

	return $statement->fetchAll();
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
	http_response_code(405);
	echo json_encode([
		'success' => false,
		'message' => 'Method not allowed.'
	]);
	exit;
}

$movieId = isset($_GET['id']) ? (int)$_GET['id'] : 0;

try {
	if ($movieId > 0) {
		$statement = $pdo->prepare('SELECT id, title, description, image, rating FROM movies WHERE id = ? LIMIT 1');
		$statement->execute([$movieId]);
		$movie = $statement->fetch();

		if (!$movie) {
			http_response_code(404);
			echo json_encode([
				'success' => false,
				'message' => 'Movie not found.'
			]);
			exit;
		}

		$movie['genres'] = fetchMovieGenres($pdo, $movieId);
		$movie['screenings'] = fetchMovieScreenings($pdo, $movieId);

		echo json_encode([
			'success' => true,
			'movie' => $movie
		]);
		exit;
	}

	$statement = $pdo->query('SELECT id, title, description, image, rating FROM movies ORDER BY title');
	$movies = $statement->fetchAll();

	foreach ($movies as &$movie) {
		$movie['genres'] = fetchMovieGenres($pdo, (int)$movie['id']);
	}
	unset($movie);

	echo json_encode([
		'success' => true,
		'movies' => $movies
	]);
} catch (Throwable $exception) {
	http_response_code(500);
	echo json_encode([
		'success' => false,
		'message' => 'Unable to fetch movies.'
	]);
}
