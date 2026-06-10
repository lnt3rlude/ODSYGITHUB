type User = {
    id: string;
    userName: string;
    email: string;
};

export class UserOdsyRepository {
    // Статичний масив для збереження користувачів в ОЗУ
    private static users: User[] = [];

    // --- СТВОРЕННЯ КОРИСТУВАЧА ---
    async create(user: User): Promise<User> {
        const cleanUser: User = {
            id: user.id.trim(),
            userName: user.userName.trim(),
            email: user.email.trim()
        };

        UserOdsyRepository.users.push(cleanUser);
        return cleanUser;
    }

    // --- ПОШУК УСІХ ---
    async findAll(): Promise<User[]> {
        return [...UserOdsyRepository.users];
    }

    // --- ПОШУК ПО ID ---
    async findById(id: string): Promise<User | undefined> {
        const cleanId = id.trim();
        return UserOdsyRepository.users.find(user => user.id === cleanId);
    }

    // --- ОНОВЛЕННЯ КОРИСТУВАЧА ---
    async update(id: string, data: Partial<User>): Promise<User | undefined> {
        const cleanId = id.trim();
        const index = UserOdsyRepository.users.findIndex(user => user.id === cleanId);

        if (index === -1) return undefined;

        // Збираємо оновлені поля та чистимо їх від пробілів
        const updatedFields: Partial<User> = {};
        if (data.userName !== undefined) updatedFields.userName = data.userName.trim();
        if (data.email !== undefined) updatedFields.email = data.email.trim();

        UserOdsyRepository.users[index] = {
            ...UserOdsyRepository.users[index],
            ...updatedFields,
            id: cleanId // Залишаємо оригінальний ID незмінним
        };

        return UserOdsyRepository.users[index];
    }

    // --- НАДІЙНЕ ВИДАЛЕННЯ ---
    async delete(id: string): Promise<boolean> {
        const cleanId = id.trim();
        const index = UserOdsyRepository.users.findIndex(user => user.id === cleanId);

        if (index === -1) return false; // Якщо немає — сервіс видасть 404

        // Видаляємо користувача з оперативної пам'яті
        UserOdsyRepository.users.splice(index, 1);
        return true;
    }
}