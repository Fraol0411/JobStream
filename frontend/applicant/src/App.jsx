import React from "react";
import AppRoutes from "./AppRoutes";
import { QueryClient, QueryClientProvider } from 'react-query';
import { UserProvider } from './UserContext'; // Adjust the path as needed

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <UserProvider> {/* Wrap AppRoutes with UserProvider */}
          <AppRoutes />
        </UserProvider>
      </QueryClientProvider>
    </div>    
  );
}

export default App;
