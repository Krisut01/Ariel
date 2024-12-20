<?php

namespace App\Http\Controllers;

use App\Models\MoodEntry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Carbon\Carbon;

class MoodAnalyticsController extends Controller
{
    public function getWeeklyMoods()
    {
        $weeklyMoods = MoodEntry::where('user_id', auth()->id())
            ->whereBetween('created_at', [
                Carbon::now()->subWeek(),
                Carbon::now()
            ])
            ->select('mood_intensity', 'sleep_quality', 'created_at')
            ->orderBy('created_at')
            ->get()
            ->map(function ($entry) {
                return [
                    'intensity' => $entry->mood_intensity,
                    'sleep_quality' => $entry->sleep_quality,
                    'time' => $entry->created_at->format('H:i'),
                    'date' => $entry->created_at->format('Y-m-d'),
                ];
            });

        return response()->json([
            'moods' => $weeklyMoods,
            'analytics' => [
                'average' => $weeklyMoods->avg('intensity'),
                'trend' => $this->calculateTrend($weeklyMoods),
                'patterns' => $this->analyzeTimePatterns($weeklyMoods),
                'sleep_correlation' => $this->calculateSleepCorrelation($weeklyMoods),
            ]
        ]);
    }

    public function getCurrentWeather()
    {
        // You can integrate with a weather API service
        // This is a mock response for now
        return response()->json([
            'condition' => 'Moderate',
            'temperature' => 22,
            'description' => 'Partly Cloudy',
            'impact_level' => 'Neutral'
        ]);
    }

    private function calculateTrend($moods)
    {
        if ($moods->count() < 2) {
            return 'insufficient_data';
        }

        $first = $moods->first()['intensity'];
        $last = $moods->last()['intensity'];
        
        return [
            'direction' => $last - $first,
            'percentage' => $moods->count() > 0 
                ? (($last - $first) / $first) * 100 
                : 0
        ];
    }

    private function analyzeTimePatterns($moods)
    {
        $timeGroups = $moods->groupBy(function ($entry) {
            return Carbon::parse($entry['time'])->format('H');
        });

        $averages = $timeGroups->map(function ($group) {
            return round($group->avg('intensity'), 2);
        });

        return [
            'best_time' => $averages->sortDesc()->keys()->first(),
            'hourly_averages' => $averages
        ];
    }

    private function calculateSleepCorrelation($moods)
    {
        if ($moods->count() < 3) {
            return null;
        }

        $sleepQuality = $moods->pluck('sleep_quality')->toArray();
        $moodIntensity = $moods->pluck('intensity')->toArray();

        // Simple correlation calculation
        $correlation = $this->calculateCorrelationCoefficient($sleepQuality, $moodIntensity);

        return [
            'coefficient' => $correlation,
            'impact_level' => $this->getImpactLevel($correlation)
        ];
    }

    private function calculateCorrelationCoefficient($x, $y)
    {
        $x_mean = array_sum($x) / count($x);
        $y_mean = array_sum($y) / count($y);

        $x_deviation = array_map(function($x_i) use ($x_mean) {
            return $x_i - $x_mean;
        }, $x);

        $y_deviation = array_map(function($y_i) use ($y_mean) {
            return $y_i - $y_mean;
        }, $y);

        $xy_deviation = array_map(function($x_i, $y_i) {
            return $x_i * $y_i;
        }, $x_deviation, $y_deviation);

        $x_squared = array_map(function($x_i) {
            return $x_i * $x_i;
        }, $x_deviation);

        $y_squared = array_map(function($y_i) {
            return $y_i * $y_i;
        }, $y_deviation);

        $numerator = array_sum($xy_deviation);
        $denominator = sqrt(array_sum($x_squared) * array_sum($y_squared));

        return $denominator != 0 ? $numerator / $denominator : 0;
    }

    private function getImpactLevel($correlation)
    {
        $correlation = abs($correlation);
        if ($correlation >= 0.7) return 'High';
        if ($correlation >= 0.4) return 'Moderate';
        return 'Low';
    }
} 