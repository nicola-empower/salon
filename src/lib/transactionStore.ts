export interface Transaction {
    id: string;
    amount: number;
    tip: number;
    staffId: string;
    method: string;
    timestamp: number;
}

const STORAGE_KEY = 'salon_transactions';

export const TransactionStore = {
    getAll: (): Transaction[] => {
        if (typeof window === 'undefined') return [];
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    },

    add: (transaction: Omit<Transaction, 'id' | 'timestamp'>) => {
        const transactions = TransactionStore.getAll();
        const newTransaction = {
            ...transaction,
            id: `txn-${Date.now()}`,
            timestamp: Date.now()
        };
        transactions.push(newTransaction);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));

        // Dispatch event for real-time updates across components
        window.dispatchEvent(new Event('transaction-updated'));
        return newTransaction;
    },

    getDailyRevenue: () => {
        const transactions = TransactionStore.getAll();
        // meaningful time filter could go here, for now assume all are "today" for demo
        return transactions.reduce((acc, curr) => acc + curr.amount, 0);
    },

    getStaffTips: (staffId: string) => {
        const transactions = TransactionStore.getAll();
        return transactions
            .filter(t => t.staffId === staffId)
            .reduce((acc, curr) => acc + curr.tip, 0);
    }
};
