type Category = {
  id: string;
  name: string;
};

export class CategoryOdsyRepository {
  // Наш локальний "репозиторій в пам'яті" (масив об'єктів)
  // static гарантує, що дані зберігаються між різними викликами екземплярів класу
  private static categories: Category[] = [];

  async create(category: Category): Promise<Category> {
    // Просто додаємо об'єкт у масив
    CategoryOdsyRepository.categories.push(category);
    return category;
  }

  async findAll(): Promise<Category[]> {
    // Повертаємо копію масиву, щоб випадково не пошкодити внутрішні дані
    return [...CategoryOdsyRepository.categories];
  }

  async findById(id: string): Promise<Category | undefined> {
    // Шукаємо категорію за її ID в масиві
    return CategoryOdsyRepository.categories.find(cat => cat.id === id);
  }

  async update(
    id: string,
    data: Partial<Category>
  ): Promise<Category | undefined> {
    // Шукаємо індекс елемента в масиві
    const index = CategoryOdsyRepository.categories.findIndex(cat => cat.id === id);
    
    // Якщо не знайшли — повертаємо undefined (сервіс кине 404)
    if (index === -1) return undefined;

    // Оновлюємо лише ті поля, які прийшли в data (безпечне злиття)
    CategoryOdsyRepository.categories[index] = {
      ...CategoryOdsyRepository.categories[index],
      ...data,
      id // Забороняємо змінювати ID під час оновлення
    };

    return CategoryOdsyRepository.categories[index];
  }

  async delete(id: string): Promise<boolean> {
    const index = CategoryOdsyRepository.categories.findIndex(cat => cat.id === id);
    
    if (index === -1) return false;

    // Видаляємо 1 елемент з масиву за його індексом
    CategoryOdsyRepository.categories.splice(index, 1);
    return true;
  }
}