<script setup lang="ts">
import { computed, watch, onMounted, ref } from "vue";
import { Modal } from "../../../../components/ui";

const list = ref([[], [], [], []]);

const getList = async () => {
  list.value = [[], [], [], []];

  const res = await fetch("http://localhost:3000/project/3/case-year");
  const resJson = await res.json();

  resJson.forEach((item) => {
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
};

const deleteItemById = async (id: number) => {
  await fetch(`http://localhost:3000/project/3/case-year/${id}`, {
    method: "DELETE",
  });

  await getList();
};

onMounted(() => {
  getList();
  getListTargets();
});

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
const isModalOpen = ref(false);
const isModalOpenTwo = ref(false);

const stateModalName = ref("");
const optionsQ = ref<any>(Q);
const pickedQ = ref(Q[0].id);
const optionsMonth = ref<any>(listMonths);
const pickedMonth = ref(listMonths[0].id);

const openModal = () => {
  isModalOpen.value = true;
};

const idEditElement = ref(null);
const openModalTwo = (id, nameTask) => {
  isModalOpenTwo.value = true;
  idEditElement.value = id;
  stateModalName.value = nameTask;
};

const f = computed(() => {
  return 1;
});
const formDataCreateTask = ref({
  month: null,
  name: "",
  keyQ: null,
});

const handleConfirm = async () => {
  formDataCreateTask.value.name = stateModalName.value;
  formDataCreateTask.value.keyQ = `Q${pickedQ.value}`;
  formDataCreateTask.value.month = pickedMonth.value;
  // Ваша логика

  const res = await fetch("http://localhost:3000/project/3/case-year", {
    method: "POST",
    body: JSON.stringify(formDataCreateTask.value),
    headers: {
      "Content-Type": "application/json",
    },
  });

  await getList();
};

const putTask = async () => {
  const res = await fetch(
    `http://localhost:3000/project/3/case-year/${idEditElement.value}`,
    {
      method: "PUT",
      body: JSON.stringify({ name: stateModalName.value }),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  idEditElement.value = null;
  stateModalName.value = "";
};

const handleConfirmTwo = async () => {
  await putTask();
  await getList();
};

const currentListMonths = computed(() => {
  if (pickedQ.value === 1) {
    const res = optionsMonth.value.filter((item) => item.keyQ === "Q1");
    return res;
  } else if (pickedQ.value === 2) {
    const res = optionsMonth.value.filter((item) => item.keyQ === "Q2");

    return res;
  } else if (pickedQ.value === 3) {
    const res = optionsMonth.value.filter((item) => item.keyQ === "Q3");

    return res;
  } else if (pickedQ.value === 4) {
    const res = optionsMonth.value.filter((item) => item.keyQ === "Q4");
    return res;
  }
});

const selectQuarter = (quarterNumber) => {
  const filtered = optionsMonth.value.filter(
    (item) => item.keyQ === `Q${quarterNumber}`,
  );
  if (filtered[0]) {
    pickedQ.value = filtered[0].id;
  }
};

// watch(
//   [optionsMonth],
//   () => {
//     // console.log(pickedQ.value, optionsMonth.value);
//     // console.log(currentListMonths.value[0].keyQ);
//     if (currentListMonths.value[0].keyQ === "Q1") {
//       pickedQ.value = currentListMonths.value[0].id;
//     } else if (currentListMonths.value[0].keyQ === "Q2") {
//       // console.log(currentListMonths.value[0]);
//       pickedQ.value = { id: 4, name: "Яц" };
//     } else if (currentListMonths.value[0].keyQ === "Q3") {
//     } else if (currentListMonths.value[0].keyQ === "Q4") {
//     }
//   },
//   { immediate: true },
// );

const isModalOpenThree = ref(false);
const openModalThree = () => {
  isModalOpenThree.value = true;
};

const handleConfirmThree = async () => {
  const res = await fetch("http://localhost:3000/project/3/case-year-targets", {
    method: "POST",
    body: JSON.stringify({ name: stateModalName.value }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const resJson = await res.json();
  await getListTargets();
};

const listYearTargets = ref([]);
const getListTargets = async () => {
  const res = await fetch("http://localhost:3000/project/3/case-year-targets");
  const resJson = await res.json();

  listYearTargets.value = resJson;
};
</script>

<template>
  <div>
    <button @click="openModal">create new task year</button>

    <Modal
      v-model="isModalOpen"
      title="Простое модальное окно"
      @confirm="handleConfirm"
    >
      <p>Это содержимое модального окна</p>
      {{ stateModalName }}
      <input v-model="stateModalName" placeholder="Название задачи" />

      <div>
        <select v-model="pickedQ">
          <option v-for="option in optionsQ" :value="option.id">
            {{ option.name }}
          </option>
        </select>
      </div>
      {{ pickedMonth }}
      <select v-model="pickedMonth">
        <option
          v-for="item in currentListMonths"
          :value="item.id"
          :key="item.id"
        >
          {{ item.name }}
        </option>
      </select>

      <div>
        res -
        <pre> {{ formDataCreateTask }}</pre>
      </div>
    </Modal>

    <Modal
      v-model="isModalOpenTwo"
      title="Простое модальное окно"
      @confirm="handleConfirmTwo"
    >
      <p>Это содержимое модального окна</p>
      <input v-model="stateModalName" placeholder="Название задачи" />
    </Modal>

    <Modal
      v-model="isModalOpenThree"
      title="Простое модальное окно"
      @confirm="handleConfirmThree"
    >
      <p>Создать цель на год</p>
      <input v-model="stateModalName" placeholder="Название цели" />
    </Modal>

    <div style="margin-bottom: 100px">
      <h4>дела на год 2026</h4>

      <button @click="openModalThree">create</button>

      <div style="display: flex">
        <div
          style="padding: 10px; background: gray; margin-right: 20px"
          v-for="item in listYearTargets"
        >
          {{ item.name }}
        </div>
      </div>
    </div>

    <h4>
      При создании должно быть params - Q1/Q2/Q3/Q4 + month номер 1-12 месяц +
      название задачи
    </h4>

    <div style="display: flex; flex-wrap: wrap">
      <div style="width: 50%">
        <h4 style="text-align: center">Q1</h4>
        <div
          style="
            display: flex;
            justify-content: space-around;
            margin-bottom: 100px;
          "
        >
          <div>
            <p>Январь</p>
            <ul v-for="item in firstMonth">
              <li>
                {{ item.name }}
                <button @click="deleteItemById(item.id)">DEL</button>
                <button @click="openModalTwo(item.id, item.name)">EDIT</button>
              </li>
            </ul>
          </div>

          <div>
            <p>Февраль</p>
            <ul v-for="item in secondMonth">
              <li>
                {{ item.name }}
                <button @click="deleteItemById(item.id)">DEL</button>
              </li>
            </ul>
          </div>

          <div>
            <p>Март</p>
            <ul v-for="item in thorMonth">
              <li>
                {{ item.name }}
                <button @click="deleteItemById(item.id)">DEL</button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div style="width: 50%">
        <h4 style="text-align: center">Q2</h4>
        <div
          style="
            display: flex;
            justify-content: space-around;
            margin-bottom: 100px;
          "
        >
          <div>
            <p>Апрель</p>
            <ul v-for="item in forMonth">
              <li>
                {{ item.name }}
                <button @click="deleteItemById(item.id)">DEL</button>
              </li>
            </ul>
          </div>

          <div>
            <p>Май</p>
            <ul v-for="item in fiveMonth">
              <li>
                {{ item.name }}
                <button @click="deleteItemById(item.id)">DEL</button>
              </li>
            </ul>
          </div>

          <div>
            <p>Июнь</p>
            <ul v-for="item in sixMonth">
              <li>
                {{ item.name }}
                <button @click="deleteItemById(item.id)">DEL</button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div style="width: 50%">
        <h4 style="text-align: center">Q3</h4>
        <div style="display: flex; justify-content: space-around">
          <div>
            <p>Июль</p>
            <ul v-for="item in sevenMonth">
              <li>
                {{ item.name }}
                <button @click="deleteItemById(item.id)">DEL</button>
              </li>
            </ul>
          </div>

          <div>
            <p>Август</p>
            <ul v-for="item in ethMonth">
              <li>
                {{ item.name }}
                <button @click="deleteItemById(item.id)">DEL</button>
              </li>
            </ul>
          </div>

          <div>
            <p>Сентябрь</p>
            <ul v-for="item in nineMonth">
              <li>
                {{ item.name }}
                <button @click="deleteItemById(item.id)">DEL</button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div style="width: 50%">
        <h4 style="text-align: center">Q4</h4>
        <div style="display: flex; justify-content: space-around">
          <div>
            <p>Октябрь</p>
            <ul v-for="item in tenMonth">
              <li>
                {{ item.name }}
                <button @click="deleteItemById(item.id)">DEL</button>
              </li>
            </ul>
          </div>

          <div>
            <p>Ноябрь</p>
            <ul v-for="item in elevenMonth">
              <li>
                {{ item.name }}
                <button @click="deleteItemById(item.id)">DEL</button>
              </li>
            </ul>
          </div>

          <div>
            <p>Декабрь</p>
            <ul v-for="item in fdaMonth">
              <li>
                {{ item.name }}
                <button @click="deleteItemById(item.id)">DEL</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
