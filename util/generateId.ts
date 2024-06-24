export function generateId(): string {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const timestamp = Date.now().toString(36); // Convert current timestamp to base36
    let randomString = '';

    for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }

    return randomString + timestamp;
}