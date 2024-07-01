import { MapIcon, PlusIcon, PowerIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services/store/store";
import {
    deleteTemplateStep,
    getAllTemplateSteps,
    getTemplateStep,
} from "../../services/features/templateStepSlice";
import { Button, CircularProgress, Paper, Typography } from "@mui/material";
import { formatAnyDate } from "../../utils";
import PopupRenameTemplateStep from "../Popup/PopupRenameTemplateStep";
import PopupCheck from "../Popup/PopupCheck";
import PopupCreateTemplateStep from "../Popup/PopupCreateTemplateStep";
import PopupGetAllTemplateStepId from "../Popup/PopupGetAllTemplateStepId";
import {
    activeProductTempalte,
    getIngredientTypeTemplateStepById,
} from "../../services/features/IngredientTypeTemplateStepSlice";

const TemplateStepList = () => {
    const params = useParams<{ id: string }>(); // Ensure useParams is correctly typed
    const dispatch = useAppDispatch();

    const { templateSteps, loading } = useAppSelector(
        (state) => state.templateSteps,
    );
    const templateStep = useAppSelector(
        (state) => state.templateSteps.templateStep,
    );
    const productTemplate = useAppSelector(
        (state) => state.productTemplates.productTemplate,
    );

    const [openPopupUpdateName, setOpenPopupUpdateName] = useState(false);
    const [openPopupDeleteStep, setOpenPopupDeleteStep] = useState(false);
    const [openPopupActiveProductTemplate, setOpenActiveProductTemplate] =
        useState(false);
    const [isPopupCreateOpen, setIsPopupCreateOpen] = useState(false);
    const [openGetAllTemplateStepId, setOpenGetAllTemplateStepId] =
        useState(false);

    const productTemplateId = params.id ? parseInt(params.id) : undefined; // Parse id from params as number

    useEffect(() => {
        if (productTemplateId) {
            dispatch(getAllTemplateSteps({ id: productTemplateId }));
        }
    }, [dispatch, productTemplateId]);

    const handleOpenPopupCreate = () => {
        setIsPopupCreateOpen(true);
    };

    const handleUpdateName = (templateStepId: number) => {
        dispatch(getTemplateStep({ id: templateStepId }));
        setOpenPopupUpdateName(true);
    };

    const onCloseUpdateName = () => {
        setOpenPopupUpdateName(false);
        if (productTemplateId) {
            dispatch(getAllTemplateSteps({ id: productTemplateId }));
        }
    };

    const handleOpenDeleteStep = (templateStepId: number) => {
        dispatch(getTemplateStep({ id: templateStepId }));
        setOpenPopupDeleteStep(true);
    };

    const handleDeleteStep = () => {
        if (templateStep?.id) {
            dispatch(deleteTemplateStep({ id: templateStep.id })).then(() => {
                setOpenPopupDeleteStep(false);
                if (productTemplateId) {
                    dispatch(getAllTemplateSteps({ id: productTemplateId }));
                }
            });
        }
    };

    const handleOpenActiveProductTemplate = () => {
        setOpenActiveProductTemplate(true);
    };

    const handleActiveProductTemplate = () => {
        if (productTemplateId) {
            dispatch(activeProductTempalte({ productTemplateId })).then(() => {
                setOpenActiveProductTemplate(false);
                if (productTemplateId) {
                    dispatch(getAllTemplateSteps({ id: productTemplateId }));
                }
            });
        }
    };

    const handleClickOpenAllTemplateStepId = (id: number) => {
        setOpenGetAllTemplateStepId(true);
        dispatch(getIngredientTypeTemplateStepById({ templateStepId: id }));
    };

    const handleCloseAllTemplateStepId = () => {
        setOpenGetAllTemplateStepId(false);
    };

    return (
        <div className="mt-5">
            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-50 bg-opacity-50">
                    <CircularProgress color="secondary" />
                </div>
            )}
            <div className="flex justify-between">
                <div className="flex items-center">
                    <MapIcon width={32} height={32} className="text-orange-500" />
                    <h3 className="ml-6 text-3xl font-bold">
                        Các Bước Mẫu {productTemplate?.name}
                    </h3>
                </div>
                <div>
                    <Button
                        variant="contained"
                        onClick={handleOpenPopupCreate}
                        sx={{
                            color: "black",
                            backgroundColor: "orange",
                            marginRight: "1rem",
                        }}
                    >
                        Thêm bước cho mẫu
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleOpenActiveProductTemplate}
                        sx={{
                            color: "black",
                            backgroundColor: "orangered",
                            marginRight: "1rem",
                        }}
                    >
                        Kích hoạt mẫu
                    </Button>
                </div>
                <PopupCreateTemplateStep
                    productTemplateId={productTemplateId || 0}
                    isPopupOpen={isPopupCreateOpen}
                    closePopup={() => setIsPopupCreateOpen(false)}
                />
            </div>
            {templateSteps && templateSteps.length > 0 ? (
                <div className="grid grid-cols-3 gap-4 overflow-y-hidden">
                    {templateSteps.map((templateStep) => (
                        <div
                            key={templateStep.id}
                            className="bg-white-500 relative mt-6 flex flex-col rounded-lg border border-black-200 shadow-lg p-2"
                        >
                            <div>
                                <h5 className="text-blue-gray-900 mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal">
                                    {templateStep.name}
                                </h5>
                                <div className="flex gap-6 font-sans text-base font-light leading-relaxed text-inherit">
                                    <span>Trạng thái</span>
                                    <span
                                        className="text-green-500 font-extrabold"
                                    >
                                        Hoạt động
                                    </span>
                                </div>
                                <div className="mt-2 flex flex-col font-sans text-base font-light leading-relaxed text-inherit">
                                    <span>Người tạo: {templateStep.createdBy}</span>
                                    <span>
                                        Ngày tạo: {formatAnyDate(new Date(templateStep.created))}
                                    </span>
                                </div>
                                <div className="mt-2 flex flex-col font-sans text-base font-light leading-relaxed text-inherit">
                                    <span>
                                        Người sửa:{" "}
                                        {templateStep.lastModifiedBy !== null
                                            ? templateStep.lastModifiedBy
                                            : "Chưa có thay đổi"}
                                    </span>
                                    <span>
                                        Ngày sửa:{" "}
                                        {templateStep.lastModified !== null
                                            ? formatAnyDate(new Date(templateStep.lastModified))
                                            : "Chưa có thay đổi"}
                                    </span>
                                </div>
                            </div>
                            <div className="mr-3 flex justify-end gap-4 mt-3">
                                <button
                                    onClick={() =>
                                        handleClickOpenAllTemplateStepId(templateStep.id)
                                    }
                                    className="text-white rounded-lg border border-yellow-500 bg-yellow-500 p-2 text-center font-sans font-bold uppercase"
                                    type="button"
                                >
                                    Xem chi tiết bước
                                </button>
                                <button
                                    onClick={() => handleUpdateName(templateStep.id)}
                                    className="text-white rounded-lg border border-orange-500 bg-orange-500 p-2 text-center font-sans font-bold uppercase"
                                    type="button"
                                >
                                    Cập nhật
                                </button>
                                <button
                                    onClick={() => handleOpenDeleteStep(templateStep.id)}
                                    className="text-white rounded-lg border border-red-500 bg-red-500 p-2 text-center font-sans font-bold uppercase"
                                    type="button"
                                >
                                    Xoá
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="mt-10 flex justify-center">
                    <Paper elevation={3} className="p-4">
                        <Typography variant="h5" component="h5" align="center">
                            Chưa có bước cho sản phẩm này!
                        </Typography>
                    </Paper>
                </div>
            )}
            <PopupRenameTemplateStep
                open={openPopupUpdateName}
                onClose={onCloseUpdateName}
            />
            <PopupCheck
                content="Bạn có chắc chắn muốn xóa bước này không?"
                open={openPopupDeleteStep}
                titleAccept="Có"
                titleCancel="Không"
                onAccept={handleDeleteStep}
                onCancel={() => setOpenPopupDeleteStep(false)}
            />
            <PopupCheck
                content="Bạn có chắc chắn muốn kích hoạt mẫu này không?"
                open={openPopupActiveProductTemplate}
                titleAccept="Có"
                titleCancel="Không"
                onAccept={handleActiveProductTemplate}
                onCancel={() => setOpenActiveProductTemplate(false)}
            />
            <PopupGetAllTemplateStepId
                openGetAllTemplateStepId={openGetAllTemplateStepId}
                handleCloseAllTemplateStepId={handleCloseAllTemplateStepId}
            />
        </div>
    );
};

export default TemplateStepList;
