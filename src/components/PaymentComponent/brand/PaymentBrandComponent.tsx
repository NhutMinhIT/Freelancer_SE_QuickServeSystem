import { Stack } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../../services/store/store"
import { formatAnyDate, formatNumberWithDots } from "../../../utils";
import CommonTableFilterPaginationV2 from "../../CommonTable/CommonTableFilterPaginationV2";
import { IPayment } from "../../../models/Payment";
import { MRT_ColumnDef } from "material-react-table";
import { useEffect } from "react";
import { getPayments, setFilterPaymentsConfig } from "../../../services/features/paymentSlice";
import { getAllStore } from "../../../services/features/storeSlice";
import { FilterConfigByBrand } from "../../../models/constant/FilterConfig";

const PaymentBrandComponent = () => {
  const dispatch = useAppDispatch()
  const { payments, filterPaymentsConfig, totalItems, totalPages } = useAppSelector(state => state.payment)
  const { stores } = useAppSelector(state => state.stores)

  const columns: MRT_ColumnDef<IPayment>[] = [
    {
      accessorKey: "refOrderId",
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
      accessorKey: "paymentType",
      header: "Loại thanh toán",
      Cell: ({ cell }) => {
        const paymentType = cell.row.original.paymentType;
        if (!paymentType) return "";
        if (paymentType === "1") return "Tiền mặt";
        if (paymentType === "2") return "QR Code";
        return paymentType;
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
          return <span style={{ color: '#e5af08', fontWeight: "bold" }}>Đang chờ</span>;
        } else if (status === 2) {
          return <span style={{ color: '#22c55e', fontWeight: "bold" }}>Đã thanh toán</span>;
        } else if (status === 3) {
          return <span style={{ color: '#ed8936', fontWeight: "bold" }}>Đang chuẩn bị</span>;
        } else if (status === 4) {
          return <span style={{ color: '#22c55e', fontWeight: "bold" }}>Thành công</span>;
        } else if (status === 5) {
          return <span style={{ color: '#f56565', fontWeight: "bold" }}>Thất bại</span>;
        } else if (status === 6) {
          return <span style={{ color: '#f56565', fontWeight: "bold" }}>Đã hủy</span>;
        }
      },
    },
  ];

  useEffect(() => {
    dispatch(getAllStore())
  }, [dispatch])

  useEffect(() => {
    dispatch(getPayments(filterPaymentsConfig));
  }, [dispatch, filterPaymentsConfig]);

  const handleFilterChange = (updates: Partial<FilterConfigByBrand>) => {
    dispatch(setFilterPaymentsConfig({ ...filterPaymentsConfig, ...updates }));
  };

  const handlePageChange = (newPageIndex: number) => {
    dispatch(setFilterPaymentsConfig({
      ...filterPaymentsConfig,
      pageNumber: newPageIndex + 1,
    }));
    dispatch(getPayments({
      ...filterPaymentsConfig,
      pageNumber: newPageIndex + 1,
    }));
  };
  return (
    <Stack>
      <CommonTableFilterPaginationV2
        columns={columns}
        data={payments || []}
        filterConfig={filterPaymentsConfig}
        totalPages={totalPages}
        totalItems={totalItems}
        onFilterChange={handleFilterChange}
        onPageChange={handlePageChange}
        onRowDoubleClick={() => { }}
        storesList={stores ? stores : []}
        isShowFilter
        isStoreId
      />
    </Stack>
  )
}

export default PaymentBrandComponent