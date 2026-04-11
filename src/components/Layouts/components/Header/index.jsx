import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import Search from "../Search";
import styles from "./Header.module.scss";
import UserIcon from "~/assests/icon/user-icon.svg?react";
import SearchIcon from "~/assests/icon/search-icon.svg?react";
import { useState, useEffect } from "react";

const cx = classNames.bind(styles);

function Header() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    // Chỉ có hiệu ứng khi màn hình lớn hơn 640px
    const media = window.matchMedia("(min-width: 640px)"); // Giống media query trong css trả về object có true or false và eventlistener khi kích thước màn hình thay đổi

    const handleScroll = () => {
      setActive(window.scrollY > 50);
    };

    const handleMediaChange = (e) => {
      if (e.matches) {
        // >= 640px
        window.addEventListener("scroll", handleScroll);
      } else {
        // < 640px
        window.removeEventListener("scroll", handleScroll);
        setActive(false);
      }
    };

    handleMediaChange(media); // init
    media.addEventListener("change", handleMediaChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      media.removeEventListener("change", handleMediaChange);
    };
  }, []);

  return (
    <div className={cx("header-wrapper", `${active ? "fixed" : ""}`)}>
      <div className={cx("header")}>
        <input type="checkbox" id="menu-toggle" className={cx("menu-toggle")} />
        <input type="checkbox" id="search-toggle" className={cx("search-toggle")} />
        <div className={cx("left-group")}>
            <label htmlFor="menu-toggle" className={cx("hamburger")}>
                <span></span>
                <span></span>
                <span></span>
            </label>

            <Link to="/" className={cx("logo")}>
                <img src="/ATPhim/logo.png" alt="ATPhim"/>
            </Link>
        </div>

        <div className={cx("search-wrapper")}>
            <Search />  
        </div>


        <label htmlFor="search-toggle" className={cx("search-btn")}>
            <SearchIcon />
            <span></span>
            <span></span>
        </label>

        <div className={cx("right-group")}>
          <div className={cx("menu")}>
            <div className={cx("menu-item")}><Link>Chủ đề</Link></div>
            <div className={cx("menu-item")}><Link>Thể loại</Link></div>
            <div className={cx("menu-item")}><Link>Phim lẻ</Link></div>
            <div className={cx("menu-item")}><Link>Phim bộ</Link></div>
            <div className={cx("menu-item")}><Link>Tính năng</Link></div>
            <div className={cx("menu-item")}><Link>Quốc gia</Link></div>
            <div className={cx("menu-item")}><Link>Cộng đồng</Link></div>
            <div className={cx("menu-item")}><Link>Lịch chiếu</Link></div>
          </div>
          <div className={cx("user")}>
            <button className={cx("user-btn")}>
              <UserIcon/>
              Thành viên
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Header;