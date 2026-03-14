import { useSearchParams } from "react-router-dom";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";

import styles from "./SearchPage.module.scss";
import SearchListIcon from "~/assests/icon/search-list-icon.svg?react";
import NextIcon from "~/assests/icon/short-next-icon.svg?react";
import PrevIcon from "~/assests/icon/prev-icon.svg?react";
import MovieCard from "~/components/MovieCard/index.jsx";

const cx = classNames.bind(styles);

function SearchPage() {
    const [searchParams] = useSearchParams();
    const searchKey = searchParams.get("q");
    
    const [pageIndex, setPageIndex] = useState(1);
    const [inputValue, setInputValue] = useState("1");
    const [pageRange, setPageRange] = useState(1);
    const [movieData, setMovieData] = useState({});

    // Reset về page 1 khi searchKey đổi
    useEffect(() => {
        setPageIndex(1);
        setInputValue("1");
    }, [searchKey]);

    // Fetch data
    useEffect(() => {
        if (!searchKey) return;

        const url = `https://ophim1.com/v1/api/tim-kiem?keyword=${searchKey}&page=${pageIndex}`;

        fetch(url)
            .then(res => res.json())
            .then(json => {
                const data = json.data;
                setMovieData(data);
                setPageRange(data.params.pagination.pageRanges);
                
            })
            .catch(err => console.error(err));
    }, [searchKey, pageIndex]);

    // Sync input khi pageIndex đổi (Prev / Next / Enter)
    useEffect(() => {
        setInputValue(String(pageIndex));
    }, [pageIndex]);

    // Apply khi nhấn Enter
    const applyPage = () => {
        let value = Number(inputValue);

        if (!value || value < 1) value = 1;
        if (value > pageRange) value = pageRange;

        setPageIndex(value);
        setInputValue(String(value));
    };

    const increasePageIndex = () => {
        setPageIndex(prev => Math.min(prev + 1, pageRange));
    };

    const decreasePageIndex = () => {
        setPageIndex(prev => Math.max(prev - 1, 1));
    };

    return (
        <div className={cx("search-list-container")}>
            <div className={cx("search-list-header")}>
                <SearchListIcon />
                <span>Kết quả tìm kiếm "{searchKey}"</span>
            </div>

            <div className={cx("search-list")}>
                {movieData.items?.map(movie => (
                    <MovieCard
                        key={movie._id}
                        movieData={movie}
                        width={360}
                        imgDom={movieData.APP_DOMAIN_CDN_IMAGE}
                        style="vertical"
                    />
                ))}
            </div>

            <div className={cx("search-list-control")}>
                <button onClick={decreasePageIndex}>
                    <PrevIcon />
                </button>

                <div className={cx("page-current")}>
                    <span>Trang</span>

                    <input
                        className={cx("page-input")}
                        type="number"
                        min={1}
                        max={pageRange}
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                applyPage();
                            }
                        }}
                    />

                    <span>/ {pageRange}</span>
                </div>

                <button onClick={increasePageIndex}>
                    <NextIcon />
                </button>
            </div>
        </div>
    );
}

export default SearchPage;
