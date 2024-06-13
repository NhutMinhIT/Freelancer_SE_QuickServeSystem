import { MapIcon, PowerIcon } from "@heroicons/react/16/solid"

const TemplateStepList = () => {
    return (
        <div className="mt-5">
            <div className="flex">
                <MapIcon width={32} height={32} className="text-orange-500" />
                <h3 className="text-3xl font-bold ml-6">Các Bước Mẫu + Product Tempalte</h3>
            </div>
            <div className="grid grid-cols-3 gap-4 overflow-y-hidden">
                <div className="relative flex flex-col mt-6 text-back-700 bg-whiterounded-xl w-96 h-72 border rounded-lg border-black-200 shadow-black-100 shadow-lg">
                    <div className="p-6">
                        <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                            Name
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
                                Người tạo
                            </span>
                            <span>
                                Ngày tạo
                            </span>
                        </div>
                        <div className="mt-2 font-sans text-base antialiased font-light leading-relaxed text-inherit flex flex-col 2">
                            <span>
                                Người tạo
                            </span>
                            <span>
                                Ngày tạo
                            </span>
                        </div>
                    </div>
                    <div className="flex justify-end mr-3">
                        <button
                            className="p-2 rounded-lg font-sans font-bold text-center uppercase border border-blue-500 text-white-500 bg-blue-500"
                            type="button">
                            Cập nhật
                        </button>
                        <button
                            className="p-2 ml-2 rounded-lg font-sans font-bold text-center uppercase border border-red-500 bg-red-500 text-white-500"
                            type="button">
                            Xoá
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TemplateStepList