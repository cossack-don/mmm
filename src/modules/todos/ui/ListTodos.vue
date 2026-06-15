<script setup lang="ts">
interface IProps {
  list?: any;
  hasMore: boolean;
  isFetchingNextPage: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  list: [],
  hasMore: false,
  isFetchingNextPage: false,
});

const emit = defineEmits(['onFetchNextPage', 'onDeleteByIdTodo']);
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col v-for="item in props.list" :key="item.id" cols="12" sm="6" md="4">
        <v-card>
          <template #default>
            <p>{{ item.name }}</p>
            <v-btn @click="emit('onDeleteByIdTodo', { id: item.id })"
              >DEL</v-btn
            >
          </template>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="props.hasMore" justify="center" class="mt-4">
      <v-col cols="auto">
        <v-btn
          @click="emit('onFetchNextPage')"
          :loading="props.isFetchingNextPage"
          :disabled="props.isFetchingNextPage"
        >
          {{ props.isFetchingNextPage ? 'Загрузка...' : 'Загрузить еще' }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
