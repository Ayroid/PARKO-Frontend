import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import SignUp from "./components/SignUp/SignUp";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import Settings from "./components/Settings/Settings";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import "./App.css";

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
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute path="/profile">
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute path="/settings">
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route path="/loading" element={<LoadingSpinner />} />
      </Routes>
    </>
  );
}

export default App;
