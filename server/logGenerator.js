// Tyler Santosuosso

import { faker } from '@faker-js/faker';

export class LogGenerator {
    constructor() {
        this.levels = ['INFO', 'WARN', 'ERROR'];
        // Sample log messages with placeholders that will be filled in by faker
        this.messages = [
            "User {name} logged in",
            "Failed login attempt for user {name}",
            "User {name} logged out",
            "Database connection established",
            "Database connection lost",
            "Payment failed for order {orderId}",
            "Payment succeeded for order {orderId}",
            "Service {serviceName} started",
            "Service {serviceName} stopped",
            "Unexpected error occurred: {errorDetail}"
        ];
    }

    // Helper to pick a random item from an array
    randomChoice(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    // Helper to generate a message with placeholders replaced
    generateMessage(template) {
        return template
            .replace('{name}', faker.person.fullName())
            .replace('{orderId}', faker.string.uuid())
            .replace('{serviceName}', faker.commerce.productName())
            .replace('{errorDetail}', faker.lorem.sentence());
    } 

    // Generate a single log entry using faker for realistic data
    generateLog() {
        const level = this.randomChoice(this.levels);
        const messageTemplate = this.randomChoice(this.messages);
        const message = this.generateMessage(messageTemplate);
        const timestamp = new Date().toISOString();
        return { timestamp, level, message };
    }
}