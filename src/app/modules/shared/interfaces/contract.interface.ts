export interface Contract {
    id?: number;
    exactNumber: string;
    sucursal: string;
    signatureDate: Date;
    supplierClient: string,
    aplicantArea: string;
    supplementContract: string;
    object: string;
    processor: string;
    effect: Date;
    wayToPay: string;
    termToPay: string;
    nationalInternational: boolean;
    totalValue: number;
    currencyPay: string;
    exportation: boolean;
    observations: string;
    contractAttached: string;
    estate?: string
}

export class ContractEsp {
    No_EXACT?: string;
    Estado?: string
    Sucursal?: string;
    Fecha_de_Firma?: Date;
    Proveedor_Cliente?: string;
    Área?: string;
    Contrato_Suplemento?: string;
    Objeto?: string;
    Tramitador?: string;
    Vigencia?: Date;
    Forma_Pago?: string;
    Término_Pago?: string;
    Nacional_Internacional?: string;
    Valor_Total?: number;
    Moneda?: string;
    Exportación?: string;
    Observaciones?: string
}
