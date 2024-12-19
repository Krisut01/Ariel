<?php

// app/Http/Controllers/MoodEntryController.php

// app/Http/Controllers/MoodEntryController.php

namespace App\Http\Controllers;

use App\Models\MoodEntry;  // Make sure to import the model
use Illuminate\Http\Request;

class MoodEntryController extends Controller
{
    // Store the mood entry
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

    // Add the authenticated user's ID to the data before creating the MoodEntry
    $validated['user_id'] = auth()->id();

    // Save the data to the database
    MoodEntry::create($validated);

    // Return a success message as JSON response for API usage
    return response()->json(['message' => 'Mood entry saved successfully'], 200);
}

    // Fetch mood entries for the authenticated user
   // app/Http/Controllers/MoodEntryController.php

public function index()
{
    try {
        // Log the user ID to confirm authentication
        \Log::info('Authenticated User ID: ' . auth()->id());

        // Fetch mood entries for the authenticated user
        $moodEntries = auth()->user()->moodEntries()->orderBy('created_at', 'desc')->get();
        
        return response()->json($moodEntries, 200);
    } catch (\Exception $e) {
        // Log the exception for debugging
        \Log::error('Error fetching mood entries: ' . $e->getMessage());
        
        return response()->json(['error' => 'Failed to fetch mood entries'], 500);
    }
}

}
