import React from 'react';
import Button from './Button';

const PROVIDER_LABEL = {
  google: 'Google',
  apple: 'Apple',
};

const SocialAuthButton = ({ provider = 'google', onClick, label, disabled = false }) => {
  const text = label || PROVIDER_LABEL[provider] || 'Continue';

  return (
    <Button
      variant="ghost"
      size="md"
      fullWidth
      onClick={onClick}
      disabled={disabled}
      leftIcon={<span className={`social-icon ${provider}`} aria-hidden />}
    >
      {text}
    </Button>
  );
};

export default SocialAuthButton;

