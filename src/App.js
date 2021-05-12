import {Switch, Route} from "react-router-dom"
import Home from "./pages/Home";
import Post from "./pages/Post";
import FollowersPosts from "./pages/FollowersPosts";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import NewPost from "./pages/NewPost";
import UpdatePost from "./pages/UpdatePost";
import MyPosts from "./pages/MyPosts";


function App() {
    return (
        <div className="header">
            <Switch>
                <Route path='/' component={Home} exact/>
                <Route path='/posts/create' component={NewPost}/>
                <Route path='/register' component={Register}/>
                <Route path='/login' component={Login}/>
                <Route path='/profile' component={Profile}/>
                <Route path='/myposts' component={MyPosts}/>
                <Route path='/followings' component={FollowersPosts}/>
                <Route path='/:slug/edit' component={UpdatePost}/>
                <Route path='/:slug' component={Post}/>
                <Route component={NotFound}/>
            </Switch>
        </div>
    );
}

export default App;
