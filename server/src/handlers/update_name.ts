import { type UpdateNameInput, type Name } from '../schema';

export async function updateName(input: UpdateNameInput): Promise<Name> {
    // This is a placeholder declaration! Real code should be implemented here.
    // The goal of this handler is updating an existing name in the database.
    return Promise.resolve({
        id: input.id,
        name: input.name,
        created_at: new Date(), // This would be the original creation date from DB
        updated_at: new Date()
    } as Name);
}