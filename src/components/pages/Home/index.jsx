import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import styles from "./Home.module.scss";
import MovieSlide from "~/components/MovieSlide";
import TopSlide from "~/components/TopSlide";
import TopDiscuss from "~/components/TopDiscuss";
import ShortNextIcon from "~/assests/icon/short-next-icon.svg?react";
import NextIcon from "~/assests/icon/next-icon.svg?react";

import { useInView } from "~/hooks/useInView";

const cx = classNames.bind(styles);

// [phim-moi | phim-bo | phim-le | tv-shows | hoat-hinh | phim-vietsub | phim-thuyet-minh | phim-long-tien | phim-bo-dang-chieu | phim-bo-hoan-thanh | phim-sap-chieu | subteam | phim-chieu-rap];
const TOPIC = [
    { id: 1, name: "Phim mới", slug: "phim-moi" },
    { id: 2, name: "Phim bộ", slug: "phim-bo" },
    { id: 3, name: "Phim lẻ", slug: "phim-le" },
    { id: 4, name: "TV Shows", slug: "tv-shows" },
    { id: 5, name: "Hoạt hình", slug: "hoat-hinh" },
    { id: 6, name: "Phim Vietsub", slug: "phim-vietsub" },
];

function Home() {
    const [imgDomain, setImgDomain] = useState("");
    const [topSlideData, setTopSlideData] = useState(null);

    // fetch data cho TopSlide ngay
    useEffect(() => {
    fetch("https://ophim1.com/v1/api/home")
        .then((res) => res.json())
        .then((json) => {
            setImgDomain(json.data.APP_DOMAIN_CDN_IMAGE);
            setTopSlideData(json.data.items.slice(0, 6));
        })
        .catch(console.error);
    }, []);

    // Hàn
    const [hanData, setHanData] = useState(null);
    const [hanLoading, setHanLoading] = useState(false);
    const hanRef = useRef();
    const hanInView = useInView(hanRef);

    useEffect(() => {
        if (!hanInView || hanData) return;
        
        setHanLoading(true);

        fetch(
            "https://ophim1.com/v1/api/quoc-gia/han-quoc?limit=12&sort_field=modified.time"
        )
            .then((res) => res.json())
            .then((json) => setHanData(json.data))
            .catch(console.error)
            .finally(() => setHanLoading(false));
    }, [hanInView]);

    // Âu Mỹ
    const [usData, setUsData] = useState(null);
    const [usLoading, setUsLoading] = useState(false);
    const usRef = useRef();
    const usInView = useInView(usRef);

    useEffect(() => {
        if (!usInView || usData) return;

        setUsLoading(true);

        fetch(
            "https://ophim1.com/v1/api/quoc-gia/au-my?limit=12&sort_field=modified.time"
        )
            .then((res) => res.json())
            .then((json) => setUsData(json.data))
            .catch(console.error)
            .finally(() => setUsLoading(false));
    }, [usInView]);

    // Trung
    const [chinaData, setChinaData] = useState(null);
    const [chinaLoading, setChinaLoading] = useState(false);
    const chinaRef = useRef();
    const chinaInView = useInView(chinaRef);

    useEffect(() => {
        if (!chinaInView || chinaData) return;
            
        setChinaLoading(true);

        fetch(
            "https://ophim1.com/v1/api/quoc-gia/trung-quoc?limit=12&sort_field=modified.time"
        )
            .then((res) => res.json())
            .then((json) => setChinaData(json.data))
            .catch(console.error)
            .finally(() => setChinaLoading(false));
    }, [chinaInView]);

    // Phim Điện Ảnh mới coóng
    const [newData, setNewData] = useState(null);
    const [newLoading, setNewLoading] = useState(false);
    const newRef = useRef();
    const newInView = useInView(newRef);

    useEffect(() => {
        if (!newInView || newData) return;
            
        setNewLoading(true);

        fetch(
            "https://ophim1.com/v1/api/danh-sach/phim-moi?limit=12"
        )
            .then((res) => res.json())
            .then((json) => setNewData(json.data))
            .catch(console.error)
            .finally(() => setNewLoading(false));
    }, [newInView]);

    // Top 10 phim bộ hôm nay
    const [tenSeriesData, setTenSeriesData] = useState(null);
    const [tenSeriesLoading, setTenSeriesLoading] = useState(false);
    const tenSeriesRef = useRef();
    const tenSeriesInView = useInView(tenSeriesRef);

    useEffect(() => {
        if (!tenSeriesInView || tenSeriesData) return;
            
        setTenSeriesLoading(true);

        fetch(
            "https://ophim1.com/v1/api/danh-sach/phim-bo-dang-chieu?limit=10"
        )
            .then((res) => res.json())
            .then((json) => setTenSeriesData(json.data))
            .catch(console.error)
            .finally(() => setTenSeriesLoading(false));
    }, [tenSeriesInView]);

    // Mãn nhãn phim chiếu rạp
    const [theaterData, setTheaterData] = useState(null);
    const [theaterLoading, setTheaterLoading] = useState(false);
    const theaterRef = useRef();
    const theaterInView = useInView(theaterRef);

    useEffect(() => {
        if (!theaterInView || theaterData) return;
            
        setTheaterLoading(true);

        fetch(
            "https://ophim1.com/v1/api/danh-sach/phim-chieu-rap?limit=12"
        )
            .then((res) => res.json())
            .then((json) => setTheaterData(json.data))
            .catch(console.error)
            .finally(() => setTheaterLoading(false));
    }, [theaterInView]);

    // Top 10 phim lẻ hôm nay
    const [tenSingleData, setTenSingleData] = useState(null);
    const [tenSingleLoading, setTenSingleLoading] = useState(false);
    const tenSingleRef = useRef();
    const tenSingleInView = useInView(tenSingleRef);

    useEffect(() => {
        if (!tenSingleInView || tenSingleData) return;
            
        setTenSingleLoading(true);

        fetch(
            "https://ophim1.com/v1/api/danh-sach/phim-le?limit=10"
        )
            .then((res) => res.json())
            .then((json) => setTenSingleData(json.data))
            .catch(console.error)
            .finally(() => setTenSingleLoading(false));
    }, [tenSingleInView]);

    // Nhật
    const [japanData, setJapanData] = useState(null);
    const [japanLoading, setJapanLoading] = useState(false);
    const japanRef = useRef();
    const japanInView = useInView(japanRef);

    useEffect(() => {
        if (!japanInView || japanData) return;
            
        setJapanLoading(true);

        fetch(
            "https://ophim1.com/v1/api/quoc-gia/nhat-ban?limit=12&sort_field=modified.time"
        )
            .then((res) => res.json())
            .then((json) => setJapanData(json.data))
            .catch(console.error)
            .finally(() => setJapanLoading(false));
    }, [japanInView]);

    // Thái Lan
    const [thaiData, setThaiData] = useState(null);
    const [thaiLoading, setThaiLoading] = useState(false);
    const thaiRef = useRef();
    const thaiInView = useInView(thaiRef);

    useEffect(() => {
        if (!thaiInView || thaiData) return;
            
        setThaiLoading(true);

        fetch(
            "https://ophim1.com/v1/api/quoc-gia/thai-lan?limit=12&sort_field=modified.time"
        )
            .then((res) => res.json())
            .then((json) => setThaiData(json.data))
            .catch(console.error)
            .finally(() => setThaiLoading(false));
    }, [thaiInView]);

    // Hoạt hình
    const [toonData, setToonData] = useState(null);
    const [toonLoading, setToonLoading] = useState(false);
    const toonRef = useRef();
    const toonInView = useInView(toonRef);

    useEffect(() => {
        if (!toonInView || toonData) return;
            
        setToonLoading(true);

        fetch(
            "https://ophim1.com/v1/api/danh-sach/hoat-hinh?limit=20"
        )
            .then((res) => res.json())
            .then((json) => setToonData(json.data))
            .catch(console.error)
            .finally(() => setToonLoading(false));
    }, [toonInView]);

    // Hồng Kông
    const [hongKongData, setHongKongData] = useState(null);
    const [hongKongLoading, setHongKongLoading] = useState(false);
    const hongKongRef = useRef();
    const hongKongInView = useInView(hongKongRef);

    useEffect(() => {
        if (!hongKongInView || hongKongData) return;
            
        setHongKongLoading(true);

        fetch(
            "https://ophim1.com/v1/api/quoc-gia/hong-kong?limit=12&sort_field=modified.time"
        )
            .then((res) => res.json())
            .then((json) => setHongKongData(json.data))
            .catch(console.error)
            .finally(() => setHongKongLoading(false));
    }, [hongKongInView]);

    // Kinh dị
    const [honorData, setHonorData] = useState(null);
    const [honorLoading, setHonorLoading] = useState(false);
    const honorRef = useRef();
    const honorInView = useInView(honorRef);

    useEffect(() => {
        if (!honorInView || honorData) return;
            
        setHonorLoading(true);

        fetch(
            "https://ophim1.com/v1/api/the-loai/kinh-di?limit=12"
        )
            .then((res) => res.json())
            .then((json) => setHonorData(json.data))
            .catch(console.error)
            .finally(() => setHonorLoading(false));
    }, [honorInView]);

    // Sắp chiếu
    const [soonData, setSoonData] = useState(null);
    const [soonLoading, setSoonLoading] = useState(false);
    const soonRef = useRef();
    const soonInView = useInView(soonRef);

    useEffect(() => {
        if (!soonInView || soonData) return;
            
        setSoonLoading(true);

        fetch(
            "https://ophim1.com/v1/api/danh-sach/phim-le?limit=10"
        )
            .then((res) => res.json())
            .then((json) => setSoonData(json.data))
            .catch(console.error)
            .finally(() => setSoonLoading(false));
    }, [soonInView]);

    // Hài hước
    const [funData, setFunData] = useState(null);
    const [funLoading, setFunLoading] = useState(false);
    const funRef = useRef();
    const funInView = useInView(funRef);

    useEffect(() => {
        if (!funInView || funData) return;
            
        setFunLoading(true);

        fetch(
            "https://ophim1.com/v1/api/the-loai/hai-huoc?limit=12"
        )
            .then((res) => res.json())
            .then((json) => setFunData(json.data))
            .catch(console.error)
            .finally(() => setFunLoading(false));
    }, [funInView]);
    return (
    <div>
        <TopSlide topSlideData={topSlideData} imgDomain={imgDomain} />

        <div className={cx("home-container")}>
        {/* ===== TOPIC */}
            <div className={cx("topic")}>
                <div className={cx("topic-header")}>Bạn đang quan tâm gì?</div>

                <div className={cx("topic-content")}>
                {TOPIC.map((item) => (
                    <Link
                    key={item.id}
                    to={`/topic/${item.slug}`}
                    className={cx("topic-item")}
                    >
                        <div className={cx("topic-wrapper")}>
                            <div className={cx("topic-name")}>{item.name}</div>
                            <div className={cx("topic-info")}>
                            Xem chủ đề
                            <ShortNextIcon />
                            </div>
                        </div>
                    </Link>
                ))}
                </div>
            </div>

            {/* ===== SLIDES */}
            <div className={cx("slide-container")}>
                {/* HAN */}
                <div ref={hanRef}>
                    {hanLoading && <div className={cx("skeleton")} />}
                    {hanData && <MovieSlide data={hanData} />}
                </div>

                {/* US */}
                <div ref={usRef}>
                    {usLoading && <div className={cx("skeleton")} />}
                    {usData && <MovieSlide data={usData} />}
                </div>

                {/* CHINA */}
                <div ref={chinaRef}>
                    {chinaLoading && <div className={cx("skeleton")} />}
                    {chinaData && <MovieSlide data={chinaData} />}
                </div>
            </div>

            {/* ===== DISCUSS */}
            <TopDiscuss />

            <div ref={newRef}>
                {newLoading && <div className={cx("skeleton")} />}
                {newData && (<MovieSlide data={newData} title={"Phim Điện Ảnh Mới Coóng"} type={"thumb"} css={{paddingTop: "50px"}}/>)}
            </div>
            <div ref={tenSeriesRef}>
                {tenSeriesLoading && <div className={cx("skeleton")} />}
                {tenSeriesData && (<MovieSlide data={tenSeriesData} title={"Top 10 phim bộ hôm nay"} type={"top-10"} css={{paddingTop: "50px"}}/>)}
            </div>
            <div ref={theaterRef}>
                {theaterLoading && <div className={cx("skeleton")} />}
                {theaterData && (<MovieSlide data={theaterData} title={"Mãn Nhãn với Phim Chiếu Rạp"} type={"poster-thumb"} css={{paddingTop: "50px"}}/>)}
            </div>
            <div ref={tenSingleRef}>
                {tenSingleLoading && <div className={cx("skeleton")} />}
                {tenSingleData && (<MovieSlide data={tenSingleData} title={"Top 10 phim lẻ hôm nay"} type={"top-10"} css={{paddingTop: "20px"}}/>)}
            </div>
            <div ref={japanRef}>
                {japanLoading && <div className={cx("skeleton")} />}
                {japanData && (<MovieSlide data={japanData} title={"Phim Nhật Mới Oanh Tạc Chốn Này"} type={"thumb"} css={{paddingTop: "50px"}}/>)}
            </div>
            <div ref={thaiRef}>
                {thaiLoading && <div className={cx("skeleton")} />}
                {thaiData && (<MovieSlide data={thaiData} title={"Phim Thái New: Không Drama Đời Không Nể"} type={"thumb"} css={{paddingTop: "50px"}}/>)}
            </div>
            <div ref={toonRef}>
                <div className={cx("slide-title")}>
                    <div className={cx("title-text")}>Kho Tàng Hoạt Hình Mới Nhất</div>
                    <div className={cx("title-info")}>
                        <Link to="/danh-sach/hoat-hinh">
                        <span>Xem toàn bộ</span>
                        <NextIcon />
                        </Link>
                    </div>
                </div>
                {toonLoading && <div className={cx("skeleton")} />}
                {toonData && (<TopSlide topSlideData={toonData.items} imgDomain={imgDomain} type={"sub"} />)}
            </div>
            <div ref={hongKongRef}>
                {hongKongLoading && <div className={cx("skeleton")} />}
                {hongKongData && (<MovieSlide data={hongKongData} title={"Điện Ảnh Hồng Kông bên hông Chợ Lớn"} type={"thumb"} css={{paddingTop: "50px"}}/>)}
            </div>
            <div ref={honorRef}>
                {honorLoading && <div className={cx("skeleton")} />}
                {honorData && (<MovieSlide data={honorData} title={"Tôi Sợ Con Người Em Rồi Đó, nhưng Không Bằng Sợ Ma"} type={"thumb"} css={{paddingTop: "50px"}}/>)}
            </div>
            <div ref={soonRef}>
                {soonLoading && <div className={cx("skeleton")} />}
                {soonData && (<MovieSlide data={soonData} title={"Phim Sắp Chiếu Trên ATPhim"} type={"poster"} css={{paddingTop: "50px"}}/>)}
            </div>
            <div ref={funRef}>
                {funLoading && <div className={cx("skeleton")} />}
                {funData && (<MovieSlide data={funData} title={"Phim hài cười bể bụng bầu, hài kiểu tẻn tẻn"} type={"thumb"} css={{padding: "50px 0 100px 0"}}/>)}
            </div>
        </div>
    </div>
    );
}

export default Home;