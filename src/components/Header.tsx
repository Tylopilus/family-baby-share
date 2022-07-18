import { Switch, Match } from 'solid-js';
export type HeaderProps = {
  variant: 'user' | 'guest';
};
const Header = (props: HeaderProps) => {
  return (
    <Switch>
      <Match when={props.variant === 'user'}>
        <div>user</div>
      </Match>
      <Match when={props.variant === 'guest'}>
        <div>guest</div>
      </Match>
    </Switch>
  );
};
export default Header;
