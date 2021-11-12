export interface Expired {
    id?: number;
    exactNumber?: string;
    sucursal: string;
    signatureDate: Date;
    supplierClient: string,
    aplicantArea: string;
    contractType: string;
    object: string;
    processor: string;
    effect: number;
    dayYear: string;
    wayToPay: string;
    termToPay: string;
    nationalInternational: boolean;
    totalValue: number;
    currencyPay: string;
    exportation: boolean;
    observations: string;
    contractAttached: string;
    estate?: string;
    dayToExpired?: number;
    suplements?: {
        id: number;
        amount: number;
        contractId: number;
        createdAt: Date
    };
}