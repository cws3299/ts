export interface AuthState {
  userId: string;
  setState: (userId: string) => void;
  removeState: () => void;
}
