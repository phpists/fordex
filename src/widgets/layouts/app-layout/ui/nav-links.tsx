import { List } from '@mui/material';
import { NAV_LINKS } from '../lib/nav-links';
import { NavLinkItem } from './nav-link-item';

interface NavLinksProps {
  onClick: () => void;
}

export function NavLinks({ onClick }: NavLinksProps) {
  return (
    <List onClick={onClick}>
      {NAV_LINKS.map((item, i) => (
        <NavLinkItem key={i} {...item} />
      ))}
    </List>
  );
}
