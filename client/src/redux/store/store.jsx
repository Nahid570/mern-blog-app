import { configureStore } from '@reduxjs/toolkit'
import categorySlices from '../slices/category/categorySlices'
import PostReducer from '../slices/posts/PostSlices'
import usersReducer from '../slices/users/UsersSlices'
import CommentReducer from '../slices/comment/CommentSlices'

const store = configureStore({
    reducer: {
        users: usersReducer,
        category: categorySlices,
        post: PostReducer,
        comment: CommentReducer
    }
})

export default store