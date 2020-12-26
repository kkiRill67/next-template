import Link from 'next/link'
import styles from '../../styles/Menu.module.scss'

export default function Menu(props) {
    return (
        <header className={styles.head}>
            <div  className={styles.wrap}>
                <div className={styles.showMenu} onClick={() => props.onShow(!props.show)}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className={styles.stick} >
                    <img src="/next.png" className={styles.logo} />
                    <span>RU</span>
                </div>
                <nav>
                    <Link href='/'><a className={styles.card}>Главная</a></Link>
                </nav>
            </div>
            
        </header>
    )
}