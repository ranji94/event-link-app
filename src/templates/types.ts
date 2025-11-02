import * as React from "react";

export type PreviewProps = {
  title: string;
  description?: string;
  date?: string; // ISO
  location?: string;
};

export type TemplateDef = {
  id: string;
  name: string;
  accent: string; // tailwindowa nazwa koloru (np. 'rose', 'indigo')
  Preview: (props: PreviewProps) => React.ReactNode;
  Thumb?: () => React.ReactNode;
};
