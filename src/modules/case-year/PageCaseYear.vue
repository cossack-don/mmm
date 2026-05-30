<script setup lang="ts">
import { computed, ref } from 'vue';
import { ReusableModal, ReusableListOptions } from '@components-ui';
import { Page } from '@components-pages';
import { useRoute } from 'vue-router';
import { useQuery, useMutation } from '@tanstack/vue-query';
import {
  caseYearDeleteQuery,
  caseYearPostQuery,
  caseYearPutQuery,
  caseYearGetQuery,
} from '@/modules/case-year/query/case-year/index.ts';
import { listMonths, Q } from './static.ts';
import {
  caseYearTargetsDeleteQuery,
  caseYearTargetsGetQuery,
  caseYearTargetsPostQuery,
  caseYearTargetsPutQuery,
} from '@/modules/case-year/query/case-year-targets/index.ts';
// import { chainRequestsQuery } from './query/chain-requests.query.ts';

const route = useRoute();

// TODO POLLING EXAMPLE
// const MAX_COUNT_POLLING = 10;
// const TIME_POLLING = 2_000; // 2 секунды
// const START_COUNT_PILLING = ref(0);
// //
// const { data: statePolling } = useQuery({
//   queryKey: ["getListCaseYearTargets"],
//   queryFn: async () => {
//     START_COUNT_PILLING.value++;
//     console.log(START_COUNT_PILLING.value, "counter-polling");
//     const data = await caseYearTargetsController.getList(
//       route.params.idProject as string,
//     );
//
//     return data;
//   },
//   refetchInterval: (query) => {
//     //тут бизнес логика при котрой прерывать запрос polling
//     if (query.state.data?.status === "complete") return false;
//     if (START_COUNT_PILLING.value >= MAX_COUNT_POLLING) return false;
//     return TIME_POLLING;
//   },
// });

// V1 changeRequestsQuery ПРИМЕР ЦЕПОЧКИ ЗАПРОСОВ ЗАВИСЯЩИХ ДРУГ ОТ ДРУГА
// const { data: lists, isPending } = useQuery(
//   chainRequestsQuery.CHAIN_REQUESTS(route),
// );
//
// // TODO ПРИМЕР ЦЕПОЧКИ ЗАПРОСОВ ЗАВИСЯЩИХ ДРУГ ОТ ДРУГА V2
// const { data: list4 } = useQuery(caseYearQuery.GET_LIST(route));
// const enabled = computed(() => !!list4.value);
// const { data: list5 } = useQuery(
//   caseYearTargetsGetQuery.GET_LIST(route, enabled),
// );

// ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ======
// TODO CRUD list case year
const { data: listCaseYear, isPending: isLoadingCaseYear } = useQuery(
  caseYearGetQuery.GET_LIST(route)
);
const { mutate: deleteByIdCaseYearTask } = useMutation(
  caseYearDeleteQuery.DELETE
);
const { mutate: putByIdCaseYearTask } = useMutation(caseYearPutQuery.PUT);
const { mutate: createCaseYearTask } = useMutation(caseYearPostQuery.POST);

const { data: listCaseYearTargets, isPending: isLoadingCaseYearTargets } =
  useQuery(caseYearTargetsGetQuery.GET_LIST(route));

const { mutate: deleteByIdCaseYearTarget } = useMutation(
  caseYearTargetsDeleteQuery.DELETE
);

const { mutate: putByIdCaseYearTarget } = useMutation(
  caseYearTargetsPutQuery.PUT()
);

const { mutate: createCaseYearTarget } = useMutation(
  caseYearTargetsPostQuery.POST
);

const onDeleteByIdTargetYear = (id: number) => {
  deleteByIdCaseYearTarget({
    idProject: route.params.idProject,
    idTarget: id,
  });
};

const onDeleteByIdTask = (task) => {
  deleteByIdCaseYearTask({
    idProject: route.params.idProject,
    idTask: task.id,
  });
};

const mapTypesModal = {
  create: 'create',
  update: 'update',
} as const;

const isOpenModalTargetYear = ref(false);
const onOpenModalTargetYear = () => {
  nameTargetYear.value.name = '';
  isOpenModalTargetYear.value = true;

  nameTargetYear.value.type = mapTypesModal.create;
};

const nameTargetYear = ref({ name: '', type: 'create', id: null });

const onSaveTargetYear = () => {
  if (nameTargetYear.value.name.trim() === '') return;

  if (nameTargetYear.value.type === mapTypesModal.create) {
    createCaseYearTarget({
      idProject: route.params.idProject,
      name: nameTargetYear.value.name,
    });
  } else if (nameTargetYear.value.type === mapTypesModal.update) {
    putByIdCaseYearTarget({
      idProject: route.params.idProject,
      idTarget: nameTargetYear.value.id,
      name: nameTargetYear.value.name,
    });
  }

  nameTargetYear.value.name = '';
};

const onChangeNameTargetYear = (item) => {
  onOpenModalTargetYear();
  nameTargetYear.value.name = item.name;
  nameTargetYear.value.id = item.id;
  nameTargetYear.value.type = mapTypesModal.update;
};

//
const isOpenModalTasks = ref(false);

const listMonths2 = [
  { id: 1, name: 'Январь', keyQ: 'Q1' },
  { id: 2, name: 'Февраль', keyQ: 'Q1' },
  { id: 3, name: 'Март', keyQ: 'Q1' },
  { id: 4, name: 'Апрель', keyQ: 'Q2' },
  { id: 5, name: 'Май', keyQ: 'Q2' },
  { id: 6, name: 'Июнь', keyQ: 'Q2' },
  { id: 7, name: 'Июль', keyQ: 'Q3' },
  { id: 8, name: 'Август', keyQ: 'Q3' },
  { id: 9, name: 'Сентябрь', keyQ: 'Q3' },
  { id: 10, name: 'Октябрь', keyQ: 'Q4' },
  { id: 11, name: 'Ноябрь', keyQ: 'Q4' },
  { id: 12, name: 'Декабрь', keyQ: 'Q4' },
];
const dataFrom = ref({
  id: null,
  name: '',
  quarter: Q[0].name,
  month: listMonths2[0],
  type: 'create',
});

// Вычисляемое свойство для фильтрации месяцев по выбранному кварталу
const filteredMonths = computed(() => {
  return listMonths2.filter((month) => month.keyQ === dataFrom.value.quarter);
});

// Следим за изменением квартала и сбрасываем выбранный месяц на первый в новом квартале
const updateMonthOnQuarterChange = () => {
  if (filteredMonths.value.length > 0) {
    dataFrom.value.month = filteredMonths.value[0];
  }
};

const onOpenModalTasks = () => {
  dataFrom.value.name = '';
  isOpenModalTasks.value = true;

  dataFrom.value.type = mapTypesModal.create;
};

const onSaveTask = () => {
  if (dataFrom.value.name.trim() === '') return;

  if (dataFrom.value.type === mapTypesModal.create) {
    createCaseYearTask({
      idProject: route.params.idProject,
      name: dataFrom.value.name,
      pickedQ: dataFrom.value.quarter,
      month: dataFrom.value.month.id,
    });
  } else if (dataFrom.value.type === mapTypesModal.update) {
    console.log(dataFrom.value.month);
    putByIdCaseYearTask({
      idProject: route.params.idProject,
      idTask: dataFrom.value.id,
      name: dataFrom.value.name,
      pickedQ: dataFrom.value.quarter,
      month: dataFrom.value.month.id,
    });
  }
};

const onUpdateByIdTask = (quarter, monthId, task) => {
  onOpenModalTasks();

  dataFrom.value.id = task.id;
  dataFrom.value.name = task.name;
  dataFrom.value.quarter = quarter.name;
  dataFrom.value.month = monthId;
  dataFrom.value.type = mapTypesModal.update;
};
</script>

<template>
  <Page :isLoading="false" :isError="false" :isEmptyContent="false">
    <template #pageError> error content </template>

    <template #headerContent>
      <v-container fluid>
        <v-row>
          <v-col cols="12" sm="12" md="12">
            <div class="text-headline-small">
              Цели на год - 2026

              <v-btn
                density="compact"
                icon="mdi-plus"
                @click="onOpenModalTargetYear"
              />
            </div>
          </v-col>
          <v-col cols="12" sm="12" md="12">
            <v-card style="padding: 5px">
              <v-chip
                style="margin: 5px"
                v-for="item in listCaseYearTargets"
                :key="item.id"
                closable
                color="primary"
                size="small"
                @click="onChangeNameTargetYear(item)"
                @click:close="onDeleteByIdTargetYear(item.id)"
              >
                {{ item.name }}
              </v-chip>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>

    <template #notEmptyBodyContent>
      <v-container fluid>
        <v-row>
          <v-col cols="12" sm="12" md="12">
            <div class="text-headline-small">
              Задачи по кварталам
              <v-btn
                density="compact"
                icon="mdi-plus"
                @click="isOpenModalTasks = true"
              />
            </div>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="4"
            lg="3"
            v-for="Q in listCaseYear"
            :key="Q.id"
          >
            <v-card :title="Q.name">
              <v-card-text>
                <v-container fluid>
                  <v-row>
                    <v-col cols="12" v-for="month in Q.months" :key="month.id">
                      <v-card>
                        <ul style="padding: 15px">
                          <li>
                            <span class="font-weight-bold">
                              {{ month.name }}
                            </span>
                          </li>

                          <li
                            v-for="task in month.tasks"
                            :key="task.id"
                            style="
                              display: flex;
                              justify-content: space-between;
                              align-items: center;
                              padding: 3px;
                            "
                          >
                            <span style="font-size: 0.75rem">
                              {{ task.name }}
                            </span>
                            <ReusableListOptions
                              @onDelete="onDeleteByIdTask(task)"
                              @onEdit="onUpdateByIdTask(Q, month.id, task)"
                            />
                          </li>
                        </ul>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </Page>

  <ReusableModal
    v-model="isOpenModalTasks"
    title="Создание задачи для месяца"
    :saveButtonText="
      dataFrom.type === mapTypesModal.create ? 'Создать' : 'Обновить'
    "
    @onSave="onSaveTask"
  >
    <v-text-field
      v-model="dataFrom.name"
      label="Название задачи"
    ></v-text-field>

    <v-select
      v-model="dataFrom.quarter"
      :items="Q"
      item-title="name"
      item-value="name"
      label="Выбор квартала"
      @update:model-value="updateMonthOnQuarterChange"
    ></v-select>

    <v-select
      v-model="dataFrom.month"
      :items="filteredMonths"
      item-title="name"
      :item-value="(item) => item"
      label="Выбор месяца"
    ></v-select>
  </ReusableModal>

  <ReusableModal
    v-model="isOpenModalTargetYear"
    title="Создание цели на год"
    :saveButtonText="
      nameTargetYear.type === mapTypesModal.create ? 'Создать' : 'Обновить'
    "
    @onSave="onSaveTargetYear"
  >
    <v-text-field
      v-model="nameTargetYear.name"
      label="Название цели на год"
    ></v-text-field>
  </ReusableModal>
</template>

<style scoped>
ul {
  padding: 0;
}

li {
  list-style-type: none;
}
</style>
