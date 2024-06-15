import { XMarkIcon } from "@heroicons/react/16/solid";
import { useAppSelector } from "../../services/store/store";
import { formatAnyDate } from "../../utils/index";
import { useEffect } from "react";

type PopupDetailProductTemplateProps = {
    onPopupProductTemplateDetail: boolean;
    setOnPopupProductTemplateDetail: React.Dispatch<React.SetStateAction<boolean>>;
    onProductTemplateStep: (id: number) => void;
    onDelete: () => void;
    onChangeImage: () => void;
    onUpdate: () => void;
};

const PopupDetailProductTemplate: React.FC<PopupDetailProductTemplateProps> = ({
    onPopupProductTemplateDetail,
    setOnPopupProductTemplateDetail,
    onProductTemplateStep,
    onDelete,
    onChangeImage,
    onUpdate
}) => {
    const productTemplate = useAppSelector(state => state.productTemplates.productTemplate);

    const handleProductTemplateStep = () => {
        if (productTemplate?.id !== undefined) {
            onProductTemplateStep(productTemplate.id);
        }
    };

    useEffect(() => {
        if (productTemplate === null) {
            setOnPopupProductTemplateDetail(false);
        }
    }, [productTemplate, setOnPopupProductTemplateDetail]);

    return (
        <div className={`fixed z-10 inset-0 overflow-y-auto ${onPopupProductTemplateDetail ? '' : 'hidden'}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-800 bg-opacity-90 transition-opacity" aria-hidden="true"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                    &#8203;
                </span>
                <div className="bg-white inline-block align-bottom bg-white rounded-lg text-left shadow-xl transform transition-all sm:align-middle sm:max-w-2xl sm:w-full max-h-[80vh] overflow-y-auto bg-white-500">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full pb-2">
                                <div className="flex">
                                    <h3 className="text-lg leading-6 w-full font-medium text-gray-900" id="modal-title">
                                        Thông tin chi tiết
                                    </h3>
                                    <XMarkIcon width={16} height={16} className="h-6 w-6 ml-auto cursor-pointer" onClick={() => setOnPopupProductTemplateDetail(false)} />
                                    <hr className="mt-2 text-black-700" />
                                </div>
                                <div className="mt-4 border-t grid grid-cols-2 gap-4 p-4">
                                    <div>
                                        <span className="text-sm text-black-500 font-bold">Tên mẫu sản phẩm</span>
                                    </div>
                                    <div>
                                        <span>{productTemplate?.name}</span>
                                    </div>
                                    <div>
                                        <span className="text-sm text-black-500 font-bold">Tên phân loại</span>
                                    </div>
                                    <div>
                                        <span>{productTemplate?.category?.name}</span>
                                    </div>
                                    <div>
                                        <span className="text-sm text-black-500 font-bold">Mẫu ảnh</span>
                                    </div>
                                    <div>
                                        <img
                                            src={`${productTemplate?.imageUrl}?t=${new Date().getTime()}`}
                                            alt="Simple image"
                                            className="w-24 h-24 object-cover"
                                        />
                                    </div>
                                    <div>
                                        <span className="text-sm text-black-500 font-bold divide-y divide-blue-500">Trạng thái</span>
                                    </div>
                                    <div>
                                        <span style={{ color: productTemplate?.status === 1 ? 'green' : 'red', fontWeight: 'bold' }}>
                                            {productTemplate?.status === 1 ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-sm text-black-500 font-bold">Mô tả</span>
                                    </div>
                                    <div>
                                        <span>{productTemplate?.description}</span>
                                    </div>
                                    <div>
                                        <span className="text-sm text-black-500 font-bold">Người tạo</span>
                                    </div>
                                    <div>
                                        <span>{productTemplate?.createdBy}</span>
                                    </div>
                                    <div>
                                        <span className="text-sm text-black-500 font-bold">Ngày tạo</span>
                                    </div>
                                    <div>
                                        <span>{formatAnyDate(productTemplate?.created ? new Date(productTemplate.created) : undefined)}</span>
                                    </div>
                                    <div>
                                        <span className="text-sm text-black-500 font-bold">Người chỉnh sửa</span>
                                    </div>
                                    <div>
                                        <span>{productTemplate?.lastModifiedBy ?? 'Chưa có thay đổi'}</span>
                                    </div>
                                    <div>
                                        <span className="text-sm text-black-500 font-bold">Ngày chỉnh sửa</span>
                                    </div>
                                    <div>
                                        <span>
                                            {productTemplate?.lastModified !== null
                                                ? formatAnyDate(productTemplate?.lastModified ? new Date(productTemplate.lastModified) : undefined)
                                                : 'Chưa có thay đổi'}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-sm text-black-500 font-bold">Hành động</span>
                                    </div>
                                    <div className="w-auto flex gap-4">
                                        <button
                                            onClick={handleProductTemplateStep}
                                            className="text-xs w-auto border border-neutral-950 px-2 py-1 bg-neutral-700 text-white-500 font-bold rounded-lg"
                                        >
                                            Xem các bước
                                        </button>
                                        <button
                                            onClick={onChangeImage}
                                            className="text-xs w-auto border border-red-500 px-2 py-1 bg-orange-500 text-white-500 font-bold rounded-lg"
                                        >
                                            Thay đổi ảnh mẫu
                                        </button>
                                        <button
                                            onClick={onDelete}
                                            className="text-xs w-24 border border-red-500 p-1 bg-red-500 ttext-white-500 font-bold rounded-lg"
                                        >
                                            Xoá
                                        </button>
                                        <button
                                            onClick={onUpdate}
                                            className="text-xs w-24 border border-blue-500 p-1 bg-blue-500 text-white-500 font-bold rounded-lg"
                                        >
                                            Sửa thông tin
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopupDetailProductTemplate;
