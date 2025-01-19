import { Bank } from '../src/bank';

// setup

const accounts = [{ id: 1234567890, balance: 3000 },
    { id: 1234567891, balance: 5000 }];

const usernames = ['user1', 'user2'];
const bank = new Bank(accounts, usernames);

// Scenario 1: customer is able to create a new bank account
const acc = bank.createAccount('user1', 23, 1234567892);
if(acc.id !== 1234567892 || acc.balance !== 0 || acc.id.toString().length !== 10) {
    console.log('Scenario 1 failed');
}
else {
    console.log('Scenario 1 passed');
}

try {
    const acc1 = bank.createAccount('user1', 23, 1234567892);
    console.log('Scenario 1 failed');
}
catch(e) {
    console.log('Scenario 1 passed');
}

// Scenario 2: customer is unable to create a new bank account due to invalid age

try {
    bank.createAccount('user1', 17, 1234567893);
    console.log('Scenario 2 failed');
}
catch(e) {
    console.log('Scenario 2 passed');
}

// Scenario 3: customer is unable to create a new bank account due to invalid username

try {
    bank.createAccount('user3', 23, 1234567894);
    console.log('Scenario 3 failed');
}
catch(e) {
    console.log('Scenario 3 passed');
}

// Testing the Deposit functionality.
try {
    bank.depositMoney(1234567890, 500);
    const updatedAccount = accounts.find(acc => acc.id === 1234567890);
    if (updatedAccount?.balance === 3000 + 500) {
        console.log('Scenario 4 passed');
    } else {
        console.log('Scenario 4 failed');
    }
} catch (e) {
    console.log('Scenario 4 failed');
}

// Scenario 5: Deposit fails due to invalid account number
try {
    bank.depositMoney(1234567899, 200);
    console.log('Scenario 5 failed');
} catch (e) {
    console.log('Scenario 5 passed');
}

// Scenario 6: Deposit fails due to invalid amount of money
try {
    bank.depositMoney(1234567890, -500);
    console.log('Scenario 6 failed');
} catch (e) {
    console.log('Scenario 6 passed');
}
try {
    bank.depositMoney(1234567891, 0);
    console.log('Scenario 7 failed');
} catch (e) {
    console.log('Scenario 7 passed');
}

// Testing the Withdraw functionality.
try {
    // Added some money above.
    bank.withdrawMoney(1234567890, 500);
    const updatedAccount = accounts.find(acc => acc.id === 1234567890);
    if (updatedAccount?.balance === 3000) {
        console.log('Scenario 8 passed');
    } else {
        console.log('Scenario 8 failed');
    }
} catch (e) {
    console.log('Scenario 8 failed');
}

// Scenario 9: Withdraw fails due to invalid account number
try {
    bank.withdrawMoney(1234567899, 200);
    console.log('Scenario 9 failed');
} catch (e) {
    console.log('Scenario 9 passed');
}

// Scenario 10: Withdraw fails due to invalid amount of money
try {
    bank.withdrawMoney(1234567890, -500);
    console.log('Scenario 10 failed');
} catch (e) {
    console.log('Scenario 10 passed');
}
try {
    bank.withdrawMoney(1234567891, 10000);
    console.log('Scenario 11 failed');
} catch (e) {
    console.log('Scenario 11 passed');
}