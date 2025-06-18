import React, {
  useState,
  useCallback,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { Paper, Typography, IconButton, Slide, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// 토스트의 타입을 일단 정의함
type Toast = {
  id: number;
  message: string;
};

// Compound 패턴으로 만들려고 함
type ToastContextType = {
  showToast: (message: string) => void;
};

// context 정의
const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
};

// 잘 했나는 모르겠음
// 상단에는 해당 UI 컴포넌트로 로직 분리
// return문 안에는 poriver로 toast 관련 로직 넣어줌과 동시에 내부에 children과 create Portal활용해서 ui 안깨지게 모달 만듬
export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {createPortal(
        <Stack
          spacing={2}
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 13000,
          }}
        >
          {toasts.map((toast) => (
            <Slide key={toast.id} direction="up" in mountOnEnter unmountOnExit>
              <Paper
                elevation={6}
                sx={{
                  px: 2,
                  py: 1.5,
                  backgroundColor: "#333",
                  color: "white",
                  minWidth: 280,
                  borderRadius: 2,
                  position: "relative",
                  "&:hover": {
                    color: "#1DB954",
                  },
                }}
              >
                <IconButton
                  size="small"
                  onClick={() => removeToast(toast.id)}
                  sx={{
                    position: "absolute",
                    right: 4,
                    top: 4,
                    color: "#ccc",
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
                <Typography variant="body2">{toast.message}</Typography>
              </Paper>
            </Slide>
          ))}
        </Stack>,
        document.body
      )}
    </ToastContext.Provider>
  );
};
