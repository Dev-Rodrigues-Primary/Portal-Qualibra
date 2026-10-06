Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "   INICIANDO PORTAL QUALIBRA (BACKEND + FRONTEND)        " -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Cyan

# Inicia o Backend em uma janela
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location -Path 'C:\Users\DR\Documents\DEV\PQ\Backend'; npm start"

# Inicia o Frontend em outra janela
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location -Path 'C:\Users\DR\Documents\DEV\PQ\Frontend'; npm run dev"

Write-Host "Backend rodando em:  http://localhost:3001" -ForegroundColor Yellow
Write-Host "Frontend rodando em: http://localhost:5173" -ForegroundColor Yellow