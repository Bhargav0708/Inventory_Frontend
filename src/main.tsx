// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import App from "./App.tsx";
// import "./Customer.css";
// import { BrowserRouter } from "react-router-dom";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { AuthProvider } from "./hooks/LoginProviderContext.tsx";
// import { Provider } from "react-redux";
// import { Store, persistor } from "./app/Store.tsx";
// import { PersistGate } from "redux-persist/integration/react";
// // import { store, persistor } from './store';

// const queryClient = new QueryClient();
// createRoot(document.getElementById("root")!).render(
//   <AuthProvider>
//     <Provider store={Store}>
//       <PersistGate
//         // loading={<span className="spinner"></span>}
//         persistor={persistor}
//       >
//         <QueryClientProvider client={queryClient}>
//           <App />
//         </QueryClientProvider>
//       </PersistGate>
//     </Provider>
//   </AuthProvider>
// );

import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./Customer.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./hooks/LoginProviderContext.tsx";

// import { store, persistor } from './store';

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </AuthProvider>
);
