<?php

namespace App\Http\Controllers;

use App\Models\MoodEntry;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MoodAnalyticsController extends Controller
{
    public function index()
    {
        $entries = MoodEntry::where('user_id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('MoodEntries', [
            'initialEntries' => $entries
        ]);
    }
}