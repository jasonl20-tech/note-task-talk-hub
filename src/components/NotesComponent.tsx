
import { useState } from "react";
import { Plus, Search, Edit, Trash2, FileText } from "lucide-react";
import { useNotes, Note } from "@/hooks/useNotes";

export function NotesComponent() {
  const { notes, loading, createNote, updateNote, deleteNote } = useNotes();
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [formData, setFormData] = useState({ title: "", content: "" });

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) return;

    if (editingNote) {
      await updateNote(editingNote.id, formData.title, formData.content);
    } else {
      await createNote(formData.title, formData.content);
    }

    setFormData({ title: "", content: "" });
    setShowForm(false);
    setEditingNote(null);
  };

  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setFormData({ title: note.title, content: note.content });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    await deleteNote(id);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
    </div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FileText className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Notizen</h1>
        </div>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingNote(null);
            setFormData({ title: "", content: "" });
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Neue Notiz
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Notizen durchsuchen..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">
            {editingNote ? "Notiz bearbeiten" : "Neue Notiz erstellen"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Titel"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div className="mb-4">
              <textarea
                placeholder="Inhalt"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                required
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingNote ? "Aktualisieren" : "Erstellen"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingNote(null);
                  setFormData({ title: "", content: "" });
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Abbrechen
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map((note) => (
          <div key={note.id} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900 truncate flex-1">{note.title}</h3>
              <div className="flex gap-1 ml-2">
                <button
                  onClick={() => handleEdit(note)}
                  className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(note.id)}
                  className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{note.content}</p>
            <div className="text-xs text-gray-500">
              <p>Erstellt: {new Date(note.created_at).toLocaleDateString()}</p>
              {note.updated_at !== note.created_at && (
                <p>Aktualisiert: {new Date(note.updated_at).toLocaleDateString()}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredNotes.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">
            {searchTerm ? "Keine Notizen gefunden" : "Noch keine Notizen vorhanden"}
          </p>
        </div>
      )}
    </div>
  );
}
