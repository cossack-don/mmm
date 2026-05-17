#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Парсим аргументы командной строки
const args = process.argv.slice(2);
let fileName = null;
let operation = null;
let isKeysFile = false;

// Проходим по всем аргументам
for (let i = 0; i < args.length; i++) {
  // Проверяем на флаги с --name или -n
  if (args[i] === "--name" || args[i] === "-n") {
    fileName = args[i + 1];
    i++; // пропускаем следующий аргумент
    continue;
  }

  // Проверяем на операции
  if (args[i] === "--delete" || args[i] === "-d") {
    operation = "delete";
  } else if (args[i] === "--create" || args[i] === "-c") {
    operation = "create";
  } else if (args[i] === "--update" || args[i] === "-u") {
    operation = "update";
  } else if (args[i] === "--get" || args[i] === "-g") {
    operation = "get";
  } else if (args[i] === "--keys" || args[i] === "-k") {
    isKeysFile = true;
  }
}

// Валидация
if (!fileName) {
  console.log("❌ Ошибка: не указано имя файла");
  console.log("Использование:");
  console.log("  Для keys файла: node generate.js --name case-year --keys");
  console.log("  Для query файла: node generate.js --name case-year --delete");
  console.log("\nПримеры:");
  console.log("  node generate.js --name case-year --keys");
  console.log("  node generate.js --name case-year --delete");
  process.exit(1);
}

// Генерация keys файла
if (isKeysFile) {
  // Преобразуем case-year в caseYearTargets (camelCase с суффиксом Targets)
  const camelCaseName = fileName.replace(/-([a-z])/g, (_, letter) =>
    letter.toUpperCase(),
  );
  const keysObjectName = `${camelCaseName}Keys`;

  // Формируем имя для getList (например, case-year -> getListCaseYear)
  const getListName = `getList${camelCaseName.charAt(0).toUpperCase() + camelCaseName.slice(1)}`;

  const fullFileName = `${fileName}.keys.query.ts`;
  const filePath = path.join(process.cwd(), fullFileName);

  const content = `export const ${keysObjectName} = {
  ${getListName}: "${getListName}",
};
`;

  try {
    // Используем синхронную запись
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`✅ Файл "${fullFileName}" успешно создан`);
    console.log(`📁 Путь: ${process.cwd()}`);
    console.log(`📄 Содержимое:\n${content}`);
  } catch (err) {
    console.error("❌ Ошибка при создании файла:", err);
    process.exit(1);
  }

  process.exit(0);
}

// Генерация query файла
if (!operation) {
  console.log("❌ Ошибка: не указана операция");
  console.log("Доступные операции: --delete, --create, --update, --get");
  process.exit(1);
}

const fullFileName = `${fileName}.${operation}.query.ts`;
const filePath = path.join(process.cwd(), fullFileName);

const content = `// Файл: ${fullFileName}
// Создан: ${new Date().toLocaleString()}

export const nameDeleteQuery = {
  DELETE: () => ({
    mutationFn: async ({ idProject, idTask }: any) => {
      // API
    },
    onSuccess: (data, variables, onMutateResult, context) => {
      // const queryClient = context.client;
      // queryClient.invalidateQueries({
      //   queryKey: ["query_KEY"],
      // });
    },
  }),
};
`;

try {
  // Используем синхронную запись
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`✅ Файл "${fullFileName}" успешно создан`);
  console.log(`📁 Путь: ${process.cwd()}`);
} catch (err) {
  console.error("❌ Ошибка при создании файла:", err);
  process.exit(1);
}
