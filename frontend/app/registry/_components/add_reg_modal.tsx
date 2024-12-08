"use client";

import Image from "next/image";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

//Assets
import federico from "../../../assets/federico.svg";
import isotipo from "../../../assets/isotipo.svg";
import success_image from "../../../assets/success.svg";

type Props = {
  openModal: boolean;
  showFede: boolean;
  success: boolean;
};

const FedericoWorking = () => {
  return (
    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
      <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
        Validating ownership...
      </DialogTitle>
      <div className="mt-2">
        <div className="flex justify-center relative">
          <div className="absolute left-[75px] top-5">
            <Image
              src={isotipo}
              alt="Isotipo"
              width={60}
              height={60}
              className="animate-spin-slow"
            />
          </div>
          <Image src={federico} alt="Federico" width={300} height={300} />
        </div>
        <p className="text-sm text-gray-500 mt-6 font-bold">
          Federico, a certifyed validator, is proving the ownership of the
          address you provided. Please wait a few seconds...
        </p>
      </div>
    </div>
  );
};

const Success = () => {
  return (
    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
      <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
        Success!
      </DialogTitle>
      <div className="mt-2">
        <div className="flex justify-center relative">
          <Image src={success_image} alt="Federico" width={300} height={300} />
        </div>
        <p className="text-sm text-gray-500 mt-6 font-bold">
          Federico validated your ownership successfully!
        </p>
      </div>
    </div>
  );
};

export default function AddRegModal({ openModal, showFede, success }: Props) {
  return (
    <>
      <Dialog open={openModal} onClose={() => null} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  {showFede && <FedericoWorking />}
                  {success && <Success />}
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
