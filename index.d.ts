import * as React from "react"

export interface Theme {
  actionColor: string;
  selectColor: string;
  selectTextColor: string;
  circleColor: string;
}

export interface Props {
  duration: number;
  wrapper: React.Component;
  onStart: () => void;
  onDurationChange: (duration: number) => void;
  theme: Theme
}

declare class TimePicker extends React.Component<Props, any> {}

export default TimePicker