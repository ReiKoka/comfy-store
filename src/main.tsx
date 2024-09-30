import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store.ts";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
    <Toaster
      position="top-center"
      duration={3000}
      toastOptions={{
        className:
          "text-foreground dark:bg-primary dark:text-background border-none",
      }}
    />
  </Provider>,
);
