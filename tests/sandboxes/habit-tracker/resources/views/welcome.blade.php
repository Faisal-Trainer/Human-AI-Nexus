<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Nexus HabitTracker</title>
        @vite(['resources/css/app.css', 'resources/js/app.js'])
        @livewireStyles
    </head>
    <body class="antialiased bg-slate-50 dark:bg-slate-950 min-h-screen flex items-center justify-center p-6 font-sans">
        <div class="w-full">
            <livewire:habit-tracker />
        </div>
        @livewireScripts
    </body>
</html>
        