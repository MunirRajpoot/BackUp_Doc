import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { toast } from "react-toastify";

const NotesEditor = ({ analysisId }) => {
  const [editing, setEditing] = useState(false);
  const [note, setNote] = useState("");
  const authToken = Cookies.get("auth_token");

  const handleSaveNote = async () => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/engine/analysis/${analysisId}/`,
        { report_analysis: note, is_corrected: "yes" }, // is_corrected must be valid!
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      toast.success("Note saved successfully!");
      setEditing(false);
    } catch (err) {
      console.error(err);
      toast.error("Error saving note");
    }
  };

  return (
    <div className="mt-6 bg-[#1E293B] p-4 rounded-xl">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold mb-1">Notes</h4>
        <button onClick={() => setEditing(!editing)}>✏️</button>
      </div>

      {editing ? (
        <div className="mt-2">
          <textarea
            className="w-full p-2 rounded bg-gray-700 text-sm text-white"
            rows={4}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <button
            className="mt-2 bg-blue-600 px-3 py-1 text-sm rounded hover:bg-blue-700"
            onClick={handleSaveNote}
          >
            Save Note
          </button>
        </div>
      ) : (
        <p className="text-sm text-gray-400">
          {note.trim() ? note : "No notes added yet"}
        </p>
      )}
    </div>
  );
};

export default NotesEditor;
