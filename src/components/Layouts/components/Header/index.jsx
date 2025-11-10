import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Search from '../Search';

const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={cx('header-wrapper', 'fixed')}>
            <div className={cx('header')}>
                <a href='/' className={cx('logo')}>
                    <img src="/logo.svg" alt="ATPhim" />
                </a>
                <Search />
                <div style={{ backgroundColor: 'blue', width: '882px', height: '40px' }}>

                </div>
            </div>
        </div>
    );
}

export default Header;