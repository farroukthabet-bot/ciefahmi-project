<<<<<<< HEAD
<?php

require_once dirname(__DIR__) . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
	echo json_encode([
		'success' => false,
		'message' => 'Use POST to login.'
	]);
	exit;
}

$rawInput = file_get_contents('php://input');
$payload = json_decode($rawInput, true);

if (!is_array($payload)) {
	$payload = $_POST;
}

$email = trim((string)($payload['email'] ?? ''));
$password = (string)($payload['password'] ?? '');

if ($email === '' || $password === '') {
	http_response_code(400);
	echo json_encode([
		'success' => false,
		'message' => 'Email and password are required.'
	]);
	exit;
}

try {
	$statement = $pdo->prepare('SELECT id, email, password FROM users WHERE email = ? LIMIT 1');
	$statement->execute([$email]);
	$user = $statement->fetch();

	if (!$user || !password_verify($password, $user['password'])) {
		http_response_code(401);
		echo json_encode([
			'success' => false,
			'message' => 'Invalid email or password.'
		]);
		exit;
	}

	session_regenerate_id(true);
	$_SESSION['user_id'] = (int)$user['id'];
	$_SESSION['user_email'] = $user['email'];

	echo json_encode([
		'success' => true,
		'message' => 'Login successful.',
		'user' => [
			'id' => (int)$user['id'],
			'email' => $user['email'],
		]
	]);
} catch (Throwable $exception) {
	http_response_code(500);
	echo json_encode([
		'success' => false,
		'message' => 'Unable to login.'
	]);
}
=======

>>>>>>> 61b92f288759bb59d2d8332bcd1546b076122c90
