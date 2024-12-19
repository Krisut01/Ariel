<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
import { ref, onMounted } from 'vue';
import axios from 'axios';

const moodEntries = ref([]);
const isLoading = ref(true);
const errorMessage = ref(null);
const triggers = ref([]);
const userBaseline = ref({
  emotionalState: 'Neutral', // Default baseline
  sleepQuality: 5, // Default baseline (1-5)
});
const user = ref({
  name: 'User', // Default, replace with actual user name from backend
  email: 'user@example.com', // Default, replace with actual email from backend
});

const fetchMoodEntries = async () => {
    isLoading.value = true;
    errorMessage.value = null;

    try {
        const token = localStorage.getItem('token');
        if (!token) {
            errorMessage.value = 'Authentication token missing';
            isLoading.value = false;
            return;
        }

        // Fetch mood entries for the logged-in user
        const response = await axios.get('/api/mood-entries', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            moodEntries.value = response.data;
            moodEntries.value.forEach(entry => triggerBasedOnState(entry));
        } else {
            errorMessage.value = 'Failed to fetch mood entries.';
        }
    } catch (error) {
        errorMessage.value = 'An error occurred while fetching mood entries.';
    } finally {
        isLoading.value = false;
    }
};

// Function to define triggers based on emotional state, sleep quality, and baseline data
const triggerBasedOnState = (entry) => {
    const { emotional_state, sleep_quality } = entry;
    let suggestion = '';

    // Compare with user baseline
    const emotionalStateDeviation = getEmotionalStateDeviation(emotional_state);
    const sleepQualityDeviation = getSleepQualityDeviation(sleep_quality);

    // Trigger suggestions based on emotional state and sleep quality
    if (emotional_state === 'Stressed' || emotional_state === 'Anxious') {
        if (sleep_quality <= 3) {
            suggestion = 'You are stressed and have poor sleep. Consider deep breathing, meditation, or seeking professional help.';
        } else {
            suggestion = 'You are stressed but have good sleep. Try stress management techniques like journaling or taking breaks.';
        }
    }

    if (emotional_state === 'Happy' || emotional_state === 'Content') {
        if (sleep_quality >= 4) {
            suggestion = 'You are happy and have had good sleep! Keep up the great work and continue your positive habits!';
        } else {
            suggestion = 'You are feeling happy, but sleep quality could improve. Consider reducing screen time before bed.';
        }
    }

    if (sleep_quality <= 2) {
        suggestion = suggestion || 'Your sleep quality is poor. Try improving your sleep hygiene by limiting screen time or reducing caffeine.';
    } else if (sleep_quality >= 4) {
        suggestion = suggestion || 'Your sleep quality is great. Keep up the good work and maintain your sleep habits!';
    }

    // Add baseline deviation alerts
    if (emotionalStateDeviation > 2) {
        suggestion = suggestion || `Your emotional state has significantly deviated from your baseline. It might be helpful to talk to someone or consider relaxation techniques.`;
    }

    if (sleepQualityDeviation > 2) {
        suggestion = suggestion || `Your sleep quality has significantly dropped compared to your baseline. Consider improving your sleep hygiene or speaking to a professional.`;
    }

    // Final suggestion
    if (suggestion) {
        triggers.value.push(suggestion);
    }
};

// Helper function to calculate emotional state deviation from baseline
const getEmotionalStateDeviation = (currentState) => {
    const emotionalStates = ['Neutral', 'Happy', 'Content', 'Stressed', 'Anxious'];
    const baselineIndex = emotionalStates.indexOf(userBaseline.value.emotionalState);
    const currentStateIndex = emotionalStates.indexOf(currentState);

    return Math.abs(baselineIndex - currentStateIndex);
};

// Helper function to calculate sleep quality deviation from baseline
const getSleepQualityDeviation = (currentQuality) => {
    return Math.abs(userBaseline.value.sleepQuality - currentQuality);
};

// Fetch mood entries when the component is mounted
onMounted(fetchMoodEntries);
</script>

<template>
    <Head title="Mood Entries" />

    <AuthenticatedLayout>
        <div class="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <!-- User Greeting Section -->
            <div class="text-center mb-6">
                <h2 class="text-2xl font-bold text-gray-700">Hello, @{{ user.name }}</h2>
                <p class="text-lg text-gray-500">Here is your mood analytics and suggestions:</p>
            </div>

            <!-- Loading State -->
            <div v-if="isLoading" class="text-center text-gray-500">
                Loading your mood entries...
            </div>

            <!-- Error Message -->
            <div v-if="errorMessage" class="p-4 mb-4 text-red-800 bg-red-100 rounded-lg">
                {{ errorMessage }}
            </div>

            <!-- Analytics Section -->
            <div v-else>
                <h3 class="text-xl font-semibold mb-4">Your Analytics</h3>
                
                <div v-if="moodEntries.length === 0" class="text-center text-gray-500">
                    No mood entries available.
                </div>

                <div v-else class="space-y-4">
                    <!-- Display Mood Entries -->
                    <ul>
                        <li v-for="entry in moodEntries" :key="entry.id" class="p-4 border rounded-lg shadow-sm">
                            <h4 class="text-lg font-bold">{{ entry.mood_description }}</h4>
                            <p><strong>Intensity:</strong> {{ entry.mood_intensity }}</p>
                            <p><strong>Emotional State:</strong> {{ entry.emotional_state }}</p>
                            <p><strong>Trigger:</strong> {{ entry.trigger_description }}</p>
                            <p><strong>Sleep Quality:</strong> {{ entry.sleep_quality }}</p>
                            <p><strong>Activities:</strong> {{ entry.activities_description }}</p>
                            <p><strong>Gratitude:</strong> {{ entry.gratitude_entry }}</p>
                            <p><strong>Goal:</strong> {{ entry.goal_description }}</p>
                            <p class="text-sm text-gray-500"><em>Submitted on {{ new Date(entry.created_at).toLocaleString() }}</em></p>
                        </li>
                    </ul>
                </div>

                <!-- Display Trigger Suggestions -->
                <div v-if="triggers.length > 0" class="mt-6 p-4 mb-4 text-blue-800 bg-blue-100 rounded-lg">
                    <h4 class="font-semibold">Suggestions & Alerts</h4>
                    <ul>
                        <li v-for="(trigger, index) in triggers" :key="index">{{ trigger }}</li>
                    </ul>
                </div>

                <!-- Personalized Advice Section -->
                <div class="mt-6 p-4 mb-4 text-green-800 bg-green-100 rounded-lg">
                    <h4 class="font-semibold">What to Do and What to Avoid</h4>
                    <p><strong>What to Do:</strong> Try practicing deep breathing exercises, journaling, and taking regular breaks to manage stress. Continue with positive habits like gratitude journaling.</p>
                    <p><strong>What to Avoid:</strong> Avoid excessive screen time before bed, caffeine late in the day, and overexerting yourself without taking rest breaks.</p>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
