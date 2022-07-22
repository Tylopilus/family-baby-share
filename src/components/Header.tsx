import { Switch, Match } from 'solid-js';
import { Authoziable } from '../utils/db';
import Menu from './Menu';
import ShareMenu from './ShareMenu';
import Button from './Shared/Button';

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
        <a class="text-xl block" href="/">
          Share with Fam
        </a>
        <Switch>
          <Match when={props.access === 'account'}>
            <div class="flex gap-4 items-center">
              <ShareMenu />
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
