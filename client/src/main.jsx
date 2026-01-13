import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/authContext.jsx";
import { BrowserRouter } from "react-router-dom";
import {Toaster} from "react-hot-toast";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
      <Toaster
      position="top-right"
      toastOptions={{
        style:{
          background:"#0a0a0a",
          color:"#facc15",
          border:"1px solid #27272a",
        },
      }}
      />
    </AuthProvider>
  </BrowserRouter>
);
