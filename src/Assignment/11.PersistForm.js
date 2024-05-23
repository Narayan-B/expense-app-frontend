import { useEffect, useState } from "react";
export default function PersistFormObj() {
  const [form, setForm] = useState(
    JSON.parse(localStorage.getItem("form")) || {
      title: "",
      body: "",
    }
  );
  useEffect(() => {
    localStorage.setItem("form", JSON.stringify(form));
  }, [form]);

  return (
    <div>
      <h1>Persist Form</h1>
      <form>
        <input
          type="text"
          placeholder="Enter title"
          value={form.title}
          onChange={(e) => {
            setForm({ ...form, title: e.target.value });
          }}
        /><br/>
        <textarea
          placeholder="Enter Body"
          value={form.body}
          onChange={(e) => setForm({ ...form, body: e.target.value })}
        ></textarea>
      </form>
    </div>
  );
}
