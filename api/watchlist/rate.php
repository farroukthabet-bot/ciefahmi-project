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
$rating = (int)($payload['rating'] ?? 0);

if ($movieId <= 0 || $rating < 1 || $rating > 5) {
	http_response_code(400);
	echo json_encode([
		'success' => false,
		'message' => 'movie_id and rating (1-5) are required.'
	]);
	exit;
}

try {
	$statement = $pdo->prepare('SELECT movie_id FROM watchlist WHERE user_id = ? AND movie_id = ? LIMIT 1');
	$statement->execute([(int)$_SESSION['user_id'], $movieId]);

	if (!$statement->fetch()) {
		http_response_code(404);
		echo json_encode([
			'success' => false,
			'message' => 'Movie is not in your watchlist.'
		]);
		exit;
	}

	$updateStatement = $pdo->prepare('UPDATE watchlist SET rating = ? WHERE user_id = ? AND movie_id = ?');
	$updateStatement->execute([$rating, (int)$_SESSION['user_id'], $movieId]);

	echo json_encode([
		'success' => true,
		'message' => 'Watchlist rating updated.'
	]);
} catch (Throwable $exception) {
	http_response_code(500);
	echo json_encode([
		'success' => false,
		'message' => 'Unable to update watchlist rating.'
	]);
}
