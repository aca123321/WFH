export interface VideoItemProps {
  title: string;
  url: string;
  category: string;
}

export interface VideoItemPropsExtended extends VideoItemProps {
  path: string;
}
