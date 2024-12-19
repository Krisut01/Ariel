<?php
// app/Models/MoodEntry.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class MoodEntry extends Model
{
    use HasFactory;

    protected $fillable = [
        'mood_description',
        'mood_intensity',
        'emotional_state',
        'trigger_description',
        'sleep_quality',
        'activities_description',
        'gratitude_entry',
        'goal_description',
    ];

    // Automatically associate the current user on creation
    protected static function booted()
    {
        static::creating(function ($moodEntry) {
            // Ensure the 'user_id' is always set and non-null
            if (!Auth::check()) {
                throw new \Exception('User is not authenticated');
            }
            $moodEntry->user_id = Auth::id();
        });
    }

    // Define the relationship to the user
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
