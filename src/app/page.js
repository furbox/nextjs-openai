"use client";
import { useState } from "react";

function HomePage() {
  const [prompt, setPromp] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.log(error);
      alert("Error generating");
      return;
    }
    setLoading(false);
  };

  return (
    <div className="bg-zinc-950 h-screen flex justify-center items-center">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Enter your prompt"
          className="p-2 rounded-md block text-white w-full bg-neutral-700"
          onChange={(e) => setPromp(e.target.value)}
        />
        <button className="bg-green-500 p-2 rounded-md block mt-2 text-white disabled:opacity-50" disabled={!prompt || loading}>
          {loading ? "Generating..." : "Generate"}
        </button>
        {result && (
          <p className="text-xl font-bolt text-white max-w-xs my-10">
            {result}
          </p>
        )}
      </form>
    </div>
  );
}

export default HomePage;
