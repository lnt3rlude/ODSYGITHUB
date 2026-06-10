export type Product = {
    id: string;
    title: string;
    description: string;
    price: number;
    stock: number;
    categoryId: string;
    sales: number;
}

export class ProductOdsyRepository {
    // Наш статичний масив для збереження продуктів в оперативній пам'яті (ОЗУ)
    private static products: Product[] = [];

    async create(product: Product): Promise<Product> {
        ProductOdsyRepository.products.push(product);
        return product;
    }

    async findAll(): Promise<Product[]> {
        return [...ProductOdsyRepository.products];
    }

    async findById(id: string): Promise<Product | undefined> {
        return ProductOdsyRepository.products.find(prod => prod.id === id);
    }

    async update(
        id: string,
        data: Partial<Product>
    ): Promise<Product | undefined> {
        const index = ProductOdsyRepository.products.findIndex(prod => prod.id === id);
        
        if (index === -1) return undefined;

        // Безпечно зливаємо змінені поля з існуючим об'єктом
        ProductOdsyRepository.products[index] = {
            ...ProductOdsyRepository.products[index],
            ...data,
            id // Забороняємо змінювати ID під час оновлення
        };

        return ProductOdsyRepository.products[index];
    }

    async delete(id: string): Promise<boolean> {
        const index = ProductOdsyRepository.products.findIndex(prod => prod.id === id);
        
        if (index === -1) return false;

        ProductOdsyRepository.products.splice(index, 1);
        return true;
    }

    // Пошук за назвою (реєстронезалежний, як LOWER + LIKE %...%)
    async findByTitle(title: string): Promise<Product[]> {
        const lowerTitle = title.toLowerCase();
        return ProductOdsyRepository.products.filter(prod => 
            prod.title.toLowerCase().includes(lowerTitle)
        );
    }

    // Фільтрація за категорією
    async findByCategory(categoryId: string): Promise<Product[]> {
        return ProductOdsyRepository.products.filter(prod => prod.categoryId === categoryId);
    }

    // Фільтрація за діапазоном цін (BETWEEN min AND max)
    async findByPriceRange(min: number, max: number): Promise<Product[]> {
        return ProductOdsyRepository.products.filter(prod => 
            prod.price >= min && prod.price <= max
        );
    }
}