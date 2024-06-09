import { XMarkIcon } from "@heroicons/react/16/solid";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../services/store/store";
import { changeImageIngredient, getAllIngredients } from "../../services/features/ingredientSlice";

type PopupChangeImageIngredientProps = {
    open: boolean;
    closePopup: () => void;
    onClosePopupDetail: () => void;
    imageUrl: string;
    name: string;
    ingredientId: number | undefined;
}

type FormChangeImageProps = {
    id: number | undefined;
    image: FileList;
}

const PopupChangeImageIngredient: React.FC<PopupChangeImageIngredientProps> = ({
    open,
    closePopup,
    onClosePopupDetail,
    name,
    ingredientId
}) => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormChangeImageProps>({
        defaultValues: { id: ingredientId, image: {} as FileList }
    });

    const onSubmit = (data: FormChangeImageProps) => {
        if (!data.id || !data.image.length) return;

        const formData = new FormData();
        formData.append('id', data.id.toString());
        formData.append('image', data.image[0]);

        setIsLoading(true);
        dispatch(changeImageIngredient({ id: data.id, formData }))
            .unwrap()
            .then(() => {
                dispatch(getAllIngredients()); // Refresh the data
                closePopup();
                onClosePopupDetail();
                reset();
            })
            .catch((error) => console.error(error))
            .finally(() => setIsLoading(false));
    };

    useEffect(() => {
        reset({ id: ingredientId, image: {} as FileList });
    }, [ingredientId, reset]);

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
                        <span>Thay đổi hình ảnh thành phần </span>
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
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Hình ảnh</label>
                            <input
                                {...register('image', { required: 'This field is required' })}
                                type="file"
                                name="image"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            />
                            {errors.image && <p className='text-red-500 text-xs mt-2'>* {errors.image.message}</p>}
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
};

export default PopupChangeImageIngredient;
