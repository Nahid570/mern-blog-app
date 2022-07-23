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
import VerifyAccount from "./components/Users/accountVerification/VerifyAccount";
import SendEmail from "./components/Users/Email/SendEmail";
import Login from "./components/Users/Login/Login";
import ResetPassword from "./components/Users/PasswordManagement/ResetPassword";
import ResetPasswordForm from "./components/Users/PasswordManagement/ResetPasswordForm";
import UpdatePassword from "./components/Users/PasswordManagement/UpdatePassword.jsx";
import Profile from "./components/Users/Profile/Profile";
import UpdateProfile from "./components/Users/Profile/UpdateProfile";
import UploadProfilePhoto from "./components/Users/Profile/UploadProfilePhoto";
import Register from "./components/Users/Register/Register";
import UsersList from "./components/Users/UsersList/UsersList";
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
        <Route path="/reset-password-token" element={<ResetPasswordForm />}/>
        <Route path="/reset-password/:token" element={<ResetPassword />}/>
        {/* PRIVATE ROUTES  */}
        <Route path="/" element={<PrivateRoutes />}>
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/update-post/:id" element={<UpdatePost />} />
            <Route path="/update-comment/:id" element={<UpdateComment />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/upload-profile-photo" element={<UploadProfilePhoto />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
            <Route path="/verify-account/:token" element={<VerifyAccount />} />
            <Route path="/update-password" element={<UpdatePassword />} />
        </Route>
        {/* ADMIN ROUTES  */}
        <Route path="/" element={<AdminRoutes />}>
            <Route path="/add-category" element={<AddCategory />}/>
            <Route path="/category-list" element={<CategoryList />}/>
            <Route path="/update-category/:id" element={<UpdateCategory />}/>
            <Route path="/send-email" element={<SendEmail />}/>
            <Route path="/users" element={<UsersList />}/>
        </Route>
        <Route path="/*" element={<NotFound />}/>
      </Routes>
    </>
  );
}

export default App;
