import "./App.css";
import Comment from "./pages/Comment/Comment";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
import PostPage from "./pages/Posts/PostPage";
import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/comment/:id"
          element={
            <ProtectedRoute>
              <Comment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/post/:id"
          element={
            <ProtectedRoute>
              <PostPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<h1>404 - Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
