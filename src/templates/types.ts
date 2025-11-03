import * as React from "react";

export type PreviewProps = {
  title: string;
  description?: string;
  date?: string; // ISO
  location?: string;
  program?: {
    dayIndex: number;
    time: string; // "HH:mm"
    icon?: string; // nazwa ikony z lucide-react
    header: string;
    subheader?: string;
    position?: number;
  }[];
};

export type TemplateDef = {
  id: string;
  name: string;
  accent: string; // tailwind color (np. 'emerald')
  Preview: (props: PreviewProps) => React.ReactNode;
  Thumb?: () => React.ReactNode;
};
