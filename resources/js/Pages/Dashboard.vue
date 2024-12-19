<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
import { ref } from 'vue';
import { Inertia } from '@inertiajs/inertia';

const moodDescription = ref('');
const moodIntensity = ref(1);
const emotionalState = ref('');
const triggerDescription = ref('');
const sleepQuality = ref(1);
const activitiesDescription = ref('');
const gratitudeEntry = ref('');
const goalDescription = ref('');
const successMessage = ref(null); // To show success feedback
const errorMessage = ref(null); // To show error feedback

const submitForm = () => {
    // Clear previous messages
    successMessage.value = null;
    errorMessage.value = null;

    // Make the post request
    Inertia.post(
        '/mood-entry',
        {
            mood_description: moodDescription.value,
            mood_intensity: moodIntensity.value,
            emotional_state: emotionalState.value,
            trigger_description: triggerDescription.value,
            sleep_quality: sleepQuality.value,
            activities_description: activitiesDescription.value,
            gratitude_entry: gratitudeEntry.value,
            goal_description: goalDescription.value
        },
        {
            onSuccess: () => {
                successMessage.value = 'Mood entry successfully submitted!';
                clearForm();
            },
            onError: (errors) => {
                errorMessage.value = 'There was an error submitting your mood entry.';
                console.error(errors); // Optional: Log errors for debugging
            }
        }
    );
};

// Helper function to reset form fields
const clearForm = () => {
    moodDescription.value = '';
    moodIntensity.value = 1;
    emotionalState.value = '';
    triggerDescription.value = '';
    sleepQuality.value = 1;
    activitiesDescription.value = '';
    gratitudeEntry.value = '';
    goalDescription.value = '';
};
</script>
<template>
    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <div class="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-lg">
            <h2 class="text-2xl font-bold text-center text-gray-700 mb-6">Mood Tracking Form</h2>

            <!-- Success Message -->
            <div v-if="successMessage" class="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg">
                {{ successMessage }}
            </div>

            <!-- Error Message -->
            <div v-if="errorMessage" class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
                {{ errorMessage }}
            </div>

            <form @submit.prevent="submitForm" class="space-y-6">
                <div class="form-group">
                    <label class="block text-sm font-medium text-gray-700">How are you feeling today?</label>
                    <input v-model="moodDescription" type="text" class="mt-2 block w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600" placeholder="Describe your mood">
                </div>

                <div class="form-group">
                    <label class="block text-sm font-medium text-gray-700">How intense is this feeling? (1-10)</label>
                    <input v-model="moodIntensity" type="number" min="1" max="10" class="mt-2 block w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600">
                </div>

                <div class="form-group">
                    <label class="block text-sm font-medium text-gray-700">What best describes your emotional state?</label>
                    <select v-model="emotionalState" class="mt-2 block w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600">
                        <option value="happy">Happy</option>
                        <option value="sad">Sad</option>
                        <option value="anxious">Anxious</option>
                        <option value="excited">Excited</option>
                        <option value="calm">Calm</option>
                        <option value="angry">Angry</option>
                        <option value="frustrated">Frustrated</option>
                    </select>
                </div>

                <div class="form-group">
                    <label class="block text-sm font-medium text-gray-700">What influenced your mood today?</label>
                    <textarea v-model="triggerDescription" rows="4" class="mt-2 block w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"></textarea>
                </div>

                <div class="form-group">
                    <label class="block text-sm font-medium text-gray-700">How would you rate your sleep quality?</label>
                    <select v-model="sleepQuality" class="mt-2 block w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600">
                        <option value="1">Poor</option>
                        <option value="2">Fair</option>
                        <option value="3">Good</option>
                        <option value="4">Excellent</option>
                    </select>
                </div>

                <div class="form-group">
                    <label class="block text-sm font-medium text-gray-700">What self-care activities did you do today?</label>
                    <textarea v-model="activitiesDescription" rows="4" class="mt-2 block w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"></textarea>
                </div>

                <div class="form-group">
                    <label class="block text-sm font-medium text-gray-700">What are you grateful for today?</label>
                    <textarea v-model="gratitudeEntry" rows="4" class="mt-2 block w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"></textarea>
                </div>

                <div class="form-group">
                    <label class="block text-sm font-medium text-gray-700">What goal would you like to focus on for tomorrow?</label>
                    <textarea v-model="goalDescription" rows="4" class="mt-2 block w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"></textarea>
                </div>

                <div class="text-center">
                    <button type="submit" class="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50 transition-all duration-300">
                        Save Mood Entry
                    </button>
                </div>
            </form>
        </div>
        <div class="text-center mt-6">
    <a
        href="/mood-entries"
        class="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 transition-all duration-300"
    >
        View Mood Entries
    </a>
</div>

    </AuthenticatedLayout>
</template>
