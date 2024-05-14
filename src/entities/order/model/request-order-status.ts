export enum RequestOrderStatus {
  AddedViaWeb,
  OpenedViaWeb,
  CancelledByContractor,
  CancelledByCustomer,
  Confirmed,
}

export const RequestOrderStatusText = {
  [RequestOrderStatus.AddedViaWeb]: 'In Bearbeitung',
  [RequestOrderStatus.OpenedViaWeb]: 'In Bearbeitung',
  [RequestOrderStatus.Confirmed]: 'Bestätigt',
  [RequestOrderStatus.CancelledByContractor]: 'Storniert Auftr.',
  [RequestOrderStatus.CancelledByCustomer]: 'Storniert Kunde',
};
