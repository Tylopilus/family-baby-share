import type { JSX } from 'solid-js/jsx-runtime';

export type ButtonProps = {
  href?: string;
  children: JSX.Element;
  class?: string;
  [key: string]: unknown;
};
const Button = (Props: ButtonProps) => {
  if (Props.href) {
    return <a href={Props.href}>{Props.children}</a>;
  }
  return <button {...Props}>{Props.children}</button>;
};
export default Button;
