import React, {useEffect, useState} from 'react';
import styles from './Users.module.css'
import users from '../../../assets/users.svg'
import location from '../../../assets/location.svg'
import site from '../../../assets/site.svg'
import github from '../../../assets/github.svg'
import {Link, useParams} from 'react-router-dom';
import {instance} from '../../../instance/instance';
import {RepoType, UserType} from '../../../types/types';
import {Repo} from '../../ui/Repo';

export const Users = () => {
    const {login} = useParams()

    const [userInfo, setUserInfo] = useState<UserType>()
    const [repos, setRepos] = useState<RepoType[]>([])

    useEffect(() => {
        const fetchUserInformation = async () => {
            try {
                const response = await Promise.all([
                    instance.get(`/users/${login}`),
                    instance.get(`/users/${login}/repos`)
                ])
                setUserInfo(response[0].data)
                setRepos(response[1].data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchUserInformation()
    }, [])

    return (
        <div className={styles.container}>
            <Link to={'/'} className={styles.back}>Back</Link>
            <div className={styles.userInformation}>
                <div className={styles.image}>
                    <img
                        src={userInfo?.avatar_url}
                        alt={'user avatar'}/>
                </div>
                <div className={styles.userContent}>
                    <h3>{userInfo?.name}</h3>
                    <p>{userInfo?.bio}</p>
                    <div className={styles.moreData}>
                        <p><img src={users}
                                alt={'followers'}/>{userInfo?.followers} Followers.
                            Following {userInfo?.following}
                        </p>
                        {userInfo?.location &&
                            <p><img src={location} alt={'location'}/>{userInfo?.location}
                            </p>}
                        {userInfo?.blog &&
                            <p><img src={site} alt={'site'}/>{userInfo?.blog}</p>}
                        <p><img
                            src={github}
                            alt={'github'}/>
                            <a href={userInfo?.html_url}
                               target="_blank">View GitHub Profile</a></p>
                    </div>
                </div>
            </div>
            <div className={styles.userRepos}>
                {repos
                    ? repos.map(repo => {
                        return <Repo repo={repo} key={repo.id}/>
                    })
                    : <h2>No repos for this user...</h2>}
            </div>
        </div>
    );
};