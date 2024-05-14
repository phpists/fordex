import { RequestOrderModel } from '../../model/model.types';
import { RequestOrderDTO } from '../dto/order-dto';

export function mapToOrderRequestModel({
  id,
  creationDate,
  deliveryData,
  effectiveWeight,
  statusChangedDate,
  webOrderNumber,
  webOrderStatus,
}: RequestOrderDTO): RequestOrderModel {
  return {
    id,
    creationDate: new Date(creationDate),
    statusChangedDate: new Date(statusChangedDate),
    effectiveWeight,
    orderNumber: webOrderNumber,
    status: webOrderStatus,
    deliveryInfo: {
      detailsMessage: deliveryData.detailsMessage,
      reference: deliveryData.reference,
      dispatchData: {
        date: new Date(deliveryData.dateDispatch),
        timeFrom: deliveryData.timeDispatch,
        timeTo: deliveryData.timeUntilDispatch,
        zipCity: deliveryData.dispatcherZipCity,
      },
      receiptData: {
        date: new Date(deliveryData.dateDispatch),
        timeFrom: deliveryData.timeReceipt,
        timeTo: deliveryData.timeUntilReceipt,
        zipCity: deliveryData.receiptZipCity,
      },
    },
  };
}
