// backend/utils/generatePricing.js

export function generatePricing(basePrice) {
    const pricing = [];
    const today = new Date();

    for (let i = 0; i < 30; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);

        let price = basePrice;

        // Example weekend pricing
        const day = date.getDay();
        if (day === 0 || day === 6) {
            price = Math.round(price * 1.2); // 20% increase
        }

        pricing.push({
            date,
            price
        });
    }

    return pricing;
}
