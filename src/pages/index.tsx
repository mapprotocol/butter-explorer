import Image from "next/image";
import styles from './index.module.css'
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Tooltip, Button } from '@mantine/core';
import Transactions from "@/components/transactions-table";
import TransactionsTable from "@/components/transactions-table";
import { fetchQueryCharData, fetchQueryCrossList, fetchQueryStatistics } from "@/common/api/api";
import LineChart from "@/components/echarts/LineChart";
import BarChart from "@/components/echarts/BarChart";



export default function Home() {
  const [totalData, setTotalData] = useState({
    totalMessages: '',
    messageOf24Hours: '',
    supportChainTotal: '',
    supportChainList: []
  })

  const [type, setType] = useState(2)
  const [chartData, setChartData] = useState({
    addressCount: [0, 0, 0],
    sourceTransferCountAll: [0, 0, 0],
    toChainTransferCountAll: [0, 0, 0],
    transferCountAll: [0, 0, 0],
    address: [[], [], []],
    sourceChain: [[], [], []],
    toChain: [[], [], []],
    transfer: [[], [], []]
  })
  useEffect(() => {
    fetchQueryStatistics().then(res => {
      res.data.supportChainList = JSON.parse(res.data.supportChainList)
      setTotalData(res.data)
    })



    fetchQueryCharData().then(res => {
      let data = res.data
      chartData.addressCount = [data.day7AddressCountAll, data.day30AddressCountAll, data.addressAllCount]
      chartData.sourceTransferCountAll = [data.day7SourceTransferCountAll, data.day30SourceTransferCountAll, data.sourceTransferCountAll]
      chartData.toChainTransferCountAll = [data.day7ToChainTransferCountAll, data.day30ToChainTransferCountAll, data.dayAllToChainTransferCountAll]
      chartData.transferCountAll = [data.day7TransferCountAll, data.day30TransferCountAll, data.transferAllCount]
      chartData.address = [data.address7Days, data.address30Days, data.allAddress]
      chartData.sourceChain = [data.sourceChain7Days, data.sourceChain30Days, data.sourceChainAll]
      chartData.toChain = [data.toChain7Days, data.toChain30Days, data.toChainAll]
      chartData.transfer = [data.transfer7Days, data.transfer30Days, data.allTransfer]



      setChartData({ ...chartData })
    })

  }, [])
  return (
    <>
      <div className={styles.body}>
        <div className={styles.title}>
          {'Overview'}
        </div>
        <div className={styles.totalData}>
          <div className={styles.totalDataContent}>
            <div className={styles.totalItem}>
              <div className={styles.totalItemTitle}>
                total messages
                <Tooltip label="total messages">
                  <Image
                    height={12}
                    width={12}
                    src={`/icon/tip.svg`}
                    alt="map" />
                </Tooltip>
              </div>
              <div className={styles.totalItemValue}>
                {Number(totalData.totalMessages).toLocaleString()}
              </div>
            </div>
            <div className={styles.totalItem}>
              <div className={styles.totalItemTitle}>
                24H Messages
                <Tooltip label="24H Messages">
                  <Image
                    height={12}
                    width={12}
                    src={`/icon/tip.svg`}
                    alt="map" />
                </Tooltip>
              </div>
              <div className={styles.totalItemValue}>
                {Number(totalData.messageOf24Hours).toLocaleString()}
              </div>
            </div>
            <div className={styles.totalItem}>
              <div className={styles.totalItemTitle}>
                Supported Networks
                <Tooltip label="24H Messages">
                  <Image
                    height={12}
                    width={12}
                    src={`/icon/tip.svg`}
                    alt="map" />
                </Tooltip>
              </div>
              <div className={styles.totalItemValue}>
                {totalData.supportChainTotal.toLocaleString()}
              </div>
            </div>
            <div className={styles.totalItem} >
              <div className={styles.totalItemTitle} style={{
                fontSize: '18px',
                color: '#000',
                fontWeight: 600,
                cursor: 'pointer'
              }}
                onClick={() => {
                  location.href = 'https://www.butternetwork.io/en'

                }}
              >
                ButterNetwork
                <Image
                  height={12}
                  width={12}
                  src={`/icon/link.svg`}
                  alt="map" />
              </div>
            </div>

          </div>
          <div className={styles.totalDataShadow}></div>
        </div>


        <div className={styles.title}>
          {'Statistics'}
        </div>
        <div className={styles.tabs}>
          <div className={styles.tab} onClick={() => { setType(0) }} style={{ color: type == 0 ? '#FABE00' : '#7C7C7C' }}>{'Last 7 days'}</div>
          <div className={styles.tab} onClick={() => { setType(1) }} style={{ color: type == 1 ? '#FABE00' : '#7C7C7C' }}>{'Last 30 days'}</div>
          <div className={styles.tab} onClick={() => { setType(2) }} style={{ color: type == 2 ? '#FABE00' : '#7C7C7C' }}>{'All-Time'}</div>
        </div>
        <div className={styles.charts}>
          <div className={styles.chartsContent}>
            <div className={styles.chartItem}>
              <div className={styles.chartTitle}>
                {"Active Users"}
                <div className={styles.line}></div>
                <text className={styles.chartValue}>
                  {chartData.addressCount[type].toLocaleString()}
                </text>
              </div>
              <LineChart data={chartData.address[type]} type={"Active Users"} />
            </div>
            <div className={styles.chartItem}>
              <div className={styles.chartTitle}>
                {"Messages"}
                <div className={styles.line}></div>
                <text className={styles.chartValue}>
                  {chartData.transferCountAll[type].toLocaleString()}
                </text>
              </div>
              <LineChart data={chartData.transfer[type]} type={"Messages"} />
            </div>
            <div className={styles.chartItem}>
              <div className={styles.chartTitle}>
                {"Source Chain Messages"}
                <div className={styles.line}></div>
                <text className={styles.chartValue}>
                  {chartData.sourceTransferCountAll[type].toLocaleString()}
                </text>

              </div>
              <BarChart data={chartData.sourceChain[type]} type={"Source Chain Messages"} />
            </div>
            <div className={styles.chartItem}>
              <div className={styles.chartTitle}>
                {"Destination Chain Messages"}
                <div className={styles.line}></div>
                <text className={styles.chartValue}>
                  {chartData.toChainTransferCountAll[type].toLocaleString()}
                </text>
              </div>
              <BarChart data={chartData.toChain[type]} type={"Destination Chain Messages"} />
            </div>
          </div>
          <div className={styles.chartsShadow}></div>

        </div>
        <div className={styles.title}>
          {'Supported Network'}
        </div>
        <div className={styles.supported}>
          <div className={styles.supportedContent}>
            <div className={styles.supportedTitle}>
              {'Supported Network'}
            </div>
            <div className={styles.chains}>
              {totalData.supportChainList.map((item, index) => <div className={styles.chain} key={index}>
                <img
                  height={24}
                  width={24}
                  src={item.chainImg}
                  alt="map" />
                {item.chainName}

              </div>
              )}
              {totalData.supportChainList.map((item, index) => <div className={styles.chain} key={index}>
                <img
                  height={24}
                  width={24}
                  src={item.chainImg}
                  alt="map" />
                {item.chainName}

              </div>
              )}
            </div>
          </div>
          <div className={styles.supportedShadow}></div>

        </div>

        <div className={styles.transactions}><TransactionsTable initSize={10}></TransactionsTable>
        </div>
      </div>
    </>
  );
}
