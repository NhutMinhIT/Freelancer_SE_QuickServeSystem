import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { useAppDispatch, useAppSelector } from "../../../services/store/store";
import { createIngredientSession, getIngredientSessionBySessionId } from "../../../services/features/ingredientSessionSlice";
import { schemaCreateIngredientSession } from "../../../schemas/schemaCreateIngredientSession";
import { Grid } from "@mui/material";

type PopupCreateIngredientSessionProps = {
    sessionId: number;
    isPopupOpen: boolean;
    closePopup: () => void;
};

type FormCreateIngredientSessionStepValues = {
    sessionId: number;
    ingredients: {
        id: number;
        quantity: number;
    }[];
};

const PopupCreateIngredientSession = ({
    sessionId,
    isPopupOpen,
    closePopup,
}: PopupCreateIngredientSessionProps) => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const ingredientsActive = useAppSelector((state)=> state.ingredients.ingredientsActive);

    const {
        register,
        handleSubmit,
        control,
        reset,
    } = useForm<FormCreateIngredientSessionStepValues>({
        resolver: yupResolver(schemaCreateIngredientSession),
        defaultValues: {
            ingredients: [{ id: 0, quantity: 0 }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "ingredients",
    });

    const onSubmit = (data: FormCreateIngredientSessionStepValues) => {
        setIsLoading(true);
        dispatch(createIngredientSession(data))
            .unwrap()
            .then(() => {
                dispatch(getIngredientSessionBySessionId({sessionId: sessionId}));
                closePopup();
            })
            .catch((error: any) => console.log(error))
            .finally(() => setIsLoading(false));
        reset();
    };

    return (
        isPopupOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
                <div className="relative p-6 bg-white-500 border rounded-lg shadow-lg w-full max-w-3xl">
                    <button
                        onClick={closePopup}
                        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                    >
                        <XMarkIcon width={24} height={24} />
                    </button>
                    <div className="text-center">
                        <h2 className="text-xl font-bold mb-4">Tạo nguyên liệu cho ca</h2>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input
                                type="hidden"
                                {...register("sessionId")}
                                value={sessionId}
                            />
                            <div className="mb-4">
                                <Grid container rowSpacing={2} columnSpacing={2}>
                                    <Grid item md={10} xs={9} xl={10} lg={10}>
                                        <label
                                            htmlFor="id"
                                            className="block w-full px-3 py-2 sm:text-sm"
                                            >
                                            Nguyên Liệu
                                        </label>
                                    </Grid>
                                    <Grid item md={2} xs={3} xl={2} lg={2}>
                                        <label
                                            htmlFor="quantity"
                                            className="block w-full px-3 py-2 sm:text-sm"
                                            >
                                            Số lượng
                                        </label>
                                    </Grid>
                                </Grid>
                                <Grid container >
                                    {fields.map((field, index) => (
                                    <Grid container key={field.id} rowSpacing={2} columnSpacing={2} sx={{marginBottom: 2}}>
                                        <Grid item md={10} xs={9} xl={10} lg={10} rowSpacing={2} columnSpacing={2}>
                                            <select
                                                {...register(`ingredients.${index}.id`)}
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                            >
                                                <option value="0">Chọn nguyên liệu</option>
                                                {ingredientsActive && ingredientsActive.map((ingredient) => (
                                                    <option key={ingredient.id} value={ingredient.id}>
                                                        {ingredient.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </Grid>
                                        <Grid item md={2} xs={3} xl={2} lg={2} rowSpacing={2} columnSpacing={2}>
                                            <input
                                                {...register(`ingredients.${index}.quantity`)}
                                                type="number"
                                                min={1}
                                                placeholder="Min"
                                                className="w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => remove(index)}
                                                className="text-red-500 hover:text-red-700 align-middle"
                                            >
                                                <XMarkIcon width={24} height={24} />
                                            </button>
                                        </Grid>
                                        </Grid>
                                    ))}
                                </Grid>
                                {fields.length < 10 && (
                                    <button
                                        type="button"
                                        onClick={() => append({ id: 0, quantity: 0 })}
                                        className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                                    >
                                        Thêm Nguyên Liệu
                                    </button>
                                )}
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
                                    disabled={isLoading}
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
                                        "Tạo nguyên liệu cho ca"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    );
};

export default PopupCreateIngredientSession;
