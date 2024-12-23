<template>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
        <!-- Mood Trend Line Graph -->
        <div class="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
            <h3 class="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-800">Mood Trends</h3>
            <div class="relative w-full" style="height: 300px">
                <canvas ref="moodTrendChart"></canvas>
            </div>
        </div>

        <!-- Sleep Quality Correlation -->
        <div class="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
            <h3 class="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-800">Sleep Quality Impact</h3>
            <div class="relative w-full" style="height: 300px">
                <canvas ref="sleepCorrelationChart"></canvas>
            </div>
        </div>

        <!-- Emotional State Distribution -->
        <div class="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
            <h3 class="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-800">Emotional States</h3>
            <div class="relative w-full" style="height: 300px">
                <canvas ref="emotionDistributionChart"></canvas>
            </div>
        </div>

        <!-- Activity Impact Analysis -->
        <div class="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
            <h3 class="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-800">Activity Impact</h3>
            <div class="relative w-full" style="height: 300px">
                <canvas ref="activityImpactChart"></canvas>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import Chart from 'chart.js/auto';

const props = defineProps({
    entries: {
        type: Array,
        required: true
    }
});

const moodTrendChart = ref(null);
const sleepCorrelationChart = ref(null);
const emotionDistributionChart = ref(null);
const activityImpactChart = ref(null);

let charts = {
    moodTrend: null,
    sleepCorrelation: null,
    emotionDistribution: null,
    activityImpact: null
};

// Watch for changes in entries and window resize
watch(() => props.entries, (newEntries) => {
    updateCharts(newEntries);
}, { deep: true });

// Add resize observer for responsive charts
const resizeObserver = new ResizeObserver(() => {
    Object.values(charts).forEach(chart => {
        if (chart) {
            chart.resize();
        }
    });
});

onMounted(() => {
    initializeCharts();
    updateCharts(props.entries);
    
    // Observe size changes on chart containers
    document.querySelectorAll('canvas').forEach(canvas => {
        resizeObserver.observe(canvas.parentElement);
    });
});

const getResponsiveOptions = () => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: window.innerWidth < 768 ? 'bottom' : 'right',
            labels: {
                boxWidth: window.innerWidth < 768 ? 12 : 20,
                padding: window.innerWidth < 768 ? 10 : 20,
                font: {
                    size: window.innerWidth < 768 ? 11 : 12
                }
            }
        }
    },
    scales: {
        x: {
            ticks: {
                maxRotation: window.innerWidth < 768 ? 45 : 0,
                font: {
                    size: window.innerWidth < 768 ? 10 : 12
                }
            }
        },
        y: {
            ticks: {
                font: {
                    size: window.innerWidth < 768 ? 10 : 12
                }
            }
        }
    }
});

const initializeCharts = () => {
    const commonOptions = getResponsiveOptions();

    // Initialize Mood Trend Chart with responsive options
    charts.moodTrend = new Chart(moodTrendChart.value, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Mood Intensity',
                data: [],
                borderColor: '#6366f1',
                tension: 0.4
            }]
        },
        options: {
            ...commonOptions,
            scales: {
                ...commonOptions.scales,
                y: {
                    ...commonOptions.scales.y,
                    beginAtZero: true,
                    max: 10
                }
            }
        }
    });

    // Initialize Sleep Correlation Chart
    charts.sleepCorrelation = new Chart(sleepCorrelationChart.value, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Sleep vs Mood',
                data: [],
                backgroundColor: '#6366f1'
            }]
        },
        options: {
            ...commonOptions,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Sleep Quality'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Mood Intensity'
                    }
                }
            }
        }
    });

    // Initialize Emotion Distribution Chart
    charts.emotionDistribution = new Chart(emotionDistributionChart.value, {
        type: 'doughnut',
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: [
                    '#6366f1',
                    '#8b5cf6',
                    '#d946ef',
                    '#ec4899',
                    '#f43f5e',
                    '#f97316',
                    '#eab308'
                ]
            }]
        },
        options: {
            ...commonOptions,
            plugins: {
                legend: {
                    position: window.innerWidth < 768 ? 'bottom' : 'right',
                    labels: {
                        boxWidth: window.innerWidth < 768 ? 12 : 20,
                        padding: window.innerWidth < 768 ? 10 : 20,
                        font: {
                            size: window.innerWidth < 768 ? 11 : 12
                        }
                    }
                }
            }
        }
    });

    // Initialize Activity Impact Chart
    charts.activityImpact = new Chart(activityImpactChart.value, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Average Mood',
                data: [],
                backgroundColor: '#6366f1'
            }]
        },
        options: {
            ...commonOptions,
            scales: {
                y: {
                    ...commonOptions.scales.y,
                    beginAtZero: true,
                    max: 10
                }
            }
        }
    });
};

// Update the updateCharts function to handle responsive data display
const updateCharts = (entries) => {
    if (!entries.length) return;

    const commonOptions = getResponsiveOptions();

    // Update Mood Trend Chart with responsive data
    const moodTrendData = entries.map(entry => ({
        x: new Date(entry.created_at),
        y: entry.mood_intensity
    })).sort((a, b) => a.x - b.x);

    // Limit data points on small screens
    const dataLimit = window.innerWidth < 768 ? 7 : 14;
    const limitedData = moodTrendData.slice(-dataLimit);

    charts.moodTrend.data.labels = limitedData.map(d => 
        d.x.toLocaleDateString('en-US', { 
            month: window.innerWidth < 768 ? 'short' : 'long', 
            day: 'numeric' 
        })
    );
    charts.moodTrend.data.datasets[0].data = limitedData.map(d => d.y);
    charts.moodTrend.options = {
        ...charts.moodTrend.options,
        ...commonOptions
    };
    charts.moodTrend.update();

    // Update Sleep Correlation Chart
    charts.sleepCorrelation.data.datasets[0].data = entries.map(entry => ({
        x: entry.sleep_quality,
        y: entry.mood_intensity
    }));
    charts.sleepCorrelation.update();

    // Update Emotion Distribution Chart
    const emotionCounts = entries.reduce((acc, entry) => {
        acc[entry.emotional_state] = (acc[entry.emotional_state] || 0) + 1;
        return acc;
    }, {});

    charts.emotionDistribution.data.labels = Object.keys(emotionCounts);
    charts.emotionDistribution.data.datasets[0].data = Object.values(emotionCounts);
    charts.emotionDistribution.update();

    // Update Activity Impact Chart
    const activityImpact = entries.reduce((acc, entry) => {
        const activities = entry.activities_description.split(',').map(a => a.trim());
        activities.forEach(activity => {
            if (!acc[activity]) {
                acc[activity] = { total: 0, count: 0 };
            }
            acc[activity].total += entry.mood_intensity;
            acc[activity].count++;
        });
        return acc;
    }, {});

    const averageImpacts = Object.entries(activityImpact)
        .map(([activity, data]) => ({
            activity,
            average: data.total / data.count
        }))
        .sort((a, b) => b.average - a.average)
        .slice(0, 5);

    charts.activityImpact.data.labels = averageImpacts.map(d => d.activity);
    charts.activityImpact.data.datasets[0].data = averageImpacts.map(d => d.average);
    charts.activityImpact.update();
};
</script>

<style scoped>
/* Add responsive styles */
@media (max-width: 768px) {
    .grid {
        gap: 1rem;
    }
}

@media (max-width: 640px) {
    canvas {
        max-height: 250px;
    }
}

/* Optimize touch interactions */
canvas {
    touch-action: none;
    user-select: none;
    -webkit-user-select: none;
}

/* Improve performance */
.grid > div {
    transform: translateZ(0);
    backface-visibility: hidden;
}
</style> 