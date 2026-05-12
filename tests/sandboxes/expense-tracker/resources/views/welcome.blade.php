<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Nexus URL Shortener</title>
        <script src="https://cdn.tailwindcss.com"></script>
        @livewireStyles
    </head>
    <body class="antialiased bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center p-6">
        
        <div class="w-full">
            <livewire:url-shortener />
        </div>

        @livewireScripts
    </body>
</html>
