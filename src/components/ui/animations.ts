import { keyframes } from "@emotion/react";

export const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const slideUp = keyframes`
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

export const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

export const animationClasses = {
  fadeIn: 'animate-[fadeIn_0.3s_ease-in]',
  slideUp: 'animate-[slideUp_0.4s_ease-out]',
  pulse: 'animate-[pulse_2s_ease-in-out_infinite]'
};
