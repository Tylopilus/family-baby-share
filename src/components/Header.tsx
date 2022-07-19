import { Switch, Match } from 'solid-js';
import { Authoziable } from '../utils/db';
import Menu from './Menu';
import Button from './Shared/Button';
import { MenuIcon, ShareIcon } from './Shared/Icons';
export type HeaderProps = Pick<Authoziable, 'access'>;
const Header = (props: HeaderProps) => {
  return (
    <div class="flex justify-between items-center">
      <div class="text-xl">Share with Fam</div>

      <Switch>
        <Match when={props.access === 'account'}>
          <div class="flex gap-4 items-center">
            <Button variant="primary" class="flex items-center gap-1">
              Share
              <ShareIcon />
            </Button>
            <Menu />
          </div>
        </Match>
        <Match when={props.access === 'guest' || props.access === null}>
          <Button
            href="/login"
            class="border rounded-full px-4 py-1 border-black">
            Login
          </Button>
        </Match>
      </Switch>
    </div>
  );
};
export default Header;
