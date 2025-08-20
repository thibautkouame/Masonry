'use client'
import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface CursorProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  attachToParent?: boolean;
}

export function Cursor({ children, attachToParent = false, ...props }: CursorProps) {
  return (
    <motion.div
      {...props}
      className={`${attachToParent ? 'absolute' : 'fixed'} pointer-events-none z-50 ${props.className || ''}`}
    >
      {children}
    </motion.div>
  );
}
