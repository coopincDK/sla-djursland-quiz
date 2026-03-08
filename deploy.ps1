# S-LA Djursland Quiz — Deploy script
# Kopierer alle relevante filer til public/ og deployer til Firebase

Write-Host "`n🚀 S-LA Djursland — Deploy til Firebase" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor DarkGray

# 1. Kopier kodefiler
$files = @("index.html", "game.js", "style.css", "questions.js", "firebase-config.js", "manifest.json", "sw.js", "admin.html")
Write-Host "`n📄 Kopierer kodefiler..." -ForegroundColor Yellow
foreach ($f in $files) {
    if (Test-Path $f) {
        Copy-Item -Path $f -Destination "public\$f" -Force
        Write-Host "  ✅ $f" -ForegroundColor Green
    } else {
        Write-Host "  ⚠️  $f ikke fundet — springer over" -ForegroundColor DarkYellow
    }
}

# 2. Sync assets (kun nye/ændrede)
Write-Host "`n🖼️  Syncer assets..." -ForegroundColor Yellow
robocopy "assets" "public\assets" /MIR /NJH /NJS /NDL /NFL /NC /NS | Out-Null
Write-Host "  ✅ assets synced" -ForegroundColor Green

# 3. Git commit + push
Write-Host "`n📦 Git commit + push..." -ForegroundColor Yellow
git add -A
$msg = Read-Host "  Commit besked (Enter = 'Deploy update')"
if (-not $msg) { $msg = "Deploy update" }
git commit -m $msg 2>$null
git push 2>$null
Write-Host "  ✅ Pushet til GitHub" -ForegroundColor Green

# 4. Firebase deploy
Write-Host "`n🔥 Firebase deploy..." -ForegroundColor Yellow
firebase deploy --only hosting

Write-Host "`n✅ DONE! Live på: https://sla-djursland.web.app" -ForegroundColor Green
Write-Host ""
