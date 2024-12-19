<?php
namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}
