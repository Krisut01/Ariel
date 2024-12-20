<template>
    <Head title="Mood Entries" />

    <AuthenticatedLayout>
        <div class="min-h-screen bg-gradient-to-br from-violet-50 to-blue-50 py-8">
            <!-- Header Card -->
            <div class="bg-white shadow-xl rounded-xl overflow-hidden border-t-4 border-indigo-500 mb-8">
                <div class="p-8">
                    <div class="flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <h2 class="text-3xl font-bold text-gray-800">Your Mood Journey</h2>
                    </div>
                    <p class="text-center text-lg text-gray-600">Track your emotional well-being and discover insights about yourself</p>
                </div>
            </div>

            <!-- Loading State -->
            <div v-if="isLoading" class="bg-white shadow-xl rounded-xl p-8 text-center">
                <svg class="animate-spin h-8 w-8 text-indigo-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p class="text-gray-600">Loading your mood journey...</p>
            </div>

            <!-- Error Message -->
            <div v-if="errorMessage" class="bg-white shadow-xl rounded-xl p-6 mb-8">
                <div class="flex items-center p-4 text-red-800 bg-red-50 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {{ errorMessage }}
                </div>
            </div>

            <!-- Main Content -->
            <div v-else class="grid gap-8">
                <!-- Mood Entries -->
                <div class="bg-white shadow-xl rounded-xl overflow-hidden">
                    <div class="p-6">
                        <div class="flex items-center justify-between mb-6">
                            <div class="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                <h3 class="text-xl font-semibold text-gray-800">Your Mood Entries</h3>
                            </div>
                        </div>

                        <div v-if="moodEntries.length === 0" class="text-center py-8">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <p class="text-gray-500">No mood entries yet. Start tracking your mood to see your journey!</p>
                        </div>

                        <transition-group name="fade" tag="div" class="grid gap-6">
                            <div v-for="entry in moodEntries" :key="entry.id" 
                                 class="p-6 rounded-lg border border-gray-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all duration-200">
                                <div class="flex justify-between items-start mb-4">
                                    <h4 class="text-xl font-semibold text-indigo-600">{{ entry.mood_description }}</h4>
                                    <span class="text-sm text-gray-500">{{ new Date(entry.created_at).toLocaleString() }}</span>
                                </div>
                                <div class="grid md:grid-cols-2 gap-4">
                                    <div class="space-y-2">
                                        <div class="flex items-center">
                                            <div class="w-32 text-gray-600 font-medium">Intensity:</div>
                                            <div class="flex-1">
                                                <div class="h-2 bg-gray-200 rounded">
                                                    <div class="h-full bg-indigo-500 rounded" 
                                                         :style="{ width: `${entry.mood_intensity * 10}%` }"></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="flex items-center">
                                            <div class="w-32 text-gray-600 font-medium">Sleep Quality:</div>
                                            <div class="flex">
                                                <template v-for="n in 4" :key="n">
                                                    <svg xmlns="http://www.w3.org/2000/svg" 
                                                         :class="['w-5 h-5', n <= entry.sleep_quality ? 'text-yellow-400' : 'text-gray-300']"
                                                         fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                                    </svg>
                                                </template>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-2">
                                        <p><span class="font-medium text-gray-600">Emotional State:</span> {{ entry.emotional_state }}</p>
                                        <p><span class="font-medium text-gray-600">Goal:</span> {{ entry.goal_description }}</p>
                                    </div>
                                </div>

                                <div class="mt-4 pt-4 border-t border-gray-100">
                                    <details class="group">
                                        <summary class="flex items-center cursor-pointer text-gray-600 hover:text-indigo-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" 
                                                 class="h-5 w-5 mr-2 transition-transform group-open:rotate-90" 
                                                 fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                            </svg>
                                            Personalized Insights & Suggestions
                                        </summary>
                                        <div class="mt-4 pl-7 space-y-3">
                                            <div class="bg-indigo-50 p-4 rounded-lg">
                                                <h4 class="font-semibold text-indigo-700 mb-2">Based on your mood entry:</h4>
                                                <ul class="space-y-2">
                                                    <li v-for="(suggestion, index) in entry.suggestions" 
                                                        :key="index"
                                                        class="flex items-start">
                                                        <svg xmlns="http://www.w3.org/2000/svg" 
                                                             class="h-5 w-5 mr-2 text-indigo-500 mt-0.5" 
                                                             fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" 
                                                                  stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                        </svg>
                                                        <span class="text-gray-700">{{ suggestion }}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </details>
                                </div>
                            </div>
                        </transition-group>
                    </div>
                </div>

                <!-- Mood Entry Form -->
                
            </div>
        </div>
    </AuthenticatedLayout>
</template>

<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
import { ref, computed, onMounted } from 'vue';

// Refs for state management
const moodEntries = ref([]);
const isLoading = ref(true);
const errorMessage = ref('');
const searchQuery = ref('');
const emotionFilter = ref('');
const dateFilter = ref('all');

// Available emotions for filter
const emotions = [
    'happy',
    'sad',
    'anxious',
    'excited',
    'calm',
    'angry',
    'frustrated'
];

// Computed stats
const stats = computed(() => {
    const entries = moodEntries.value;
    if (!entries.length) return {
        totalEntries: 0,
        averageMood: 0,
        topEmotion: 'N/A',
        averageSleep: 0
    };

    // Calculate statistics
    const emotionCounts = {};
    let totalMood = 0;
    let totalSleep = 0;

    entries.forEach(entry => {
        totalMood += entry.mood_intensity;
        totalSleep += entry.sleep_quality;
        emotionCounts[entry.emotional_state] = (emotionCounts[entry.emotional_state] || 0) + 1;
    });

    const topEmotion = Object.entries(emotionCounts)
        .sort(([,a], [,b]) => b - a)[0][0];

    return {
        totalEntries: entries.length,
        averageMood: totalMood / entries.length,
        topEmotion: topEmotion.charAt(0).toUpperCase() + topEmotion.slice(1),
        averageSleep: totalSleep / entries.length
    };
});

// Computed filtered entries
const filteredEntries = computed(() => {
    return moodEntries.value
        .filter(entry => {
            // Search query filter
            if (searchQuery.value && !entry.mood_description.toLowerCase().includes(searchQuery.value.toLowerCase())) {
                return false;
            }
            
            // Emotion filter
            if (emotionFilter.value && entry.emotional_state !== emotionFilter.value) {
                return false;
            }
            
            // Date filter
            if (dateFilter.value !== 'all') {
                const entryDate = new Date(entry.created_at);
                const today = new Date();
                
                switch (dateFilter.value) {
                    case 'today':
                        return isSameDay(entryDate, today);
                    case 'week':
                        return isThisWeek(entryDate);
                    case 'month':
                        return isSameMonth(entryDate, today);
                }
            }
            
            return true;
        })
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
});

// Computed message for no entries
const noEntriesMessage = computed(() => {
    if (searchQuery.value || emotionFilter.value || dateFilter.value !== 'all') {
        return 'No entries match your filters. Try adjusting your search criteria.';
    }
    return 'No mood entries yet. Start tracking your mood to see your journey!';
});

// Helper functions
const isSameDay = (date1, date2) => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
};

const isThisWeek = (date) => {
    const today = new Date();
    const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
    const weekEnd = new Date(today.setDate(today.getDate() - today.getDay() + 6));
    return date >= weekStart && date <= weekEnd;
};

const isSameMonth = (date1, date2) => {
    return date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
};

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) return `${interval} years ago`;
    
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return `${interval} months ago`;
    
    interval = Math.floor(seconds / 86400);
    if (interval > 1) return `${interval} days ago`;
    
    interval = Math.floor(seconds / 3600);
    if (interval > 1) return `${interval} hours ago`;
    
    interval = Math.floor(seconds / 60);
    if (interval > 1) return `${interval} minutes ago`;
    
    return 'just now';
};

const getEmotionEmoji = (emotion) => {
    const emojis = {
        happy: '😊',
        sad: '😢',
        anxious: '😰',
        excited: '🤩',
        calm: '😌',
        angry: '😠',
        frustrated: '😤'
    };
    return emojis[emotion] || '😐';
};

// Generate suggestions based on mood entry
const generateSuggestions = (entry) => {
    const suggestions = [];
    
    // Emotional state based suggestions
    const emotionalStateSuggestions = {
        'anxious': [
            'Try deep breathing exercises (4-7-8 breathing technique)',
            'Consider mindfulness meditation',
            'Take a walk in nature to clear your mind',
        ],
        'sad': [
            'Reach out to a friend or family member',
            'Practice self-compassion exercises',
            'Consider journaling your feelings',
            'Engage in a hobby you enjoy',
        ],
        // ... (rest of your existing suggestions)
    };

    // Add suggestions based on entry data
    if (entry.emotional_state && emotionalStateSuggestions[entry.emotional_state]) {
        suggestions.push(...emotionalStateSuggestions[entry.emotional_state]);
    }

    // Add more contextual suggestions based on other entry data
    if (entry.sleep_quality <= 2) {
        suggestions.push(
            'Consider establishing a regular sleep schedule',
            'Create a calming bedtime routine',
            'Limit screen time before bed'
        );
    }

    return suggestions;
};

// Fetch mood entries
const fetchMoodEntries = async () => {
    try {
        const response = await fetch('/api/mood-entries');
        if (!response.ok) throw new Error('Failed to fetch entries');
        const data = await response.json();
        moodEntries.value = data.map(entry => ({
            ...entry,
            suggestions: generateSuggestions(entry)
        }));
    } catch (error) {
        errorMessage.value = 'Failed to load mood entries. Please try again later.';
        console.error('Error:', error);
    } finally {
        isLoading.value = false;
    }
};

onMounted(() => {
    fetchMoodEntries();
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(30px);
}

details summary::-webkit-details-marker {
    display: none;
}

.group-open\:rotate-90 {
    transform: rotate(90deg);
}
</style>
