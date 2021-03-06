import { configureStore } from '@reduxjs/toolkit'
import categorySlices from '../slices/category/categorySlices'
import PostReducer from '../slices/posts/PostSlices'
import usersReducer from '../slices/users/UsersSlices'
import CommentReducer from '../slices/comment/CommentSlices'
import mailReducer from '../slices/email/emailSlice'
import accountVerification from '../slices/accountVerification/accountVericationSlice'


const store = configureStore({
    reducer: {
        users: usersReducer,
        category: categorySlices,
        post: PostReducer,
        comment: CommentReducer,
        sendingMail: mailReducer,
        accountVerification
    }
})

export default store