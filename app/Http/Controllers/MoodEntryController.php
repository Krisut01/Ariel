<?php

// app/Http/Controllers/MoodEntryController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MoodEntryController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'mood_description' => 'required|string|max:255',
            'mood_intensity' => 'required|integer|min:1|max:10',
            'emotional_state' => 'required|string|max:50',
            'trigger_description' => 'nullable|string',
            'sleep_quality' => 'required|integer|min:1|max:4',
            'activities_description' => 'nullable|string',
            'gratitude_entry' => 'nullable|string',
            'goal_description' => 'nullable|string',
        ]);

        // Save the data to the database
        \App\Models\MoodEntry::create($validated);

        // Redirect back with a success message
        return redirect()->back()->with('success', 'Mood entry saved successfully.');
    }
}

