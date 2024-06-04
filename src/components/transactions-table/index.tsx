import { Box, Container, Flex, Skeleton, Space, Table, Text, Title, Select } from "@mantine/core";
import React, { useEffect, useState } from "react";
import TableBottomPagination from "../table-bottom-pagination";
import { useRouter } from "next/router";
import styles from './index.module.css'
import Image from "next/image";
import { useClipboard } from "@mantine/hooks";

import Head from "next/head";
import useTablePageChange from "@/common/hooks/useTablePageChange";
import { useNextQueryParam } from "@/common/hooks/useNextQueryParam";
import { fetchQueryCrossList, fetchQueryStatistics } from "@/common/api/api";
import { ellipsis } from "@/common/utils/utils";
import StatusTag from "../tag";
const selectStyles = (theme) => ({

    input: {
        borderColor: 'gray',

    },

})
const TransactionTableFields = [
    "Id",
    "Status",
    "Source Hash",
    "From",
    "Destination Hash",
    // "Protocol",
    "Time",
]
const states = [
    {
        id: 3,
        color: '#FABE00',
        label: 'Initiated',

    },
    {
        id: 1,
        color: '#57CE7F',
        label: 'Complete',

    },
   
    {
        id: 2,
        color: '#FABE00',
        label: 'In Progress',

    },


]

const TransactionsTable = ({ initSize }) => {
    // const block = useNextQueryParam("block");
    const { copy, copied } = useClipboard();

    const [list, setList] = useState([])
    const [source, setSource] = useState<string | null>('');
    const [destination, setDestination] = useState<string | null>('');
    const [status, setStatus] = useState<string | null>('');
    const [chains, setChains] = useState([])


    const router = useRouter()
    const {
        currentPage,
        pageSize,
        totalPage,
        handlePageChange,
        handlePageSizeChange,
        setTotalPage,
        changeRoute
    } = useTablePageChange({ baseParams: "", initSize: initSize });

    useEffect(() => {
        fetchQueryStatistics().then(res => {

            let array = [{
                value: "",
                label: 'ALL'
            }]
            JSON.parse(res.data.supportChainList).map(item => {
                array.push({
                    value: item.chainId.toString(),
                    label: item.chainName
                })
            })
            console.log(array)
            setChains(array)
        })

    }, [])

    useEffect(() => {

        fetchQueryCrossList(currentPage, pageSize, source, destination, status).then(res => {
            console.log(res)
            setTotalPage(res.data.total)
            setList(res.data.list)
        })



    }, [currentPage, pageSize, source, destination, status])

    return (
        <>
            <div className={styles.title}>
                <div className={styles.titleText}>
                    {'Transactions'}
                </div>
                <div className={styles.titleRight}>
                    <div className={styles.selectItem}>
                        <Select
                            label="Source Chain"
                            value={source}
                            data={chains}
                            styles={(theme) => ({
                                input: {
                                    borderColor: 'gray',
                                },
                            })}
                            onChange={setSource}
                        />
                    </div>
                    <div className={styles.selectItem}>
                        <Select
                            label="Destination Chain"
                            value={destination}
                            data={chains}
                            styles={selectStyles}
                            onChange={setDestination}
                        />
                    </div>
                    <div className={styles.selectItem}>
                        <Select
                            label="Status"
                            value={status}
                            styles={selectStyles}
                            data={[{ value: '', label: 'ALL' },
                            { value: '0', label: 'Initiated' },
                            { value: '1', label: 'Complete' },
                            { value: '2', label: 'In Progress' }

                            ]}
                            onChange={setStatus}

                        />
                    </div>
                </div>
            </div>
            <div className={styles.transactions}>
                <div className={styles.transactionsContent}>
                    <Table className={styles.ttable} horizontalSpacing={"xl"}>
                        <thead>
                            <tr className={styles.tr}>
                                {TransactionTableFields.map((name, index) => {
                                    return <th className={styles.th} style={{
                                        paddingLeft: index == 0 ? '24px' : '0px'
                                    }} key={name}>{name}</th>
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((element, index) => (
                                <tr className={styles.trBody}
                                
                                   
                                key={index}>
                                     <td >
                                    <div style={{marginLeft:'12px',cursor:'pointer',fontWeight:"600", color:'#FABE00'}}
                                     onClick={()=>{
                                        router.push('/transaction-detail?id='+element.id)
                                    }
                                    }>
                                       {element.id}
                                       </div>
                                    </td>
                                    <td >
                                       
                                        <StatusTag state={element.state} />
                                       
                                    </td>
                                    <td >
                                        <div className={styles.addressTd}>
                                            <img
                                                height={18}
                                                width={18}
                                                src={element.sourceChain.chainImg}
                                                alt="map" />
                                            {ellipsis(element.sourceHash)}
                                            <Image
                                                onClick={() => {
                                                    copy(element.sourceHash)
                                                    event.stopPropagation();
                                                }}
                                                style={{
                                                    cursor: 'pointer'
                                                }}
                                                height={14}
                                                width={14}
                                                src={'icon/copy.svg'}
                                                alt="map"></Image>
                                        </div>
                                    </td>
                                    <td >
                                        <div className={styles.addressTd}>
                                            {ellipsis(element.sourceAddress)}
                                            <Image
                                                onClick={() => {
                                                    copy(element.sourceAddress)
                                                    event.stopPropagation();
                                                }}
                                                style={{
                                                    cursor: 'pointer'
                                                }}
                                                height={14}
                                                width={14}
                                                src={'icon/copy.svg'}
                                                alt="map"></Image>
                                        </div>
                                    </td >
                                    <td >
                                        <div className={styles.addressTd}>
                                            <img
                                                height={18}
                                                width={18}
                                                src={element.destinationChain.chainImg}
                                                alt="map" />
                                            {ellipsis(element.destinationHash)}
                                            <Image
                                                onClick={() => {
                                                    copy(element.destinationHash)
                                                    event.stopPropagation();
                                                }}
                                                style={{
                                                    cursor: 'pointer'
                                                }}
                                                height={14}
                                                width={14}
                                                src={'icon/copy.svg'}
                                                alt="map"></Image>
                                        </div>
                                    </td>
                                    {/* <td>
                                        {
                                            element.Protocol
                                        }
                                    </td> */}
                                    <td>
                                        {element.timestamp}
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Space h={"lg"}></Space>
                    <TableBottomPagination currentPage={currentPage} totalPage={totalPage} onPageChange={handlePageChange} />
                </div >
                <div className={styles.transactionsShadow}>

                </div>
            </div >
        </>
    )
}



export default TransactionsTable;
