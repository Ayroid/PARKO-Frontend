import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import SignUp from "./components/SignUp/SignUp";
import Home from "./components/Home/Home";
import UserProfile from "./components/UserProfile/UserProfile";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/auth"
          element={
            <ProtectedRoute redirectTo="/">
              <SignUp />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute redirectTo="/auth">
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute redirectTo="/auth">
              <UserProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
