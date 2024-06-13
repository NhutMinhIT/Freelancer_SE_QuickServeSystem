import { MapIcon, PowerIcon } from "@heroicons/react/16/solid"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services/store/store";
import { deleteTemplateStep, getAllTemplateSteps, getTemplateStep } from "../../services/features/templateStepSlice";
import { CircularProgress, Paper, Typography } from "@mui/material";
import { formatAnyDate } from "../../utils";
import PopupRenameTemplateStep from "../Popup/PopupRenameTemplateStep";
import PopupCheck from "../Popup/PopupCheck";

const TemplateStepList = () => {
    const params = useParams();
    const dispatch = useAppDispatch();

    const { templateSteps } = useAppSelector(state => state.templateSteps);
    const templateStep = useAppSelector(state => state.templateSteps.templateStep);

    const productTemplate = useAppSelector((state) => state.productTemplates.productTemplate);
    const loading = useAppSelector(state => state.templateSteps.loading);

    const [openPopupUpdateName, setOpenPopupUpdateName] = useState<boolean>(false);
    const [openPopupDeleteStep, setOpenPopupDeleteStep] = useState<boolean>(false);

    const productTemplateId = params.id && parseInt(params.id);

    useEffect(() => {
        if (productTemplateId) {
            dispatch(getAllTemplateSteps({ id: productTemplateId }));
        }
    }, [dispatch, productTemplateId])

    const handleUpdateName = (templateStepId: number) => {
        dispatch(getTemplateStep({ id: templateStepId }));
        setOpenPopupUpdateName(true);
    };

    const onCloseUpdateName = () => {
        setOpenPopupUpdateName(false);
        if (productTemplateId) {
            dispatch(getAllTemplateSteps({ id: productTemplateId }));
        }
    }

    const handleOpenDeleteStep = (templateStepId: number) => {
        dispatch(getTemplateStep({ id: templateStepId }));
        setOpenPopupDeleteStep(true);
    };

    const handleDeleteStep = () => {
        dispatch(deleteTemplateStep({ id: templateStep?.id as number }))
            .then(() => {
                setOpenPopupDeleteStep(false);
                if (productTemplateId) {
                    dispatch(getAllTemplateSteps({ id: productTemplateId }));
                }
            });
    }

    return (
        <div className="mt-5">
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-50 bg-opacity-50 z-50">
                    <CircularProgress color="secondary" />
                </div>)}
            <div className="flex">
                <MapIcon width={32} height={32} className="text-orange-500" />
                <h3 className="text-3xl font-bold ml-6">Các Bước Mẫu  {productTemplate?.name}</h3>
            </div>
            {templateSteps && templateSteps.length > 0 ? (
                <div className="grid grid-cols-3 gap-4 overflow-y-hidden">
                    {templateSteps.map((templateStep) => (
                        <div key={templateStep?.id} className="relative flex flex-col mt-6 text-back-700 bg-whiterounded-xl w-96 h-72 border rounded-lg border-black-200 shadow-black-100 shadow-lg">
                            <div className="p-6">
                                <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                    {templateStep?.name}
                                </h5>
                                <div className="font-sans text-base antialiased font-light leading-relaxed text-inherit flex gap-6">
                                    <span>
                                        Trạng thái
                                    </span>
                                    <span>
                                        <PowerIcon width={32} height={32} className="text-green-500" />
                                    </span>
                                </div>
                                <div className="mt-2 font-sans text-base antialiased font-light leading-relaxed text-inherit flex flex-col 2">
                                    <span>
                                        Người tạo: {templateStep?.createdBy}
                                    </span>
                                    <span>
                                        Ngày tạo: {formatAnyDate(new Date(templateStep?.created))}
                                    </span>
                                </div>
                                <div className="mt-2 font-sans text-base antialiased font-light leading-relaxed text-inherit flex flex-col 2">
                                    <span>
                                        Người sửa: {templateStep?.lastModifiedBy !== null ? templateStep?.lastModifiedBy : 'Chưa có thay đổi'}
                                    </span>
                                    <span>
                                        Ngày sửa: {templateStep?.lastModified !== null ? formatAnyDate(new Date(templateStep?.lastModified)) : "Chưa có thay đổi"}
                                    </span>
                                </div>
                            </div>
                            <div className="flex justify-end mr-3">
                                <button
                                    onClick={() => { handleUpdateName(templateStep?.id) }}
                                    className="p-2 rounded-lg font-sans font-bold text-center uppercase border border-blue-500 text-white-500 bg-blue-500"
                                    type="button">
                                    Cập nhật
                                </button>
                                <button
                                    onClick={() => handleOpenDeleteStep(templateStep?.id)}
                                    className="p-2 ml-2 rounded-lg font-sans font-bold text-center uppercase border border-red-500 bg-red-500 text-white-500"
                                    type="button">
                                    Xoá
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex justify-center mt-10">
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
        </div>

    )
}

export default TemplateStepList
