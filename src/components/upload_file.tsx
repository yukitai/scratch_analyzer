type UploadFileProps = {
    id: string,
    title: string
    accept?: string,
    onLoad: (files: FileList) => void,
};

export function UploadFile(props: UploadFileProps) {
    const { id, accept, title, onLoad } = props;

    return (
        <>
            <input class="hidden" id={id} name="src-file" type="file"
                accept={accept} onChange={() => {
                    const files = window[id as keyof Window].files as FileList
                    onLoad(files)
                }}/>
            <button class="transition text-white hover:text-gray-900
                border-solid border-1.5 border-pink-200 outline-none rounded-lg
                px-3 py-2 bg-transparent hover:bg-pink-200 shadow-2xl
                hover:shadow-3xl shadow-pink-200 hover:cursor-pointer"
                onClick={() => {
                    document.getElementById(id)!.click(); 
                }}>{title}</button>
        </>
    )
}