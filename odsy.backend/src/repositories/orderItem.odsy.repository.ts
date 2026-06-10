type OrderItem = {
    id: string;
    orderId: string; 
    productId: string;
    quantity: number;
};

export class OrderItemOdsyRepository {
    // Наш статичний масив для збереження позицій замовлень в ОЗУ
    private static orderItems: OrderItem[] = [];

    async create(orderitem: OrderItem): Promise<OrderItem> {
        const cleanItem: OrderItem = {
            id: orderitem.id.trim(),
            orderId: orderitem.orderId.trim(),
            productId: orderitem.productId.trim(),
            quantity: orderitem.quantity
        };

        OrderItemOdsyRepository.orderItems.push(cleanItem);
        return cleanItem;
    }

    async findAll(): Promise<OrderItem[]> {
        // Повертаємо копію масиву
        return [...OrderItemOdsyRepository.orderItems];
    }

    async findById(id: string): Promise<OrderItem | undefined> {
        const cleanId = id.trim();
        // Шукаємо позицію в масиві
        return OrderItemOdsyRepository.orderItems.find(item => item.id === cleanId);
    }

    async update(id: string, data: Partial<OrderItem>): Promise<OrderItem | undefined> {
        const cleanId = id.trim();
        const index = OrderItemOdsyRepository.orderItems.findIndex(item => item.id === cleanId);

        if (index === -1) return undefined;

        // Безпечно збираємо оновлені поля
        const updatedFields: Partial<OrderItem> = {};
        if (data.orderId !== undefined) updatedFields.orderId = data.orderId.trim();
        if (data.productId !== undefined) updatedFields.productId = data.productId.trim();
        if (data.quantity !== undefined) updatedFields.quantity = data.quantity;

        OrderItemOdsyRepository.orderItems[index] = {
            ...OrderItemOdsyRepository.orderItems[index],
            ...updatedFields,
            id: cleanId // Ідентифікатор залишається незмінним
        };

        return OrderItemOdsyRepository.orderItems[index];
    }

    async delete(id: string): Promise<boolean> {
        const cleanId = id.trim();
        const index = OrderItemOdsyRepository.orderItems.findIndex(item => item.id === cleanId);

        if (index === -1) return false;

        // Видаляємо елемент із масиву
        OrderItemOdsyRepository.orderItems.splice(index, 1);
        return true;
    }
}