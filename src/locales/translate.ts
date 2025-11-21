import plPL from "./pl-PL.json";

const packages = {
  "pl-PL": plPL,
};

type Primitive = string | number | boolean | null | undefined;

type LeafPaths<T, P extends string = ""> = T extends Primitive
  ? P
  : T extends Array<any>
  ? P
  : {
      [K in Extract<keyof T, string>]: LeafPaths<
        T[K],
        P extends "" ? K : `${P}.${K}`
      >;
    }[Extract<keyof T, string>];

export type TranslationKey = LeafPaths<typeof plPL>;
type ReplacementParams = Record<string, string | number>;

function getByPath(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object") return (acc as any)[key];
    return undefined;
  }, obj);
}

function applyReplacements(phrase: string, params: ReplacementParams): string {
  let out = phrase;
  for (const [k, v] of Object.entries(params)) {
    out = out.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
  }
  return out;
}

export const translate = (
  key: TranslationKey,
  replacementParams: ReplacementParams = {}
) => {
  const locale = "pl-PL";
  const pack = packages[locale] as unknown;
  const value = getByPath(pack, key);

  if (typeof value === "string") {
    return Object.keys(replacementParams).length
      ? applyReplacements(value, replacementParams)
      : value;
  }

  return `##${key}##`;
};

export const tEnum = (
  ns: "status" | "propertyType" | "valuationPurpose" | "customerType",
  v?: string
) => (v ? translate(`enums.${ns}.${v}`) : "");
