import { fakerDE } from '@faker-js/faker';
import { ActiveOrderModel } from '../model/types';

function generateActiveOrder(): ActiveOrderModel {
  return {
    id: fakerDE.string.uuid(),
    zipCityDispatch: `${fakerDE.location.zipCode()} ${fakerDE.location.city()}`,
    zipCityReceipt: `${fakerDE.location.zipCode()} ${fakerDE.location.city()}`,
    dateTimeDispatch: fakerDE.date.anytime().toISOString(),
    dateTimeReceipt: fakerDE.date.anytime().toISOString(),
    countEup: fakerDE.number.int({ min: 0, max: 1000 }),
    weight: fakerDE.number.float({ min: 0, max: 10000, fractionDigits: 2 }),
    truckId: fakerDE.string.alphanumeric({ length: 8, casing: 'upper' }),
    orderId: `W202404-${fakerDE.string.numeric({ length: { min: 1, max: 3 } })}`,
    dispensationDate: fakerDE.date.anytime().toISOString(),
    orderStatus: 'Dispositionsbereit',
  };
}

export const activeOrdersMock = new Array(50)
  .fill(null)
  .map(() => generateActiveOrder());
