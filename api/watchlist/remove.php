<?php

require_once dirname(__DIR__) . '/db.php';

if (!in_array($_SERVER['REQUEST_METHOD'], ['POST', 'DELETE'], true)) {
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
	$statement = $pdo->prepare('DELETE FROM watchlist WHERE user_id = ? AND movie_id = ?');
	$statement->execute([(int)$_SESSION['user_id'], $movieId]);

	if ($statement->rowCount() === 0) {
		http_response_code(404);
		echo json_encode([
			'success' => false,
			'message' => 'Movie not found in watchlist.'
		]);
		exit;
	}

	echo json_encode([
		'success' => true,
		'message' => 'Movie removed from watchlist.'
	]);
} catch (Throwable $exception) {
	http_response_code(500);
	echo json_encode([
		'success' => false,
		'message' => 'Unable to remove movie from watchlist.'
	]);
}
