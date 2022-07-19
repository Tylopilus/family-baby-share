import { Switch, Match } from 'solid-js';
import { Authoziable } from '../utils/db';
import Menu from './Menu';
import Share from './Share';
import Button from './Shared/Button';
import { MenuIcon, ShareIcon } from './Shared/Icons';
export type HeaderProps = Pick<Authoziable, 'access'>;
const Header = (props: HeaderProps) => {
  return (
    <div>
      {props.access === 'guest' && (
        <div class="w-full text-center uppercase bg-[rgba(62,230,0,.38)] absolute top-0 left-0 h-4 text-xs leading-[18px]">
          Guest mode
        </div>
      )}
      <div class="flex justify-between items-center">
        <div class="text-xl">Share with Fam</div>
        <Switch>
          <Match when={props.access === 'account'}>
            <div class="flex gap-4 items-center">
              <Share />
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
    </div>
  );
};
export default Header;
