import { SyntheticEvent } from "react";

export interface MockEvent extends SyntheticEvent {
  target: SyntheticEvent["target"] & {
    value?: string;
    payload?: any;
  };
}

interface TestProps {
  "data-testid": string;
  children: React.ReactNode;
}
