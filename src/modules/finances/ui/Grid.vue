<template>
  <div class="dashboard-grid">
    <!-- График на всю ширину сверху -->
    <div class="dashboard-grid__chart">
      <slot name="chart" />
    </div>

    <!-- Информационный баннер -->
    <div v-if="$slots.banner" class="dashboard-grid__banner">
      <slot name="banner" />
    </div>

    <div v-if="$slots.infoMonth" class="dashboard-grid__info-month">
      <slot name="infoMonth" />
    </div>
    <!-- 2 слота 50/50 после баннера -->
    <div
      v-if="$slots['half-1'] || $slots['half-2']"
      class="dashboard-grid__half"
    >
      <div class="dashboard-grid__half-cell">
        <slot name="half-1" />
      </div>
      <div class="dashboard-grid__half-cell">
        <slot name="half-2" />
      </div>
    </div>

    <!-- 4 слота в ряд -->
    <div class="dashboard-grid__row">
      <div class="dashboard-grid__cell">
        <slot name="slot-1" />
      </div>
      <div class="dashboard-grid__cell">
        <slot name="slot-2" />
      </div>
      <div class="dashboard-grid__cell">
        <slot name="slot-3" />
      </div>
      <div class="dashboard-grid__cell">
        <slot name="slot-4" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.dashboard-grid__chart {
  width: 100%;
  height: 350px;
}

.dashboard-grid__banner {
  width: 100%;
}

.dashboard-grid__info-month {
  width: 100%;
}

.dashboard-grid__half {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.dashboard-grid__half-cell {
  min-width: 0;
}

.dashboard-grid__row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.dashboard-grid__cell {
  min-width: 0;
}

@media (max-width: 900px) {
  .dashboard-grid__row {
    grid-template-columns: repeat(2, 1fr);
  }

  .dashboard-grid__half {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 500px) {
  .dashboard-grid__row {
    grid-template-columns: 1fr;
  }
}
</style>
