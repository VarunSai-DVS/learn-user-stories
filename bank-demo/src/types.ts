export type AccountType = {
    id: number,
    balance: number
}

export interface BankType {
    createAccount(username: string, age: number, accountNumber: number): AccountType
    depositMoney(accountNumber: number, amount: number): void;
    withdrawMoney(accountNumber: number, amount: number): void;
}