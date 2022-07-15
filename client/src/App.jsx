import { Routes, Route } from "react-router-dom";
import AddCategory from "./components/Category/AddCategory";
import CategoryList from "./components/Category/CategoryList";
import UpdateCategory from "./components/Category/UpdateCategory";
import UpdateComment from "./components/Comments/UpdateComment";
import Homepage from "./components/Homepage/Homepage";
import Navbar from "./components/Navigation/Navbar";
import CreatePost from "./components/Posts/CreatePost";
import PostDetails from "./components/Posts/PostDetails";
import PostsList from "./components/Posts/PostsList";
import UpdatePost from "./components/Posts/UpdatePost";
import Login from "./components/Users/Login/Login";
import Profile from "./components/Users/Profile/Profile";
import UploadProfilePhoto from "./components/Users/Profile/UploadProfilePhoto";
import Register from "./components/Users/Register/Register";
import AdminRoutes from "./hooks/Routes/AdminRoutes";
import PrivateRoutes from "./hooks/Routes/PrivateRoutes";
import NotFound from "./utils/NotFound";

function App() {
  return (
    <>
       <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/posts" element={<PostsList />}/>
        <Route path="/posts/:id" element={<PostDetails />}/>
        {/* PRIVATE ROUTES  */}
        <Route path="/" element={<PrivateRoutes />}>
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/update-post/:id" element={<UpdatePost />} />
            <Route path="/update-comment/:id" element={<UpdateComment />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/upload-profile-photo" element={<UploadProfilePhoto />} />
        </Route>
        {/* ADMIN ROUTES  */}
        <Route path="/" element={<AdminRoutes />}>
            <Route path="/add-category" element={<AddCategory />}/>
            <Route path="/category-list" element={<CategoryList />}/>
            <Route path="/update-category/:id" element={<UpdateCategory />}/>
        </Route>
        <Route path="/*" element={<NotFound />}/>
      </Routes>
    </>
  );
}

export default App;
