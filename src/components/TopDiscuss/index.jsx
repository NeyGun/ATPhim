import classNames from "classnames/bind";

import styles from "./TopDiscuss.module.scss";
import AwardIcon from "~/assests/icon/award-icon.svg?react";
import ClapperBoardIcon from "~/assests/icon/clapperboard-icon.svg?react";
import HeartIcon from "~/assests/icon/heart-icon.svg?react";
import ThunderIcon from "~/assests/icon/thunder-icon.svg?react";
import CommentSlide from "./CommentSlide";
import RankColumn from "./RankColumn";
import CommentColumn from "./CommentColumn";

const cx = classNames.bind(styles);

function TopDiscuss() {
    return (
        <div className={cx("container")}>
            <div className={cx("comment")}>
                <div className={cx("title")}>
                    <AwardIcon />
                    <span>Top bình luận</span>
                </div>
                <CommentSlide />
            </div>
            <div className={cx("bottom")}>
                <div className={cx("col-wrapper")}>
                    <div className={cx("title")}>
                        <ClapperBoardIcon />
                        <span>Sôi nổi nhất</span>
                    </div>
                    <RankColumn />  
                </div>
                {/* Phần sôi nổi và yêu thích giống layout khác data */}
                <div className={cx("col-wrapper", "col-center")}>
                    <div className={cx("title")}>
                        <HeartIcon />
                        <span>Yêu thích nhất</span>
                    </div>
                    <RankColumn />  
                </div>
                <div className={cx("col-wrapper")}>
                    <div className={cx("title")}>
                        <ThunderIcon />
                        <span>Bình luận mới</span>
                    </div>
                    <CommentColumn />  
                </div>
            </div>
        </div>
    )
}

export default TopDiscuss;