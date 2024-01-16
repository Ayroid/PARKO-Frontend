import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import SignUp from "./components/SignUp/SignUp";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import Settings from "./components/Settings/Settings";
import "./App.css";

import { UserDataContextProvider } from "./utils/UserDataContext.jsx";
import { MapDataContextProvider } from "./utils/MapDataContext.jsx";

function App() {
  return (
    <Routes>
      <Route
        path="/auth"
        element={
          <ProtectedRoute path="/auth">
            <SignUp />
          </ProtectedRoute>
        }
      />

      <Route
        path="/"
        element={
          <MapDataContextProvider>
            <UserDataContextProvider>
              <ProtectedRoute path="/">
                <Home />
              </ProtectedRoute>
            </UserDataContextProvider>
          </MapDataContextProvider>
        }
      />
      <Route
        path="/profile"
        element={
          <MapDataContextProvider>
            <UserDataContextProvider>
              <ProtectedRoute path="/profile">
                <Profile />
              </ProtectedRoute>
            </UserDataContextProvider>
          </MapDataContextProvider>
        }
      />

      <Route
        path="/settings"
        element={
          <MapDataContextProvider>
            <UserDataContextProvider>
              <ProtectedRoute path="/settings">
                <Settings />
              </ProtectedRoute>
            </UserDataContextProvider>
          </MapDataContextProvider>
        }
      />
    </Routes>
  );
}

export default App;
