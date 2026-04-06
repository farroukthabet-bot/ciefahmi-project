<?php

require_once __DIR__ . '/db.php';

function fetchCinemaMovies(PDO $pdo, int $cinemaId): array
{
	$statement = $pdo->prepare(
		'SELECT DISTINCT m.id, m.title, m.description, m.image, m.rating
		 FROM movies m
		 INNER JOIN screenings s ON s.movie_id = m.id
		 WHERE s.cinema_id = ?
		 ORDER BY m.title'
	);
	$statement->execute([$cinemaId]);

	$movies = $statement->fetchAll();

	foreach ($movies as &$movie) {
		$genresStatement = $pdo->prepare(
			'SELECT g.id, g.name
			 FROM genres g
			 INNER JOIN movie_genres mg ON mg.genre_id = g.id
			 WHERE mg.movie_id = ?
			 ORDER BY g.name'
		);
		$genresStatement->execute([(int)$movie['id']]);
		$movie['genres'] = $genresStatement->fetchAll();
	}
	unset($movie);

	return $movies;
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
	http_response_code(405);
	echo json_encode([
		'success' => false,
		'message' => 'Method not allowed.'
	]);
	exit;
}

$cinemaId = isset($_GET['id']) ? (int)$_GET['id'] : 0;

try {
	if ($cinemaId > 0) {
		$statement = $pdo->prepare('SELECT id, name, location, image FROM cinemas WHERE id = ? LIMIT 1');
		$statement->execute([$cinemaId]);
		$cinema = $statement->fetch();

		if (!$cinema) {
			http_response_code(404);
			echo json_encode([
				'success' => false,
				'message' => 'Cinema not found.'
			]);
			exit;
		}

		$cinema['movies'] = fetchCinemaMovies($pdo, $cinemaId);

		echo json_encode([
			'success' => true,
			'cinema' => $cinema
		]);
		exit;
	}

	$statement = $pdo->query('SELECT id, name, location, image FROM cinemas ORDER BY name');
	$cinemas = $statement->fetchAll();

	foreach ($cinemas as &$cinema) {
		$cinema['movies'] = fetchCinemaMovies($pdo, (int)$cinema['id']);
	}
	unset($cinema);

	echo json_encode([
		'success' => true,
		'cinemas' => $cinemas
	]);
} catch (Throwable $exception) {
	http_response_code(500);
	echo json_encode([
		'success' => false,
		'message' => 'Unable to fetch cinemas.'
	]);
}
