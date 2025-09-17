import { type CreateNameInput, type Name } from '../schema';

export async function createName(input: CreateNameInput): Promise<Name> {
    // This is a placeholder declaration! Real code should be implemented here.
    // The goal of this handler is creating a new name and persisting it in the database.
    return Promise.resolve({
        id: 0, // Placeholder ID
        name: input.name,
        created_at: new Date(),
        updated_at: new Date()
    } as Name);
}