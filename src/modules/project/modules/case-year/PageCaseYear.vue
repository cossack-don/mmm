<script setup lang="ts">
import { computed, watch, onMounted, ref } from "vue";
import { Modal, Card, Button, DropDown } from "../../../../components/ui";
import { serviceCaseYear } from "../../../../api";
import { useRoute } from "vue-router";
import { serviceCaseYearTargets } from "../../../../api/services";

const route = useRoute();

//Q1
const firstMonth = computed(() => {
  return list.value[0].filter((item) => {
    if (item.month === 1) return item;
  });
});

const secondMonth = computed(() => {
  return list.value[0].filter((item) => {
    if (item.month === 2) return item;
  });
});

const thorMonth = computed(() => {
  return list.value[0].filter((item) => {
    if (item.month === 3) return item;
  });
});

//Q2
const forMonth = computed(() => {
  return list.value[1].filter((item) => {
    if (item.month === 4) return item;
  });
});

const fiveMonth = computed(() => {
  return list.value[1].filter((item) => {
    if (item.month === 5) return item;
  });
});

const sixMonth = computed(() => {
  return list.value[1].filter((item) => {
    if (item.month === 6) return item;
  });
});

//Q3
const sevenMonth = computed(() => {
  return list.value[2].filter((item) => {
    if (item.month === 7) return item;
  });
});

const ethMonth = computed(() => {
  return list.value[2].filter((item) => {
    if (item.month === 8) return item;
  });
});

const nineMonth = computed(() => {
  return list.value[2].filter((item) => {
    if (item.month === 9) return item;
  });
});

//Q4
const tenMonth = computed(() => {
  return list.value[3].filter((item) => {
    if (item.month === 10) return item;
  });
});

const elevenMonth = computed(() => {
  return list.value[3].filter((item) => {
    if (item.month === 11) return item;
  });
});

const fdaMonth = computed(() => {
  return list.value[3].filter((item) => {
    if (item.month === 12) return item;
  });
});

const listMonths = [
  { id: 1, name: "Январь", keyQ: "Q1" },
  { id: 2, name: "Февраль", keyQ: "Q1" },
  { id: 3, name: "Март", keyQ: "Q1" },
  { id: 4, name: "Апрель", keyQ: "Q2" },
  { id: 5, name: "Май", keyQ: "Q2" },
  { id: 6, name: "Июнь", keyQ: "Q2" },
  { id: 7, name: "Июль", keyQ: "Q3" },
  { id: 8, name: "Август", keyQ: "Q3" },
  { id: 9, name: "Сентябрь", keyQ: "Q3" },
  { id: 10, name: "Октябрь", keyQ: "Q4" },
  { id: 11, name: "Ноябрь", keyQ: "Q4" },
  { id: 12, name: "Декабрь", keyQ: "Q4" },
];

const Q = [
  {
    id: 1,
    name: "Q1",
  },
  {
    id: 2,
    name: "Q2",
  },
  {
    id: 3,
    name: "Q3",
  },
  {
    id: 4,
    name: "Q4",
  },
];

const list = ref([[], [], [], []]);
const controllerCaseYearTask = {
  getList: async () => {
    list.value = [[], [], [], []];

    const { data } = await serviceCaseYear.getList(route.params.idProject);

    data.forEach((item) => {
      if (item.keyQ === "Q1") {
        list.value[0].push(item);
      } else if (item.keyQ === "Q2") {
        list.value[1].push(item);
      } else if (item.keyQ === "Q3") {
        list.value[2].push(item);
      } else if (item.keyQ === "Q4") {
        list.value[3].push(item);
      }
    });
  },
  deleteItemById: async (id: any) => {
    await serviceCaseYear.deleteById(route.params.idProject, id);
    await controllerCaseYearTask.getList();
  },
  putById: async (idTask) => {
    await serviceCaseYear.putById(
      route.params.idProject as string,
      idTask,
      stateModalName.value,
    );

    idEditElement.value = null;
    stateModalName.value = "";
  },
};

const listYearTargets = ref([]);

const controllerCaseYearTargets = {
  getList: async (idProject: any) => {
    const { data } = await serviceCaseYearTargets.getList(idProject);
    listYearTargets.value = data;
  },
  deleteById: async (idProject: any, idTarget: any) => {
    await serviceCaseYearTargets.deleteById(idProject, idTarget);
    await controllerCaseYearTargets.getList(idProject);
  },
  putById: async (idTarget: any) => {
    // await serviceCaseYearTargets.putById(idProject, idTarget, name);

    await serviceCaseYearTargets.putById(
      route.params.idProject as string,
      idTarget,
      stateModalName.value,
    );

    idEditElement.value = null;
    stateModalName.value = "";
  },

  createTarget: async (idProject: any, name: any) => {
    await serviceCaseYearTargets.createTarget(idProject, name);
  },
};

const idEditElement = ref(null);
const isModalOpen = ref(false);
const openModal = () => (isModalOpen.value = true);

const isModalOpenTwo = ref(false);
const openModalTwo = (id, nameTask) => {
  isModalOpenTwo.value = true;
  idEditElement.value = id;
  stateModalName.value = nameTask;
};
const handleConfirmTwo = async () => {
  await controllerCaseYearTask.putById(idEditElement.value);
  await controllerCaseYearTask.getList();
};

const isModalOpenThree = ref(false);
const openModalThree = () => (isModalOpenThree.value = true);
const handleConfirmThree = async () => {
  await controllerCaseYearTargets.createTarget(
    route.params.idProject,
    stateModalName.value,
  );
  await controllerCaseYearTargets.getList(route.params.idProject);
};

const isModalOpenFour = ref(false);
const openModalFour = (id, nameTarget) => {
  isModalOpenFour.value = true;
  idEditElement.value = id;
  stateModalName.value = nameTarget;
};
// const handleConfirmTwo = async () => {
//   await controllerCaseYearTask.putById(idEditElement.value);
//   await controllerCaseYearTask.getList();
// };
const handleConfirmFour = async (idProject, idTarget, nameTarget) => {
  console.log("dada");
  // isModalOpenFour.value = true;
  // idEditElement.value = idTarget;
  // stateModalName.value = nameTarget;

  // await controllerCaseYearTask.putById(idEditElement.value);
  // await controllerCaseYearTask.getList();
  await controllerCaseYearTargets.putById(idEditElement.value);
  await controllerCaseYearTargets.getList(route.params.idProject);
  // await controllerCaseYearTask.putById(idTarget);
  // await controllerCaseYearTask.getList();
};

const stateModalName = ref("");

const optionsQ = ref<any>(Q);
const pickedQ = ref(Q[0].id);

const optionsMonth = ref<any>(listMonths);
const pickedMonth = ref(listMonths[0].id);

const handleConfirm = async () => {
  await serviceCaseYear.createTaskQ(
    route.params.idProject as string,
    stateModalName.value,
    `Q${pickedQ.value}`,
    pickedMonth.value,
  );

  stateModalName.value = "";

  await controllerCaseYearTask.getList();
};

const currentListMonths = computed(() => {
  if (pickedQ.value === 1) {
    const res = optionsMonth.value.filter((item) => item.keyQ === "Q1");
    console.log(res, 33);
    pickedMonth.value = res[0].id;
    return res;
  } else if (pickedQ.value === 2) {
    const res = optionsMonth.value.filter((item) => item.keyQ === "Q2");
    pickedMonth.value = res[0].id;
    return res;
  } else if (pickedQ.value === 3) {
    const res = optionsMonth.value.filter((item) => item.keyQ === "Q3");
    pickedMonth.value = res[0].id;
    return res;
  } else if (pickedQ.value === 4) {
    const res = optionsMonth.value.filter((item) => item.keyQ === "Q4");
    pickedMonth.value = res[0].id;
    return res;
  }
});

const onPickedOptionsTargets = async (id, idTarget, name) => {
  if (id === 1) {
    await controllerCaseYearTargets.deleteById(
      route.params.idProject,
      idTarget,
    );
  } else if (id === 2) {
    openModalFour(idTarget, name);
    console.log(1);
    // await controllerCaseYearTargets.putById(route.params.idProject, idTarget);
    // await handleConfirmFour(route.params.idProject, idTarget, name);
    //не доделал
    // await controllerCaseYearTargets.putById(
    //   route.params.idProject,
    //   idTarget,
    //   null,
    // );
  }
};

const onPickedOptionsTask = async (id, idTask, name) => {
  if (id === 1) {
    await controllerCaseYearTask.deleteById(route.params.idProject, idTask);
  } else if (id === 2) {
    openModalTwo(idTask, name);
  }
};

const changePickMonth = (event) => {
  console.log(event);
};

onMounted(() => {
  controllerCaseYearTask.getList();
  controllerCaseYearTargets.getList(route.params.idProject);
});
</script>

<template>
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
            v-for="item in listYearTargets"
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
        style="width: 48%; height: 300px; margin-right: 5px; margin-bottom: 5px"
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
                        ({ id }) => onPickedOptionsTask(id, item.id, item.name)
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
                        ({ id }) => onPickedOptionsTask(id, item.id, item.name)
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
                        ({ id }) => onPickedOptionsTask(id, item.id, item.name)
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
                        ({ id }) => onPickedOptionsTask(id, item.id, item.name)
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
                        ({ id }) => onPickedOptionsTask(id, item.id, item.name)
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
                        ({ id }) => onPickedOptionsTask(id, item.id, item.name)
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
                        ({ id }) => onPickedOptionsTask(id, item.id, item.name)
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
                        ({ id }) => onPickedOptionsTask(id, item.id, item.name)
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
                        ({ id }) => onPickedOptionsTask(id, item.id, item.name)
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
                        ({ id }) => onPickedOptionsTask(id, item.id, item.name)
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
                        ({ id }) => onPickedOptionsTask(id, item.id, item.name)
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
                        ({ id }) => onPickedOptionsTask(id, item.id, item.name)
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
