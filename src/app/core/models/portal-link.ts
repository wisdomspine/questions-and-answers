import { Link } from '../../core/models/link.model';

export interface PortalLink {
  link: Link;
  icon?: string;
  color?: string;
  exact?: boolean;
  children?: PortalLink[];
}
