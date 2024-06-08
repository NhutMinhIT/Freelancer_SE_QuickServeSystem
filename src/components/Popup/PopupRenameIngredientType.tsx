import { XMarkIcon } from "@heroicons/react/24/solid";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useAppDispatch } from "../../services/store/store";
import { useState, useEffect } from "react";
import { getAllIngredientTypes, renameIngredientType } from "../../services/features/ingredientTypeSlice";
import { useForm } from "react-hook-form";

type PopupRenameIngredientTypeProps = {
    open: boolean;
    closePopup: () => void;
    onClosePopupDetail: () => void;
    ingredientTypeName: string;
    ingedientTypeId: number | undefined;
}

type FormRenameIngredientTypeValues = {
    id: number | undefined;
    name: string;
}

const PopupRenameIngredientType: React.FC<PopupRenameIngredientTypeProps> = ({
    open,
    closePopup,
    onClosePopupDetail,
    ingredientTypeName,
    ingedientTypeId
}) => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormRenameIngredientTypeValues>({
        defaultValues: { id: ingedientTypeId, name: ingredientTypeName }
    });

    useEffect(() => {
        reset({ id: ingedientTypeId, name: ingredientTypeName });
    }, [reset, ingedientTypeId, ingredientTypeName]);

    // Handle rename ingredient type
    const onSubmit = (data: FormRenameIngredientTypeValues) => {
        if (data.id === undefined) {
            console.error("ID is undefined");
            return;
        }

        setIsLoading(true);
        dispatch(renameIngredientType({ id: data.id, name: data.name }))
            .unwrap()
            .then(() => {
                dispatch(getAllIngredientTypes());
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
                        <span>Sửa tên loại thành phần: </span>
                        <span className="ml-2">{ingredientTypeName}</span>
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
                                type="submit"
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
        </Dialog>
    );
}

export default PopupRenameIngredientType;
