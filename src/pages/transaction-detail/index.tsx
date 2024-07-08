import React, { useEffect, useState } from 'react';
import styles from './index.module.css'
import Image from 'next/image'
import { Router, useRouter } from 'next/router';
import TransactionsTable from '@/components/transactions-table';
import { fetchQueryCrossInfoById } from '@/common/api/api';
import { ellipsis, openLink } from '@/common/utils/utils';
import { useClipboard } from '@mantine/hooks';
import StatusTag from '@/components/tag';




const TransactionsDetail = () => {

    const router = useRouter();
    const [data, setData] = useState<any>({})
    const { copy, copied } = useClipboard();
    useEffect(() => {
        if(router?.query?.id)
        fetchQueryCrossInfoById(router.query.id).then((res) => {
            setData(res.data)
            console.log(res.data)
        })

    }, [router?.query?.id])

    return (
        <div className={styles.body}>
            <div className={styles.title}>
                {"Message Details"}
            </div>
            {data?.sourceInfo && <div className={styles.detail}>
                <div className={styles.detailContent}>
                    <div className={styles.statusTitle}>{"Status"}  <div className={styles.status}><StatusTag state={data.state} /></div></div>

                    <div className={styles.sourceChain}>
                        <div className={styles.subtitle}>
                            {"Source Chain"}
                        </div>
                        <div className={styles.sourceChainContent}>
                            <div className={styles.item}>
                                <div className={styles.itemTitle}>
                                    {"Sender Address :"}
                                </div>
                                <div className={styles.itemValue}>
                                    <img
                                        height={18}
                                        width={18}
                                        src={data?.sourceInfo?.chainInfo?.chainImg}
                                        alt="map" />
                                    {ellipsis(data?.sourceInfo?.address)}
                                    <Image
                                        onClick={() => {
                                            copy(data?.sourceInfo?.address)
                                        }}
                                        style={{
                                            cursor: 'pointer'
                                        }}
                                        height={14}
                                        width={14}
                                        src={'icon/copy.svg'}
                                        alt="map"></Image>
                                    <Image
                                        onClick={() => {
                                            openLink(data?.sourceInfo?.chainInfo?.chainName,
                                                data?.sourceInfo?.address,
                                                'address',
                                                data?.sourceInfo?.chainInfo?.scanUrl)
                                        }}
                                        style={{
                                            cursor: 'pointer'
                                        }}
                                        height={14}
                                        width={14}
                                        src={'icon/open.svg'}
                                        alt="map"></Image>
                                </div>
                            </div>
                            <div className={styles.item}>
                                <div className={styles.itemTitle}>
                                    {"Transaction Hash :"}
                                </div>
                                <div className={styles.itemValue}>
                                    <img
                                        height={18}
                                        width={18}
                                        src={data?.sourceInfo?.chainInfo?.chainImg}
                                        alt="map" />
                                    {ellipsis(data?.sourceInfo?.hash)}
                                    <Image
                                        onClick={() => {
                                            copy(data?.sourceInfo?.hash)
                                        }}
                                        style={{
                                            cursor: 'pointer'
                                        }}
                                        height={14}
                                        width={14}
                                        src={'icon/copy.svg'}
                                        alt="map"></Image>
                                    <Image
                                        onClick={() => {
                                            openLink(data?.sourceInfo?.chainInfo?.chainName,
                                                data?.sourceInfo?.hash,
                                                'tx',
                                                data?.sourceInfo?.chainInfo?.scanUrl)
                                        }}
                                        style={{
                                            cursor: 'pointer'
                                        }}
                                        height={14}
                                        width={14}
                                        src={'icon/open.svg'}
                                        alt="map"></Image>
                                </div>
                            </div>
                            <div className={styles.item}>
                                <div className={styles.itemTitle}>
                                    {"Block :"}
                                </div>
                                <div className={styles.itemValue}>
                                    {data?.sourceInfo?.block}
                                </div>
                            </div>

                            <div className={styles.item}>
                                <div className={styles.itemTitle}>
                                    {"Timestamp :"}
                                </div>
                                <div className={styles.itemValue}>
                                    {data?.sourceInfo?.timestamp}
                                </div>
                            </div>
                            {/* <div className={styles.item}>
                                <div className={styles.itemTitle}>
                                    {"Interacted Protocol :"}
                                </div>
                                <div className={styles.itemValue}>
                                    { }
                                </div>
                            </div> */}
                            <div className={styles.item}>
                                <div className={styles.itemTitle}>
                                    {"Contract Address :"}
                                </div>
                                <div className={styles.itemValue}>
                                    <img
                                        height={18}
                                        width={18}
                                        src={data?.sourceInfo?.chainInfo?.chainImg}
                                        alt="map" />

                                    {ellipsis(data?.sourceInfo?.chainInfo?.mosContract)}
                                    <Image
                                        onClick={() => {
                                            copy(data?.sourceInfo?.chainInfo?.mosContract)
                                        }}
                                        style={{
                                            cursor: 'pointer'
                                        }}
                                        height={14}
                                        width={14}
                                        src={'icon/copy.svg'}
                                        alt="map"></Image>
                                    <Image
                                        onClick={() => {
                                            openLink(data?.sourceInfo?.chainInfo?.chainName,
                                                data?.sourceInfo?.chainInfo?.mosContract,
                                                'address',
                                                data?.sourceInfo?.chainInfo?.scanUrl)
                                        }}
                                        style={{
                                            cursor: 'pointer'
                                        }}
                                        height={14}
                                        width={14}
                                        src={'icon/open.svg'}
                                        alt="map"></Image>
                                </div>
                            </div>
                        </div>
                        {/* <div className={styles.data}>
                            <div className={styles.itemTitle}>
                                {"Proofdata Generated :"}
                            </div>
                            <div className={styles.itemValue}>
                                { }
                            </div>
                        </div> */}
                    </div>

                    <div className={styles.sourceChain}>
                        <div className={styles.subtitle}>
                            {"Relay Chain"}
                        </div>
                        <div className={styles.sourceChainContent}>
                            <div className={styles.item}>
                                <div className={styles.itemTitle}>
                                    {"Messenger Address :"}
                                </div>
                                <div className={styles.itemValue}>
                                    <img
                                        height={18}
                                        width={18}
                                        src={data?.relyerInfo?.chainInfo?.chainImg}
                                        alt="map" />
                                    {ellipsis(data?.relyerInfo?.address)}
                                    <Image
                                        onClick={() => {
                                            copy(data?.relyerInfo?.address)
                                        }}
                                        style={{
                                            cursor: 'pointer'
                                        }}
                                        height={14}
                                        width={14}
                                        src={'icon/copy.svg'}
                                        alt="map"></Image>
                                    <Image
                                        onClick={() => {
                                            openLink(data?.relyerInfo?.chainInfo?.chainName,
                                                data?.relyerInfo?.address,
                                                'address',
                                                data?.relyerInfo?.chainInfo?.scanUrl)
                                        }}
                                        style={{
                                            cursor: 'pointer'
                                        }}
                                        height={14}
                                        width={14}
                                        src={'icon/open.svg'}
                                        alt="map"></Image>
                                </div>
                            </div>
                            <div className={styles.item}>
                                <div className={styles.itemTitle}>
                                    {"Transaction Hash :"}
                                </div>
                                <div className={styles.itemValue}>
                                    <img
                                        height={18}
                                        width={18}
                                        src={data?.relyerInfo?.chainInfo?.chainImg}
                                        alt="map" />
                                    {ellipsis(data?.relyerInfo?.hash)}
                                    <Image
                                        onClick={() => {
                                            copy(data?.relyerInfo?.hash)
                                        }}
                                        style={{
                                            cursor: 'pointer'
                                        }}
                                        height={14}
                                        width={14}
                                        src={'icon/copy.svg'}
                                        alt="map"></Image>
                                    <Image
                                        onClick={() => {
                                            openLink(data?.relyerInfo?.chainInfo?.chainName,
                                                data?.relyerInfo?.hash,
                                                'tx',
                                                data?.relyerInfo?.chainInfo?.scanUrl)
                                        }}
                                        style={{
                                            cursor: 'pointer'
                                        }}
                                        height={14}
                                        width={14}
                                        src={'icon/open.svg'}
                                        alt="map"></Image>
                                </div>
                            </div>
                            <div className={styles.item}>
                                <div className={styles.itemTitle}>
                                    {"Block :"}
                                </div>
                                <div className={styles.itemValue}>
                                    {data?.relyerInfo?.block}
                                </div>
                            </div>

                            <div className={styles.item}>
                                <div className={styles.itemTitle}>
                                    {"Timestamp :"}
                                </div>
                                <div className={styles.itemValue}>
                                    {data?.relyerInfo?.timestamp}
                                </div>
                            </div>
                            {/* <div className={styles.item}>
                                <div className={styles.itemTitle}>
                                    {"Interacted Protocol :"}
                                </div>
                                <div className={styles.itemValue}>
                                </div>
                            </div> */}
                            <div className={styles.item}>
                                <div className={styles.itemTitle}>
                                    {"Contract Address :"}
                                </div>
                                <div className={styles.itemValue}>
                                    <img
                                        height={18}
                                        width={18}
                                        src={data?.relyerInfo?.chainInfo?.chainImg}
                                        alt="map" />

                                    {ellipsis(data?.relyerInfo?.contract)}
                                    <Image
                                        onClick={() => {
                                            copy(data?.relyerInfo?.contract)
                                        }}
                                        style={{
                                            cursor: 'pointer'
                                        }}
                                        height={14}
                                        width={14}
                                        src={'icon/copy.svg'}
                                        alt="map"></Image>
                                    <Image
                                        onClick={() => {
                                            openLink(data?.relyerInfo?.chainInfo?.chainName,
                                                data?.relyerInfo?.contract,
                                                'address',
                                                data?.relyerInfo?.chainInfo?.scanUrl)
                                        }}
                                        style={{
                                            cursor: 'pointer'
                                        }}
                                        height={14}
                                        width={14}
                                        src={'icon/open.svg'}
                                        alt="map"></Image>
                                </div>
                            </div>
                        </div>
                        <div className={styles.data}>
                            <div className={styles.itemTitle}>
                                {"Light Client Verification :"}
                            </div>
                            <div className={styles.itemValue}>
                                <div className={styles.status}><StatusTag state={data.state} /></div>

                            </div>
                        </div>
                        {/* <div className={styles.data}>
                            <div className={styles.itemTitle}>
                                {"Proofdata Generated :"}
                            </div>
                            <div className={styles.itemValue}>
                                { }
                            </div>
                        </div> */}
                    </div>

                    <div className={styles.sourceChain}>
                        <div className={styles.subtitle}>
                            {"Destination Chain"}
                        </div>
                        <div className={styles.sourceChainContent}>
                            <div className={styles.item}>
                                <div className={styles.itemTitle}>
                                    {"Sender Address :"}
                                </div>
                                <div className={styles.itemValue}>
                                    <img
                                        height={18}
                                        width={18}
                                        src={data?.destinationInfo?.chainInfo?.chainImg}
                                        alt="map" />
                                    {ellipsis(data?.destinationInfo?.address)}
                                    <Image
                                        onClick={() => {
                                            copy(data?.destinationInfo?.address)
                                        }}
                                        style={{
                                            cursor: 'pointer'
                                        }}
                                        height={14}
                                        width={14}
                                        src={'icon/copy.svg'}
                                        alt="map"></Image>
                                    <Image
                                        onClick={() => {
                                            openLink(data?.destinationInfo?.chainInfo?.chainName,
                                                data?.destinationInfo?.address,
                                                'address',
                                                data?.destinationInfo?.chainInfo?.scanUrl)
                                        }}
                                        style={{
                                            cursor: 'pointer'
                                        }}
                                        height={14}
                                        width={14}
                                        src={'icon/open.svg'}
                                        alt="map"></Image>
                                </div>
                            </div>
                            <div className={styles.item}>
                                <div className={styles.itemTitle}>
                                    {"Transaction Hash :"}
                                </div>
                                <div className={styles.itemValue}>
                                    <img
                                        height={18}
                                        width={18}
                                        src={data?.destinationInfo?.chainInfo?.chainImg}
                                        alt="map" />
                                    {ellipsis(data?.destinationInfo?.hash)}
                                    <Image
                                        onClick={() => {
                                            copy(data?.destinationInfo?.hash)
                                        }}
                                        style={{
                                            cursor: 'pointer'
                                        }}
                                        height={14}
                                        width={14}
                                        src={'icon/copy.svg'}
                                        alt="map"></Image>
                                    <Image
                                        onClick={() => {
                                            openLink(data?.destinationInfo?.chainInfo?.chainName,
                                                data?.destinationInfo?.hash,
                                                'tx',
                                                data?.destinationInfo?.chainInfo?.scanUrl)
                                        }}
                                        style={{
                                            cursor: 'pointer'
                                        }}
                                        height={14}
                                        width={14}
                                        src={'icon/open.svg'}
                                        alt="map"></Image>
                                </div>
                            </div>
                            <div className={styles.item}>
                                <div className={styles.itemTitle}>
                                    {"Block :"}
                                </div>
                                <div className={styles.itemValue}>
                                    {data?.destinationInfo?.block}
                                </div>
                            </div>

                            <div className={styles.item}>
                                <div className={styles.itemTitle}>
                                    {"Timestamp :"}
                                </div>
                                <div className={styles.itemValue}>
                                    {data?.destinationInfo?.timestamp}
                                </div>
                            </div>
                            {/* <div className={styles.item}>
                                <div className={styles.itemTitle}>
                                    {"Interacted Protocol :"}
                                </div>
                                <div className={styles.itemValue}>
                                    { }
                                </div>
                            </div> */}
                            <div className={styles.item}>
                                <div className={styles.itemTitle}>
                                    {"Contract Address :"}
                                </div>
                                <div className={styles.itemValue}>
                                    <img
                                        height={18}
                                        width={18}
                                        src={data?.destinationInfo?.chainInfo?.chainImg}
                                        alt="map" />

                                    {ellipsis(data?.destinationInfo?.contract)}
                                    <Image
                                        onClick={() => {
                                            copy(data?.sourceInfo?.contract)
                                        }}
                                        style={{
                                            cursor: 'pointer'
                                        }}
                                        height={14}
                                        width={14}
                                        src={'icon/copy.svg'}
                                        alt="map"></Image>
                                    <Image
                                        onClick={() => {
                                            openLink(data?.destinationInfo?.chainInfo?.chainName,
                                                data?.destinationInfo?.contract,
                                                'address',
                                                data?.destinationInfo?.chainInfo?.scanUrl)
                                        }}
                                        style={{
                                            cursor: 'pointer'
                                        }}
                                        height={14}
                                        width={14}
                                        src={'icon/open.svg'}
                                        alt="map"></Image>
                                </div>
                            </div>
                        </div>
                        {/* <div className={styles.data}>
                            <div className={styles.itemTitle}>
                                {"Proofdata Generated :"}
                            </div>
                            <div className={styles.itemValue}>
                                { }
                            </div>
                        </div> */}
                    </div>
                </div>
                <div className={styles.detailshadow}>


                </div>

            </div>}
        </div>
    )
}

export default TransactionsDetail;