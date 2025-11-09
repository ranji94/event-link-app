import { HeaderNotAuthenticated } from "@/components/common/HeaderNotAuthenticated";
import { translate } from "@/locales";

export default function AboutPage() {
  return (
    <>
      <HeaderNotAuthenticated />
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold mb-6">
          {translate("legal.about.title")}
        </h1>
        <div className="prose prose-neutral dark:prose-invert">
          <p>{translate("legal.about.p1")}</p>
          <p>{translate("legal.about.p2")}</p>
          <p>{translate("legal.about.p3")}</p>
        </div>
      </div>
    </>
  );
}
