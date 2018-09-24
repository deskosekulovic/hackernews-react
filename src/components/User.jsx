import React from 'react';
import TimeAgo from 'react-timeago';
import FetchData from './FetchData.jsx';
import ComponentAnimation from '../styles/ComponentAnimation.jsx';
import { UserItem } from '../styles/User.jsx';

const User = props =>
    <FetchData {...props} name={'user'}>
        {user=> {
            if(user.data===null) return null;
            return(
                user.data && user.data!==null && (
                    <ComponentAnimation>
                        <UserItem>
                            <b>user: </b><b>{user.data.id}</b>
                        </UserItem>
                        <UserItem>
                            <b>created: </b><TimeAgo date={user.data.created*1000} />
                        </UserItem>
                        <UserItem>
                            <b>karma: </b>{user.data.karma}
                        </UserItem>
                        {user.data.about &&
                          <UserItem>
                              <b>about: </b>
                              <div
                                  dangerouslySetInnerHTML={{ __html: user.data.about }}
                              />
                          </UserItem>}
                    </ComponentAnimation>
                )
            );
        }}
    </FetchData>;

export default User;
