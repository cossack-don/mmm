<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  Modal,
  Card,
  Button,
  DropDown,
  ReusableModal,
  ReusableListOptions,
} from '@components-ui';
import { LifeCyclePage, Page } from '@components-pages';
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
import { chainRequestsQuery } from './query/chain-requests.query.ts';

const route = useRoute();

// TODO POLLING EXAMPLE
const MAX_COUNT_POLLING = 10;
const TIME_POLLING = 2_000; // 2 секунды
const START_COUNT_PILLING = ref(0);
//
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

const idEditElement = ref(null);
const isModalOpen = ref(false);
const openModal = () => (isModalOpen.value = true);

const isModalOpenTwo = ref(false);
const openModalTwo = (id: any, nameTask: any) => {
  stateTargetYearModal.value = true;

  // isModalOpenTwo.value = true;
  idEditElement.value = id;
  stateModalName.value = nameTask;
};
const handleConfirmTwo = async () => {
  putByIdCaseYearTask({
    idProject: route.params.idProject,
    idTask: idEditElement.value,
    name: stateModalName.value,
  });
};

const isModalOpenThree = ref(false);
const openModalThree = () => (isModalOpenThree.value = true);
const handleConfirmThree = async () => {
  createCaseYearTarget({
    idProject: route.params.idProject,
    name: stateModalName.value,
  });
};

const isModalOpenFour = ref(false);
const openModalFour = (id, nameTarget) => {
  isModalOpenFour.value = true;
  idEditElement.value = id;
  stateModalName.value = nameTarget;
};

const handleConfirmFour = () => {
  putByIdCaseYearTarget({
    idProject: route.params.idProject,
    idTarget: idEditElement.value,
    name: stateModalName.value,
  });
};

const stateModalName = ref('');

const optionsQ = ref<any>(Q);
const pickedQ = ref(Q[0].id);

const optionsMonth = ref<any>(listMonths);
const pickedMonth = ref(listMonths[0].id);

const handleConfirm = async () => {
  createCaseYearTask({
    idProject: route.params.idProject,
    name: stateModalName.value,
    pickedQ: pickedQ.value,
    month: pickedMonth.value,
  });

  stateModalName.value = '';
};

const currentListMonths = computed(() => {
  if (pickedQ.value === 1) {
    const res = optionsMonth.value.filter((item: any) => item.keyQ === 'Q1');
    pickedMonth.value = res[0].id;
    return res;
  } else if (pickedQ.value === 2) {
    const res = optionsMonth.value.filter((item: any) => item.keyQ === 'Q2');
    pickedMonth.value = res[0].id;
    return res;
  } else if (pickedQ.value === 3) {
    const res = optionsMonth.value.filter((item: any) => item.keyQ === 'Q3');
    pickedMonth.value = res[0].id;
    return res;
  } else if (pickedQ.value === 4) {
    const res = optionsMonth.value.filter((item: any) => item.keyQ === 'Q4');
    pickedMonth.value = res[0].id;
    return res;
  }
});

const onPickedOptionsTargets = (id: any, idTarget: any, name: any) => {
  if (id === 1) {
    deleteByIdCaseYearTarget({
      idProject: route.params.idProject,
      idTarget: idTarget,
    });
  } else if (id === 2) {
    openModalFour(idTarget, name);
  }
};

const onPickedOptionsTask = async (id: any, idTask: any, name: any) => {
  if (id === 1) {
    deleteByIdCaseYearTask({
      idProject: route.params.idProject,
      idTask: idTask,
    });
  } else if (id === 2) {
    openModalTwo(idTask, name);
  }
};

const changePickMonth = (event: any) => {
  pickedMonth.value = event.target.value;
};

///refactoring v2
const onDeleteByIdTargetYear = (id: number) => {
  deleteByIdCaseYearTarget({
    idProject: route.params.idProject,
    idTarget: id,
  });
};

const stateTargetYearModal = ref(false);

////////// new
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
  console.log(nameTargetYear.value);

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
</script>

<template>
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

  <Page :isLoading="false" :isError="false" :isEmptyContent="false">
    <template #pageError> error content </template>

    <template #headerContent>
      <v-container fluid>
        <v-row>
          <v-col cols="12" sm="12" md="12">
            <v-card title="Дела на год - 2026">
              <v-btn @click="onOpenModalTargetYear"> Создание цели </v-btn>

              <v-chip
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
      <v-btn @click="openModal"> Создание задачи </v-btn>
      <v-container fluid>
        <v-row>
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
                        <v-list lines="one" density="compact" class="pa-0">
                          <v-list-item>
                            <template v-slot:title>
                              <span class="font-weight-bold">
                                {{ month.name }}
                              </span>
                            </template>
                          </v-list-item>
                          <v-list-item
                            v-for="task in month.tasks"
                            :key="task.id"
                            :subtitle="''"
                          >
                            <template v-slot:title>
                              <span style="font-size: 0.75rem">
                                {{ task.name }}
                              </span>
                              <ReusableListOptions
                                @onDelete="onDeleteByIdTask(task)"
                                @onEdit="(v) => console.log('on-edit')"
                              />
                            </template>
                          </v-list-item>
                        </v-list>
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

  <LifeCyclePage
    :isLoading="isLoadingCaseYearTargets || isLoadingCaseYear"
    :isError="false"
    :isSuccess="true"
  >
    <template #error>
      <div>error</div>
    </template>
    <template #success>
      <div>
        <Modal
          v-model="isModalOpen"
          title="Создание задачи"
          @confirm="handleConfirm"
        >
          <div style="display: flex">
            <p style="margin-right: 10px">Название задачи</p>
            <input v-model="stateModalName" placeholder="Название задачи" />
          </div>

          <div style="display: flex">
            <p style="margin-right: 10px">Выбор квартала</p>
            <select v-model="pickedQ">
              <option
                v-for="option in optionsQ"
                :value="option.id"
                :key="option.id"
              >
                {{ option.name }}
              </option>
            </select>
          </div>

          <div style="display: flex">
            <p style="margin-right: 10px">Выбор месяца</p>
            <select @change="changePickMonth" :value="pickedMonth">
              <option
                v-for="option in currentListMonths"
                :value="option.id"
                :key="option.id"
              >
                {{ option.name }}
              </option>
            </select>
          </div>
        </Modal>

        <Modal
          v-model="isModalOpenTwo"
          title="Редактирование задачи"
          @confirm="handleConfirmTwo"
        >
          <p>Название задачи</p>
          <input v-model="stateModalName" placeholder="Название задачи" />
        </Modal>

        <Modal
          v-model="isModalOpenThree"
          title="Создание цели на год"
          @confirm="handleConfirmThree"
        >
          <p>Название цели</p>
          <input v-model="stateModalName" placeholder="Название цели" />
        </Modal>

        <Modal
          v-model="isModalOpenFour"
          title="Редактирование цели на год"
          @confirm="handleConfirmFour"
        >
          <p>Название цели</p>
          <input v-model="stateModalName" placeholder="Название цели" />
        </Modal>
      </div>
    </template>
  </LifeCyclePage>
</template>
