import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../services/store/store";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaCreateTemplateStep } from "../../schemas/schemaCreateTemplateStep";
import { createTemplateStep, getAllTemplateSteps } from "../../services/features/templateStepSlice";
import { XMarkIcon } from "@heroicons/react/16/solid";

type PopupCreateTemplateStepProps = {
    productTemplateId: number;
    isPopupOpen: boolean;
    closePopup: () => void;
};

type FormCreateTemplateStepValues = {
    productTemplateId: number;
    name: string;
    ingredientTypes: {
        ingredientTypeId: number;
        quantityMin: number;
        quantityMax: number;
    }[];
};

const PopupCreateTemplateStep = ({
    productTemplateId,
    isPopupOpen,
    closePopup,
}: PopupCreateTemplateStepProps) => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<FormCreateTemplateStepValues>({
        resolver: yupResolver(schemaCreateTemplateStep),
        defaultValues: {
            ingredientTypes: [{ ingredientTypeId: 0, quantityMin: 0, quantityMax: 0 }],
        },
    });

    const { ingredientTypes } = useAppSelector((state) => state.ingredientTypes);

    const { fields, append, remove } = useFieldArray({
        control,
        name: "ingredientTypes",
    });

    const onSubmit = (data: FormCreateTemplateStepValues) => {
        setIsLoading(true);
        dispatch(createTemplateStep(data))
            .unwrap()
            .then(() => {
                dispatch(getAllTemplateSteps({ id: productTemplateId }));
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
                        <h2 className="text-xl font-bold mb-4">Tạo Bước</h2>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input
                                type="hidden"
                                {...register("productTemplateId")}
                                value={productTemplateId}
                            />
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Tên Bước
                                </label>
                                <input
                                    {...register("name")}
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-xs mt-2">* {errors.name.message}</p>
                                )}
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="ingredientTypes"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Loại Nguyên Liệu
                                </label>
                                <div className="space-y-4">
                                    {fields.map((field, index) => (
                                        <div key={field.id} className="flex space-x-4 items-center">
                                            <select
                                                {...register(`ingredientTypes.${index}.ingredientTypeId`)}
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                            >
                                                <option value="0">Select Ingredient Type</option>
                                                {ingredientTypes && ingredientTypes.map((ingredientType) => (
                                                    <option key={ingredientType.id} value={ingredientType.id}>
                                                        {ingredientType.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <input
                                                {...register(`ingredientTypes.${index}.quantityMin`)}
                                                type="number"
                                                min={1}
                                                placeholder="Min"
                                                className="w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                            />
                                            <input
                                                {...register(`ingredientTypes.${index}.quantityMax`)}
                                                type="number"
                                                placeholder="Max"
                                                min={1}
                                                className="w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => remove(index)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <XMarkIcon width={24} height={24} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                {fields.length < 3 && (
                                    <button
                                        type="button"
                                        onClick={() => append({ ingredientTypeId: 0, quantityMin: 0, quantityMax: 0 })}
                                        className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                                    >
                                        Thêm Loại Nguyên Liệu
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
                                        "Tạo Bước"
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

export default PopupCreateTemplateStep;
