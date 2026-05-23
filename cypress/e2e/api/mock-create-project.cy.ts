/// <reference types="cypress" />

/// <reference types="cypress" />

describe("Создание 50 записей проектов", () => {
  it("POST /project - создает 50 проектов", () => {
    const createdProjects = [];
    
    // Создаем 50 проектов с помощью цикла
    for (let i = 1; i <= 50; i++) {
      const projectData = {
        name: `Тестовый проект ${i}`,
      };
      
      // Создаем проект
      cy.request({
        method: "POST",
        url: "/project",
        body: projectData,
        failOnStatusCode: false // Чтобы тест продолжался даже при ошибке
      }).then((res) => {

        expect(res.status).to.equal(201); // или 200, в зависимости от API
        
        // Сохраняем ID созданного проекта (если нужно для очистки)
        if (res.body && res.body.id) {
          createdProjects.push(res.body.id);
        }
        
        // Логируем создание каждого проекта
        cy.log(`Создан проект ${i}: ${projectData.name}`);
      });
    }
    
    // Опционально: проверяем, что действительно создано 50 проектов
    cy.then(() => {
      expect(createdProjects.length).to.equal(50);
      cy.log(`Всего создано проектов: ${createdProjects.length}`);
    });
  });
});
