import { useEffect, useRef } from "react";

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  tone = "primary", // "primary" | "danger"
  processing = false,
  confirmDisabled = false,
  onConfirm,
  onCancel,
  children,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const handleCancel = (event) => {
    event.preventDefault(); // we control closing through `open`
    if (!processing) onCancel();
  };

  return (
    <dialog
      ref={ref}
      className="dialog"
      onCancel={handleCancel}
      onClick={(event) => event.target === ref.current && !processing && onCancel()}
      aria-labelledby="dialog-title"
    >
      {open && (
        <div className="dialog__body">
          <h2 id="dialog-title">{title}</h2>
          {description && <p className="dialog__description">{description}</p>}
          {children}
          <div className="dialog__actions">
            <button type="button" className="btn btn--ghost" onClick={onCancel} disabled={processing}>
              Cancel
            </button>
            <button
              type="button"
              className={`btn btn--${tone}`}
              onClick={onConfirm}
              disabled={processing || confirmDisabled}
            >
              {processing && <span className="spinner spinner--small" aria-hidden="true" />}
              {confirmLabel}
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
}
