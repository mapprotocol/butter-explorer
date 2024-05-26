import React, { useEffect, useState } from 'react';
import styles from './index.module.css'
import Image from 'next/image'
import { Router, useRouter } from 'next/router';




const Header = () => {
    const [fade, setFade] = useState(styles.header)

    const router = useRouter()
    useEffect(() => {
        const headerVisibility = () => {
            if (window.pageYOffset > 100) {
                setFade(`${styles.header} ${styles.shadow}`)
            } else {
                setFade(`${styles.header}`)
            }
        };

   
        window.addEventListener("scroll", headerVisibility);
        return () => {
            window.removeEventListener('scroll', headerVisibility);
        };

    }, [])
    return (
        <div className={fade}>
            <div className={styles.headerLeft}>
                <div onClick={() => {
                    router.push('/')
                }}>
                    <Image
                        style={{
                            cursor: 'pointer'
                        }}
                        height={32}
                        width={178}
                        src="/images/logo.png"
                        alt="map" />
                </div>
                <div className={styles.input}>
                    <input className={styles.inputContent} type="text" placeholder='Search by Tx Hash / Address / VAA ID' />
                    <div className={styles.sreach}>
                        <Image
                            height={14}
                            width={14}
                            src="/icon/sreach.svg"
                            alt="map" />
                    </div>
                </div>
            </div>
            <div className={styles.headerRight}>
                <div className={styles.rightItem} style={{ color: '#FABE00' }} onClick={()=>{
                    window.open('https://www.butterswap.io/dashboard')
                }} >
                    Dashboard
                </div>
                <div className={styles.rightItem} onClick={()=>{
                    router.push('/transactions')
                }} >
                    Transactions
                </div>
                {/* <div>
                        Mainnet
                    </div> */}
            </div>
        </div >
    )
}

export default Header;