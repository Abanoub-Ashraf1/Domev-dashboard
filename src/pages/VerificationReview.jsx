import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";
import { useToast } from "../components/ui/Toast";
import VerificationDetails from "../components/verifications/VerificationDetails";
import VerificationGallery from "../components/verifications/VerificationGallery";
import ReviewActions from "../components/verifications/ReviewActions";
import { useVerification } from "../hooks/useVerification";

export default function VerificationReview() {
  const { id } = useParams();
  const toast = useToast();
  const { request, loading, error, reload, processing, accept, reject } = useVerification(id);

  const handleAccept = async () => {
    try {
      await accept();
      toast.success(`Charger verified: ${request.charger.name} is now verified.`);
      return true;
    } catch (err) {
      toast.error(err.message || "Couldn't verify this charger. Nothing was changed.");
      return false;
    }
  };

  const handleReject = async (notes) => {
    try {
      await reject(notes);
      toast.success(`Request rejected: ${request.charger.name} stays not verified.`);
      return true;
    } catch (err) {
      toast.error(err.message || "Couldn't reject this request. Nothing was changed.");
      return false;
    }
  };

  return (
    <div className="page">
      <Link to="/validations" className="back-link">
        <ArrowLeft size={16} aria-hidden="true" /> All requests
      </Link>

      {loading && !request && <LoadingState label="Loading request…" />}
      {error && !request && <ErrorState error={error} onRetry={reload} title="Couldn't load this request" />}

      {request && (
        <div className="review">
          <div className="review__main">
            <VerificationGallery images={request.images} chargerName={request.charger.name} />
            <VerificationDetails request={request} />
          </div>
          <div className="review__side">
            <ReviewActions status={request.status} processing={processing} onAccept={handleAccept} onReject={handleReject} />
          </div>
        </div>
      )}
    </div>
  );
}
