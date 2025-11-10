import { useState, useEffect, useRef } from 'react'
import classNames from "classnames/bind";
import styles from './Search.module.scss'
import SearchIcon from '~/assests/icon/search-icon.svg?react'
import RemoveIcon from '~/assests/icon/remove-icon.svg?react'
import LoadingIcon from '~/assests/icon/loading-icon.svg?react'

const cx = classNames.bind(styles);

function Search() {
    const [searchKey, setSearchKey] = useState('');
    const [searchList, setSearchList] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [APILoading, setAPILoading] = useState(true);
    const [imgLoading, setImgLoading] = useState(true);
    const inputRef = useRef(null);

    useEffect(() => {
        // 1. Dọn dẹp nếu input rỗng
        if (!searchKey.trim()) {
            setSearchList([]);
            return;
        }

        // 2. Đặt hẹn giờ (Debounce) 300ms
        const timerId = setTimeout(() => {
            const searchUrl = `https://ophim1.com/v1/api/tim-kiem?keyword=${searchKey}`;
            const options = {method: 'GET', headers: {accept: 'application/json'}};

            // --- Bắt đầu chuỗi Promise ---

            // API 1: Lấy danh sách phim
            fetch(searchUrl, options)
                .then(res => res.json())
                .then(searchJson => {
                    setAPILoading(true);

                    const items = searchJson.data.items || [];
                    const limitedItems = items.slice(0, 5); // Lấy 5 phim đầu
                    console.log(limitedItems);
                    
                    if (limitedItems.length === 0) {
                        setSearchList([]);
                        return; // Dừng lại nếu không có kết quả
                    }

                    // 3. Chuẩn bị gọi 5 API lấy ảnh
                    // Tạo một MẢNG CÁC "LỜI HỨA" (Promises)
                    const imageFetchPromises = limitedItems.map(item => {
                        
                        // Đây là API thứ 2
                        const imageUrl = `https://ophim1.com/v1/api/phim/${item.slug}/images`;
                        
                        return fetch(imageUrl, options)
                            .then(res => res.json())
                            .then(movieJson => {
                                // 4. Lấy poster_url từ API thứ 2
                                const imagesList = movieJson.data.images;
                                const posterUrl = imagesList.find(img => img.type === 'poster').file_path;
                                const fullPosterPath = `https://image.tmdb.org/t/p/original${posterUrl}`;

                                // 5. Thêm thuộc tính mới vào item
                                item.posterHandlePath = fullPosterPath;
                                return item;
                            })
                            .catch(err => {
                                // Quan trọng: Nếu 1 API ảnh lỗi, không làm hỏng cả list
                                // Trả về item cũ với ảnh mặc định
                                console.error(`Lỗi khi lấy ảnh cho ${item.slug}:`, err);
                                return item;
                            });
                    });

                    // 6. Chờ TẤT CẢ API (trong mảng imageFetchPromises) hoàn thành
                    return Promise.all(imageFetchPromises);
                })
                .then(itemsWithPosters => {
                    // 7. itemsWithPosters là mảng [item1, item2...] đã có 'posterHandlePath'
                    // (Nó có thể là 'undefined' nếu 'return' ở bước 2 được gọi)
                    if (itemsWithPosters) {
                        // 8. Cập nhật State 1 LẦN DUY NHẤT
                        setSearchList(itemsWithPosters);
                        setAPILoading(false);
                    }
                })
                .catch(err => {
                    console.error('Lỗi trong chuỗi API:', err);
                    setSearchList([]); // Lỗi thì dọn sạch
                });
        
        }, 400); // Hẹn giờ 300ms

        // Dọn dẹp
        return () => {
            clearTimeout(timerId);
        };

    }, [searchKey]);

    return ( 
        <div className={cx('search')}>
            <div className={cx('search-container')}>
                <div className={cx('search-element')}>
                    <div className={cx('search-icon')}>
                        <SearchIcon />
                    </div>
                    <input value={searchKey}
                        onChange={(e) => setSearchKey(e.target.value)}
                        // onFocus={() => setShowResult(true)}
                        // onBlur={() => setShowResult(false)}
                        id="main-search" className={cx('search-input')} 
                        type="text" placeholder="Tìm kiếm phim"
                        autoComplete="off" 
                        ref={inputRef}
                    />
                    <div onClick={() => {
                        setSearchKey('');
                        inputRef.current.focus();
                    }}
                    className={cx('remove-icon')}>
                        {searchKey.length > 0 && <RemoveIcon /> }
                    </div>
                </div>
                {
                    showResult && searchKey && 
                    (
                        <div className={cx('search-list')}>
                        {searchKey.length > 0 && searchList.length == 0 && <div className={cx('no-result')}>Không tìm thấy kết quả</div>}
                        {APILoading && imgLoading && <LoadingIcon className={cx('loading-icon')}/>}
                        {!APILoading && searchKey.length > 0 && searchList.length > 0 && (
                        <div className={cx('list-container')}>
                            <div className={cx('list-title')}>Danh sách phim</div>
                            <div className={cx('list-result')}>
                                {searchKey.length > 0 && (
                                    searchList.map((item) => (
                                        <a className={cx('item')} key={item._id} href={`/watch/${item.slug}`}>
                                            <div className={cx('item-poster-container')}>
                                                <div className={cx('item-poster')}>
                                                    <img onLoad={() => setImgLoading(false)} src={item.posterHandlePath} alt="poster" />
                                                </div>
                                            </div>
                                            <div className={cx('item-desc')}>
                                                <div className={cx('item-name')}>{item.name}</div>
                                                <div className={cx('item-origin-name')}>{item.origin_name}</div>
                                                <div className={cx('item-tag')}>
                                                    <span>{item.year}</span>
                                                    <span className={cx('item-tag-span')}>{item.time}</span>
                                                    <span className={cx('item-tag-span')}>{item.episode_current || item.time}</span>
                                                </div>
                                            </div>
                                        </a>
                                        ))
                                    )
                                }
                            </div>
                        </div>
                        )
                    }
                        {searchKey.length > 0 && searchList.length > 0 && <a className={cx('view-all')} href="/tim-kiem?q=a">Toàn bộ kết quả</a>}
                        </div>
                    )
                        
                }
                
            </div>
        </div>
     );
}

export default Search;