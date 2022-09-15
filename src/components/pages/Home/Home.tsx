import React, {ChangeEvent, MouseEvent, useEffect, useState} from 'react';
import styles from './Home.module.css'
import {instance} from '../../../instance/instance';
import {User} from '../../ui/User';
import github from '../../../assets/github.svg'
import {ResponseType, UsersType} from '../../../types/types';

export const Home = () => {
    const [query, setQuery] = useState('')
    //Users fetched from the API
    const [users, setUsers] = useState<UsersType[] | null>([])
    //Page
    const [page, setPage] = useState(1)
    //Per page
    const [limit, setLimit] = useState(10)

    const handleQueryInput = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.currentTarget.value)
    }

    const handlePrevPage = () => {
        setPage(page => {
            if (page === 1) return page;
            else return page - 1
        })
    }

    const handleNextPage = () => {
        setPage(page => page + 1)
    }

    const handlePageLimit = (e: ChangeEvent<HTMLSelectElement>) => {
        setLimit(parseInt(e.currentTarget.value))
    }

    const fetchUsers = async () => {
        try {
            const {data} = await instance.get<ResponseType>(`/search/users?q=${query}`, {
                params: {
                    page,
                    per_page: limit,
                }
            })
            return data?.items
        } catch (error) {
            console.log(error)
            return null
        }
    }

    const handleSearchUsers = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (query) {
            const items = await fetchUsers()
            setUsers(items)
        } else {
            console.log('Your query is empty...')
        }
    }

    useEffect(() => {
        const displayUsersOnChange = async () => {
            if (query) {
                const items = await fetchUsers()
                setUsers(items)
            }
        }
        displayUsersOnChange()
    }, [page, limit])

    return (
        <div className={styles.container}>
            <div className={styles.searchForm}>
                <h2 className={styles.title}>
                    <img
                        src={github}
                        alt={'github logo'}
                        className={styles.logo}/>GitHub User Search</h2>
                <form>
                    <input value={query} onChange={handleQueryInput} type={'text'}/>
                    <button onClick={handleSearchUsers}>Search</button>
                </form>
            </div>
            <div className={styles.searchResults}>
                <div className={styles.moreOptions}>
                    <label>
                        <small>Per page</small>
                        <select onChange={handlePageLimit}>
                            <option value={'10'}>10</option>
                            <option value={'20'}>20</option>
                            <option value={'50'}>50</option>
                            <option value={'100'}>100</option>
                        </select>
                    </label>
                    <div className={styles.pagination}>
                        Page: <span>{page}</span>
                    </div>
                    <div className={styles.pagination}>
                        <button onClick={handlePrevPage}>Prev</button>
                        <button onClick={handleNextPage}>Next</button>
                    </div>
                </div>

                {users
                    ? users.map(user => {
                        return <User user={user} key={user.id}/>
                    })
                    : <h2>There is nothing to display...</h2>}
            </div>
        </div>
    );
};
