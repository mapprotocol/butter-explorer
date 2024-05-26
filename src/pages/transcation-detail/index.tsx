import React, { useEffect, useState } from 'react';
import styles from './index.module.css'
import Image from 'next/image'
import { Router, useRouter } from 'next/router';
import TransactionsTable from '@/components/transactions-table';
import { fetchQueryCrossList } from '@/common/api/api';




const TransactionsDetail = () => {

   
   
    useEffect(() => {



    }, [])

    return (
        <div className={styles.body}>
            <div className={styles.transactions}>
                <TransactionsTable initSize={25}></TransactionsTable>
            </div>
        </div>
    )
}

export default TransactionsDetail;