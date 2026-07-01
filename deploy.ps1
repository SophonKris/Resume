# 一键上传代码到 GitHub 并触发 Vercel 部署
$repoPath = "d:\AI-2026\AICard"
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

Set-Location $repoPath

Write-Host "正在检查改动..." -ForegroundColor Cyan
$status = git status --short

if (-not $status) {
    Write-Host "没有需要提交的改动。" -ForegroundColor Yellow
    exit 0
}

Write-Host "发现以下改动：" -ForegroundColor Green
Write-Host $status

Write-Host "正在添加到暂存区..." -ForegroundColor Cyan
git add -A

Write-Host "正在提交..." -ForegroundColor Cyan
git commit -m "Update at $timestamp"

Write-Host "正在推送到 GitHub..." -ForegroundColor Cyan
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "上传成功！Vercel 会自动重新部署。" -ForegroundColor Green
} else {
    Write-Host "上传失败，请检查上面的错误信息。" -ForegroundColor Red
}

pause
