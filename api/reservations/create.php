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

$screeningId = (int)($payload['screening_id'] ?? 0);
$seatNumber = (int)($payload['seat_number'] ?? 0);

if ($screeningId <= 0 || $seatNumber <= 0) {
	http_response_code(400);
	echo json_encode([
		'success' => false,
		'message' => 'screening_id and seat_number are required.'
	]);
	exit;
}

try {
	$pdo->beginTransaction();

	$screeningStatement = $pdo->prepare(
		'SELECT s.id, s.available_seats, s.movie_id, s.cinema_id, s.room_id, r.capacity
		 FROM screenings s
		 INNER JOIN rooms r ON r.id = s.room_id
		 WHERE s.id = ?
		 FOR UPDATE'
	);
	$screeningStatement->execute([$screeningId]);
	$screening = $screeningStatement->fetch();

	if (!$screening) {
		$pdo->rollBack();
		http_response_code(404);
		echo json_encode([
			'success' => false,
			'message' => 'Screening not found.'
		]);
		exit;
	}

	if ($seatNumber > (int)$screening['capacity']) {
		$pdo->rollBack();
		http_response_code(400);
		echo json_encode([
			'success' => false,
			'message' => 'Seat number is outside the room capacity.'
		]);
		exit;
	}

	$reservedSeat = $pdo->prepare('SELECT id FROM reservations WHERE screening_id = ? AND seat_number = ? LIMIT 1 FOR UPDATE');
	$reservedSeat->execute([$screeningId, $seatNumber]);

	if ($reservedSeat->fetch()) {
		$pdo->rollBack();
		http_response_code(409);
		echo json_encode([
			'success' => false,
			'message' => 'This seat is already reserved.'
		]);
		exit;
	}

	if ((int)$screening['available_seats'] <= 0) {
		$pdo->rollBack();
		http_response_code(409);
		echo json_encode([
			'success' => false,
			'message' => 'No seats available for this screening.'
		]);
		exit;
	}

	$insertReservation = $pdo->prepare(
		'INSERT INTO reservations (user_id, screening_id, seat_number) VALUES (?, ?, ?)'
	);
	$insertReservation->execute([
		(int)$_SESSION['user_id'],
		$screeningId,
		$seatNumber,
	]);

	$updateSeats = $pdo->prepare('UPDATE screenings SET available_seats = available_seats - 1 WHERE id = ?');
	$updateSeats->execute([$screeningId]);

	$reservationId = (int)$pdo->lastInsertId();

	$pdo->commit();

	http_response_code(201);
	echo json_encode([
		'success' => true,
		'message' => 'Reservation created successfully.',
		'reservation' => [
			'id' => $reservationId,
			'screening_id' => $screeningId,
			'seat_number' => $seatNumber,
		]
	]);
} catch (Throwable $exception) {
	if ($pdo->inTransaction()) {
		$pdo->rollBack();
	}

	http_response_code(500);
	echo json_encode([
		'success' => false,
		'message' => 'Unable to create reservation.'
	]);
}
=======

>>>>>>> 61b92f288759bb59d2d8332bcd1546b076122c90
