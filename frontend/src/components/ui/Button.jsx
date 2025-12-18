import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

const Button = ({
  variant = 'primary', // primary | ghost | link
  size = 'md', // sm | md | lg
  fullWidth = false,
  to,
  href,
  disabled = false,
  type = 'button',
  onClick,
  className = '',
  leftIcon,
  rightIcon,
  children,
  ...rest
}) => {
  const classes = [
    'ui-btn',
    `ui-btn--${variant}`,
    `ui-btn--${size}`,
    fullWidth ? 'ui-btn--block' : '',
    disabled ? 'ui-btn--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (to) {
    return (
      <Link className={classes} to={to} aria-disabled={disabled ? 'true' : undefined} tabIndex={disabled ? -1 : 0} {...rest}>
        {leftIcon ? <span className="ui-btn__icon ui-btn__icon--left">{leftIcon}</span> : null}
        <span className="ui-btn__label">{children}</span>
        {rightIcon ? <span className="ui-btn__icon ui-btn__icon--right">{rightIcon}</span> : null}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        className={classes}
        href={href}
        aria-disabled={disabled ? 'true' : undefined}
        onClick={disabled ? (e) => e.preventDefault() : onClick}
        {...rest}
      >
        {leftIcon ? <span className="ui-btn__icon ui-btn__icon--left">{leftIcon}</span> : null}
        <span className="ui-btn__label">{children}</span>
        {rightIcon ? <span className="ui-btn__icon ui-btn__icon--right">{rightIcon}</span> : null}
      </a>
    );
  }

  return (
    <button className={classes} type={type} onClick={onClick} disabled={disabled} {...rest}>
      {leftIcon ? <span className="ui-btn__icon ui-btn__icon--left">{leftIcon}</span> : null}
      <span className="ui-btn__label">{children}</span>
      {rightIcon ? <span className="ui-btn__icon ui-btn__icon--right">{rightIcon}</span> : null}
    </button>
  );
};

export default Button;

