<template>
    <Head title="Mood Analytics" />

    <AuthenticatedLayout>
        <div class="min-h-screen bg-gradient-to-br from-violet-50 to-blue-50 py-8">
            <!-- Header -->
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="bg-white shadow-xl rounded-xl overflow-hidden border-t-4 border-indigo-500 mb-8">
                    <div class="p-8">
                        <h2 class="text-3xl font-bold text-gray-800 text-center">Mood Analytics Dashboard</h2>
                        <p class="text-center text-gray-600 mt-2">Gain insights from your mood tracking journey</p>
                    </div>
                </div>

                <!-- Analytics Summary -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div class="bg-white rounded-xl shadow-lg p-6">
                        <h3 class="text-lg font-semibold text-gray-800">Total Entries</h3>
                        <p class="text-3xl font-bold text-indigo-600">{{ stats.totalEntries }}</p>
                    </div>
                    <div class="bg-white rounded-xl shadow-lg p-6">
                        <h3 class="text-lg font-semibold text-gray-800">Average Mood</h3>
                        <p class="text-3xl font-bold text-indigo-600">{{ stats.averageMood.toFixed(1) }}/10</p>
                    </div>
                    <div class="bg-white rounded-xl shadow-lg p-6">
                        <h3 class="text-lg font-semibold text-gray-800">Most Common Emotion</h3>
                        <p class="text-3xl font-bold text-indigo-600">{{ stats.topEmotion }}</p>
                    </div>
                    <div class="bg-white rounded-xl shadow-lg p-6">
                        <h3 class="text-lg font-semibold text-gray-800">Average Sleep</h3>
                        <p class="text-3xl font-bold text-indigo-600">{{ stats.averageSleep.toFixed(1) }}/4</p>
                    </div>
                </div>

                <!-- Analytics Charts -->
                <MoodAnalyticsCharts 
                    :entries="moodEntries"
                    v-if="!isLoading && moodEntries.length > 0"
                />

                <!-- Loading State -->
                <div v-if="isLoading" class="text-center py-12">
                    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
                    <p class="mt-4 text-gray-600">Loading your analytics...</p>
                </div>

                <!-- No Data State -->
                <div v-if="!isLoading && moodEntries.length === 0" class="text-center py-12">
                    <p class="text-gray-600">No mood entries yet. Start tracking to see your analytics!</p>
                </div>

                <!-- Existing Mood Entries List -->
                <!-- ... your existing mood entries code ... -->
            </div>
        </div>
    </AuthenticatedLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { Head } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import MoodAnalyticsCharts from '@/Components/Analytics/MoodAnalyticsCharts.vue';

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
        'angry': [
            'Practice progressive muscle relaxation',
            'Try physical exercise to release tension',
            'Take time to cool down before making decisions',
        ],
        'happy': [
            'Share your positive energy with others',
            'Document what made you happy today',
            'Build on this momentum for tomorrow',
        ],
        'excited': [
            'Channel your energy into productive tasks',
            'Share your enthusiasm with others',
            'Set new goals while motivated',
        ],
        'calm': [
            'Perfect time for reflection and planning',
            'Practice gratitude meditation',
            'Maintain this balanced state through mindfulness',
        ],
        'frustrated': [
            'Break down problems into smaller tasks',
            'Take short breaks between activities',
            'Practice stress-management techniques',
        ],
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
