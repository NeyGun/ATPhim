import { useEffect, useState } from "react";
import classNames from 'classnames/bind';

import MovieSlide from "~/components/MovieSlide/index.jsx"
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
    const [test, setTest] = useState(null);
    useEffect(() => {
        const url1 = 'https://ophim1.com/v1/api/quoc-gia/han-quoc';
        const options1 = {method: 'GET', headers: {accept: 'application/json'}};

        fetch(url1, options1)
        .then(res => res.json())
        .then(json => setTest(json.data))
        .catch(err => console.error(err));
    }, [])


    const [test1, setTest1] = useState(null);
    useEffect(() => {
        const url = 'https://ophim1.com/v1/api/quoc-gia/nhat-ban';
        const options = {method: 'GET', headers: {accept: 'application/json'}};

        fetch(url, options)
        .then(res => res.json())
        .then(json => setTest1(json.data))
        .catch(err => console.error(err));
    }, [])
  
    return (
        <div className={cx("home-container")}>
            <div className={cx("slide-container")}>
                {test && <MovieSlide data={test}/>}
                {/* {test1 && <MovieSlide data={test1}/>} */}
            </div>
        </div>
    );
}

export default Home;