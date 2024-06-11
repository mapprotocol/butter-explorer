import React from 'react';
import Image from 'next/image';
import styles from './index.module.css'

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
const StatusTag = ({ state }) => {
    const stateInfo = states[Number(state)];

    return (
        <div className={styles.statusTag} style={{ backgroundColor: stateInfo?.color }}>
            <Image
                height={14}
                width={14}
                src={`icon/state${stateInfo?.id}.svg`}
                alt="map"
            />
            {stateInfo?.label}
        </div>
    );
};



export default StatusTag;