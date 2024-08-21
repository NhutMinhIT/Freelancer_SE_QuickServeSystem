import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../services/store/store";
import { Resolver, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";
import { createIngredientNutrition, getNutritionByIngredientId } from "../../../services/features/ingredientNutritionSlice";
import { schemaCreateIngredientNutrition } from "../../../schemas/schemaCreateIngredientNutritions";

type PopupCreateIngredientNutritionsProps = {
    ingredientId: number;
    isPopupOpen: boolean;
    closePopup: () => void;
};

type FormCreateIngredientNutritionsStepValues = {
    ingredientId: number;
    nutritionIds: {
        id: number,
    }[];
};

const PopupCreateIngredientNutritions = ({
    ingredientId,
    isPopupOpen,
    closePopup,
}: PopupCreateIngredientNutritionsProps) => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const { nutritions } = useAppSelector(state => state.nutritions);

    const {
        register,
        handleSubmit,
        control,
        reset,
    } = useForm<FormCreateIngredientNutritionsStepValues>({
        resolver: yupResolver(schemaCreateIngredientNutrition) as unknown as Resolver<FormCreateIngredientNutritionsStepValues>,
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "nutritionIds",
    });

    useEffect(() => {
        if (isPopupOpen && fields.length === 0) {
            append({ id: 0 });
        }
    }, [isPopupOpen, append, fields.length]);

    const handleRemove = (index: number) => {
        remove(index);
    };

    const handleAddMore = () => {
        if (fields.length < 3) {
            append({ id: 0 });
        }
    };

    const onSubmit = (data: FormCreateIngredientNutritionsStepValues) => {
        setIsLoading(true);
        const dataSend: number[] = data.nutritionIds?.map(i => i?.id);
        dispatch(createIngredientNutrition({
            ingredientId: data?.ingredientId,
            nutritionIds: dataSend,
        }))
            .unwrap()
            .then(() => {
                dispatch(getNutritionByIngredientId({ ingredientId: ingredientId }));
                closePopup();
            })
            .catch((error) => console.log(error))
            .finally(() => setIsLoading(false));
        reset();

    };

    return (
        isPopupOpen && (
            <Dialog
                open={isPopupOpen}
                onClose={closePopup}
                fullWidth
                maxWidth="md"
            >
                <div className="flex items-center justify-between">
                    <DialogTitle
                        className="uppercase"
                        sx={{
                            fontWeight: "bold",
                        }}
                    >Thêm dinh dưỡng cho nguyên liệu</DialogTitle>
                    <XMarkIcon
                        height={24}
                        width={24}
                        className="h-6 w-6 items-center flex mr-4 cursor-pointer"
                        onClick={closePopup}
                    />
                </div>
                <DialogContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input
                            type="hidden"
                            {...register("ingredientId")}
                            value={ingredientId}
                        />
                        <div className="mb-4">
                            <Grid container rowSpacing={2} columnSpacing={2}>
                                <Grid item md={11} xs={11} xl={11} lg={11}>
                                    <label
                                        htmlFor="id"
                                        className="block w-full px-3 py-2 sm:text-sm"
                                    >
                                        Loại dinh dưỡng
                                    </label>
                                </Grid>
                                <Grid item md={1} xs={1} xl={1} lg={1} />
                            </Grid>
                            <div className="overflow-y-auto h-80">
                                <Grid container>
                                    {fields.map((field, index) => (
                                        <Grid container key={field.id} rowSpacing={2} columnSpacing={2} sx={{ marginBottom: 2 }}>
                                            <Grid item md={11} xs={11} xl={11} lg={11} rowSpacing={2} columnSpacing={2}>
                                                <select
                                                    {...register(`nutritionIds.${index}.id`)}
                                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                                >
                                                    <option value="0">Chọn nguyên liệu</option>
                                                    {nutritions && nutritions.map((nutrition) => (
                                                        <option key={nutrition.id} value={nutrition.id}>
                                                            {nutrition.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </Grid>
                                            {fields.length === 1 ? '' : (
                                                <Grid item md={1} xs={1} xl={1} lg={1} alignSelf="center">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemove(index)}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        <XMarkIcon width={24} height={24} />
                                                    </button>
                                                </Grid>
                                            )}
                                        </Grid>
                                    ))}
                                </Grid>
                            </div>
                        </div>
                        <div className="flex justify-between mt-4">
                            <button
                                type="button"
                                onClick={handleAddMore}
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 disabled:bg-gray-500"
                                disabled={fields.length >= 3}
                            >
                                Thêm dinh dưỡng
                            </button>
                            <button
                                type="submit"
                                className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 disabled:bg-gray-500"
                                disabled={isLoading || fields.length > 3}
                            >
                                {isLoading ? (
                                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                ) : (
                                    "Xác nhận"
                                )}
                            </button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        )
    );
};

export default PopupCreateIngredientNutritions;
