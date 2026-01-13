import { motion, AnimatePresence } from "framer-motion";

export default function ConfirmModal({
  isOpen,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  onConfirm,
  onCancel,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-zinc-900 border border-zinc-800 p-8 w-full max-w-md"
          >
            <h2 className="text-xl font-bold text-yellow-400 mb-3">
              {title}
            </h2>

            <p className="text-zinc-400 mb-6">
              {message}
            </p>

            <div className="flex justify-end gap-4">
              <button
                onClick={onCancel}
                className="px-4 py-2 border border-zinc-600 text-zinc-300 hover:bg-zinc-800"
              >
                Cancel
              </button>

              <button
                onClick={onConfirm}
                className="px-4 py-2 bg-red-500 text-black font-bold hover:bg-red-400"
              >
                Confirm
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
