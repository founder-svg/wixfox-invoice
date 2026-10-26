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

# Ensure resources/app has latest dist and electron
$appDir = Join-Path $installDir "resources\app"
New-Item -ItemType Directory -Path (Join-Path $appDir "dist") -Force | Out-Null
New-Item -ItemType Directory -Path (Join-Path $appDir "electron") -Force | Out-Null
Copy-Item -Path "dist\index.html" -Destination (Join-Path $appDir "dist\index.html") -Force
Copy-Item -Path "electron\main.cjs" -Destination (Join-Path $appDir "electron\main.cjs") -Force
Copy-Item -Path "package.json" -Destination (Join-Path $appDir "package.json") -Force
if (Test-Path "public") {
    Copy-Item -Path "public" -Destination (Join-Path $appDir "public") -Recurse -Force
}

$exePath = Join-Path $installDir "WixFox Studio.exe"
Write-Host "Target executable: $exePath"

Copy-Item -Path "public\icon.ico" -Destination (Join-Path $installDir "icon.ico") -Force
Copy-Item -Path "public\icon.png" -Destination (Join-Path $installDir "icon.png") -Force
$iconPath = Join-Path $installDir "icon.ico"

$wsh = New-Object -ComObject WScript.Shell

# 1. Desktop Shortcut
$desktopPath = [System.Environment]::GetFolderPath([System.Environment+SpecialFolder]::Desktop)
$desktopLnk = Join-Path $desktopPath "WixFox Studio.lnk"
$sc1 = $wsh.CreateShortcut($desktopLnk)
$sc1.TargetPath = $exePath
$sc1.WorkingDirectory = $installDir
$sc1.Description = "WixFox Studio - Agency ERP, Projects & Invoicing"
$sc1.IconLocation = "$iconPath,0"
$sc1.Save()
Write-Host "Desktop shortcut created at: $desktopLnk with Fox icon"

# 2. Start Menu Shortcut
$startMenuPath = [System.Environment]::GetFolderPath([System.Environment+SpecialFolder]::Programs)
$startMenuLnk = Join-Path $startMenuPath "WixFox Studio.lnk"
$sc2 = $wsh.CreateShortcut($startMenuLnk)
$sc2.TargetPath = $exePath
$sc2.WorkingDirectory = $installDir
$sc2.Description = "WixFox Studio"
$sc2.IconLocation = "$iconPath,0"
$sc2.Save()
Write-Host "Start Menu shortcut created at: $startMenuLnk with Fox icon"

# 3. Project Root Shortcut
$projectLnk = Join-Path (Get-Location) "WixFox Studio.lnk"
$sc3 = $wsh.CreateShortcut($projectLnk)
$sc3.TargetPath = $exePath
$sc3.WorkingDirectory = $installDir
$sc3.Description = "WixFox Studio"
$sc3.IconLocation = "$iconPath,0"
$sc3.Save()
Write-Host "Project shortcut created at: $projectLnk with Fox icon"

# Refresh Windows Shell Icon Cache
try {
    $code = @'
    [System.Runtime.InteropServices.DllImport("shell32.dll")]
    public static extern void SHChangeNotify(int wEventId, int uFlags, int dwItem1, int dwItem2);
'@
    $type = Add-Type -MemberDefinition $code -Name "ShellChangeNotifier" -Namespace "Win32" -PassThru
    $type::SHChangeNotify(0x08000000, 0, 0, 0) # SHCNE_ASSOCCHANGED
} catch {
    # Ignore if already declared
}

Write-Host "INSTALLATION COMPLETED SUCCESSFULLY!"
