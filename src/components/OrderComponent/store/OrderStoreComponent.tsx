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
            header: "Tên cửa hàng",
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
                    return <span style={{ color: '#e5af08', fontWeight: "bold" }}>Đang chờ</span>;
                } else if (status === 2) {
                    return <span style={{ color: '#22c55e', fontWeight: "bold" }}>Đã thanh toán</span>;
                } else if (status === 3) {
                    return <span style={{ color: '#ed8936', fontWeight: "bold" }}>Đang chuẩn bị</span>;
                } else if (status === 4) {
                    return <span style={{ color: '#22c55e', fontWeight: "bold" }}>Thành công</span>;
                } else if (status === 5) {
                    return <span style={{ color: '#22c55e', fontWeight: "bold" }}>Đã được lấy</span>;
                } else if (status === 6) {
                    return <span style={{ color: '#f56565', fontWeight: "bold" }}>Đã hủy</span>;
                }
                else if (status === 7) {
                    return <span style={{ color: '#eb8334', fontWeight: "bold" }}>Đã hoàn tiền</span>;
                }
                else if (status === 8) {
                    return <span style={{ color: '#f56565', fontWeight: "bold" }}>Thất bại</span>;
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
