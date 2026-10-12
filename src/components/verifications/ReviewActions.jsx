import { useState } from "react";
import { Check, X } from "lucide-react";
import ConfirmDialog from "../ui/ConfirmDialog";
import { REJECTION_REASON_REQUIRED, STATUS } from "../../config/constants";

export default function ReviewActions({ status, processing, onAccept, onReject }) {
  const [dialog, setDialog] = useState(null); // "accept" | "reject" | null
  const [notes, setNotes] = useState("");

  const busy = processing !== null;

  const close = () => {
    setDialog(null);
    setNotes("");
  };

  const confirm = async () => {
    const ok = dialog === "accept" ? await onAccept() : await onReject(notes.trim());
    if (ok) close();
  };

  if (status !== STATUS.PENDING) {
    return (
      <div className="panel decision decision--done">
        <h2 className="panel__title">Decision</h2>
        <p className="muted">This request has been reviewed. No further action is needed.</p>
      </div>
    );
  }

  return (
    <div className="panel decision">
      <h2 className="panel__title">Decision</h2>
      <p className="muted">Check the photos and details, then verify or reject this charger.</p>
      <div className="decision__buttons">
        <button type="button" className="btn btn--primary" onClick={() => setDialog("accept")} disabled={busy}>
          <Check size={18} aria-hidden="true" /> Verify
        </button>
        <button type="button" className="btn btn--danger-outline" onClick={() => setDialog("reject")} disabled={busy}>
          <X size={18} aria-hidden="true" /> Reject
        </button>
      </div>

      <ConfirmDialog
        open={dialog === "accept"}
        title="Verify this charger?"
        description="The charger will be marked as verified once the server confirms."
        confirmLabel="Verify charger"
        processing={processing === "accept"}
        onConfirm={confirm}
        onCancel={close}
      />

      <ConfirmDialog
        open={dialog === "reject"}
        title="Reject this request?"
        description="The request will be rejected. The charger stays not verified."
        confirmLabel="Reject request"
        tone="danger"
        processing={processing === "reject"}
        confirmDisabled={REJECTION_REASON_REQUIRED && !notes.trim()}
        onConfirm={confirm}
        onCancel={close}
      >
        <label className="field">
          <span>Notes for the submitter {REJECTION_REASON_REQUIRED ? "" : "(optional)"}</span>
          <textarea
            rows={3}
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="For example: the photos don't clearly show the charger"
            disabled={processing === "reject"}
          />
        </label>
      </ConfirmDialog>
    </div>
  );
}
