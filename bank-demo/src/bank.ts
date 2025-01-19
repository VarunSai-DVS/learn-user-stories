import { BankType, AccountType } from './types';

/**
 * Bank class implements the BankType interface
 * and stores accounts and usernames
 * and is able to create new accounts
 */

export class Bank implements BankType {

    private accounts: AccountType[] = [];
    private usernames: string[] = [];

    /**
     *
     * @param accounts - a list of accounts to be stored in the bank
     * @param usernames - a list bank verified usernames
     * @returns a new Bank object
     */
    public constructor(accounts: AccountType[], usernames: string[]) {
        this.accounts = accounts;
        this.usernames = usernames;
    }

    /**
     *
     * @param username - a string representing the username
     * @returns true if the username exists in the bank, false otherwise
     */
    private isUsernameExists(username: string): boolean {
        return this.usernames.includes(username);
    }

    /**
     *
     * @param accountNumber - a number representing the account number
     * @returns an AccountType object if the account exists, undefined otherwise
     */
    private findAccount(accountNumber: number): AccountType | undefined {
        return this.accounts.find(account => account.id === accountNumber);
    }

    /**
     *
     * @param accountNumber - a number representing the account number
     * @returns true if the account number has 10 digits, false otherwise
     */
    private isAccountNumberValid(accountNumber: number): boolean {
        return accountNumber.toString().length === 10;
    }

    /**
     *
     * @param username - a string representing the username of the customer
     * @param age - a number representing the age of the customer
     * @param accountNumber - a number representing the account number of the customer that needs to be created
     * @returns a new account of type AccountType
     */
    createAccount(username: string, age: number, accountNumber: number): AccountType {
        if(!this.isUsernameExists(username)) {
            throw new Error('User not found');
        }
        if(!this.isAccountNumberValid(accountNumber)) {
            throw new Error('Invalid account number');
        }
        if(this.findAccount(accountNumber)) {
            throw new Error('Account already exists');
        }

        if(age < 18) {
            throw new Error('Age must be 18 or above');
        }

        const newAccount: AccountType = {
            id: accountNumber,
            balance: 0
        }

        this.accounts.push(newAccount);
        return newAccount;
    }

    /**
     * Deposits certain amount of money into a bank account.
     * @param accountNumber - The ID of the bank account.
     * @param amount - The amount of money to be deposited.
     * @throws Error if the account number is invalid or if the deposit amount is invalid.
     */
    depositMoney(accountNumber: number, amount: number): void {
        if (amount <= 0) throw new Error('Deposit amount is invalid');
        const account = this.findAccount(accountNumber);
        if (!account) throw new Error('Account number not found');
        account.balance += amount;
    }

    /**
     * Withdraws certain amount of money from a bank account.
     * @param accountNumber - The ID of the bank account.
     * @param amount - The amount of money to be withdrawn.
     * @throws Error if the account does not exist, if the withdrawal amount is invalid or too high.
     */
    public withdrawMoney(accountNumber: number, amount: number): void {
        if (amount <= 0) throw new Error('Withdrawal amount is invalid');
        const account = this.findAccount(accountNumber);
        if (!account) throw new Error('Account number not found');
        if (account.balance < amount) throw new Error('Insufficient funds for the account');
        account.balance -= amount; // Deduct balance
    }
}