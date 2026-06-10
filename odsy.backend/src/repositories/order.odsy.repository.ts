type Order = {
    id: string;
    userId: string;
    totalPrice: number;
    status: "pending" | "paid" | "shipped" | "cancelled";
    createdAt: string;
}

export class OrderOdsyRepository {
    // Наш статичний масив для збереження замовлень в оперативній пам'яті (ОЗУ)
    private static orders: Order[] = [];

    async create(order: Order): Promise<Order> {
        // Очищаємо ID від можливих зайвих пробілів перед збереженням
        const cleanOrder: Order = {
            ...order,
            id: order.id.trim(),
            userId: order.userId.trim()
        };
        
        OrderOdsyRepository.orders.push(cleanOrder);
        return cleanOrder;
    }

    async findAll(): Promise<Order[]> {
        // Повертаємо копію масиву
        return [...OrderOdsyRepository.orders];
    }

    async findById(id: string): Promise<Order | undefined> {
        const cleanId = id.trim();
        // Шукаємо замовлення за ID в нашому масиві
        return OrderOdsyRepository.orders.find(order => order.id === cleanId);
    }

    async update(id: string, data: Partial<Order>): Promise<Order | undefined> {
        const cleanId = id.trim();
        const index = OrderOdsyRepository.orders.findIndex(order => order.id === cleanId);
        
        if (index === -1) return undefined;

        // Безпечно оновлюємо поля
        const updatedFields: Partial<Order> = {};
        if (data.userId !== undefined) updatedFields.userId = data.userId.trim();
        if (data.totalPrice !== undefined) updatedFields.totalPrice = data.totalPrice;
        if (data.status !== undefined) updatedFields.status = data.status;

        OrderOdsyRepository.orders[index] = {
            ...OrderOdsyRepository.orders[index],
            ...updatedFields,
            id: cleanId // ID змінювати не можна
        };

        return OrderOdsyRepository.orders[index];
    }

    async delete(id: string): Promise<boolean> {
        const cleanId = id.trim();
        const index = OrderOdsyRepository.orders.findIndex(order => order.id === cleanId);
        
        if (index === -1) return false;

        // Видаляємо замовлення з масиву
        OrderOdsyRepository.orders.splice(index, 1);
        return true;
    }
}