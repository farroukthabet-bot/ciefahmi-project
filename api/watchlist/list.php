<?php

require_once dirname(__DIR__) . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
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

try {
	$statement = $pdo->prepare(
		'SELECT w.movie_id, w.rating AS personal_rating,
				m.title, m.description, m.image, m.rating AS global_rating
		 FROM watchlist w
		 INNER JOIN movies m ON m.id = w.movie_id
		 WHERE w.user_id = ?
		 ORDER BY m.title'
	);
	$statement->execute([(int)$_SESSION['user_id']]);
	$items = $statement->fetchAll();

	foreach ($items as &$item) {
		$genresStatement = $pdo->prepare(
			'SELECT g.id, g.name
			 FROM genres g
			 INNER JOIN movie_genres mg ON mg.genre_id = g.id
			 WHERE mg.movie_id = ?
			 ORDER BY g.name'
		);
		$genresStatement->execute([(int)$item['movie_id']]);
		$item['genres'] = $genresStatement->fetchAll();
	}
	unset($item);

	echo json_encode([
		'success' => true,
		'watchlist' => $items
	]);
} catch (Throwable $exception) {
	http_response_code(500);
	echo json_encode([
		'success' => false,
		'message' => 'Unable to fetch watchlist.'
	]);
}
