import { ReactElement } from "react";
import UploadVideoForm from "../components/uploadVideoForm";

const UploadVideo = (): ReactElement => {
    return (
        <section className="justify-center items-center flex min-h-[70vh]">
            <div className="rounded-lg bg-gray-900 px-10 py-12 shadow-2xl border border-indigo-300/10">
                <UploadVideoForm />
            </div>
        </section>
    );
};

export default UploadVideo;
