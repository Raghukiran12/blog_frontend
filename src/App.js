
import './App.css';
import Navbar from './Components/navbar';
import { Route, Routes, Navigate,HashRouter } from "react-router-dom";
import Home from './Components/Home';
import About from './Components/About';
import Contact from './Components/Contact';
import Signup from "./Components/Login/Signup";
import UserSetting from './Components/Profile/setting';
import Login from "./Components/Login/Login";
import Logout from './Components/Login/logout';
import Profile from './Components/Profile/profile';
import CreateNewBlog from './Components/Blog/createBlog';
import MyBlogs from './Components/Blog/myblogs';
import Footer from './Components/Footer/footer';
import EditBlog from './Components/Blog/editBlog';
import UsersList from './Components/Admin/userlist';
import AllBlogs from './Components/Admin/allblogs';
import AdminHome from './Components/Admin/AdminHome';
function App() {
     
    const user = localStorage.getItem("token");

	return (
		
    <div class="container">
    <HashRouter>
      <Navbar />

      <Routes>
			{user && <Route path="/" exact element={<Home />} />}
      <Route path="/home" exact element={<Home />} />
      <Route path="/about" exact element={<About />} />
      <Route path="/userslist" exact element={<UsersList />} />
      <Route path="/adminhome" exact element={<AdminHome />} />
      <Route path="/allblogs" exact element={<AllBlogs />} />
      <Route path="/contact" exact element={<Contact />} />
			<Route path="/signup" exact element={<Signup />} />
      <Route path="/profile" exact element={<Profile />} />
      <Route path="/create-new-blog" exact element={<CreateNewBlog />} />
      <Route path="/myblogs" exact element={<MyBlogs />} />
      <Route path="/editblog" exact element={<EditBlog />} />
      <Route path="/usersettings" excat element={<UserSetting />}/>
			<Route path="/login" exact element={<Login />} />
      <Route path="/logout" exact element={<Logout />} />
			<Route path="/" element={<Navigate replace to="/home" />} />
		</Routes>

    
    </HashRouter>
    <Footer />
  </div>
	);

}

export default App;
