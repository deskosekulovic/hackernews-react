import React from 'react';
import TimeAgo from 'react-timeago';
import AnotherMain from './AnotherMain.jsx';
// import Spinner from './Spinner.jsx';
import StyledUser, { UserItem } from '../styles/User.jsx';

const User = props => {
    return(
        <AnotherMain {...props} name={'user'}>
            {user=> {
                if(user.data===null) return null;
                return(
                    user.data && user.data!==null && (
                        <StyledUser>
                            <UserItem><b>user: </b><b>{user.data.id}</b></UserItem>
                            <UserItem><b>created: </b><TimeAgo date={user.data.created*1000} /></UserItem>
                            <UserItem><b>karma: </b>{user.data.karma}</UserItem>
                            {user.data.about && <UserItem><b>about: </b><div dangerouslySetInnerHTML={{ __html: user.data.about }} /></UserItem>}
                        </StyledUser>
                    )
                );
            }}
        </AnotherMain>
    );
};

export default User;
