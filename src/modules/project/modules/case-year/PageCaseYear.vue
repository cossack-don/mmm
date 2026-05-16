<script setup lang="ts">
import { computed, ref } from "vue";
import { Modal, Card, Button, DropDown } from "../../../../components/ui";
import { LifeCyclePage } from "../../../../components/pages";
import { useRoute } from "vue-router";
import { useQuery, useMutation } from "@tanstack/vue-query";
import {
  caseYearDeleteQuery,
  caseYearPostQuery,
  caseYearPutQuery,
  caseYearGetQuery,
} from "./query/case-year";
import { listMonths, Q } from "./static.ts";
import {
  caseYearTargetsDeleteQuery,
  caseYearTargetsGetQuery,
  caseYearTargetsPostQuery,
  caseYearTargetsPutQuery,
} from "./query/case-year-targets";
import { chainRequestsQuery } from "./query/chain-requests.query.ts";

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
  caseYearGetQuery.GET_LIST(route),
);
const { mutate: deleteByIdCaseYearTask } = useMutation(
  caseYearDeleteQuery.DELETE(),
);
const { mutate: putByIdCaseYearTask } = useMutation(caseYearPutQuery.PUT());
const { mutate: createCaseYearTask } = useMutation(caseYearPostQuery.POST());

// TODO а тут есть ли обработка ошибки??? в useQuery или они только в useMutation ???
// TODO CRUD list case year targets

const { data: listCaseYearTargets, isPending: isLoadingCaseYearTargets } =
  useQuery(caseYearTargetsGetQuery.GET_LIST(route));

const { mutate: deleteByIdCaseYearTarget } = useMutation(
  caseYearTargetsDeleteQuery.DELETE(),
);

const { mutate: putByIdCaseYearTarget } = useMutation(
  caseYearTargetsPutQuery.PUT(),
);

const { mutate: createCaseYearTarget } = useMutation(
  caseYearTargetsPostQuery.POST(),
);

const getMonthData = (quarterIndex: number, month: number) => {
  return computed(() => {
    return (
      listCaseYear.value?.[quarterIndex]?.filter(
        (item: any) => item.month === month,
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
  isModalOpenTwo.value = true;
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
  } as any);
};

const stateModalName = ref("");

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

  stateModalName.value = "";
};

const currentListMonths = computed(() => {
  if (pickedQ.value === 1) {
    const res = optionsMonth.value.filter((item: any) => item.keyQ === "Q1");
    pickedMonth.value = res[0].id;
    return res;
  } else if (pickedQ.value === 2) {
    const res = optionsMonth.value.filter((item: any) => item.keyQ === "Q2");
    pickedMonth.value = res[0].id;
    return res;
  } else if (pickedQ.value === 3) {
    const res = optionsMonth.value.filter((item: any) => item.keyQ === "Q3");
    pickedMonth.value = res[0].id;
    return res;
  } else if (pickedQ.value === 4) {
    const res = optionsMonth.value.filter((item: any) => item.keyQ === "Q4");
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
</script>

<template>
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

        <Card style="margin-bottom: 40px" :styles="{ width: '100%' }">
          <template #default>
            <h4>Дела на год 2026</h4>

            <Button @click="openModalThree">Создание цели</Button>

            <div style="display: flex; flex-wrap: wrap">
              <Card
                style="margin: 10px; display: flex; align-items: center"
                v-for="item in listCaseYearTargets"
                :key="item.id"
              >
                <template #default>
                  <p>{{ item.name }}</p>
                  <DropDown
                    @onClick="
                      ({ id }) => onPickedOptionsTargets(id, item.id, item.name)
                    "
                  />
                </template>
              </Card>
            </div>
          </template>
        </Card>

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
