<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
import { ref, onMounted } from 'vue';
import axios from 'axios';

const moodEntries = ref([]);
const isLoading = ref(true);
const errorMessage = ref(null);

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

        const response = await axios.get('/api/mood-entries', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        console.log('Mood Entries Response:', response);
        if (response.status === 200) {
            moodEntries.value = response.data;
        } else {
            errorMessage.value = 'Failed to fetch mood entries. Server responded with an error.';
        }
    } catch (error) {
        errorMessage.value = 'An error occurred while fetching mood entries.';
        console.error('Error details:', error.response || error);
    } finally {
        isLoading.value = false;
    }
};


// Fetch mood entries when the component is mounted
onMounted(fetchMoodEntries);
</script>

<template>
    <Head title="Mood Entries" />

    <AuthenticatedLayout>
        <div class="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h2 class="text-2xl font-bold text-gray-700 text-center mb-6">Mood Entries</h2>

            <!-- Loading State -->
            <div v-if="isLoading" class="text-center text-gray-500">
                Loading mood entries...
            </div>

            <!-- Error Message -->
            <div v-if="errorMessage" class="p-4 mb-4 text-red-800 bg-red-100 rounded-lg">
                {{ errorMessage }}
            </div>

            <!-- Mood Entries -->
            <div v-else>
                <div v-if="moodEntries.length === 0" class="text-center text-gray-500">
                    No mood entries available.
                </div>

                <ul v-else class="space-y-4">
                    <li v-for="entry in moodEntries" :key="entry.id" class="p-4 border rounded-lg shadow-sm">
                        <h3 class="text-lg font-bold">{{ entry.mood_description }}</h3>
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
        </div>
    </AuthenticatedLayout>
</template>