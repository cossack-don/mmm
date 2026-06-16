/// <reference types="cypress" />

describe('Создание 50 записей задач (todos) для проекта', () => {
  it('POST /project/3/todos - создает 50 задач для проекта с ID=3', () => {
    const createdTodos = [];
    const projectId = 3;

    // Создаем 50 задач с помощью цикла
    for (let i = 1; i <= 50; i++) {
      const todoData = {
        name: `name-${i}`,
        description: `description-${i}`,
      };

      // Создаем задачу для проекта
      cy.request({
        method: 'POST',
        url: `/project/${projectId}/todos`,
        body: todoData,
        failOnStatusCode: false, // Чтобы тест продолжался даже при ошибке
      }).then((res) => {
        // Проверяем успешный статус ответа
        expect(res.status).to.equal(201); // или 200/201 в зависимости от API

        // Сохраняем ID созданной задачи (если нужно для очистки)
        if (res.body && res.body.id) {
          createdTodos.push(res.body.id);
        }

        // Логируем создание каждой задачи
        cy.log(
          `Создана задача ${i}: ${todoData.name} - ${todoData.description}`
        );
      });
    }

    // Опционально: проверяем, что действительно создано 50 задач
    cy.then(() => {
      expect(createdTodos.length).to.equal(50);
      cy.log(`Всего создано задач: ${createdTodos.length}`);
    });
  });
});
