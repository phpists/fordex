import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export function getIconPassword(showPassword: boolean) {
  return showPassword ? <VisibilityOff /> : <Visibility />;
}
