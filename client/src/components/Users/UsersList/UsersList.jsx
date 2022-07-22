import UsersListHeader from "./UsersListHeader";
import UsersListItem from "./UsersListItem";
import {useDispatch, useSelector} from 'react-redux'
import { fetchAllUsersAction } from "../../../redux/slices/users/UsersSlices";
import { useEffect } from "react";


const UsersList = () => {
  const dispatch = useDispatch();
  // get all the users from the store
  const users = useSelector(state => state?.users);
  const {allUsers, block, unblock} = users;
  useEffect(() => {
    dispatch(fetchAllUsersAction())
  }, [dispatch, block, unblock])

  
  
  return (
    <>
      <section className="py-8 bg-gray-900 min-h-screen">
        <UsersListHeader />
        <div className="container px-4 mx-auto">
          {
            allUsers?.users?.length <=0 ? <h1>Currently there is no author available</h1> : allUsers?.users?.map(user => <UsersListItem key={user?._id} user={user}/>)
          }
        </div>
      </section>
    </>
  );
};

export default UsersList;
