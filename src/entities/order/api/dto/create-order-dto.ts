export interface OrderDeliveryDTO {
  dateDispatch: string;
  timeDispatch?: string | null;
  timeUntilDispatch?: string | null;
  dateReceipt: string;
  timeReceipt?: string | null;
  timeUntilReceipt?: string | null;
  dispatcherName: string;
  dispatcherStreet?: string | null;
  receiptName: string;
  receiptStreet?: string | null;
  dispatcherCountry: string;
  receiptCountry: string;
  dispatcherZipCity: string;
  receiptZipCity: string;
  dispatcherPhone?: string | null;
  receiptPhone?: string | null;
  reference?: string | null;
  detailsMessage?: string | null;
}

export interface OrderProductDTO {
  productName: string;
  productType: string;
  productCount: number;
  effectiveWeight: number;
  description?: string | null;
  volume: number;
  square: number;
  ldm: number;
  un?: string | null;
}

export interface CreateOrderRequestDTO {
  deliveryData: OrderDeliveryDTO;
  products: OrderProductDTO[];
}
