<?php
/**
 * Direct-to-cPanel Image Upload API Script
 * Sidharth Steels - Shared Hosting Media Store Gateway
 * 
 * Instructions:
 * Place this file inside cPanel's "public_html/" folder along with your react "dist/" build.
 * Ensure the directory permissions for public_html permit PHP to write files (default 755).
 */

// CORS setup to safeguard cross-origin development calls
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

// Exclude preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        "success" => false, 
        "error" => "Only POST upload requests are allowed."
    ]);
    exit();
}

// Check if file is uploaded under standard key "image"
if (!isset($_FILES['image'])) {
    http_response_code(400);
    echo json_encode([
        "success" => false, 
        "error" => "No file payload detected in submission."
    ]);
    exit();
}

$file = $_FILES['image'];

// Validate upload status
if ($file['error'] !== UPLOAD_ERR_OK) {
    http_response_code(500);
    echo json_encode([
        "success" => false, 
        "error" => "File transport error. Code: " . $file['error']
    ]);
    exit();
}

// File size safety limit (e.g., 5 Megabytes)
if ($file['size'] > 5 * 1024 * 1024) {
    http_response_code(400);
    echo json_encode([
        "success" => false, 
        "error" => "Payload limits exceeded. Max 5MB file permitted."
    ]);
    exit();
}

// MIME-type security audit
$allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/jpg'];
if (!in_array($file['type'], $allowedTypes)) {
    http_response_code(400);
    echo json_encode([
        "success" => false, 
        "error" => "Unsupported file format. Only JPG, PNG, GIF, and WEBP variants are accepted."
    ]);
    exit();
}

// Secure directory preparation
$uploadDir = 'uploads/';
if (!is_dir($uploadDir)) {
    // Attempt mkdir with correct read-write-execute permissions for owner, and read-execute for group/others
    if (!mkdir($uploadDir, 0755, true)) {
        http_response_code(500);
        echo json_encode([
            "success" => false, 
            "error" => "Inadequate server configuration permissions. Unable to construct media store database folder."
        ]);
        exit();
    }
}

// Double-audit file extensions
$ext = pathinfo($file['name'], PATHINFO_EXTENSION);
if (empty($ext)) {
    $ext = 'jpg';
}
$ext = strtolower($ext);

// Sanity check extension values
$safeExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
if (!in_array($ext, $safeExtensions)) {
    http_response_code(400);
    echo json_encode([
        "success" => false, 
        "error" => "File injection signature validated. Safe extensions are required."
    ]);
    exit();
}

// Generate visual identity signature file name
$newFileName = 'post_' . bin2hex(random_bytes(8)) . '_' . time() . '.' . $ext;
$targetFilePath = $uploadDir . $newFileName;

// Safely transfer from temporary buffer to media store
if (move_uploaded_file($file['tmp_name'], $targetFilePath)) {
    // Generate root relative URL
    // Resolves automatically to standard "https://{domain}/uploads/{filename}" regardless of DOMAIN changes
    $publicUrl = '/' . $targetFilePath; 
    
    http_response_code(200);
    echo json_encode([
        "success" => true,
        "url" => $publicUrl,
        "filename" => $newFileName,
        "meta" => [
            "size" => $file['size'],
            "type" => $file['type']
        ]
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        "success" => false, 
        "error" => "Write permission blocked by the operating system. Check parent directory permissions (chmod 755)."
    ]);
}
