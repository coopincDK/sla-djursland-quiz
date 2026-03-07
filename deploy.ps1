# Deploy script - syncer filer til public/ og deployer til Firebase
Write-Host "Syncer filer til public/..." -ForegroundColor Cyan

$files = @('game.js','style.css','index.html','questions.js','firebase-config.js','sw.js','manifest.json','admin.html')
foreach($f in $files) {
    Copy-Item -Path $f -Destination "public/$f" -Force
    Write-Host "  $f -> public/$f"
}

# Sync assets
Write-Host "Syncer assets..." -ForegroundColor Cyan
Copy-Item -Path "assets" -Destination "public/" -Recurse -Force

Write-Host "`nDeployer til Firebase..." -ForegroundColor Green
firebase deploy --only hosting

Write-Host "`nFaerdig! Live paa https://sla-djursland.web.app" -ForegroundColor Green
