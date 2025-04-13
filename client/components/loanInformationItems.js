
import faker from '@faker-js/faker';

export const loanInformationItems = [];
const statuses = ['Processing', 'Delinquent', 'Paid'];

const generateFakeData = () => {
    for (let i = 0; i < 15; i++) {
        loanInformationItems.push({
            id: i,
            application_id: faker.datatype.uuid(),
            original_loan_date: faker.date.past().toLocaleDateString(),
            full_name: faker.name.firstName() + ' ' + faker.name.lastName(),
            email: faker.internet.email(),
            outstanding_loan_amount: faker.finance.amount(250000, 750000, 2 ,"$", true),
            total_loan_amount: faker.finance.amount(250000, 750000, 2, "$", true),
            next_loan_payment_date: faker.date.future().toLocaleDateString(),
            status: statuses[Math.floor(Math.random() * statuses.length)],
        });
    }
}

if (!loanInformationItems.length) {
    generateFakeData();
}
