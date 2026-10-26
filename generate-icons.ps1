Add-Type -AssemblyName System.Drawing

$projectRoot = "C:\Users\akash\Desktop\wixfox\projects\wixfox invoice"
$base512 = Join-Path $projectRoot "public\icon-512.png"

if (!(Test-Path $base512)) {
    throw "Base icon $base512 does not exist"
}
Write-Host "Using base icon: $((Get-Item $base512).Length) bytes"

function Resize-Image($srcPath, $destPath, $width, $height) {
    $srcImg = [System.Drawing.Image]::FromFile($srcPath)
    $destBitmap = New-Object System.Drawing.Bitmap($width, $height)
    $graphics = [System.Drawing.Graphics]::FromImage($destBitmap)
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $graphics.DrawImage($srcImg, 0, 0, $width, $height)
    $destBitmap.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $graphics.Dispose()
    $destBitmap.Dispose()
    $srcImg.Dispose()
}

# 1. Generate icon.png (256x256 and 512x512)
$iconPng = Join-Path $projectRoot "public\icon.png"
Resize-Image $base512 $iconPng 256 256
Copy-Item $base512 (Join-Path $projectRoot "public\wixfox-fox-logo.png") -Force

# 2. Generate multi-resolution ICO for Windows
$iconIco = Join-Path $projectRoot "public\icon.ico"
$sizes = @(16, 32, 48, 64, 128, 256)
$pngStreams = [System.Collections.Generic.List[byte[]]]::new()

foreach ($sz in $sizes) {
    $srcImg = [System.Drawing.Image]::FromFile($base512)
    $bmp = New-Object System.Drawing.Bitmap($sz, $sz)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.DrawImage($srcImg, 0, 0, $sz, $sz)
    $ms = New-Object System.IO.MemoryStream
    $bmp.Save($ms, [System.Drawing.Imaging.ImageFormat]::Png)
    $pngStreams.Add($ms.ToArray())
    $ms.Dispose()
    $g.Dispose()
    $bmp.Dispose()
    $srcImg.Dispose()
}

# Construct ICO binary with PNG frames
$fs = [System.IO.File]::Create($iconIco)
$bw = New-Object System.IO.BinaryWriter($fs)
# ICONDIR header
$bw.Write([uint16]0) # Reserved
$bw.Write([uint16]1) # Type (1=ICO)
$bw.Write([uint16]$sizes.Count) # Image count

$offset = 6 + ($sizes.Count * 16)
for ($i = 0; $i -lt $sizes.Count; $i++) {
    $sz = $sizes[$i]
    $data = $pngStreams[$i]
    $bWidth = if ($sz -eq 256) { 0 } else { [byte]$sz }
    $bHeight = if ($sz -eq 256) { 0 } else { [byte]$sz }
    $bw.Write([byte]$bWidth)
    $bw.Write([byte]$bHeight)
    $bw.Write([byte]0) # Color palette count
    $bw.Write([byte]0) # Reserved
    $bw.Write([uint16]1) # Color planes
    $bw.Write([uint16]32) # Bits per pixel
    $bw.Write([uint32]$data.Length) # Image bytes
    $bw.Write([uint32]$offset) # Offset
    $offset += $data.Length
}

for ($i = 0; $i -lt $sizes.Count; $i++) {
    $bw.Write($pngStreams[$i])
}
$bw.Close()
$fs.Close()
Write-Host "Created multi-size icon.ico ($((Get-Item $iconIco).Length) bytes)"

# 3. Android Mipmap Icons
$androidRes = Join-Path $projectRoot "android\app\src\main\res"
$mipmapConfigs = @(
    @{ folder="mipmap-mdpi"; launcher=48; foreground=108 },
    @{ folder="mipmap-hdpi"; launcher=72; foreground=162 },
    @{ folder="mipmap-xhdpi"; launcher=96; foreground=216 },
    @{ folder="mipmap-xxhdpi"; launcher=144; foreground=324 },
    @{ folder="mipmap-xxxhdpi"; launcher=192; foreground=432 }
)

foreach ($cfg in $mipmapConfigs) {
    $dir = Join-Path $androidRes $cfg.folder
    if (!(Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }
    
    $launcher = Join-Path $dir "ic_launcher.png"
    $round = Join-Path $dir "ic_launcher_round.png"
    $fg = Join-Path $dir "ic_launcher_foreground.png"
    
    Resize-Image $base512 $launcher $cfg.launcher $cfg.launcher
    Resize-Image $base512 $round $cfg.launcher $cfg.launcher
    Resize-Image $base512 $fg $cfg.foreground $cfg.foreground
    Write-Host "Updated $($cfg.folder) icons ($($cfg.launcher)x$($cfg.launcher))"
}

# 4. Android Splash Screens
Get-ChildItem -Path $androidRes -Recurse -Filter "splash.png" | ForEach-Object {
    Copy-Item $base512 $_.FullName -Force
    Write-Host "Updated splash: $($_.FullName)"
}

Write-Host "All icons and splash screens generated successfully!"
