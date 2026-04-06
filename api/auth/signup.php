<?php

require_once dirname(__DIR__) . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
	echo json_encode([
		'success' => false,
		'message' => 'Use POST to create an account.'
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

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
	http_response_code(400);
	echo json_encode([
		'success' => false,
		'message' => 'Invalid email address.'
	]);
	exit;
}

if (strlen($password) < 6) {
	http_response_code(400);
	echo json_encode([
		'success' => false,
		'message' => 'Password must be at least 6 characters long.'
	]);
	exit;
}

try {
	$checkUser = $pdo->prepare('SELECT id FROM users WHERE email = ? LIMIT 1');
	$checkUser->execute([$email]);

	if ($checkUser->fetch()) {
		http_response_code(409);
		echo json_encode([
			'success' => false,
			'message' => 'This email is already registered.'
		]);
		exit;
	}

	$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

	$insertUser = $pdo->prepare('INSERT INTO users (email, password) VALUES (?, ?)');
	$insertUser->execute([$email, $hashedPassword]);

	$userId = (int)$pdo->lastInsertId();

	session_regenerate_id(true);
	$_SESSION['user_id'] = $userId;
	$_SESSION['user_email'] = $email;

	http_response_code(201);
	echo json_encode([
		'success' => true,
		'message' => 'Account created successfully.',
		'user' => [
			'id' => $userId,
			'email' => $email,
		]
	]);
} catch (Throwable $exception) {
	http_response_code(500);
	echo json_encode([
		'success' => false,
		'message' => 'Unable to create account.'
	]);
}
