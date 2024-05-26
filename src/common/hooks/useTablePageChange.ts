"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { number, string } from "prop-types";
import { useNextQueryParam } from "./useNextQueryParam";

type Props = {
    baseParams: string
    initSize: number
}

const SIZES = [10, 25, 50, 100];

const useTablePageChange = ({ baseParams, initSize }: Props) => {
    const router = useRouter();
    // const {page, size} = router.query;
    const page = useNextQueryParam("page");
    const size = useNextQueryParam("size");
    const [currentPage, setCurrentPage] = useState(isNaN(Number(page)) ? 1 : Number(page));
    const [pageSize, setPageSize] = useState(isNaN(Number(size)) ? initSize : Number(size));
    const [totalPage, setTotalPage] = useState(1);


    useEffect(() => {
        if (!isNaN(Number(page))) {
            setCurrentPage(Number(page));
        } else {
            setCurrentPage(1);
        }
        if (!isNaN(Number(size))) {
            setPageSize(Number(size));
        } else {

            setPageSize(initSize);
        }
    }, [page, size]);

    const changeRoute = (page: number, size: number) => {
        router.push((router.asPath.split("?")[0]) + '?' + (baseParams ? baseParams + "&" : "") + `page=${page}&size=${size}`, undefined, {
            shallow: true
        })
    }

    const handlePageChange = (page: number) => {
        if (page <= totalPage) {
            changeRoute(page, pageSize);
        } else {
            changeRoute(totalPage, pageSize);
        }
    }

    const handlePageSizeChange = (size: string) => {
        changeRoute(currentPage, Number(size));
    }

    return {
        currentPage,
        pageSize,
        handlePageSizeChange,
        handlePageChange,
        totalPage,
        setTotalPage,
        changeRoute
    }

}

export default useTablePageChange;
