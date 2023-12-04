import { ConfirmationResult } from "firebase/auth";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { AuthSteps } from "@/types/AuthSteps";

const handleSubmitVerifyCode = async (
  e: React.FormEvent,
  confirmationResult: ConfirmationResult | null,
  code: string,
  setStep: React.Dispatch<React.SetStateAction<AuthSteps>>,
  router: AppRouterInstance
) => {
  e.preventDefault();

  if (confirmationResult) {
    try {
      // console.log('confirmationResult', confirmationResult);
      // console.log('code', code);
      const userCredential = await confirmationResult.confirm(code);
      console.log("userCredential", userCredential);
      if (userCredential) {
        if (userCredential.user.displayName) {
          router.push('/')
          return;
        } else {
          setStep("Step 3/3");
        }
      }
    } catch (error) {
      console.log("setVerifyCode error", error);
    }
  }
};

export default handleSubmitVerifyCode;
