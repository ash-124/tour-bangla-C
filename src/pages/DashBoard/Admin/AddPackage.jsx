import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
const imgUploadApiKey = import.meta.env.VITE_imgKey;
const imgUploadApi = `https://api.imgbb.com/1/upload?key=${imgUploadApiKey} `
const AddPackage = () => {
    const { register, handleSubmit, reset, control } = useForm();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "itinerary"
    });
    const [images, setImages] = useState([]);
    const [isUploading, setIsUploading] = useState(false)
    const axiosPublic = useAxiosPublic();
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setImages((prevImages) => [...prevImages, ...files]);
    };
    const handleRemoveImage = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const onSubmit = async (data) => {
        // ensure img selected
        if (!images.length) {
            return toast.error("Image haven't selected yet!")
        }
        // upload Img to imgBB
        try {
            setIsUploading(true)
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
                    console.log('error on uploading image to imgBB', error);
                    toast.error(error.message)
                    return null;
                }
            }))
            const validImages = uploadImages.filter(img => img != null)
            console.log({ ValidImgURl: validImages, uploadedLinks: uploadImages })
            if (validImages.length === 0) {
                toast.error('Failed to upload images.');
                setIsUploading(false);
                return;
            }
            // Data's to upload tour package
            const modifiedItinerary = data.itinerary.map((item, index) => (
                `day${index + 1}: ${item.dayPlan}`));
            const processedData = {
                Date: new Date().getDate(), 
                name: data.name,
                description: data.description,
                price: parseFloat(data.price),
                duration: data.duration,
                rating: parseFloat(data.rating),
                destination: data.destination.split(",").map((d) => d.trim()),
                itinerary:modifiedItinerary ,
                includes: data.includes.split(",").map((i) => i.trim()),
                excludes: data.excludes.split(",").map((e) => e.trim()),
                images: validImages,
                tags: data.tags.split(",").map(t => t.trim())
            };

            console.log("Final Data:", processedData);
            // Send data to the server 
            if (processedData.images) {
                const { data } = await axiosPublic.post('/package', processedData)
                if (data?.insertedId) {
                    setIsUploading(false)
                    toast.success('Your package has been added successfully ')
                    // Reset the form 
                    reset();
                    setImages([]);
                }
            }
        }
        catch (error) {
            console.log('Error on adding tour package', error)
        }

    };


    return (
        <div className="max-w-2xl mx-auto p-4 bg-white shadow-lg rounded">
            <h2 className="text-2xl font-bold mb-4">Add Tour Package</h2>
            <form onSubmit={handleSubmit(onSubmit)} className=" grid grid-cols-2 gap-4">

                <input
                    {...register("name")}
                    placeholder="Tour Name"
                    className="w-full p-2 border rounded"
                    required />
                <input
                    type="number"
                    {...register("price")}
                    placeholder="Price"
                    className="w-full p-2 border rounded"
                    required />
                <input
                    {...register("duration")}
                    placeholder="Duration (e.g. 2-3 Days)"
                    className="w-full p-2 border rounded"
                    required />
                <input
                    type="number"
                    step="0.1" {...register("rating")}
                    placeholder="Rating (e.g. 4.5)"
                    className="w-full p-2 border rounded"
                    required />

                <input
                    {...register("destination")}
                    placeholder="Destinations (comma separated)"
                    className="w-full p-2 border rounded" />
                <input
                    {...register("includes")}
                    placeholder="Includes (comma separated)"
                    className="w-full p-2 border rounded" />
                <input
                    {...register("excludes")}
                    placeholder="Excludes (comma separated)"
                    className="w-full p-2 border rounded" />
                <input
                    {...register("tags")}
                    placeholder="Tags (comma separated (e.g. Featured, top..)"
                    className="w-full p-2 col-span-2 border rounded" />
                <textarea
                    {...register("description")}
                    placeholder="Description"
                    className="w-full col-span-2 p-2 border rounded"
                    required />
                {/* itineary */}
                <div className="col-span-2">
                    <label className="font-semibold mb-2 block">Itinerary:</label>
                    {fields.map((field, index) => (
                        <div key={field.id} className="flex items-center gap-2 mb-2">
                            <input
                                {...register(`itinerary.${index}.dayPlan`)}
                                placeholder={`Day ${index + 1} Plan`}
                                className="w-full p-2 border rounded"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => remove(index)}
                                className="bg-red-500 text-white p-2 rounded"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => append({ dayPlan: "" })}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Add Day
                    </button>
                </div>
                <div className="flex items-center justify-center col-span-2">
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-[80%] border-2 border-spacing-3 border-dashed border-[#D1D3DD] p-4 py-12 rounded"
                    />
                </div>
                {images.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mt-2">
                        {images.map((img, idx) => (
                            <div key={idx} className="relative">
                                <img src={URL.createObjectURL(img)} alt={`Uploaded ${idx}`} className="w-full h-24 object-cover rounded" />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveImage(idx)}
                                    className="absolute top-0 right-0 bg-red-600 text-white text-xs px-2 py-1 rounded-full"
                                >
                                    X
                                </button>
                            </div>

                        ))}
                    </div>
                )}

                <button type="submit" className="w-full col-span-2 bg-[#2B3440] text-white py-2 rounded hover:bg-[#1a1d21] transition">
                {isUploading ? <span className="loading loading-spinner text-accent"></span>
                    : "Add Package"}
                </button>
            </form>
        </div>
    );
};

export default AddPackage;
