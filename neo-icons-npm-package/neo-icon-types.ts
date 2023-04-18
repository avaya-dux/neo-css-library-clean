type IconCategory =
  | "navigation"
  | "action"
  | "account"
  | "status"
  | "communication"
  | "alert"
  | "content"
  | "other"
  | "editor"
  | "file"
  | "weather"
  | "social";

export interface Icon {
  name: string;
  bidirectional: boolean;
  category: IconCategory;
  animated: boolean;
}
