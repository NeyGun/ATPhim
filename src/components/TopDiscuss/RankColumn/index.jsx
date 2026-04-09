import classNames from "classnames/bind";

import styles from "./RankColumn.module.scss";
import MinusIcon from "~/assests/icon/minus-icon.svg?react";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const demoData = [
    {
        name: "Ánh sáng của đôi ta",
        url: "/movies/anh-sang-cua-doi-ta",
        thumb: "https://img.ophim.live/uploads/movies/anh-sang-cua-doi-ta-thumb.jpg",
    },
    {
        name: "Ánh sáng của đôi ta",
        url: "/movies/anh-sang-cua-doi-ta",
        thumb: "https://img.ophim.live/uploads/movies/anh-sang-cua-doi-ta-thumb.jpg",
    },
    {
        name: "Ánh sáng của đôi ta",
        url: "/movies/anh-sang-cua-doi-ta",
        thumb: "https://img.ophim.live/uploads/movies/anh-sang-cua-doi-ta-thumb.jpg",
    },
    {
        name: "Ánh sáng của đôi ta",
        url: "/movies/anh-sang-cua-doi-ta",
        thumb: "https://img.ophim.live/uploads/movies/anh-sang-cua-doi-ta-thumb.jpg",
    },
    {
        name: "Ánh sáng của đôi ta",
        url: "/movies/anh-sang-cua-doi-ta",
        thumb: "https://img.ophim.live/uploads/movies/anh-sang-cua-doi-ta-thumb.jpg",
    },
]

function RankColumn({ data = demoData}) {
    
    return (
        <div className={cx("col")}>
            {data.map((item, index) => (
                <div key={index} className={cx("col-item")}>
                    <div className={cx("col-pos")}>{index+1}.</div>
                    <div className={cx("col-minus")}>
                        <MinusIcon />
                    </div>
                    <div className={cx("col-img")}>
                        <img src={item.thumb} alt={item.name} />
                    </div>
                    <Link to={item.url}>
                        {item.name}
                    </Link>
                </div>
            ))}
            <div className={cx("more")}>Xem thêm {"(Chưa làm hihi)"}</div>
        </div>
    )
}

export default RankColumn;