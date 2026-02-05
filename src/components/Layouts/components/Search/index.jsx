import { useState, useEffect, useRef } from 'react'
import classNames from "classnames/bind";
import styles from './Search.module.scss'
import SearchIcon from '~/assests/icon/search-icon.svg?react'
import RemoveIcon from '~/assests/icon/remove-icon.svg?react'
import LoadingIcon from '~/assests/icon/loading-icon.svg?react'
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Search() {
    const [searchKey, setSearchKey] = useState('');
    const [searchList, setSearchList] = useState([]);
    const [showResult] = useState(true);
    const [APILoading, setAPILoading] = useState(false);
    const inputRef = useRef(null);
    const abortRef = useRef(null);

    useEffect(() => {
        if (!searchKey.trim()) {
            setSearchList([]);
            setAPILoading(false);
            return;
        }

        const timerId = setTimeout(async () => {
            abortRef.current?.abort();
            const controller = new AbortController();
            abortRef.current = controller;

            try {
                setAPILoading(true);

                const res = await fetch(
                    `https://ophim1.com/v1/api/tim-kiem?keyword=${searchKey}&limit=5`,
                    {
                        headers: { accept: 'application/json' },
                        signal: controller.signal
                    }
                );

                const json = await res.json();
                setSearchList(json?.data?.items || []);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.error('Lỗi search:', err);
                    setSearchList([]);
                }
            } finally {
                setAPILoading(false);
            }
        }, 400);

        return () => clearTimeout(timerId);
    }, [searchKey]);

    return ( 
        <div className={cx('search')}>
            <div className={cx('search-container')}>
                <div className={cx('search-element')}>
                    <div className={cx('search-icon')}>
                        <SearchIcon />
                    </div>
                    <input
                        value={searchKey}
                        onChange={(e) => setSearchKey(e.target.value)}
                        id="main-search"
                        className={cx('search-input')}
                        type="text"
                        placeholder="Tìm kiếm phim"
                        autoComplete="off"
                        ref={inputRef}
                    />
                    <div
                        onClick={() => {
                            setSearchKey('');
                            inputRef.current.focus();
                        }}
                        className={cx('remove-icon')}
                    >
                        {searchKey.length > 0 && <RemoveIcon />}
                    </div>
                </div>

                {showResult && searchKey && (
                    <div className={cx('search-list')}>
                        {searchKey.length > 0 && !APILoading && searchList.length === 0 && (
                            <div className={cx('no-result')}>
                                Không tìm thấy kết quả
                            </div>
                        )}

                        {APILoading && (
                            <LoadingIcon className={cx('loading-icon')} />
                        )}

                        {!APILoading && searchList.length > 0 && (
                            <div className={cx('list-container')}>
                                <div className={cx('list-title')}>
                                    Danh sách phim
                                </div>
                                <div className={cx('list-result')}>
                                    {searchList.map(item => (
                                        <Link
                                            className={cx('item')}
                                            key={item._id}
                                            to={`/watch/${item.slug}`}
                                        >
                                            <div className={cx('item-poster-container')}>
                                                <div className={cx('item-poster')}>
                                                    <img
                                                        src={`https://img.ophim.live/uploads/movies/${item.thumb_url}`}
                                                        alt="poster"
                                                    />
                                                </div>
                                            </div>
                                            <div className={cx('item-desc')}>
                                                <div className={cx('item-name')}>
                                                    {item.name}
                                                </div>
                                                <div className={cx('item-origin-name')}>
                                                    {item.origin_name}
                                                </div>
                                                <div className={cx('item-tag')}>
                                                    <span>{item.year}</span>
                                                    <span className={cx('item-tag-span')}>
                                                        {item.time}
                                                    </span>
                                                    <span className={cx('item-tag-span')}>
                                                        {item.episode_current || item.time}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {searchList.length > 0 && (
                            <Link
                                className={cx('view-all')}
                                to={`/search?keyword=${searchKey}`}
                            >
                                Toàn bộ kết quả
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Search;
