import React from 'react';
import styles from '../pages/Home/Home.module.css';
import {Link} from 'react-router-dom';
import {UsersType} from '../../types/types';


type UserPropsType = {
    user: UsersType
}

export const User: React.FC<UserPropsType> = ({user}) => {
    const {avatar_url, login, id} = user

    return (
        <div className={styles.user}>
            <div className={styles.image}>
                <img
                    src={avatar_url}
                    alt={login}/>
            </div>
            <div className={styles.userInfo}>
                <h3>{login}</h3>
                <small>{id}</small>
                <Link to={`/user/${login}`}>View profile</Link>
            </div>
        </div>
    );
};