import { ResetPassForm } from "@/components/resetPassRequest";

const ReqResetPass = () => {
    return (
        <div className="pt:mt-0 mx-auto flex flex-col items-center justify-center px-6 pt-8 dark:bg-gray-900 md:h-screen">
      <a
        href="#"
        className="mb-8 flex items-center justify-center text-2xl font-semibold dark:text-white lg:mb-10"
      >
        <img src="/nits.png" className="mr-4 h-20" />
      </a>
      <div className="w-full max-w-xl space-y-8 rounded-lg bg-white p-6 shadow dark:bg-gray-800 sm:p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Password Reset
        </h2>
        <h3>Please enter the email that is associated with your account
        </h3>
        <ResetPassForm/>
      </div>
    </div>
    );
}

export default ReqResetPass