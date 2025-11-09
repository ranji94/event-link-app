import { HeaderNotAuthenticated } from "@/components/common/HeaderNotAuthenticated";
import { translate } from "@/locales";

export default function TermsPage() {
  return (
    <>
      <HeaderNotAuthenticated />
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold mb-6">
          {translate("legal.terms.title")}
        </h1>
        <div className="prose prose-neutral dark:prose-invert space-y-4">
          <p>{translate("legal.terms.intro")}</p>

          <h2 className="font-semibold">
            {translate("legal.terms.scope.title")}
          </h2>
          <p>{translate("legal.terms.scope.text")}</p>

          <h2 className="font-semibold">
            {translate("legal.terms.liability.title")}
          </h2>
          <p>{translate("legal.terms.liability.text")}</p>

          <h2 className="font-semibold">
            {translate("legal.terms.security.title")}
          </h2>
          <p>{translate("legal.terms.security.text")}</p>

          <h2 className="font-semibold">
            {translate("legal.terms.payments.title")}
          </h2>
          <p>{translate("legal.terms.payments.text")}</p>

          <h2 className="font-semibold">
            {translate("legal.terms.final.title")}
          </h2>
          <p>{translate("legal.terms.final.text")}</p>
        </div>
      </div>
    </>
  );
}
