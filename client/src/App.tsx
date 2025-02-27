import "./App.css";
import Comment from "./pages/Comment/Comment";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
import PostPage from "./pages/Posts/PostPage";

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
        <Route path="/comment/:id" element={<Comment />} />
        <Route path="/post/:id" element={<PostPage />} />
      </Routes>
    </>
  );
}

export default App;
