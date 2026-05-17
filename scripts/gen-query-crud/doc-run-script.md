# Генерация keys файла
node scripts/gen-query-crud/index.js --name case-year --keys

# Генерация query файлов
node scripts/gen-query-crud/index.js --name case-year --delete
# Создаст: case-year.delete.query.ts

node scripts/gen-query-crud/index.js --name case-year --create
# Создаст: case-year.create.query.ts

node scripts/gen-query-crud/index.js --name case-year --update
# Создаст: case-year.update.query.ts

node scripts/gen-query-crud/index.js --name case-year --get
# Создаст: case-year.get.query.ts

# Сокращённые варианты
node scripts/gen-query-crud/index.js -n case-year -k  # keys
node scripts/gen-query-crud/index.js -n case-year -d  # delete
node scripts/gen-query-crud/index.js -n case-year -c  # create
node scripts/gen-query-crud/index.js -n case-year -u  # update
node scripts/gen-query-crud/index.js -n case-year -g  # get