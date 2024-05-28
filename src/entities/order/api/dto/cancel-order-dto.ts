export interface CancelOrderDTO {
  webOrderId: number;
  rejectedMessage: string;
}

export interface GetDocumentDTO {
  orderId: number;
}
