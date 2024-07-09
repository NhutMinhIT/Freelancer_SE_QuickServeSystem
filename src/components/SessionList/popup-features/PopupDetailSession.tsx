import { XMarkIcon, TrashIcon } from "@heroicons/react/16/solid";
import CommonTable from "../../CommonTable/CommonTable";
import { Box, Button, Tooltip } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";
import { IIngredientSold } from "../../../models/IngredientSession";
import { useAppDispatch, useAppSelector } from "../../../services/store/store";
import {  useState } from "react";
import PopupCreateIngredientSession from "./PopupCreateIngredientSession";
import { getAllIngredientsActive } from "../../../services/features/ingredientSlice";
import { deleteIngredientSessionBySessionId, getIngredientSessionBySessionId, deleteIngredientSessionByIngredientId } from "../../../services/features/ingredientSessionSlice";
import PopupCheck from "../../Popup/PopupCheck";
import PopupUpdateIngredientSession from "./PopupUpdateIngredientSession";
import PopupUpdateSession from "./PopupUpdateSession";
import {type ISession } from "../../../models/Session";

type PopupDetailSessionProps = {
    sessionId: number;
    onPopupDetail: boolean;
    setOnPopupDetail: (value: boolean) => void;
    session: ISession
};

const PopupDetailSession: React.FC<PopupDetailSessionProps> = ({
    sessionId,
    onPopupDetail,
    setOnPopupDetail,
}) => {

    const columns: MRT_ColumnDef<IIngredientSold>[] = [
        {
            accessorKey: 'name',
            header: 'Tên nguyên liệu',
        },
        {
            accessorKey: 'imageUrl',
            header: 'Hình ảnh',
            Cell: ({ cell }) => {
                const imageUrl = cell.row.original.imageUrl;
                return <img style={{height: '50px', width: '70px'}} src={imageUrl} alt="Ảnh nguyên liệu" />
            },
        },
        {
            accessorKey: 'quantity',
            header: 'Số lượng'
        },
        {
            accessorKey: 'soldQuantity',
            header: 'Số lượng đã bán'
        },
        {
            accessorKey: 'function',
            header: 'Chức năng',
            Cell: ({ cell }) => {
                const id = cell.row.original.id;
                return (
                    <div className="flex justify-center">
                        <Tooltip title="Xóa nguyên liệu">
                            <TrashIcon
                                width={16}
                                height={16}
                                className="h-6 w-6 cursor-pointer text-red-600"
                                onClick={() => {
                                    setIsDeleteIngredientSessionByIngredientIdPopupCheck(true)
                                    setSelectedId(id)
                                }}
                            />
                        </Tooltip>
                    </div>
                );
            },
        },
    ];
    const dispatch = useAppDispatch();
    const ingredientSessionById   = useAppSelector(state => state.ingredientSession.ingredientSessionById) ;
    const [isCreateIngredientSessionPopup, setIsCreateIngredientSessionPopup] = useState<boolean>(false);
    const [isUpdateIngredientSessionPopup, setIsUpdateIngredientSessionPopup] = useState<boolean>(false);
    const [isUpdateSessionPopup, setIsUpdateSessionPopup] = useState<boolean>(false);
    const [isDeleteIngredientSessionBySessionIdPopupCheck, setIsDeleteIngredientSessionBySessionIdPopupCheck] = useState<boolean>(false);
    const [isDeleteIngredientSessionByIngredientIdPopupCheck, setIsDeleteIngredientSessionByIngredientIdPopupCheck] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<number| null>(null);



    const handleCreateIngredientSessionPopup = () => {
        setIsCreateIngredientSessionPopup(true);
        dispatch(getAllIngredientsActive());
    }

    const handleUpdateIngredientSessionPopup = () => {
        setIsUpdateIngredientSessionPopup(true);
        dispatch(getAllIngredientsActive());
        // dispatch(getIngredientSessionBySessionId({sessionId}));
    }

    const handleUpdateSessionPopup = () => {
        setIsUpdateSessionPopup(true);
    }

    

    const handleDeleteIngredientSessionBySessionId = () => {
        dispatch(deleteIngredientSessionBySessionId({sessionId}))
        .unwrap()
        .then(() => {
            setIsDeleteIngredientSessionBySessionIdPopupCheck(false);
            dispatch(getIngredientSessionBySessionId({sessionId}));
        }).catch(e=>{
            console.log(e);
        })
    }
    
    const handleDeleteIngredientSessionByIngredientId = () => {
        dispatch(deleteIngredientSessionByIngredientId({sessionId, ingredientId: selectedId as number}))
        .unwrap()
        .then(() => {
            setIsDeleteIngredientSessionByIngredientIdPopupCheck(false);
            dispatch(getIngredientSessionBySessionId({sessionId}));
        }).catch(e=>{
            console.log(e);
        })
    }

    return (
        <div
            className={`fixed z-10 inset-0 overflow-y-auto ${onPopupDetail ? '' : 'hidden'
                }`}
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                    className="fixed inset-0 bg-gray-800 bg-opacity-90 transition-opacity"
                    aria-hidden="true"
                ></div>
                <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                >
                    &#8203;
                </span>
                <div className="bg-white-700 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full pb-2">
                                <div className="flex">
                                    <h3
                                        className="text-lg leading-6 w-full font-medium text-gray-900"
                                        id="modal-title"
                                    >
                                        Thông tin chi tiết
                                    </h3>
                                    <XMarkIcon
                                        width={16}
                                        height={16}
                                        className="h-6 w-6 ml-auto cursor-pointer"
                                        onClick={() => setOnPopupDetail(false)}
                                    />
                                    <hr className="mt-2 text-black-700" />
                                </div>
                                <CommonTable
                                    columns={columns}
                                    isShowTitleDoubleClick={false}
                                    data={ingredientSessionById?.ingredients || []}
                                    toolbarButtons={
                                        <Box display='flex' sx={{gap: '8px'}}>
                                            <Button
                                                variant="contained"
                                                onClick={handleCreateIngredientSessionPopup}
                                                sx={{
                                                    color: 'white',
                                                    fontWeight: 'bold',
                                                    backgroundColor: 'orange',
                                                    '&:hover': {
                                                        backgroundColor: '#f58f1b',
                                                    },
                                                    textTransform: 'none',
                                                }}
                                                disabled={!!ingredientSessionById?.ingredients}
                                            >
                                                Thêm
                                            </Button>
                                            {ingredientSessionById?.ingredients !== undefined && (
                                                <Button
                                                    variant="contained"
                                                    onClick={()=> setIsDeleteIngredientSessionBySessionIdPopupCheck(true)}
                                                    sx={{
                                                        color: 'white',
                                                        fontWeight: 'bold',
                                                        backgroundColor: 'red',
                                                        '&:hover': {
                                                            backgroundColor: '#ad2518',
                                                        },
                                                        textTransform: 'none',
                                                    }}
                                                >
                                                    Xóa tất cả
                                                </Button>
                                            )}
                                        </Box>
                                    }
                                />
                                <Box display="flex" justifyContent="flex-end" mr={2}>
                                    {ingredientSessionById?.ingredients !== undefined && (
                                    <Button
                                        variant="contained"
                                        onClick={handleUpdateIngredientSessionPopup}
                                        sx={{
                                            color: 'white',
                                            fontWeight: 'bold',
                                            backgroundColor: 'orange',
                                            '&:hover': {
                                            backgroundColor: '#f58f1b',
                                        },
                                            textTransform: 'none',
                                        }}
                                        >
                                        Chỉnh sửa nguyên liệu
                                    </Button>
                                    )}
                                </Box>
                            </div>
                        </div>
                        <div className="border-t-4 w-auto flex gap-4">
                            <div className="mt-5 gap-5">
                                <button
                                    className="text-xs w-24 border border-red-500 p-3 bg-red-600 text-white-900 font-bold rounded-lg"
                                >
                                    Xoá Ca
                                </button>
                                 <button
                                    onClick={handleUpdateSessionPopup}
                                    className="text-xs w-24 border border-yellow-500  bg-yellow-500 ml-5 text-white-900 font-bold rounded-lg p-3"
                                >
                                    Sửa ca
                                </button>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <PopupCreateIngredientSession
                sessionId={sessionId}
                isPopupOpen={isCreateIngredientSessionPopup}
                closePopup={() => setIsCreateIngredientSessionPopup(false)}
            />

            <PopupUpdateIngredientSession
                sessionId={sessionId}
                isPopupOpen={isUpdateIngredientSessionPopup}
                closePopup={() => setIsUpdateIngredientSessionPopup(false)}
            />

             <PopupUpdateSession closePopup={()=> setIsUpdateSessionPopup(false)} isPopupUpdateSessionOpen={isUpdateSessionPopup} sessionId={sessionId}/>                       

            <PopupCheck 
                open={isDeleteIngredientSessionBySessionIdPopupCheck}
                content="Bạn có chắc chắn muốn xóa tất cả các nguyên liệu trong ca này không ?"
                titleCancel="Không"
                titleAccept="Có"
                onCancel={()=>setIsDeleteIngredientSessionBySessionIdPopupCheck(false)}
                onAccept={handleDeleteIngredientSessionBySessionId}
            />
             <PopupCheck
                        open={isDeleteIngredientSessionByIngredientIdPopupCheck}
                        content="Bạn có chắc chắn muốn xóa nguyên liệu này không?"
                        titleCancel="Không"
                        titleAccept="Có"
                        onCancel={() => setIsDeleteIngredientSessionByIngredientIdPopupCheck(false)}
                        onAccept={handleDeleteIngredientSessionByIngredientId}
            />
        </div>
    )
}

export default PopupDetailSession
