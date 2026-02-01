$baseUrl = "https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights"
$destDir = "$PSScriptRoot\public\models"
$files = @(
    "tiny_face_detector_model-weights_manifest.json",
    "tiny_face_detector_model-shard1",
    "face_landmark_68_model-weights_manifest.json",
    "face_landmark_68_model-shard1",
    "face_expression_model-weights_manifest.json",
    "face_expression_model-shard1"
)

if (!(Test-Path -Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir | Out-Null
}

foreach ($file in $files) {
    $url = "$baseUrl/$file"
    $dest = "$destDir\$file"
    Write-Host "Downloading $file..."
    Invoke-WebRequest -Uri $url -OutFile $dest
}

Write-Host "Download complete."
