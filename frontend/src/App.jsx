import React from "react"
import AppRoutes from "./AppRoutes"
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
 
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
         <AppRoutes/>
      </QueryClientProvider>
    </div>    
  )
}

export default App






