import { Switch, Match } from 'solid-js';
import Button from './Shared/Button';
export type HeaderProps = {
  variant: 'user' | 'guest';
};
const Header = (props: HeaderProps) => {
  return (
    <div class="flex justify-between">
      <div class="text-xl">Share with Fam</div>

      <Switch>
        <Match when={props.variant === 'user'}>
          <div>user</div>
        </Match>
        <Match when={props.variant === 'guest'}>
          <Button class="border rounded-full px-4 py-1 border-black">
            Login
          </Button>
        </Match>
      </Switch>
    </div>
  );
};
export default Header;
