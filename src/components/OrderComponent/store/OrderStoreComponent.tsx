import { MRT_ColumnDef } from "material-react-table";
import { IOrder } from "../../../models/Order";
import { formatAnyDate, formatNumberWithDots } from "../../../utils";
import { useAppDispatch, useAppSelector } from "../../../services/store/store";
import { useEffect } from "react";
import { getAllStore } from "../../../services/features/storeSlice";
import { getOrderStore, setFilterOrdersStoreConfig } from "../../../services/features/orderSlice";
import { FilterConfigByStore } from "../../../models/constant/FilterConfig";
import { Stack } from "@mui/material";
import CommonTableFilterPaginationV2 from "../../CommonTable/CommonTableFilterPaginationV2";

const OrderStoreComponent = () => {
    const { stores } = useAppSelector(state => state.stores)
    const { filterOrderByStore, orderByStore, totalItemsStore, totalPagesStore } = useAppSelector(state => state.order)
    const dispatch = useAppDispatch()

    //colum table 
    const columns: MRT_ColumnDef<IOrder>[] = [
        {
            accessorKey: "id",
            header: "Mã đơn hàng",
        },
        {
            accessorKey: "amount",
            header: "Số tiền",
            Cell: ({ cell }) => {
                const amount = cell.row.original.amount;
                return <b>
                    {formatNumberWithDots(amount)} đ
                </b>
            },
        },
        {
            accessorKey: "storeId",
            header: "Mã cửa hàng",
            Cell: ({ cell }) => {
                const storeId = cell.row.original.storeId;
                const storeName = stores && stores.map(store => {
                    if (store.id === storeId) {
                        return store.name;
                    }
                })
                return storeName;
            },
        },
        {
            accessorKey: "created",
            header: "Ngày tạo",
            Cell: ({ cell }) => {
                const created = cell.row.original.created;
                return formatAnyDate(new Date(created));
            },
        },
        {
            accessorKey: "status",
            header: "Trạng thái",
            Cell: ({ cell }) => {
                const status = cell.row.original.status;
                if (status === 1) {
                    return "Thành công"
                } else {
                    return "Thất bại"
                }
            },
        },
    ];

    //Get id store
    useEffect(() => {
        dispatch(getAllStore())
    }, [dispatch])

    useEffect(() => {
        dispatch(getOrderStore(filterOrderByStore));
    }, [dispatch, filterOrderByStore]);


    const handleFilterChange = (updates: Partial<FilterConfigByStore>) => {
        dispatch(setFilterOrdersStoreConfig({ ...filterOrderByStore, ...updates }));
    };

    const handlePageChange = (newPageIndex: number) => {
        dispatch(setFilterOrdersStoreConfig({
            ...filterOrderByStore,
            pageNumber: newPageIndex + 1,
        }));
        dispatch(getOrderStore({
            ...filterOrderByStore,
            pageNumber: newPageIndex + 1,
        }));
    };

    return (
        <div>
            <Stack>
                <CommonTableFilterPaginationV2
                    columns={columns}
                    data={orderByStore || []}
                    filterConfig={filterOrderByStore}
                    totalPages={totalPagesStore}
                    totalItems={totalItemsStore}
                    onFilterChange={handleFilterChange}
                    onPageChange={handlePageChange}
                    onRowDoubleClick={() => { }}
                    storesList={stores ? stores : []}
                    isShowFilter
                />
            </Stack>
        </div>
    )
}

export default OrderStoreComponent
