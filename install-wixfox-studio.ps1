$ErrorActionPreference = 'Stop'

$installDir = "C:\Users\akash\AppData\Local\Programs\WixFox Studio"
Write-Host "Installing WixFox Studio to $installDir..."

if (!(Test-Path -Path $installDir)) {
    New-Item -ItemType Directory -Path $installDir -Force | Out-Null
}

& robocopy "release\win-unpacked" $installDir /E /NFL /NDL /NJH /NJS
if ($LASTEXITCODE -ge 8) {
    throw "Robocopy failed with exit code $LASTEXITCODE"
}

$exePath = Join-Path $installDir "WixFox Studio.exe"
Write-Host "Target executable: $exePath"

$wsh = New-Object -ComObject WScript.Shell

# 1. Desktop Shortcut
$desktopPath = [System.Environment]::GetFolderPath([System.Environment+SpecialFolder]::Desktop)
$desktopLnk = Join-Path $desktopPath "WixFox Studio.lnk"
$sc1 = $wsh.CreateShortcut($desktopLnk)
$sc1.TargetPath = $exePath
$sc1.WorkingDirectory = $installDir
$sc1.Description = "WixFox Studio - Agency ERP, Projects & Invoicing"
$sc1.Save()
Write-Host "Desktop shortcut created at: $desktopLnk"

# 2. Start Menu Shortcut
$startMenuPath = [System.Environment]::GetFolderPath([System.Environment+SpecialFolder]::Programs)
$startMenuLnk = Join-Path $startMenuPath "WixFox Studio.lnk"
$sc2 = $wsh.CreateShortcut($startMenuLnk)
$sc2.TargetPath = $exePath
$sc2.WorkingDirectory = $installDir
$sc2.Description = "WixFox Studio"
$sc2.Save()
Write-Host "Start Menu shortcut created at: $startMenuLnk"

# 3. Project Root Shortcut
$projectLnk = Join-Path (Get-Location) "WixFox Studio.lnk"
$sc3 = $wsh.CreateShortcut($projectLnk)
$sc3.TargetPath = $exePath
$sc3.WorkingDirectory = $installDir
$sc3.Description = "WixFox Studio"
$sc3.Save()
Write-Host "Project shortcut created at: $projectLnk"

Write-Host "INSTALLATION COMPLETED SUCCESSFULLY!"
