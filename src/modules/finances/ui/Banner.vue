<template>
  <div class="info-banner" :class="[`info-banner--${variant}`]">
    <span v-if="icon" class="info-banner__icon">{{ icon }}</span>
    <div class="info-banner__content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    icon?: string;
    variant?: 'info' | 'success' | 'warning' | 'error';
  }>(),
  {
    variant: 'info',
  }
);
</script>

<style scoped>
.info-banner {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 18px;
  border-radius: 10px;
  font-size: 14px;
  line-height: 1.5;
}

.info-banner__icon {
  font-size: 20px;
  flex-shrink: 0;
  margin-top: 1px;
}

.info-banner__content {
  flex: 1;
}

/* Варианты */
.info-banner--info {
  background: #e3f2fd;
  color: #1565c0;
  border: 1px solid #90caf9;
}

.info-banner--success {
  background: #e8f5e9;
  color: #2e7d32;
  border: 1px solid #a5d6a7;
}

.info-banner--warning {
  background: #fff3e0;
  color: #e65100;
  border: 1px solid #ffcc80;
}

.info-banner--error {
  background: #fce4ec;
  color: #c62828;
  border: 1px solid #ef9a9a;
}
</style>
