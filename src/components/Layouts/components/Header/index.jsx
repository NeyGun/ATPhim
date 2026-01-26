import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Search from '../Search';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={cx('header-wrapper', 'fixed')}>
            <div className={cx('header')}>
                <Link to='/' className={cx('logo')}>
                    <img src="/logo.svg" alt="ATPhim" />
                </Link>
                <Search />
                <div style={{ width: '882px', height: '40px' }}>

                </div>
            </div>
        </div>
    );
}

export default Header;