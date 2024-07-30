import { FaRev } from "react-icons/fa";

const RetryBalFetch = () => {
  return (
    <div className="w-[30px] h-[30px] flex items-center justify-center relative">
      <button className="">
        <FaRev fontSize={25} />
      </button>

      <div className="alarm w-[8px] h-[8px] bg-red-500 rounded-[100%] absolute left-1/2 top-1/2 -translate-x-[40%] -translate-y-[30%]"></div>
    </div>
  );
};

export default RetryBalFetch;
