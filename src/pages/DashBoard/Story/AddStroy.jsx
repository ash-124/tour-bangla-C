import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { data } from "autoprefixer";
import toast from "react-hot-toast";

const imgUploadApiKey = import.meta.env.VITE_imgKey;
const imgUploadApi = `https://api.imgbb.com/1/upload?key=${imgUploadApiKey} `
const AddStory = () => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState("");
    const [images, setImages] = useState([]);
    const [isUploading, setIsUploading] = useState();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setImages((prevImages) => [...prevImages, ...files]);
    };

    const handleRemoveImage = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };
    // TO:DO make an function to upload img to imgbb and get img link
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsUploading(true)
        // show error on not selected any img
        if (images?.length === 0) {
            toast.error('Please select photo to upload story')
            setIsUploading(false);
            return;
        }
        // Upload images to ImgBB and get their URLs
        try {

            const uploadImages = await Promise.all(images.map(async (img) => {
                const formData = new FormData();
                formData.append('image', img);
                try {
                    const { data } = await axiosPublic.post(imgUploadApi, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',

                        },
                        withCredentials: false
                    })
                    console.log(data?.success)
                    if (data?.success) {
                        
                        return data?.data?.display_url;
                    } else {
                        return null;
                    }

                } catch (error) {
                    console.log('error on uploading image to imgbb', error);
                    toast.error(error.message)
                    return null;
                }
            }))
            console.log('uploadImages',uploadImages)
            const validImages = uploadImages.filter(url => url !== null)
            console.log(validImages)
            if (validImages.length === 0) {
                toast.error('Failed to upload images.');
                setIsUploading(false);
                return;
            }
            // Prepare final form data
            const formData = {
                title: title,
                description: text,
                images: validImages,
            };
            console.log(formData)
            if(formData.images){
                setIsUploading(false)
            }
            
        } catch (error) {
            console.log('error on uploading story', error)
            toast.error(error.message);
        }

        // Now you can send formData to your backend if needed
    };
    console.log(isUploading)

    return (
        <div className="max-w-2xl mx-auto p-6 bg-indigo-200 rounded-lg shadow-md ">
            <h2 className="text-2xl font-semibold mb-4">Add Story</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Story Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border-2 border-purple-600 rounded"
                    required
                />
                <textarea
                    placeholder="Write your story..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full p-2 border-2 border-purple-600 rounded"
                    rows="5"
                    required
                ></textarea>
                <div className="flex items-center justify-center">
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-[80%] border-2 border-spacing-3 border-dashed border-purple-600 p-4 py-12 rounded"
                    />
                </div>
                <div className="flex flex-wrap gap-2">
                    {images.map((img, index) => (
                        <div key={index} className="relative">
                            <img
                                src={URL.createObjectURL(img)}
                                alt="Preview"
                                className="w-20 h-20 object-cover rounded-md"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveImage(index)}
                                className="absolute top-0 right-0 bg-red-600 text-white text-xs px-2 py-1 rounded-full"
                            >
                                X
                            </button>
                        </div>
                    ))}
                </div>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    {isUploading ? 'uploading' : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default AddStory;
