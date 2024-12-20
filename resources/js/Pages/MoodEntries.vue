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
                                            View Suggestions
                                        </summary>
                                        <div class="mt-4 pl-7 space-y-3">
                                         
                                            
                                            <!-- Advice or Suggestions based on conditions -->
                                            <div v-if="entry.emotional_state === 'Stressed' || entry.emotional_state === 'Angry'">
                                                <p class="text-red-600">Advice: Try some deep breathing exercises or take a break to manage your stress.</p>
                                            </div>
                                            <div v-if="entry.emotional_state === 'Sad'">
                                                <p class="text-blue-600">Advice: Consider talking to a friend or journaling your thoughts to release negative emotions.</p>
                                            </div>
                                            <div v-if="entry.mood_intensity < 5">
                                                <p class="text-green-600">Suggestion: Engaging in light physical activity or meditation can help increase your mood intensity.</p>
                                            </div>
                                            <div v-if="entry.sleep_quality < 3">
                                                <p class="text-orange-600">Suggestion: Focus on improving your sleep hygiene, such as having a consistent sleep schedule and reducing screen time before bed.</p>
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

<script>
export default {
    data() {
        return {
            moodEntries: [],
            moodEntry: {
                mood_description: "",
                emotional_state: "",
                mood_intensity: 5,
                sleep_quality: 5,
                goal_description: "",
                triggers: "",
                self_care_activities: "",
                gratitude_log: ""
            },
            isLoading: false,
            errorMessage: ""
        };
    },
    mounted() {
        this.fetchMoodEntries();
    },
    methods: {
        async fetchMoodEntries() {
            try {
                const response = await fetch('/api/mood-entries');
                if (!response.ok) {
                    throw new Error('Failed to fetch mood entries');
                }
                this.moodEntries = await response.json();
            } catch (error) {
                this.errorMessage = error.message;
            } finally {
                this.isLoading = false;
            }
        }
        
    }
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
