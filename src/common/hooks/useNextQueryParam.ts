"use client"; 
import {useRouter} from "next/router";
import {useMemo} from "react";


export const useNextQueryParam = (key: string): string | undefined => {
    const { asPath } = useRouter();
    const value = useMemo(() => {
        const match = asPath.match(new RegExp(`[&?]${key}=(.*?)(&|$)`));
        if (!match) return undefined;
        return decodeURIComponent(match[1]);
    }, [asPath, key]);

    return value;
};
