import { MRT_ColumnDef } from 'material-react-table';
import { useEffect, useState } from 'react';
import { Stack, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../services/store/store';
import { getAllStore } from '../../services/features/storeSlice';
import { IStore } from '../../models/Store';

import PopupCheck from '../Popup/PopupCheck';
import CommonTable from '../CommonTable/CommonTable';
import PopupStoreDetail from '../Popup/PopupStoreDetail';
import PopupCreateStore from '../Popup/PopupCreateStore';


const columns: MRT_ColumnDef<IStore>[] = [
    {
        accessorKey: 'name',
        header: 'Tên cửa hàng',
    },
    {
        accessorKey: 'address',
        header: 'Địa chỉ',
    },
    {
        accessorKey: 'createdBy',
        header: 'Người tạo'
    },
    {
        accessorKey: 'created',
        header: 'Ngày tạo',
        Cell: ({ cell }) => {
            const created = cell.row.original.created;
            return typeof created === 'string' ? created.split('T')[0] : new Date(created).toISOString().split('T')[0];
        },
    }
];

const StoreListComponent = () => {
    const dispatch = useAppDispatch();
    const { stores } = useAppSelector((state) => state.stores);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [storeData, setStoreData] = useState<IStore | null>(null);
    const [onPopupStoreDetail, setOnPopupStoreDetail] = useState<boolean>(false);
    const [openPopupRename, setOpenPopupRename] = useState<boolean>(false);
    const [selectedStoreId, setSelectedStoreId] = useState<number | null>(null);


    useEffect(() => {
        if (!isPopupOpen) {
            dispatch(getAllStore());
        }
    }, [isPopupOpen, dispatch]);

    const handlePopupOpen = () => {
        setIsPopupOpen(true);
    };

    const handlePopupClose = () => {
        setIsPopupOpen(false);
    };

    const handleShowStoreDetail = (store: IStore) => {
        setStoreData(store);
        setOnPopupStoreDetail(true);
    };

    // const handleOpenPopupUpdateCategory = (id: number) => {
    //     setSelectedCateId(id);
    //     setOnPopupCheckChangeStatus(true);
    // };

    const handleOpenPopupRenameCategory = (id: number) => {
        setSelectedStoreId(id);
        setOpenPopupRename(true);
    };



    return (
        <Stack sx={{ m: '2rem 0' }}>
            <CommonTable
                columns={columns}
                data={stores || []}
                onRowDoubleClick={handleShowStoreDetail}
                toolbarButtons={
                    <Button
                        variant="contained"
                        onClick={handlePopupOpen}
                        sx={{
                            color: 'black',
                            backgroundColor: 'orange',
                        }}
                    >
                        Thêm Cửa Hàng
                    </Button>
                }
            />

            <PopupCreateStore
                isPopupOpen={isPopupOpen}
                closePopup={handlePopupClose}
            />
            {storeData && (
                <>
                    <PopupStoreDetail
                        store={storeData}
                        onPopupDetail={onPopupStoreDetail}
                        setOnPopupDetail={setOnPopupStoreDetail}       
                        onRename={() =>
                            handleOpenPopupRenameCategory(storeData.id)
                        }
                    />
               
                </>
            )}
        </Stack>
    );
};

export default StoreListComponent;
