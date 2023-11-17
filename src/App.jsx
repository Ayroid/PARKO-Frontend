import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import SignUp from "./components/SignUp/SignUp";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import Settings from "./components/Settings/Settings";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import "./App.css";

import { UserDataContextProvider } from "./utils/UserDataContext.jsx";

function App() {
  return (
    <UserDataContextProvider>
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
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            // <UserDataContextProvider>
            <ProtectedRoute path="/profile">
              <Profile />
            </ProtectedRoute>
            // </UserDataContextProvider>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute path="/settings">
              {/* <UserDataContextProvider> */}
              <Settings />
              {/* </UserDataContextProvider> */}
            </ProtectedRoute>
          }
        />
        <Route path="/loading" element={<LoadingSpinner />} />
      </Routes>
    </UserDataContextProvider>
  );
}

export default App;
