<?php

require_once __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
	http_response_code(405);
	echo json_encode([
		'success' => false,
		'message' => 'Method not allowed.'
	]);
	exit;
}

$movieId = isset($_GET['movie_id']) ? (int)$_GET['movie_id'] : 0;
$cinemaId = isset($_GET['cinema_id']) ? (int)$_GET['cinema_id'] : 0;
$date = isset($_GET['date']) ? trim((string)$_GET['date']) : '';

$conditions = [];
$parameters = [];

if ($movieId > 0) {
	$conditions[] = 's.movie_id = ?';
	$parameters[] = $movieId;
}

if ($cinemaId > 0) {
	$conditions[] = 's.cinema_id = ?';
	$parameters[] = $cinemaId;
}

if ($date !== '') {
	$conditions[] = 's.date = ?';
	$parameters[] = $date;
}

$whereClause = $conditions ? 'WHERE ' . implode(' AND ', $conditions) : '';

try {
	$statement = $pdo->prepare(
		'SELECT s.id, s.movie_id, s.cinema_id, s.room_id, s.date, s.time, s.available_seats,
				m.title AS movie_title, m.image AS movie_image, m.rating AS movie_rating,
				c.name AS cinema_name, c.location AS cinema_location,
				r.room_number, r.capacity
		 FROM screenings s
		 INNER JOIN movies m ON m.id = s.movie_id
		 INNER JOIN cinemas c ON c.id = s.cinema_id
		 INNER JOIN rooms r ON r.id = s.room_id
		 ' . $whereClause . '
		 ORDER BY s.date, s.time'
	);
	$statement->execute($parameters);

	echo json_encode([
		'success' => true,
		'screenings' => $statement->fetchAll()
	]);
} catch (Throwable $exception) {
	http_response_code(500);
	echo json_encode([
		'success' => false,
		'message' => 'Unable to fetch screenings.'
	]);
}
