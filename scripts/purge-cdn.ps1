$repoRoot = "E:\Escritorio\Trabajo\ApiExercise"
$baseUrl = "https://purge.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.2.0"

$thumbs = Get-ChildItem -Path $repoRoot -Recurse -Filter "*.thumb.webp" | ForEach-Object {
    $_.FullName.Substring($repoRoot.Length + 1).Replace('\', '/')
}

$total = $thumbs.Count
Write-Host "Total thumbs to purge: $total"
Write-Host "Using async HTTP client with 50 concurrent requests..."

# Use .NET HttpClient for true async parallelism
Add-Type -AssemblyName System.Net.Http
$client = [System.Net.Http.HttpClient]::new()
$client.Timeout = [TimeSpan]::FromSeconds(15)

$batchSize = 50
$success = 0
$failed = 0

for ($i = 0; $i -lt $total; $i += $batchSize) {
    $end = [Math]::Min($i + $batchSize - 1, $total - 1)
    $batch = $thumbs[$i..$end]

    $tasks = $batch | ForEach-Object {
        $url = "$baseUrl/$_"
        $client.GetAsync($url)
    }

    try {
        [System.Threading.Tasks.Task]::WaitAll($tasks)
    } catch {}

    foreach ($task in $tasks) {
        if ($task.Status -eq 'RanToCompletion' -and $task.Result.IsSuccessStatusCode) {
            $success++
        } else {
            $failed++
        }
        if ($task.Result) { $task.Result.Dispose() }
        $task.Dispose()
    }

    $done = $i + $batch.Count
    $pct = [Math]::Round(($done / $total) * 100, 1)
    Write-Host "[$pct%] $done/$total | OK: $success | Failed: $failed"
}

$client.Dispose()
Write-Host "`n=== PURGE COMPLETE ==="
Write-Host "Total: $total | Success: $success | Failed: $failed"
