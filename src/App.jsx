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
    <>
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
            <ProtectedRoute path="/">
              <MapDataContextProvider>
                <UserDataContextProvider>
                  <Home />
                </UserDataContextProvider>
              </MapDataContextProvider>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute path="/profile">
              <UserDataContextProvider>
                <Profile />
              </UserDataContextProvider>
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute path="/settings">
              <UserDataContextProvider>
                <Settings />
              </UserDataContextProvider>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
