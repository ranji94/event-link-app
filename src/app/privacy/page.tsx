import { HeaderNotAuthenticated } from "@/components/common/HeaderNotAuthenticated";
import { translate } from "@/locales";

export default function PrivacyPage() {
  return (
    <>
      <HeaderNotAuthenticated />
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold mb-6">
          {translate("legal.privacy.title")}
        </h1>
        <div className="prose prose-neutral dark:prose-invert space-y-4">
          <p>{translate("legal.privacy.intro")}</p>

          <h2 className="font-semibold">
            {translate("legal.privacy.data_processing.title")}
          </h2>
          <p>{translate("legal.privacy.data_processing.text")}</p>

          <h2 className="font-semibold">
            {translate("legal.privacy.cookies.title")}
          </h2>
          <p>{translate("legal.privacy.cookies.text")}</p>

          <h2 className="font-semibold">
            {translate("legal.privacy.rights.title")}
          </h2>
          <p>{translate("legal.privacy.rights.text")}</p>

          <h2 className="font-semibold">
            {translate("legal.privacy.security.title")}
          </h2>
          <p>{translate("legal.privacy.security.text")}</p>

          <h2 className="font-semibold">
            {translate("legal.privacy.final.title")}
          </h2>
          <p>{translate("legal.privacy.final.text")}</p>
        </div>
      </div>
    </>
  );
}
