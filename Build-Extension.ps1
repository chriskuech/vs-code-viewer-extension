Param(
    $BuildContainer = "./dist",
    $NpmBinPath = "./node_modules/.bin",
    $PackageName = "vs-code-viewer-extension"
)

$ErrorActionPreference = "Stop"

$env:PATH = $NpmBinPath + [IO.Path]::PathSeparator + $env:PATH

# Clean
Get-ChildItem "$BuildContainer/*" | Remove-Item -Recurse

# Build
webpack
Copy-Item -Path "src/*" -Exclude "*.ts" -Destination $BuildContainer -Recurse

# Package
Compress-Archive -Path "$BuildContainer/*" -DestinationPath "$PackageName.zip" -Force
