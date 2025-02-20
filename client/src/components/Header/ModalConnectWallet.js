import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../app-context";
import FormConnectWallet from "../FormConnectWallet";
import { useSelector } from "react-redux";
import FormGenerateWallet from "../FormGenerateWallet";

export default function ModalConnectWallet() {
  const { isShow, setIsShow } = useContext(ModalContext);
  const [isGenerateWallet, setIsGenerateWallet] = useState(false);

  const closeModalHandler = (event) => setIsShow(false);
  const wallet = useSelector((state) => state.wallet);

  useEffect(() => {
    setIsShow(false);
    if (wallet.address) setIsGenerateWallet(false);
  }, [wallet, setIsShow]);

  return (
    <div
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      className={
        isShow
          ? "fixed z-10 inset-0 overflow-y-auto block"
          : " fixed z-10 inset-0 overflow-y-auto hidden"
      }
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-3xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between align-items-center mt-3 mb-5 text-center sm:mt-0 sm:text-left">
              <h2 className="mb-0 text-xl">
                <strong>{isGenerateWallet ? "Create a new wallet" : "Connect wallet"}</strong>
              </h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-orange cursor-pointer hover:text-orange-dark"
                onClick={(e) => closeModalHandler(e)}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            {isGenerateWallet ? <FormGenerateWallet /> : <FormConnectWallet />}
            <div className="my-4">
              <p className="text-center text-sm">
                {isGenerateWallet
                  ? "No, I already have a crypto wallet. "
                  : "Haven’t got a crypto wallet yet? "}
                <span
                  className="text-blue underline font-medium cursor-pointer"
                  onClick={(e) => setIsGenerateWallet(!isGenerateWallet)}
                >
                  {isGenerateWallet ? "Connect an existing wallet" : "Create a new wallet"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
