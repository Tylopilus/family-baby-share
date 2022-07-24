import { JSXElement, mergeProps } from 'solid-js';

export type ButtonProps = {
  href?: string;
  children: JSXElement;
  class?: string;
  variant?: 'primary' | 'secondary';
  styled?: boolean;
  onClick?: (e: any) => void;
  [key: string]: unknown;
};
const Button = (Props: ButtonProps) => {
  const props = mergeProps({ styled: true, variant: 'secondary' }, Props);
  const primaryStyle = 'border-green-500';
  const classList = 'border rounded-full px-4 py-1 border-black';
  const classes =
    props.variant === 'primary' ? `${classList} ${primaryStyle}` : classList;
  if (props.href) {
    return (
      <a
        href={props.href}
        class={`${props.styled ? classes : ''} ${
          props.class ? props.class : ''
        }`}
        {...props}
        onClick={props.onClick}>
        {props.children}
      </a>
    );
  }
  return (
    <button
      class={`${props.styled ? classes : ''} ${props.class ? props.class : ''}`}
      onClick={props.onClick}
      {...props}>
      {props.children}
    </button>
  );
};
export default Button;
