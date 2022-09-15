import React from 'react';
import styles from '../pages/Users/Users.module.css';
import {RepoType} from '../../types/types';

type RepoPropsType = {
    repo: RepoType
}

export const Repo: React.FC<RepoPropsType> = ({repo}) => {
    const {name, html_url, description, language} = repo

    return (
        <div className={styles.repo}>
            <h3><a href={html_url} target="_blank">{name}</a></h3>
            <p>{description}</p>
            {language && <small>Written in {language}</small>}
        </div>
    );
};