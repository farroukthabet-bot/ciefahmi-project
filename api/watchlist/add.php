<<<<<<< HEAD
<?php

require_once dirname(__DIR__) . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
	http_response_code(405);
	echo json_encode([
		'success' => false,
		'message' => 'Method not allowed.'
	]);
	exit;
}

if (empty($_SESSION['user_id'])) {
	http_response_code(401);
	echo json_encode([
		'success' => false,
		'message' => 'Authentication required.'
	]);
	exit;
}

$rawInput = file_get_contents('php://input');
$payload = json_decode($rawInput, true);

if (!is_array($payload)) {
	$payload = $_POST;
}

$movieId = (int)($payload['movie_id'] ?? 0);

if ($movieId <= 0) {
	http_response_code(400);
	echo json_encode([
		'success' => false,
		'message' => 'movie_id is required.'
	]);
	exit;
}

try {
	$movieStatement = $pdo->prepare('SELECT id, title FROM movies WHERE id = ? LIMIT 1');
	$movieStatement->execute([$movieId]);

	if (!$movieStatement->fetch()) {
		http_response_code(404);
		echo json_encode([
			'success' => false,
			'message' => 'Movie not found.'
		]);
		exit;
	}

	$existingStatement = $pdo->prepare('SELECT movie_id FROM watchlist WHERE user_id = ? AND movie_id = ? LIMIT 1');
	$existingStatement->execute([(int)$_SESSION['user_id'], $movieId]);

	if ($existingStatement->fetch()) {
		http_response_code(409);
		echo json_encode([
			'success' => false,
			'message' => 'Movie already in watchlist.'
		]);
		exit;
	}

	$insertStatement = $pdo->prepare('INSERT INTO watchlist (user_id, movie_id, rating) VALUES (?, ?, NULL)');
	$insertStatement->execute([(int)$_SESSION['user_id'], $movieId]);

	echo json_encode([
		'success' => true,
		'message' => 'Movie added to watchlist.'
	]);
} catch (Throwable $exception) {
	http_response_code(500);
	echo json_encode([
		'success' => false,
		'message' => 'Unable to add movie to watchlist.'
	]);
}
=======

>>>>>>> 61b92f288759bb59d2d8332bcd1546b076122c90
