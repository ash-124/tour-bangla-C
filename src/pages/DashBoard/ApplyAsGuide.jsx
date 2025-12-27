import { useState } from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAuth from '../../Hooks/useAuth';
import toast from 'react-hot-toast';

const ApplyAsGuide = () => {

  const axiosPublic = useAxiosPublic();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { user } = useAuth();
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const form = e.target;
      const title = form.title.value;
      const inspiration = form.inspiration.value;
      const cv = form.cvURL.value;
      const applicationData = { title, inspiration, cv, applicantEmail: user?.email };
      const { data } = await axiosPublic.post('/application/tour-guide', applicationData);
      if (data?.insertedId) {
        setIsSubmitted(true);
        e.target.reset();
      }
      console.log(data);
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message)
    }

  }

  return (
    <div className=" flex  justify-center items-center">
      <div className="flex flex-col w-full items-center ">
        <h2 className=" text-xl md:text-2xl font-semibold md:mb-4 mb-2  text-center text-[#BFC1CC] uppercase">Join as Tour Guide

        </h2>
        <div className="w-full max-w-lg p-4 md:p-6 rounded-lg shadow-md border-2 bg-[#2B3440] border-[#BFC1CC]">

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Application Title</label>
              <input
                name="title"
                type="text"
                required
                className="w-full p-2 rounded border-2 border-[#BFC1CC]  placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#BFC1CC]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Why do you want to be a Tour Guide?</label>
              <textarea
                name="inspiration"
                required
                className="w-full p-2 rounded border-2 border-[#BFC1CC] placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#BFC1CC]"
                rows={4}
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">CV Link</label>
              <input
                name="cvURL"
                type="url"
                className="w-full p-2 rounded border-2 border-[#BFC1CC] placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#BFC1CC]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 rounded bg-[#BFC1CC] text-[#2B3440] font-semibold hover:bg-[#D0D1D8] transition"
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {isSubmitted && (
        <dialog id="successModal" className="modal modal-open">
          <div className="modal-box bg-[#2B3440] border-2 border-[#BFC1CC]">
            <h3 className="text-xl font-bold text-green-400">Application Successful!</h3>
            <p className="mt-2 text-white">Your application has been submitted successfully.</p>
            <div className="modal-action">
              <button
                className="bg-[#BFC1CC] text-[#2B3440] px-4 py-2 rounded font-semibold hover:bg-[#D0D1D8]"
                onClick={() => setIsSubmitted(false)}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>



  );
};

export default ApplyAsGuide;