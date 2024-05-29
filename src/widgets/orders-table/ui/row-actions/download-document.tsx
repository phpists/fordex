import { Button } from '@mui/material';
import classes from './cancel-request-order.module.css';
import { getDocument } from 'entities/order';
import icon from '../../../../shared/assets/images/file.svg';

interface DownloadDocumentRowActionProps {
  orderId: string;
  orderNumber: string;
}

export function DownloadDocumentRowAction({
  orderId,
  orderNumber,
}: DownloadDocumentRowActionProps) {
  const handleDownLoad = () => {
    getDocument({ data: { orderId: Number(orderId) } }).then((resp) => {
      const url = window.URL.createObjectURL(
        new Blob([resp.data], {
          type: 'application/pdf',
        })
      );
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `order${orderNumber}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
  };
  return (
    <Button
      className={classes.button}
      color="info"
      size="small"
      variant="contained"
      onClick={handleDownLoad}
    >
      <img src={icon} alt="" />
    </Button>
  );
}
