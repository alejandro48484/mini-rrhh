// src/components/FormField.tsx
import type { ReactNode, CSSProperties } from 'react';

type FormFieldProps = {
  label: string;
  children: ReactNode;
  style?: CSSProperties;
};

function FormField({ label, children, style }: FormFieldProps) {
  return (
    <div style={style}>
      <label style={{ display: 'block', marginBottom: '6px', color: '#475569', fontSize: '14px', fontWeight: 500 }}>
        {label}
      </label>
      {children}
    </div>
  );
}

export default FormField;