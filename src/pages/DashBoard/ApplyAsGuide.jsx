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
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Join as a Tour Guide</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Application Title</label>
            <input name='title' type="text" required className="input input-bordered w-full" />
          </div>

          <div>
            <label className="block text-sm font-medium">Why do you want to be a Tour Guide?</label>
            <textarea name='inspiration' required className="textarea textarea-bordered w-full"></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium">CV Link </label>
            <input name='cvURL' type="url" className="file-input file-input-bordered w-full max-w-xs" />
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Submit Application
          </button>
        </form>
      </div>

      {/* DaisyUI Modal */}
      {
        isSubmitted && <dialog id="successModal" className=' modal modal-open'>
          <div className="modal-box">
            <h3 className="text-xl font-bold text-green-600">Application Successful!</h3>
            <p className="mt-2 text-gray-600">Your application has been submitted successfully.</p>
            <div className="modal-action">
              <button className="btn btn-primary" onClick={() => setIsSubmitted(false)}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      }
    </div>
  );
};

export default ApplyAsGuide;