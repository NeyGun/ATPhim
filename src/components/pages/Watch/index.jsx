import classNames from 'classnames/bind';
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState, useRef, useMemo } from 'react';
import ArtPlayerComponent from '~/components/ArtPlayerComponent/index.jsx';

import styles from './Watch.module.scss';
import ReturnIcon from '~/assests/icon/return-icon.svg?react';
import NextIcon from '~/assests/icon/next-icon.svg?react';
import PlayIcon from '~/assests/icon/play-icon.svg?react';

const cx = classNames.bind(styles);

function Watch() {
    const { slug, episodeSlug } = useParams();
    const [movieData, setMovieData] = useState(null);
    const [actorData, setActorData] = useState(null);
    const playerContainRef = useRef();

    // ✅ Gọi API khi slug (tức là phim) thay đổi
    useEffect(() => {
        const movieUrl = `https://ophim1.com/v1/api/phim/${slug}`;
        const moiveOptions = { method: 'GET', headers: { accept: 'application/json' } };

        fetch(movieUrl, moiveOptions)
            .then(res => res.json())
            .then(json => setMovieData(json.data))
            .catch(err => console.error(err));
        
        const actorUrl = movieUrl + '/peoples';
        const actorOptions = {method: 'GET', headers: {accept: 'application/json'}};

        fetch(actorUrl, actorOptions)
        .then(res => res.json())
        .then(json => setActorData(json.data))
        .catch(err => console.error(err));
    }, [slug]);

    // ✅ Dùng useMemo để tránh tính toán lại các mảng phụ
    const detailCater1 = useMemo(
        () => movieData?.breadCrumb.slice(0, 2) || [],
        [movieData]
    );
    const detailCater2 = useMemo(
        () => movieData?.breadCrumb.slice(2, movieData?.breadCrumb.length - 1) || [],
        [movieData]
    );
    const allEpisodes = useMemo(
        () => movieData?.item.episodes[0].server_data || [],
        [movieData]
    );

    // ✅ Dùng useMemo để chọn tập hiện tại
    const episodeToPlay = useMemo(() => {
        if (!allEpisodes.length) return null;
        if (episodeSlug)
            return allEpisodes.find(ep => ep.slug === episodeSlug) || allEpisodes[0];
        return allEpisodes[0];
    }, [allEpisodes, episodeSlug]);

    // ✅ Dùng useMemo để chỉ parse HTML một lần
    const cleanContent = useMemo(() => {
        if (!movieData?.item?.content) return '';
        const parser = new DOMParser();
        const doc = parser.parseFromString(movieData.item.content, 'text/html');
        return doc.body.textContent || '';
    }, [movieData]);

    if (!slug) {
        return (
            <div>
                <h1>Trang danh sách phim (Watch)</h1>
                <p>Hiển thị danh sách các phim...</p>
            </div>
        );
    }

    if (!movieData) return <div className={cx('loading')}>Đang tải phim...</div>;

    return (
        <div className={cx('watch')}>
            {/* ================== PLAYER ================== */}
            <div className={cx('watch-player')}>
                <div className={cx('player-center')}>
                    <Link to={`/movies/${slug}`} className={cx('player-return')}>
                        <ReturnIcon />
                    </Link>
                    <div className={cx('player-name')}>
                        Xử lý focus blur input Bỏ call API lấy ảnh thanh search https://img.ophim.live/uploads/movies/ + path CSS control Thêm webkit giới hạn cho desc
                        Xem phim {movieData.item.name}
                    </div>
                </div>
                <div className={cx('player-ratio')} ref={playerContainRef}>
                    {/* ✅ React.memo trong ArtPlayerComponent giúp tránh render lại không cần thiết */}
                    <ArtPlayerComponent
                        url={episodeToPlay?.link_m3u8}
                        containerRef={playerContainRef}
                    />
                </div>
            </div>

            {/* ================== INFO + EPISODES ================== */}
            <div className={cx('watch-container')}>
                <div className={cx('watch-main')}>
                    <div className={cx('watch-info')}>
                        <div className={cx('thumb-container')}>
                            <div className={cx('info-thumb')}>
                                <img
                                    src={
                                        movieData.APP_DOMAIN_CDN_IMAGE +
                                        '/uploads/' +
                                        movieData.seoOnPage.og_image[0]
                                    }
                                    alt={movieData.item.name}
                                />
                            </div>
                        </div>

                        <div className={cx('info')}>
                            <div>
                                <div className={cx('info-name')}>
                                    <Link to={`/movies/${movieData.params.slug}`}>
                                        {movieData.item.name}
                                    </Link>
                                </div>
                                <div className={cx('info-alias-name')}>
                                    {movieData.item.origin_name}
                                </div>

                                <div className={cx('info-detail')}>
                                    <div className={cx('detail-tags')}>
                                        {detailCater1.map((item, index) => (
                                            <a
                                                key={index}
                                                className={cx('tag-topic')}
                                                href={item.slug}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>

                                    <div className={cx('detail-tags')}>
                                        {detailCater2.map((item, index) => (
                                            <a
                                                key={index}
                                                className={cx('tag-topic')}
                                                href={item.slug}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={cx('detail-desc')}>
                            <div className={cx('desc')}>{cleanContent}</div>

                            <Link to={`/movies/${movieData.params.slug}`}>
                                Thông tin phim
                                <NextIcon />
                            </Link>
                        </div>
                    </div>

                    <div className={cx('watch-episodes')}>
                        <div className={cx('episodes')}>
                            {allEpisodes.length > 1 && allEpisodes.map((item) => {
                                const isActive =
                                    episodeSlug === item.slug || (!episodeSlug && item.slug === allEpisodes[0].slug);
                                return (
                                    <Link
                                    key={item.slug}
                                    to={`/watch/${slug}/${item.slug}`}
                                    className={cx('episodes-button', { active: isActive })}
                                    >
                                    <PlayIcon />
                                    Tập {item.name}
                                    </Link>
                                );
                            })}
                        </div>

                    </div>
                </div>

                <div className={cx('watch-side')}>
                    <div className={cx('side-rate')}></div>
                    <div className={cx('side-actors')}>
                        <div className={cx('actors-header')}>Diễn viên</div>
                        <div className={cx('actors-container')}>
                            {actorData && actorData.peoples.map(actor => (
                                <div key={actor.id} className={cx('actors-item')}>
                                    <div className={cx('actors-img')}>
                                        <img src={actorData.profile_sizes.original + actor.profile_path}
                                             alt={actor.name} />
                                    </div>
                                    <div className={cx('actors-name')}>{actor.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Watch;
