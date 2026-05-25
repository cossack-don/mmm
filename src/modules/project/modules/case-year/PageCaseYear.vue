<script setup lang="ts">
import { computed, ref } from 'vue';
import { Modal, Card, Button, DropDown } from '@components-ui';
import { LifeCyclePage, Page } from '@components-pages';
import { useRoute } from 'vue-router';
import { useQuery, useMutation } from '@tanstack/vue-query';
import {
  caseYearDeleteQuery,
  caseYearPostQuery,
  caseYearPutQuery,
  caseYearGetQuery,
} from '@project/case-year/query/case-year';
import { listMonths, Q } from './static.ts';
import {
  caseYearTargetsDeleteQuery,
  caseYearTargetsGetQuery,
  caseYearTargetsPostQuery,
  caseYearTargetsPutQuery,
} from '@project/case-year/query/case-year-targets';
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
  caseYearDeleteQuery.DELETE()
);
const { mutate: putByIdCaseYearTask } = useMutation(caseYearPutQuery.PUT());
const { mutate: createCaseYearTask } = useMutation(caseYearPostQuery.POST());

// TODO а тут есть ли обработка ошибки??? в useQuery или они только в useMutation ???
// TODO CRUD list case year targets

const { data: listCaseYearTargets, isPending: isLoadingCaseYearTargets } =
  useQuery(caseYearTargetsGetQuery.GET_LIST(route));

const { mutate: deleteByIdCaseYearTarget } = useMutation(
  caseYearTargetsDeleteQuery.DELETE()
);

const { mutate: putByIdCaseYearTarget } = useMutation(
  caseYearTargetsPutQuery.PUT()
);

const { mutate: createCaseYearTarget } = useMutation(
  caseYearTargetsPostQuery.POST()
);

const getMonthData = (quarterIndex: number, month: number) => {
  return computed(() => {
    return (
      listCaseYear.value?.[quarterIndex]?.filter(
        (item: any) => item.month === month
      ) || []
    );
  });
};
const firstMonth = getMonthData(0, 1);
const secondMonth = getMonthData(0, 2);
const thorMonth = getMonthData(0, 3);

const forMonth = getMonthData(1, 4);
const fiveMonth = getMonthData(1, 5);
const sixMonth = getMonthData(1, 6);

const sevenMonth = getMonthData(2, 7);
const ethMonth = getMonthData(2, 8);
const nineMonth = getMonthData(2, 9);

const tenMonth = getMonthData(3, 10);
const elevenMonth = getMonthData(3, 11);
const fdaMonth = getMonthData(3, 12);

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
const updateStateTargetYearModal = (v: boolean) =>
  (stateTargetYearModal.value = v);
const stateNameTargetYear = ref(false);

const onShowModalEdit = (id: any, nameTask: any) => {
  updateStateTargetYearModal(true);

  idEditElement.value = id;
  stateNameTargetYear.value = nameTask;
};

const onSaveNameTargetYear = () => {
  putByIdCaseYearTarget({
    idProject: route.params.idProject,
    idTarget: idEditElement.value,
    name: stateNameTargetYear.value,
  });

  updateStateTargetYearModal(false);
};

const showMenu = ref(false);
const menuTarget = ref(null);

const menuItems = [
  { title: 'Create', prependIcon: 'mdi-plus-circle', code: 'add' },
  { type: 'divider' },
  { title: 'Modify', prependIcon: 'mdi-pencil', code: 'edit' },
  { type: 'divider' },
  { title: 'Remove', prependIcon: 'mdi-trash-can', code: 'delete' },
];

async function show(evt) {
  if (showMenu.value) {
    showMenu.value = false;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  menuTarget.value = evt.target.closest('.v-icon-btn');
  showMenu.value = true;
}
</script>

<template>
  <Page :isLoading="false" :isError="false" :isEmptyContent="false">
    <template #pageError> error content </template>

    <template #headerContent>
      <v-container fluid>
        <v-row>
          <v-col cols="12" sm="12" md="12">
            <v-card title="Дела на год - 2026">
              <v-btn @click="openModalThree"> Создание цели </v-btn>

              <v-chip
                v-for="item in listCaseYearTargets"
                :key="item.id"
                closable
                color="primary"
                size="small"
                @click="onShowModalEdit(item.id, item.name)"
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
          <v-col cols="12" sm="12" md="12"> BODY CONTENT </v-col>

          <!-- Само модальное окно -->
        </v-row>
      </v-container>
    </template>
  </Page>

  <v-dialog v-model="stateTargetYearModal" max-width="500">
    <v-card>
      <v-card-title class="text-h5">Заголовок модального окна</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="stateNameTargetYear"
          label="First name"
        ></v-text-field>

        <v-btn @click="onSaveNameTargetYear">Сохранить</v-btn>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="updateStateTargetYearModal(false)"
        >
          Закрыть
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-menu
    v-model="showMenu"
    :offset="[-8, -12]"
    :target="menuTarget"
    location="bottom end"
    scroll-strategy="close"
  >
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="props"
        icon="mdi-dots-vertical"
        size="small"
        variant="outlined"
        @click="show"
      ></v-btn>
    </template>
    <v-list
      :items="menuItems"
      class="py-0"
      density="compact"
      item-value="code"
      item-props
      slim
    >
      <template v-slot:prepend>
        <v-icon class="mr-n2" size="small"></v-icon>
      </template>
    </v-list>
  </v-menu>

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

        <h4>Планы на 4-е квартала</h4>

        <Button @click="openModal">Создание задачи</Button>
        <br />

        <div style="display: flex; flex-wrap: wrap">
          <Card
            style="
              width: 48%;
              height: 300px;
              margin-right: 5px;
              margin-bottom: 5px;
            "
          >
            <template #default>
              <h4 style="text-align: center">Q1</h4>
              <div
                style="
                  display: flex;
                  justify-content: space-around;
                  margin-bottom: 100px;
                "
              >
                <Card style="width: 100%">
                  <template #default>
                    <p style="font-weight: bold">Январь</p>
                    <ul v-for="item in firstMonth">
                      <li>
                        {{ item.name }}
                        <DropDown
                          @onClick="
                            ({ id }) =>
                              onPickedOptionsTask(id, item.id, item.name)
                          "
                        />
                      </li>
                    </ul>
                  </template>
                </Card>

                <Card style="width: 100%">
                  <template #default>
                    <p style="font-weight: bold">Февраль</p>
                    <ul v-for="item in secondMonth">
                      <li>
                        {{ item.name }}
                        <DropDown
                          @onClick="
                            ({ id }) =>
                              onPickedOptionsTask(id, item.id, item.name)
                          "
                        />
                      </li></ul
                  ></template>
                </Card>

                <Card style="width: 100%">
                  <template #default>
                    <p style="font-weight: bold">Март</p>
                    <ul v-for="item in thorMonth">
                      <li>
                        {{ item.name }}
                        <DropDown
                          @onClick="
                            ({ id }) =>
                              onPickedOptionsTask(id, item.id, item.name)
                          "
                        />
                      </li>
                    </ul>
                  </template>
                </Card>
              </div>
            </template>
          </Card>

          <Card style="width: 50%; height: 300px; margin-bottom: 5px">
            <template #default>
              <h4 style="text-align: center">Q2</h4>
              <div
                style="
                  display: flex;
                  justify-content: space-around;
                  margin-bottom: 100px;
                "
              >
                <Card style="width: 100%">
                  <template #default>
                    <p style="font-weight: bold">Апрель</p>
                    <ul v-for="item in forMonth">
                      <li style="font-size: 12px">
                        {{ item.name }}
                        <DropDown
                          @onClick="
                            ({ id }) =>
                              onPickedOptionsTask(id, item.id, item.name)
                          "
                        />
                      </li>
                    </ul>
                  </template>
                </Card>

                <Card style="width: 100%">
                  <template #default>
                    <p style="font-weight: bold">Май</p>
                    <ul v-for="(item, index) in fiveMonth">
                      <li style="font-size: 12px">
                        {{ index + 1 }} - {{ item.name }}
                        <DropDown
                          @onClick="
                            ({ id }) =>
                              onPickedOptionsTask(id, item.id, item.name)
                          "
                        />
                      </li>
                    </ul>
                  </template>
                </Card>
                <Card style="width: 100%">
                  <template #default>
                    <p style="font-weight: bold">Июнь</p>
                    <ul v-for="(item, index) in sixMonth">
                      <li style="font-size: 12px">
                        {{ index + 1 }} - {{ item.name }}
                        <DropDown
                          @onClick="
                            ({ id }) =>
                              onPickedOptionsTask(id, item.id, item.name)
                          "
                        />
                      </li>
                    </ul>
                  </template>
                </Card>
              </div>
            </template>
          </Card>

          <Card style="width: 48%; height: 300px; margin-right: 5px">
            <template #default>
              <h4 style="text-align: center">Q3</h4>
              <div style="display: flex; justify-content: space-around">
                <Card style="width: 100%">
                  <template #default>
                    <p style="font-weight: bold">Июль</p>
                    <ul v-for="item in sevenMonth">
                      <li>
                        {{ item.name }}
                        <DropDown
                          @onClick="
                            ({ id }) =>
                              onPickedOptionsTask(id, item.id, item.name)
                          "
                        />
                      </li>
                    </ul>
                  </template>
                </Card>

                <Card style="width: 100%">
                  <template #default>
                    <p style="font-weight: bold">Август</p>
                    <ul v-for="item in ethMonth">
                      <li>
                        {{ item.name }}
                        <DropDown
                          @onClick="
                            ({ id }) =>
                              onPickedOptionsTask(id, item.id, item.name)
                          "
                        />
                      </li>
                    </ul>
                  </template>
                </Card>

                <Card style="width: 100%">
                  <template #default>
                    <p style="font-weight: bold">Сентябрь</p>
                    <ul v-for="item in nineMonth">
                      <li>
                        {{ item.name }}
                        <DropDown
                          @onClick="
                            ({ id }) =>
                              onPickedOptionsTask(id, item.id, item.name)
                          "
                        />
                      </li>
                    </ul>
                  </template>
                </Card>
              </div>
            </template>
          </Card>

          <Card style="width: 50%; height: 300px">
            <template #default>
              <h4 style="text-align: center">Q4</h4>
              <div style="display: flex; justify-content: space-around">
                <Card style="width: 100%">
                  <template #default>
                    <p style="font-weight: bold">Октябрь</p>
                    <ul v-for="item in tenMonth">
                      <li>
                        {{ item.name }}
                        <DropDown
                          @onClick="
                            ({ id }) =>
                              onPickedOptionsTask(id, item.id, item.name)
                          "
                        />
                      </li>
                    </ul>
                  </template>
                </Card>

                <Card style="width: 100%">
                  <template #default>
                    <p style="font-weight: bold">Ноябрь</p>
                    <ul v-for="item in elevenMonth">
                      <li>
                        {{ item.name }}
                        <DropDown
                          @onClick="
                            ({ id }) =>
                              onPickedOptionsTask(id, item.id, item.name)
                          "
                        />
                      </li>
                    </ul>
                  </template>
                </Card>

                <Card style="width: 100%">
                  <template #default>
                    <p style="font-weight: bold">Декабрь</p>
                    <ul v-for="item in fdaMonth">
                      <li>
                        {{ item.name }}
                        <DropDown
                          @onClick="
                            ({ id }) =>
                              onPickedOptionsTask(id, item.id, item.name)
                          "
                        />
                      </li>
                    </ul>
                  </template>
                </Card>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </template>
  </LifeCyclePage>
</template>
