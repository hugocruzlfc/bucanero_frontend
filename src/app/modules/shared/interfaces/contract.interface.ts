export interface Contract {
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
    userId: number;
    suplements?: {
        id: number;
        amount: number;
        contractId: number;
        createdAt: Date
    };
}

export class ContractEsp {
    No_EXACT?: string;
    Estado?: string
    Sucursal?: string;
    Fecha_de_Firma?: Date;
    Proveedor_Cliente?: string;
    Área?: string;
    Tipo_de_Contrato?: string;
    Objeto?: string;
    Tramitador?: string;
    Vigencia?: number;
    Día_Año?: string;
    Forma_Pago?: string;
    Término_Pago?: string;
    Nacional_Internacional?: string;
    Valor_Total?: number;
    Moneda?: string;
    Exportación?: string;
    Observaciones?: string
}


