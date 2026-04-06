<?php

declare(strict_types=1);

if (session_status() === PHP_SESSION_NONE) {
	session_start();
}

header('Content-Type: application/json; charset=utf-8');

$dbHost = getenv('DB_HOST') ?: '127.0.0.1';
$dbPort = getenv('DB_PORT') ?: '3306';
$dbName = getenv('DB_NAME') ?: 'cinema_db';
$dbUser = getenv('DB_USER') ?: 'root';
$dbPass = getenv('DB_PASS') ?: 'medyoufa2005';

try {
	$pdo = new PDO(
		"mysql:host={$dbHost};port={$dbPort};dbname={$dbName};charset=utf8mb4",
		$dbUser,
		$dbPass,
		[
			PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
			PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
			PDO::ATTR_EMULATE_PREPARES => false,
		]
	);
} catch (PDOException $exception) {
	http_response_code(500);
	echo json_encode([
		'success' => false,
		'message' => 'Database connection failed.',
		'error' => $exception->getMessage()
	]);
	exit;
}
