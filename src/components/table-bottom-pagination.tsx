

import {ChangeEventHandler, KeyboardEvent, useEffect, useState} from "react";
import {Flex, Pagination, Text, TextInput} from "@mantine/core";
// import useBreakpointsUp from "@/common/hooks/useBreakpointsUp";

type Props = {
    currentPage: number,
    totalPage: number,
    onPageChange: (page: number) => void;
}

const TableBottomPagination = ({currentPage, totalPage, onPageChange}: Props) => {
    const [preEnabled, setPreEnabled] = useState(false);
    const [nextEnabled, setNextEnabled] = useState(false);
    const [jumpInputValue, setJumpInputValue] = useState("");
    const handleJumpInput = (e: any) => {
        setJumpInputValue(e.target.value.replaceAll(".", ""));
    }
    const handleTapPre = () => {
        onPageChange(currentPage - 1);
    }
    const handleTapNext = () => {
        onPageChange(currentPage + 1);
    }
    const handleTapFirst = () => {
        onPageChange(1);
    }
    const handleTapLast = () => {
        onPageChange(totalPage);
    }
    const handleJump = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter") {
            if (Number(jumpInputValue)) {
                onPageChange(Number(jumpInputValue));
            }
        }
    }

    const [_totalPage, setTotalPage] = useState(0);
    useEffect(() => {
        setTotalPage(totalPage < currentPage ? currentPage : totalPage);
    }, [totalPage, currentPage]);

    // const {isLargerOrEqual: mdUp} = useBreakpointsUp({breakpoint: "md"});


    return (
        <Flex

            align={"center"} gap={"md"} w={"100%"} justify={"center"}>
            <Text fz={"sm"} opacity={0.6}>Total {totalPage} pages</Text>
            <Pagination 
            
            total={_totalPage} value={currentPage} onChange={onPageChange}
                        size={"xs"}
                        withEdges
            >
            </Pagination>
            <Flex align={"center"} gap={"xs"}>
                <Text fz={"sm"}>Jump to</Text>
                <TextInput
                    onChange={handleJumpInput}
                    onKeyDown={handleJump}
                    type={"number"} size={"xs"} variant={"filled"} ></TextInput>
            </Flex>
        </Flex>
    )
}

export default TableBottomPagination;
