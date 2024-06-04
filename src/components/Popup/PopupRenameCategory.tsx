import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useAppDispatch } from "../../services/store/store";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { getAllCategories, renameCategory } from "../../services/features/categorySlice";
import { XMarkIcon } from "@heroicons/react/16/solid";

type PopupRenameCategoryProps = {
    open: boolean;
    closePopup: () => void;
    onClosePopupDetail: () => void
    name: string;
    cateId: number | undefined;
}

type FormRenameCategoryValues = {
    id: number;
    name: string;
}

const PopupRenameCategory: React.FC<PopupRenameCategoryProps> = ({ open, closePopup, onClosePopupDetail, name, cateId }) => {
    console.log(cateId)
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormRenameCategoryValues>({ defaultValues: { id: cateId, name } });
    const onSubmit = (data: FormRenameCategoryValues) => {
        setIsLoading(true);
        dispatch(renameCategory(data))
            .unwrap()
            .then(() => {
                dispatch(getAllCategories());
                closePopup();
                onClosePopupDetail();
                reset({ id: undefined, name: '' }); // Reset the form here
            })
            .catch((error) => console.log(error))
            .finally(() => setIsLoading(false));

    }

    return (
        <Dialog
            open={open}
            onClose={closePopup}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <div className="w-auto flex justify-between items-center p-4">
                <DialogTitle>
                    <div className="text-2xl font-bold flex">
                        <span>Sửa tên thể loại: </span>
                        <span className="ml-2">{name}</span>
                    </div>
                </DialogTitle>
                <button
                    onClick={closePopup}
                    className="text-gray-600 hover:text-gray-900"
                >
                    <XMarkIcon width={24} height={24} />
                </button>
            </div>
            <DialogContent>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <input {...register('id')} type="hidden" />
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                {...register('name')}
                                type="text"
                                name="name"
                                id="name"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            />
                            {errors.name && <p className='text-red-500 text-xs mt-2'>* {errors.name.message}</p>}
                        </div>
                        <DialogActions>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={handleSubmit(onSubmit)}
                                disabled={isLoading}
                                sx={{
                                    textTransform: 'none',
                                }}
                            >
                                {isLoading ? 'Loading...' : 'Chấp nhận'}
                            </Button>
                        </DialogActions>
                    </form>
                </div>
            </DialogContent>
        </Dialog >
    )
}

export default PopupRenameCategory;