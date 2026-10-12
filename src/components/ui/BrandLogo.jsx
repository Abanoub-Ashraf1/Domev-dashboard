import { Zap } from "lucide-react";

// Picks up src/assets/images/logo.(png|svg|webp|jpg) if it exists.
const logos = import.meta.glob("../../assets/images/logo.{png,svg,webp,jpg}", {
  eager: true,
  query: "?url",
  import: "default",
});
const logoUrl = Object.values(logos)[0];

export default function BrandLogo() {
  if (logoUrl) return <img className="brand-logo" src={logoUrl} alt="DOMEv" />;
  return (
    <span className="brand-fallback">
      <span className="brand-fallback__mark" aria-hidden="true">
        <Zap size={20} />
      </span>
      <span className="brand-fallback__name">DOMEv</span>
    </span>
  );
}
